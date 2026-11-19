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
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  limit,
  where,
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
import { saveProgress } from '../utils/storage';

// Initialize dedicated Nota Kimia Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
const cfg = firebaseConfig as Record<string, string | undefined>;
export const db = cfg.firestoreDatabaseId
  ? getFirestore(app, cfg.firestoreDatabaseId)
  : getFirestore(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

/**
 * Recursively remove undefined properties so Firestore setDoc/updateDoc never rejects the payload
 */
function stripUndefined<T extends Record<string, any>>(obj: T): Record<string, any> {
  const clean: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    if (val === undefined) return;
    if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
      clean[key] = stripUndefined(val);
    } else {
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

  // Check if profile exists in Nota Kimia Firestore (by UID first, then by email)
  let existingProfile: Partial<GoogleUser> | null = null;
  try {
    const userDocRef = doc(db, 'nota_kimia_users', fbUser.uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      existingProfile = snap.data() as Partial<GoogleUser>;
    } else {
      const q = query(
        collection(db, 'nota_kimia_users'),
        where('email', '==', cleanEmail),
        limit(1)
      );
      const qSnap = await getDocs(q);
      if (!qSnap.empty) {
        existingProfile = qSnap.docs[0].data() as Partial<GoogleUser>;
      }
    }
  } catch (firestoreErr) {
    console.warn('Firestore read warning:', firestoreErr);
  }

  // Also check local registry fallback
  if (!existingProfile) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PROFILES_REGISTRY);
      if (raw) {
        const registry = JSON.parse(raw);
        if (registry[cleanEmail]) {
          existingProfile = registry[cleanEmail];
        }
      }
    } catch (e) {
      // ignore
    }
  }

  const isFirstTime = !existingProfile || !existingProfile.school;

  const resolvedUser: GoogleUser = {
    id: fbUser.uid,
    email: cleanEmail,
    name: existingProfile?.name || fbUser.displayName || 'Calon Kimia SPM',
    school: existingProfile?.school || '',
    state: existingProfile?.state || 'Selangor',
    avatar:
      fbUser.photoURL ||
      existingProfile?.avatar ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    isPremium: isAdmin ? true : (existingProfile?.isPremium ?? false),
    role: isAdmin ? 'admin' : 'student',
    ...(existingProfile?.redeemedCode ? { redeemedCode: existingProfile.redeemedCode } : {}),
    examAttemptsCount: existingProfile?.examAttemptsCount || 0,
    createdAt: existingProfile?.createdAt || Date.now(),
    lastLoginAt: Date.now(),
    loginCount: (existingProfile?.loginCount || 0) + 1,
    xp: existingProfile?.xp || 0,
    completedSubtopicsCount: existingProfile?.completedSubtopicsCount || 0,
    quizAccuracy: existingProfile?.quizAccuracy || 0,
    badgesCount: existingProfile?.badgesCount || 0,
    ...(existingProfile?.studyProgress ? { studyProgress: existingProfile.studyProgress } : {}),
  };

  // Restore this specific user's saved studyProgress into their scoped localStorage key
  if (existingProfile?.studyProgress) {
    saveProgress(existingProfile.studyProgress, cleanEmail);
  }

  // Sync to Nota Kimia Firestore & localStorage
  await syncUserProfile(resolvedUser);
  saveCurrentUser(resolvedUser);

  return {
    success: true,
    user: resolvedUser,
    isFirstTime,
  };
}

/**
 * Save / Update user profile in Nota Kimia Firestore (nota_kimia_users) and localStorage
 */
export async function syncUserProfile(user: GoogleUser): Promise<boolean> {
  const cleanEmail = user.email.toLowerCase().trim();
  const payload: GoogleUser = {
    ...user,
    email: cleanEmail,
    lastLoginAt: user.lastLoginAt || Date.now(),
  };

  // 1. Update localStorage registry
  saveRegisteredProfile(payload);

  // 2. Only write to Firestore if Firebase Auth session is active for owner or admin
  const fbUser = auth.currentUser;
  if (!fbUser) return false;

  const docId = payload.id || fbUser.uid;
  if (fbUser.uid !== docId && !isAdminEmail(fbUser.email || '')) {
    return false;
  }

  try {
    const userDocRef = doc(db, 'nota_kimia_users', docId);
    const cleanPayload = stripUndefined({
      ...payload,
      id: docId,
      email: cleanEmail,
      lastLoginAt: Date.now(),
    });
    await setDoc(userDocRef, cleanPayload, { merge: true });
    return true;
  } catch (err) {
    console.warn('Firestore write warning:', err);
    return false;
  }
}

/**
 * Load all registered students from Nota Kimia Firestore (synced with local storage)
 */
export async function fetchAllStudentsRemote(): Promise<GoogleUser[]> {
  let studentsMap: Record<string, GoogleUser> = {};

  // Load from local registry fallback first
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

  // Load from Nota Kimia Firestore (authoritative source when signed in)
  if (auth.currentUser) {
    try {
      const colRef = collection(db, 'nota_kimia_users');
      const snap = await getDocs(colRef);
      const remoteMap: Record<string, GoogleUser> = {};
      snap.forEach((docSnap) => {
        const data = docSnap.data() as GoogleUser;
        if (data && data.email) {
          const key = data.email.toLowerCase().trim();
          remoteMap[key] = data;
        }
      });

      studentsMap = remoteMap;
      localStorage.setItem(STORAGE_KEY_PROFILES_REGISTRY, JSON.stringify(remoteMap));
    } catch (err: any) {
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
 * Sync generated access codes to Nota Kimia Firestore
 */
export async function saveGeneratedCodeRemote(codeDoc: GeneratedAccessCode): Promise<void> {
  if (!auth.currentUser) return;
  try {
    const codeRef = doc(db, 'nota_kimia_access_codes', codeDoc.code);
    await setDoc(codeRef, stripUndefined(codeDoc), { merge: true });
  } catch (err) {
    console.warn('Firestore write code warning:', err);
  }
}

/**
 * Verify and redeem an access code remotely in Firestore across devices
 */
export async function verifyAndRedeemCodeRemote(
  rawCode: string,
  user: GoogleUser
): Promise<{ checkedRemote: boolean; allowed: boolean; message?: string; remoteDoc?: GeneratedAccessCode }> {
  const cleanCode = rawCode.trim().toUpperCase();
  if (!auth.currentUser || !cleanCode) {
    return { checkedRemote: false, allowed: true };
  }

  try {
    const codeRef = doc(db, 'nota_kimia_access_codes', cleanCode);
    const snap = await getDoc(codeRef);
    if (!snap.exists()) {
      return { checkedRemote: true, allowed: true };
    }

    const data = snap.data() as GeneratedAccessCode;
    if (data.targetEmail && data.targetEmail.toLowerCase().trim() !== user.email.toLowerCase().trim()) {
      return {
        checkedRemote: true,
        allowed: false,
        message: `Kod Akses ini dikhaskan untuk akaun Google (${data.targetEmail}). Akaun Google semasa anda (${user.email}) tidak sepadan.`,
      };
    }

    if (data.isRedeemed && data.redeemedByEmail && data.redeemedByEmail.toLowerCase().trim() !== user.email.toLowerCase().trim()) {
      const parts = data.redeemedByEmail.split('@');
      const namePart = parts[0] || '';
      const domainPart = parts[1] || 'gmail.com';
      const obfuscated =
        namePart.length > 2
          ? `${namePart[0]}***${namePart[namePart.length - 1]}@${domainPart}`
          : `*@${domainPart}`;
      return {
        checkedRemote: true,
        allowed: false,
        message: `Kod Akses Khas ini telah ditebus oleh akaun Google lain (${obfuscated}) dan tidak boleh dikongsi.`,
      };
    }

    // Mark as redeemed in Firestore if not already marked
    if (!data.isRedeemed) {
      await updateDoc(codeRef, {
        code: data.code,
        isRedeemed: true,
        redeemedByEmail: user.email.toLowerCase().trim(),
        redeemedByName: user.name,
        redeemedAt: Date.now(),
      });
    }

    return { checkedRemote: true, allowed: true, remoteDoc: data };
  } catch (err: any) {
    console.warn('Remote code check warning:', err?.code, err?.message);
    return { checkedRemote: false, allowed: true };
  }
}

/**
 * Delete a generated access code from Firestore
 */
export async function deleteGeneratedCodeRemote(code: string): Promise<void> {
  if (!auth.currentUser || !code) return;
  try {
    await deleteDoc(doc(db, 'nota_kimia_access_codes', code));
  } catch (err) {
    console.warn('Firestore delete code warning:', err);
  }
}

/**
 * Load all generated access codes from Firestore and local cache (Admin only)
 */
export async function fetchGeneratedCodesRemote(): Promise<GeneratedAccessCode[]> {
  let codesMap: Record<string, GeneratedAccessCode> = {};

  // Local fallback
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

  // Authoritative Firestore load for admin
  if (auth.currentUser) {
    try {
      const colRef = collection(db, 'nota_kimia_access_codes');
      const snap = await getDocs(colRef);
      const remoteMap: Record<string, GeneratedAccessCode> = {};
      snap.forEach((docSnap) => {
        const data = docSnap.data() as GeneratedAccessCode;
        if (data && data.code) {
          remoteMap[data.code] = data;
        }
      });
      codesMap = remoteMap;
      localStorage.setItem(STORAGE_KEY_ADMIN_CODES, JSON.stringify(Object.values(remoteMap)));
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
