import { initializeApp, getApps, getApp } from '@firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from '@firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  getDocs,
} from '@firebase/firestore';
import firebaseConfig from '../firebase-config.json';
import { GoogleUser, GeneratedAccessCode } from '../types/auth';
import {
  isAdminEmail,
  saveCurrentUser,
  saveRegisteredProfile,
  STORAGE_KEY_PROFILES_REGISTRY,
  STORAGE_KEY_ADMIN_CODES,
} from '../utils/auth';

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

/**
 * Convert timestamp or ISO string to strict ISO date string required by Firestore rules
 */
function toIsoDate(val?: number | string): string {
  if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}/.test(val)) {
    return val.slice(0, 40);
  }
  if (typeof val === 'number' && !Number.isNaN(val)) {
    return new Date(val).toISOString();
  }
  return new Date().toISOString();
}

/**
 * Convert ISO date string or number to epoch milliseconds
 */
function fromIsoOrNumber(val?: number | string): number {
  if (typeof val === 'number' && !Number.isNaN(val)) return val;
  if (typeof val === 'string') {
    const parsed = Date.parse(val);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return Date.now();
}

/**
 * Remove undefined properties so Firestore setDoc never rejects the payload
 */
function stripUndefined<T extends Record<string, any>>(obj: T): Record<string, any> {
  const clean: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    if (val !== undefined) {
      clean[key] = val;
    }
  });
  return clean;
}

/**
 * Perform real Google Authentication via Firebase signInWithPopup
 */
export async function loginDenganGoogleReal(): Promise<{
  success: boolean;
  user?: GoogleUser;
  isFirstTime?: boolean;
  errorMessage?: string;
}> {
  let fbUser: FirebaseUser | null = null;

  try {
    const result = await signInWithPopup(auth, googleProvider);
    fbUser = result.user;
  } catch (err: any) {
    const code = err?.code || '';
    const message = err?.message || '';

    if (code === 'auth/unauthorized-domain' || message.toLowerCase().includes('unauthorized')) {
      return {
        success: false,
        errorMessage:
          'Domain aplikasi belum didaftarkan dalam senarai Authorized Domains Firebase Authentication. Sila tambah domain di Firebase Console > Authentication > Settings > Authorized Domains.',
      };
    }
    if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
      return {
        success: false,
        errorMessage: 'Tetingkap log masuk Google telah ditutup sebelum pengesahan selesai.',
      };
    }
    if (code === 'auth/popup-blocked') {
      return {
        success: false,
        errorMessage:
          'Pelayar anda menyekat tetingkap popup Google. Sila benarkan tetingkap timbul (pop-up) untuk meneruskan log masuk.',
      };
    }

    return {
      success: false,
      errorMessage: err?.message || 'Ralat semasa menyambung ke akaun Google.',
    };
  }

  if (!fbUser || !fbUser.email) {
    return {
      success: false,
      errorMessage: 'Tiada maklumat emel diterima daripada akaun Google.',
    };
  }

  const cleanEmail = fbUser.email.toLowerCase().trim();
  const isAdmin = isAdminEmail(cleanEmail);

  // Check if profile exists in Firestore (/users/{uid})
  let existingFirestoreDoc: Record<string, any> | null = null;
  try {
    const userDocRef = doc(db, 'users', fbUser.uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      existingFirestoreDoc = snap.data();
    }
  } catch (firestoreErr) {
    console.warn('Firestore read user warning:', firestoreErr);
  }

  // Also check local registry fallback for Nota Kimia specific metrics
  let localExisting: Partial<GoogleUser> | null = null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROFILES_REGISTRY);
    if (raw) {
      const registry = JSON.parse(raw);
      if (registry[cleanEmail]) {
        localExisting = registry[cleanEmail];
      }
    }
  } catch (e) {
    // ignore
  }

  const resolvedSchool = existingFirestoreDoc?.namaSekolah || localExisting?.school || '';
  const isFirstTime = !resolvedSchool;

  const resolvedUser: GoogleUser = {
    id: fbUser.uid,
    email: cleanEmail,
    name: existingFirestoreDoc?.displayName || localExisting?.name || fbUser.displayName || 'Calon Kimia SPM',
    school: resolvedSchool,
    state: localExisting?.state || 'Selangor',
    avatar:
      fbUser.photoURL ||
      existingFirestoreDoc?.photoURL ||
      localExisting?.avatar ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    isPremium: isAdmin
      ? true
      : existingFirestoreDoc?.accessStatus === 'active' || (localExisting?.isPremium ?? false),
    role: isAdmin ? 'admin' : 'student',
    ...(existingFirestoreDoc?.accessCodeUsed || localExisting?.redeemedCode
      ? { redeemedCode: existingFirestoreDoc?.accessCodeUsed || localExisting?.redeemedCode }
      : {}),
    examAttemptsCount: localExisting?.examAttemptsCount || 0,
    createdAt: fromIsoOrNumber(existingFirestoreDoc?.createdAt || localExisting?.createdAt),
    lastLoginAt: Date.now(),
    loginCount: (existingFirestoreDoc?.loginCount || localExisting?.loginCount || 0) + 1,
    xp: localExisting?.xp || 0,
    completedSubtopicsCount: localExisting?.completedSubtopicsCount || 0,
    quizAccuracy: localExisting?.quizAccuracy || 0,
    badgesCount: localExisting?.badgesCount || 0,
  };

  // Sync to Firestore (/users & /usage_logs) & localStorage
  await syncUserProfile(resolvedUser, {
    isLoginEvent: true,
    existingFirestoreDoc,
  });
  saveCurrentUser(resolvedUser);

  return {
    success: true,
    user: resolvedUser,
    isFirstTime,
  };
}

/**
 * Save / Update user profile in Firestore (/users/{uid}) conforming strictly to firestore.rules
 */
export async function syncUserProfile(
  user: GoogleUser,
  options?: {
    isLoginEvent?: boolean;
    existingFirestoreDoc?: Record<string, any> | null;
  }
): Promise<{ ok: boolean; error?: string }> {
  const cleanEmail = user.email.toLowerCase().trim();
  const payload: GoogleUser = {
    ...user,
    email: cleanEmail,
    lastLoginAt: user.lastLoginAt || Date.now(),
  };

  // 1. Update localStorage registry
  saveRegisteredProfile(payload);

  // 2. Only write to Firestore if Firebase Auth session matches the owner (or is admin)
  const fbUser = auth.currentUser;
  if (!fbUser) {
    return { ok: false, error: 'Tiada sesi Firebase Auth aktif.' };
  }

  const targetUid = fbUser.uid === user.id ? fbUser.uid : user.id;
  if (fbUser.uid !== targetUid && !isAdminEmail(fbUser.email || '')) {
    return { ok: false, error: 'UID sesi tidak sepadan.' };
  }

  try {
    const userDocRef = doc(db, 'users', targetUid);

    // Fetch existing Firestore doc if not provided so we preserve immutable fields (createdAt, role, rphGeneratedCount)
    let existingDoc = options?.existingFirestoreDoc || null;
    if (!existingDoc) {
      try {
        const snap = await getDoc(userDocRef);
        if (snap.exists()) {
          existingDoc = snap.data();
        }
      } catch (readErr) {
        // ignore read error on new doc
      }
    }

    const isAdmin = isAdminEmail(cleanEmail);
    const firestoreRole =
      existingDoc?.role === 'admin' || isAdmin ? 'admin' : 'teacher';

    const firestorePayload = stripUndefined({
      uid: targetUid,
      email: cleanEmail,
      displayName: (payload.name || 'Calon Kimia SPM').trim().slice(0, 150),
      ...(payload.avatar ? { photoURL: payload.avatar.slice(0, 1000) } : {}),
      ...(payload.school ? { namaSekolah: payload.school.trim().slice(0, 200) } : {}),
      role: firestoreRole,
      accessStatus: payload.isPremium ? 'active' : existingDoc?.accessStatus || 'pending',
      ...(payload.redeemedCode ? { accessCodeUsed: payload.redeemedCode.slice(0, 60) } : {}),
      loginCount: Math.max(1, Math.floor(payload.loginCount || existingDoc?.loginCount || 1)),
      rphGeneratedCount: Math.max(0, Math.floor(existingDoc?.rphGeneratedCount || 0)),
      lastLoginAt: new Date().toISOString(),
      createdAt: toIsoDate(existingDoc?.createdAt || payload.createdAt),
    });

    await setDoc(userDocRef, firestorePayload, { merge: true });

    // Record usage log on login or progress update when authenticated as owner
    if (options?.isLoginEvent && fbUser.uid === targetUid) {
      const detailsText = `Nota Kimia SPM | Negeri: ${payload.state || 'Malaysia'} | XP: ${payload.xp || 0} | Subtopik: ${payload.completedSubtopicsCount || 0} | Ketepatan: ${payload.quizAccuracy || 0}%`.slice(
        0,
        1000
      );
      await addDoc(
        collection(db, 'usage_logs'),
        stripUndefined({
          uid: targetUid,
          email: cleanEmail,
          displayName: (payload.name || 'Calon Kimia SPM').trim().slice(0, 150),
          ...(payload.school ? { namaSekolah: payload.school.trim().slice(0, 200) } : {}),
          action: 'LOGIN',
          details: detailsText,
          createdAt: new Date().toISOString(),
        })
      ).catch(() => {});
    }

    return { ok: true };
  } catch (err: any) {
    console.warn('Firestore sync warning:', err?.code, err?.message);
    return { ok: false, error: err?.message || 'Ralat penyelarasan Firestore.' };
  }
}

/**
 * Load all registered students from Firestore (/users) + usage_logs telemetry
 */
export async function fetchAllStudentsRemote(): Promise<GoogleUser[]> {
  const studentsMap: Record<string, GoogleUser> = {};

  // 1. Load from local registry first
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROFILES_REGISTRY);
    if (raw) {
      const localRegistry = JSON.parse(raw);
      Object.values(localRegistry).forEach((u: any) => {
        if (u && u.email) studentsMap[u.email.toLowerCase().trim()] = u;
      });
    }
  } catch (e) {
    // ignore
  }

  // 2. Load from Firestore (/users collection) if Firebase user is signed in
  if (auth.currentUser) {
    try {
      const snap = await getDocs(collection(db, 'users'));
      snap.forEach((docSnap) => {
        const d = docSnap.data();
        if (d && d.email) {
          const emailKey = String(d.email).toLowerCase().trim();
          const prev = studentsMap[emailKey];
          studentsMap[emailKey] = {
            id: d.uid || docSnap.id,
            email: emailKey,
            name: d.displayName || prev?.name || 'Calon Kimia SPM',
            school: d.namaSekolah || prev?.school || '',
            state: prev?.state || 'Malaysia',
            avatar:
              d.photoURL ||
              prev?.avatar ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            isPremium: d.accessStatus === 'active' || prev?.isPremium || false,
            role: isAdminEmail(emailKey) || d.role === 'admin' ? 'admin' : 'student',
            ...(d.accessCodeUsed || prev?.redeemedCode
              ? { redeemedCode: d.accessCodeUsed || prev?.redeemedCode }
              : {}),
            examAttemptsCount: prev?.examAttemptsCount || 0,
            createdAt: fromIsoOrNumber(d.createdAt || prev?.createdAt),
            lastLoginAt: fromIsoOrNumber(d.lastLoginAt || prev?.lastLoginAt),
            loginCount: d.loginCount || prev?.loginCount || 1,
            xp: prev?.xp || 0,
            completedSubtopicsCount: prev?.completedSubtopicsCount || 0,
            quizAccuracy: prev?.quizAccuracy || 0,
            badgesCount: prev?.badgesCount || 0,
          };
        }
      });

      // Enrich with Nota Kimia telemetry from usage_logs if available
      try {
        const logsSnap = await getDocs(collection(db, 'usage_logs'));
        logsSnap.forEach((logDoc) => {
          const log = logDoc.data();
          if (!log?.email || !String(log.details || '').includes('Nota Kimia SPM')) return;
          const emailKey = String(log.email).toLowerCase().trim();
          const target = studentsMap[emailKey];
          if (!target) return;
          const details = String(log.details);
          const stateMatch = details.match(/Negeri:\s*([^|]+)/);
          const xpMatch = details.match(/XP:\s*(\d+)/);
          const subMatch = details.match(/Subtopik:\s*(\d+)/);
          const accMatch = details.match(/Ketepatan:\s*(\d+)%/);
          if (stateMatch?.[1]) target.state = stateMatch[1].trim();
          if (xpMatch?.[1]) target.xp = Math.max(target.xp || 0, parseInt(xpMatch[1], 10));
          if (subMatch?.[1]) {
            target.completedSubtopicsCount = Math.max(
              target.completedSubtopicsCount || 0,
              parseInt(subMatch[1], 10)
            );
          }
          if (accMatch?.[1]) {
            target.quizAccuracy = Math.max(target.quizAccuracy || 0, parseInt(accMatch[1], 10));
          }
        });
      } catch (logErr) {
        // ignore usage_logs read errors
      }

      // Update local cache
      localStorage.setItem(STORAGE_KEY_PROFILES_REGISTRY, JSON.stringify(studentsMap));
    } catch (err: any) {
      // Non-admin users will get permission-denied on collection('users') list per firestore.rules; fail silently
      if (err?.code !== 'permission-denied') {
        console.warn('Firestore fetch students warning:', err);
      }
    }
  }

  return Object.values(studentsMap)
    .filter((u) => u.role !== 'admin' && !isAdminEmail(u.email))
    .sort((a, b) => (b.lastLoginAt || b.createdAt || 0) - (a.lastLoginAt || a.createdAt || 0));
}

/**
 * Sync access codes to Firestore (/access_codes/{code}) conforming strictly to firestore.rules
 */
export async function saveGeneratedCodeRemote(codeDoc: GeneratedAccessCode): Promise<void> {
  if (!auth.currentUser) return;
  try {
    const codeRef = doc(db, 'access_codes', codeDoc.code);
    const firestorePayload = stripUndefined({
      code: codeDoc.code.slice(0, 60),
      status: codeDoc.isRedeemed ? 'active' : 'unused',
      note: (codeDoc.note || 'Kod Akses Nota Kimia SPM').slice(0, 300),
      createdAt: toIsoDate(codeDoc.createdAt),
      ...(codeDoc.redeemedByEmail ? { redeemedByEmail: codeDoc.redeemedByEmail.slice(0, 254) } : {}),
      ...(codeDoc.redeemedByName ? { redeemedByName: codeDoc.redeemedByName.slice(0, 150) } : {}),
      ...(codeDoc.redeemedAt ? { redeemedAt: toIsoDate(codeDoc.redeemedAt) } : {}),
    });
    await setDoc(codeRef, firestorePayload, { merge: true });
  } catch (err) {
    console.warn('Firestore write code warning:', err);
  }
}

/**
 * Load all generated access codes from Firestore (/access_codes) and local cache
 */
export async function fetchGeneratedCodesRemote(): Promise<GeneratedAccessCode[]> {
  const codesMap: Record<string, GeneratedAccessCode> = {};

  // Local first
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ADMIN_CODES);
    if (raw) {
      const localCodes = JSON.parse(raw);
      localCodes.forEach((c: GeneratedAccessCode) => {
        if (c.code) codesMap[c.code] = c;
      });
    }
  } catch (e) {
    // ignore
  }

  // Firestore (/access_codes)
  if (auth.currentUser) {
    try {
      const snap = await getDocs(collection(db, 'access_codes'));
      snap.forEach((docSnap) => {
        const d = docSnap.data();
        if (d && d.code) {
          codesMap[d.code] = {
            code: d.code,
            note: d.note || undefined,
            createdAt: fromIsoOrNumber(d.createdAt),
            isRedeemed: d.status === 'active',
            redeemedByEmail: d.redeemedByEmail || undefined,
            redeemedByName: d.redeemedByName || undefined,
            redeemedAt: d.redeemedAt ? fromIsoOrNumber(d.redeemedAt) : undefined,
          };
        }
      });
      localStorage.setItem(STORAGE_KEY_ADMIN_CODES, JSON.stringify(Object.values(codesMap)));
    } catch (err: any) {
      if (err?.code !== 'permission-denied') {
        console.warn('Firestore fetch codes warning:', err);
      }
    }
  }

  return Object.values(codesMap).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

/**
 * Listen to Firebase Auth state changes
 */
export function subscribeAuthState(callback: (fbUser: FirebaseUser | null) => void): () => void {
  return onAuthStateChanged(auth, callback);
}

/**
 * Log out from Firebase Auth
 */
export async function logKeluarFirebase(): Promise<void> {
  try {
    await signOut(auth);
  } catch (e) {
    // ignore
  }
}
