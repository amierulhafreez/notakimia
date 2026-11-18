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
  collection,
  getDocs,
  query,
  orderBy,
  limit,
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
        errorMessage: 'Pelayar anda menyekat tetingkap popup Google. Sila benarkan tetingkap timbul (pop-up) untuk meneruskan log masuk.',
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

  // Check if profile exists in Firestore
  let existingProfile: Partial<GoogleUser> | null = null;
  try {
    const userDocRef = doc(db, 'nota_kimia_users', fbUser.uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      existingProfile = snap.data() as Partial<GoogleUser>;
    }
  } catch (firestoreErr) {
    console.warn('Firestore read error (offline/permission):', firestoreErr);
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
    avatar: fbUser.photoURL || existingProfile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    isPremium: isAdmin ? true : (existingProfile?.isPremium ?? false),
    role: isAdmin ? 'admin' : 'student',
    redeemedCode: existingProfile?.redeemedCode,
    examAttemptsCount: existingProfile?.examAttemptsCount || 0,
    createdAt: existingProfile?.createdAt || Date.now(),
  };

  // Sync to Firestore & localStorage
  await syncUserProfile(resolvedUser);
  saveCurrentUser(resolvedUser);

  return {
    success: true,
    user: resolvedUser,
    isFirstTime,
  };
}

/**
 * Save / Update user profile in Firestore and localStorage
 */
export async function syncUserProfile(user: GoogleUser): Promise<void> {
  // 1. Update localStorage registry
  saveRegisteredProfile(user);

  // 2. Update Firestore
  try {
    const userDocRef = doc(db, 'nota_kimia_users', user.id);
    await setDoc(userDocRef, {
      ...user,
      lastLoginAt: Date.now(),
    }, { merge: true });
  } catch (err) {
    console.warn('Firestore write warning:', err);
  }
}

/**
 * Load all registered students from Firestore (synced with local storage)
 */
export async function fetchAllStudentsRemote(): Promise<GoogleUser[]> {
  const studentsMap: Record<string, GoogleUser> = {};

  // Load from local registry first
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

  // Load from Firestore
  try {
    const colRef = collection(db, 'nota_kimia_users');
    const snap = await getDocs(colRef);
    snap.forEach((docSnap) => {
      const data = docSnap.data() as GoogleUser;
      if (data && data.email) {
        studentsMap[data.email.toLowerCase().trim()] = {
          ...studentsMap[data.email.toLowerCase().trim()],
          ...data,
        };
      }
    });

    // Update local cache
    localStorage.setItem(STORAGE_KEY_PROFILES_REGISTRY, JSON.stringify(studentsMap));
  } catch (err) {
    console.warn('Firestore fetch students warning:', err);
  }

  return Object.values(studentsMap)
    .filter((u) => u.role !== 'admin' && !isAdminEmail(u.email))
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

/**
 * Sync access codes to Firestore
 */
export async function saveGeneratedCodeRemote(codeDoc: GeneratedAccessCode): Promise<void> {
  try {
    const codeRef = doc(db, 'nota_kimia_access_codes', codeDoc.code);
    await setDoc(codeRef, codeDoc, { merge: true });
  } catch (err) {
    console.warn('Firestore write code warning:', err);
  }
}

/**
 * Load all generated access codes from Firestore and local cache
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

  // Firestore
  try {
    const colRef = collection(db, 'nota_kimia_access_codes');
    const snap = await getDocs(colRef);
    snap.forEach((docSnap) => {
      const data = docSnap.data() as GeneratedAccessCode;
      if (data && data.code) {
        codesMap[data.code] = {
          ...codesMap[data.code],
          ...data,
        };
      }
    });
    localStorage.setItem(STORAGE_KEY_ADMIN_CODES, JSON.stringify(Object.values(codesMap)));
  } catch (err) {
    console.warn('Firestore fetch codes warning:', err);
  }

  return Object.values(codesMap).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
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
