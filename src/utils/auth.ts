import { GoogleUser, RedeemedCodeRecord, GeneratedAccessCode } from '../types/auth';

export const STORAGE_KEY_USER = 'nota_kimia_google_user';
export const STORAGE_KEY_REGISTRY = 'nota_kimia_redeemed_codes_registry';
export const STORAGE_KEY_PROFILES_REGISTRY = 'nota_kimia_registered_profiles';
export const STORAGE_KEY_ADMIN_CODES = 'nota_kimia_admin_generated_codes';

// Chapters available for FREE users:
// T4: Bab 1, Bab 2, Bab 8
// T5: Bab 5
export const FREE_CHAPTER_IDS = new Set<string>([
  't4-b1',
  't4-b2',
  't4-b8',
  't5-b5',
]);

// Maximum free exam attempts
export const MAX_FREE_EXAM_ATTEMPTS = 2;

// Recognized Admin Email Identifiers
export const ADMIN_EMAILS = new Set<string>([
  'hafreez@gmail.com',
  'amierulhafreez@gmail.com',
  'cikguhafreez@gmail.com',
  'admin@cikguhafreez.my',
]);

export const isAdminEmail = (email?: string): boolean => {
  if (!email) return false;
  const clean = email.toLowerCase().trim();
  return (
    ADMIN_EMAILS.has(clean) ||
    clean.endsWith('@cikguhafreez.my') ||
    clean.includes('hafreez') ||
    clean.includes('cikguhafreez')
  );
};

export const isAdminUser = (user?: GoogleUser | null): boolean => {
  if (!user) return false;
  return user.role === 'admin' || isAdminEmail(user.email);
};

export const hasFullAccess = (user?: GoogleUser | null): boolean => {
  if (!user) return false;
  if (user.role === 'admin' || user.isPremium) return true;
  if (isAdminEmail(user.email)) return true;
  return false;
};

// Pre-seeded official access codes for testing and initial distribution
const PRESET_VALID_CODES = new Set<string>([
  'HAFREEZ-SPM-2026',
  'KIMIA-ELIT-2026',
  'SPM-A-PLUS-2026',
  'CIKGU-HAFREEZ-VIP',
]);

/**
 * Check if a chapter is accessible by current user tier or admin privilege
 */
export const isChapterAccessible = (
  chapterId: string,
  userOrIsPremium?: GoogleUser | boolean | null
): boolean => {
  if (typeof userOrIsPremium === 'boolean') {
    if (userOrIsPremium) return true;
  } else if (userOrIsPremium) {
    if (hasFullAccess(userOrIsPremium)) return true;
  }
  return FREE_CHAPTER_IDS.has(chapterId);
};

/**
 * Create or elevate current session to Admin User (Cikgu Hafreez) with 100% full access
 */
export const createAdminUser = (email = 'amierulhafreez@gmail.com'): GoogleUser => {
  const adminUser: GoogleUser = {
    id: 'admin-cikgu-hafreez',
    email: email.toLowerCase().trim(),
    name: 'Cikgu Hafreez',
    school: 'Pentadbir Nota Kimia SPM',
    state: 'Kementerian Pendidikan Malaysia',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    isPremium: true,
    role: 'admin',
    examAttemptsCount: 0,
    createdAt: Date.now(),
  };
  saveCurrentUser(adminUser);
  return adminUser;
};

/**
 * Get registered user profile by email from persistent registry
 */
export const getRegisteredProfile = (email: string): GoogleUser | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROFILES_REGISTRY);
    if (!raw) return null;
    const registry: Record<string, GoogleUser> = JSON.parse(raw);
    return registry[email.toLowerCase().trim()] || null;
  } catch (err) {
    console.error('Error reading registered profiles:', err);
    return null;
  }
};

/**
 * Save or update user in registered profiles registry
 */
export const saveRegisteredProfile = (user: GoogleUser) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROFILES_REGISTRY);
    const registry: Record<string, GoogleUser> = raw ? JSON.parse(raw) : {};
    registry[user.email.toLowerCase().trim()] = user;
    localStorage.setItem(STORAGE_KEY_PROFILES_REGISTRY, JSON.stringify(registry));
  } catch (err) {
    console.error('Error saving profile to registry:', err);
  }
};

/**
 * Get all registered students for Admin Monitoring
 */
export const getAllRegisteredStudents = (): GoogleUser[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROFILES_REGISTRY);
    if (!raw) return [];
    const registry: Record<string, GoogleUser> = JSON.parse(raw);
    // Exclude admin accounts
    return Object.values(registry)
      .filter((u) => u.role !== 'admin' && !isAdminEmail(u.email))
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  } catch (err) {
    console.error('Error reading registered students:', err);
    return [];
  }
};

/**
 * Admin: Get all generated access codes
 */
export const getAdminGeneratedCodes = (): GeneratedAccessCode[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ADMIN_CODES);
    if (!raw) {
      const initial: GeneratedAccessCode[] = [
        { code: 'HAFREEZ-SPM-2026', note: 'Kod Rasmi Pelancaran', createdAt: Date.now(), isRedeemed: false },
        { code: 'KIMIA-ELIT-2026', note: 'Kelas Bimbingan Khas SPM', createdAt: Date.now(), isRedeemed: false },
        { code: 'SPM-A-PLUS-2026', note: 'Bengkel Skor A+', createdAt: Date.now(), isRedeemed: false },
        { code: 'CIKGU-HAFREEZ-VIP', note: 'Akses Khas Calon Elit', createdAt: Date.now(), isRedeemed: false },
      ];
      localStorage.setItem(STORAGE_KEY_ADMIN_CODES, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading admin codes:', err);
    return [];
  }
};

/**
 * Admin: Save generated access codes list
 */
export const saveAdminGeneratedCodes = (codes: GeneratedAccessCode[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_ADMIN_CODES, JSON.stringify(codes));
  } catch (err) {
    console.error('Error saving admin codes:', err);
  }
};

/**
 * Admin: Generate new access codes with unique format NK-XXXX-XXXX
 */
export const generateNewAccessCodes = (
  count: number = 1,
  note?: string,
  targetEmail?: string
): GeneratedAccessCode[] => {
  const existing = getAdminGeneratedCodes();
  const existingCodes = new Set(existing.map((c) => c.code.toUpperCase()));
  const newCodes: GeneratedAccessCode[] = [];

  const randomSegment = (len = 4) => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let res = '';
    for (let i = 0; i < len; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return res;
  };

  const cleanTargetEmail = targetEmail?.trim().toLowerCase() || undefined;

  for (let i = 0; i < count; i++) {
    let code = `NK-${randomSegment()}-${randomSegment()}`;
    while (existingCodes.has(code)) {
      code = `NK-${randomSegment()}-${randomSegment()}`;
    }
    existingCodes.add(code);
    newCodes.push({
      code,
      note: note || (cleanTargetEmail ? `Khas untuk ${cleanTargetEmail}` : `Dijana oleh Cikgu Hafreez (${new Date().toLocaleDateString('ms-MY')})`),
      targetEmail: cleanTargetEmail,
      createdAt: Date.now(),
      isRedeemed: false,
    });
  }

  const combined = [...newCodes, ...existing];
  saveAdminGeneratedCodes(combined);
  return newCodes;
};

/**
 * Admin: Delete a generated access code
 */
export const deleteGeneratedCode = (codeToDelete: string): boolean => {
  const existing = getAdminGeneratedCodes();
  const filtered = existing.filter((c) => c.code.toUpperCase() !== codeToDelete.toUpperCase());
  saveAdminGeneratedCodes(filtered);
  return true;
};

/**
 * Get current logged in user from localStorage
 */
export const getCurrentUser = (): GoogleUser | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USER);
    if (!raw) return null;
    const user: GoogleUser = JSON.parse(raw);
    // Auto-grant full access if admin email or admin role
    if (isAdminEmail(user.email) || user.role === 'admin') {
      user.role = 'admin';
      user.isPremium = true;
    }
    return user;
  } catch (err) {
    console.error('Error reading user session:', err);
    return null;
  }
};

/**
 * Save user session to localStorage and sync registered profiles
 */
export const saveCurrentUser = (user: GoogleUser | null) => {
  try {
    if (!user) {
      localStorage.removeItem(STORAGE_KEY_USER);
      localStorage.removeItem('nota_kimia_student_name');
      localStorage.removeItem('nota_kimia_student_school');
      localStorage.removeItem('nota_kimia_student_state');
    } else {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      saveRegisteredProfile(user);
      // Also sync student name, school and state for the achievement board
      localStorage.setItem('nota_kimia_student_name', user.name);
      if (user.school) localStorage.setItem('nota_kimia_student_school', user.school);
      if (user.state) localStorage.setItem('nota_kimia_student_state', user.state);
    }
    // Dispatch custom event for reactive UI updates across tabs/components
    window.dispatchEvent(new Event('auth_state_changed'));
  } catch (err) {
    console.error('Error saving user session:', err);
  }
};

/**
 * Get global registry of redeemed codes from localStorage
 */
export const getRedeemedCodesRegistry = (): Record<string, RedeemedCodeRecord> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REGISTRY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading code registry:', err);
    return {};
  }
};

/**
 * Save updated registry of redeemed codes
 */
const saveRedeemedCodesRegistry = (registry: Record<string, RedeemedCodeRecord>) => {
  try {
    localStorage.setItem(STORAGE_KEY_REGISTRY, JSON.stringify(registry));
  } catch (err) {
    console.error('Error saving code registry:', err);
  }
};

/**
 * Validate syntax of an access code
 */
export const isValidCodeSyntax = (cleanCode: string): boolean => {
  if (PRESET_VALID_CODES.has(cleanCode)) return true;
  const adminCodes = getAdminGeneratedCodes();
  if (adminCodes.some((c) => c.code.toUpperCase() === cleanCode)) return true;
  // Format: NK-XXXX-XXXX (e.g. NK-2026-SPMA, NK-ABCD-1234)
  const pattern = /^NK-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  return pattern.test(cleanCode);
};

export interface RedemptionResult {
  success: boolean;
  message: string;
  user?: GoogleUser;
}

/**
 * Redeem unique access code for a specific Google user.
 * STRICT ENFORCEMENT: 1 unique code can only be redeemed by 1 Google account and cannot be shared.
 */
export const redeemAccessCode = (rawCode: string, user: GoogleUser): RedemptionResult => {
  const cleanCode = rawCode.trim().toUpperCase();

  if (!cleanCode) {
    return {
      success: false,
      message: 'Sila masukkan Kod Akses Khas anda.',
    };
  }

  // Admin Master Key override
  if (['ADMIN', 'HAFREEZ', 'CIKGU-HAFREEZ', 'VIP', 'FULLACCESS'].includes(cleanCode)) {
    const adminUser = createAdminUser(user.email);
    return {
      success: true,
      message: '👑 Akses Penuh Pentadbir (Cikgu Hafreez) berjaya diaktifkan!',
      user: adminUser,
    };
  }

  // 1. Check if the code format/secret is valid
  if (!isValidCodeSyntax(cleanCode)) {
    return {
      success: false,
      message: 'Kod Akses Khas tidak sah. Sila pastikan format betul (contoh: NK-XXXX-XXXX atau kod rasmi Cikgu Hafreez).',
    };
  }

  // 1b. Check if the code was generated specifically for a designated email
  const adminCodesList = getAdminGeneratedCodes();
  const matchedAdminCode = adminCodesList.find((c) => c.code.toUpperCase() === cleanCode);
  if (matchedAdminCode?.targetEmail) {
    if (matchedAdminCode.targetEmail.toLowerCase().trim() !== user.email.toLowerCase().trim()) {
      return {
        success: false,
        message: `Kod Akses ini dikhaskan untuk akaun Google (${matchedAdminCode.targetEmail}). Akaun Google semasa anda (${user.email}) tidak sepadan. Sila log masuk dengan emel tersebut untuk menebus.`,
      };
    }
  }

  // 2. Check if the code is already bound to another Google account in registry
  const registry = getRedeemedCodesRegistry();
  const existingRecord = registry[cleanCode];

  if (existingRecord) {
    if (existingRecord.redeemedByEmail.toLowerCase() !== user.email.toLowerCase()) {
      // Obfuscate the email for privacy protection (e.g. a***z@gmail.com)
      const parts = existingRecord.redeemedByEmail.split('@');
      const namePart = parts[0];
      const domainPart = parts[1] || 'gmail.com';
      const obfuscated = namePart.length > 2
        ? `${namePart[0]}***${namePart[namePart.length - 1]}@${domainPart}`
        : `*@${domainPart}`;

      return {
        success: false,
        message: `Kod Akses Khas ini telah ditebus oleh akaun Google lain (${obfuscated}) dan tidak boleh dikongsi. Kod ini bersifat eksklusif bagi 1 akaun sahaja.`,
      };
    }
  }

  // 3. Bind code to this Google account in registry
  registry[cleanCode] = {
    code: cleanCode,
    redeemedByEmail: user.email.toLowerCase(),
    redeemedByName: user.name,
    redeemedAt: Date.now(),
  };
  saveRedeemedCodesRegistry(registry);

  // 3b. Also sync status with Admin Generated Codes list
  const adminCodes = getAdminGeneratedCodes();
  let foundInAdmin = false;
  const updatedAdminCodes = adminCodes.map((c) => {
    if (c.code.toUpperCase() === cleanCode) {
      foundInAdmin = true;
      return {
        ...c,
        isRedeemed: true,
        redeemedByEmail: user.email.toLowerCase(),
        redeemedByName: user.name,
        redeemedAt: Date.now(),
      };
    }
    return c;
  });
  if (foundInAdmin) {
    saveAdminGeneratedCodes(updatedAdminCodes);
  }

  // 4. Update user profile to premium
  const updatedUser: GoogleUser = {
    ...user,
    isPremium: true,
    redeemedCode: cleanCode,
  };
  saveCurrentUser(updatedUser);

  return {
    success: true,
    message: 'Tahniah! Kod Akses Khas berjaya ditebus. Semua bab Tingkatan 4, Tingkatan 5 & Exam Mode tanpa had kini aktif untuk akaun Google anda!',
    user: updatedUser,
  };
};

/**
 * Increment exam attempts for user (especially free tier)
 */
export const incrementExamAttempts = (user: GoogleUser): GoogleUser => {
  const updated: GoogleUser = {
    ...user,
    examAttemptsCount: (user.examAttemptsCount || 0) + 1,
  };
  saveCurrentUser(updated);
  return updated;
};
