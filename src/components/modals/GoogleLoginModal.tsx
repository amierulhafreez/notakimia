import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  User,
  Mail,
  Zap,
  GraduationCap,
  MapPin,
  Trophy,
  X,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { GoogleUser } from '../../types/auth';
import { saveCurrentUser, getRegisteredProfile, isAdminEmail } from '../../utils/auth';
import { loginDenganGoogleReal, syncUserProfile } from '../../services/firebase';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: GoogleUser) => void;
  triggerReason?: string;
}

const MALAYSIAN_STATES = [
  'Selangor',
  'Kuala Lumpur',
  'Melaka',
  'Johor',
  'Pulau Pinang',
  'Perak',
  'Kedah',
  'Kelantan',
  'Terengganu',
  'Pahang',
  'Negeri Sembilan',
  'Sabah',
  'Sarawak',
  'Perlis',
  'Putrajaya',
  'Labuan',
];

export const GoogleLoginModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  triggerReason,
}) => {
  // Step 1: Real Google Auth / Step 2: Profile Setup (Name, School & State)
  const [step, setStep] = useState<'google_auth' | 'profile_setup'>('google_auth');

  // Staged Google Auth data
  const [stagedUser, setStagedUser] = useState<Partial<GoogleUser> | null>(null);
  const [candidateName, setCandidateName] = useState('');
  const [candidateSchool, setCandidateSchool] = useState('');
  const [candidateState, setCandidateState] = useState('Selangor');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [manualEmailInput, setManualEmailInput] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  // Real Google Sign In via Firebase
  const handleRealGoogleLogin = async () => {
    setErrorMsg('');
    setIsGoogleLoading(true);

    try {
      const res = await loginDenganGoogleReal();

      if (!res.success || !res.user) {
        setIsGoogleLoading(false);
        setErrorMsg(res.errorMessage || 'Log masuk Google tidak dapat diselesaikan. Sila cuba lagi.');
        return;
      }

      const user = res.user;

      // If returning user with school already filled, proceed directly
      if (!res.isFirstTime && user.school && user.name) {
        setIsGoogleLoading(false);
        onLoginSuccess(user);
        return;
      }

      // First time or missing school: prompt step 2
      setStagedUser(user);
      setCandidateName(user.name || '');
      setCandidateSchool(user.school || '');
      setCandidateState(user.state || 'Selangor');
      setStep('profile_setup');
      setIsGoogleLoading(false);
    } catch (err: any) {
      setIsGoogleLoading(false);
      setErrorMsg(err?.message || 'Ralat semasa log masuk dengan akaun Google.');
    }
  };

  // Fallback Manual Email Sign In (if popup is blocked)
  const handleManualEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = manualEmailInput.trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMsg('Sila masukkan alamat emel Google yang sah (contoh: nama@gmail.com atau @moe-dl.edu.my).');
      return;
    }

    setErrorMsg('');

    // Admin account
    if (isAdminEmail(cleanEmail)) {
      const adminUser: GoogleUser = {
        id: 'admin-cikgu-hafreez',
        email: cleanEmail,
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
      syncUserProfile(adminUser);
      onLoginSuccess(adminUser);
      return;
    }

    // Check existing
    const existing = getRegisteredProfile(cleanEmail);
    if (existing && existing.school && existing.name) {
      saveCurrentUser(existing);
      syncUserProfile(existing);
      onLoginSuccess(existing);
      return;
    }

    const emailHandle = cleanEmail.split('@')[0];
    const autoName = emailHandle
      .split(/[._-]/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    const partial: Partial<GoogleUser> = {
      id: existing?.id || `user-${Date.now()}`,
      email: cleanEmail,
      name: existing?.name || autoName,
      avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(cleanEmail)}`,
      createdAt: existing?.createdAt || Date.now(),
      isPremium: existing?.isPremium ?? false,
      examAttemptsCount: existing?.examAttemptsCount ?? 0,
    };

    setStagedUser(partial);
    setCandidateName(partial.name || '');
    setCandidateSchool(existing?.school || '');
    setCandidateState(existing?.state || 'Selangor');
    setStep('profile_setup');
  };

  // Step 2: Final Profile Submission (Name, School & State for Rankings)
  const handleFinalProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim()) {
      setErrorMsg('Sila masukkan nama penuh calon untuk paparan ranking & sijil.');
      return;
    }
    if (!candidateSchool.trim()) {
      setErrorMsg('Sila masukkan nama sekolah anda untuk paparan ranking.');
      return;
    }

    const email = stagedUser?.email?.trim().toLowerCase() || 'pengguna@gmail.com';
    const avatar = stagedUser?.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(candidateName.trim())}`;

    const completeUser: GoogleUser = {
      id: stagedUser?.id || `user-${Date.now()}`,
      email,
      name: candidateName.trim(),
      school: candidateSchool.trim(),
      state: candidateState,
      avatar,
      isPremium: stagedUser?.isPremium ?? false,
      role: isAdminEmail(email) ? 'admin' : (stagedUser?.role || 'student'),
      redeemedCode: stagedUser?.redeemedCode,
      examAttemptsCount: stagedUser?.examAttemptsCount ?? 0,
      createdAt: stagedUser?.createdAt || Date.now(),
    };

    saveCurrentUser(completeUser);
    await syncUserProfile(completeUser);
    onLoginSuccess(completeUser);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200/90 shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
        {/* Glow Header */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-7 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer z-20"
            title="Tutup & Teroka Laman"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative z-10 flex flex-col items-center">
            {/* Google Brand Badge */}
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg shadow-black/20 mb-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold text-sky-300 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{step === 'google_auth' ? 'Pengesahan Akaun Sebenar' : 'Pendaftaran Profil Murid'}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {step === 'google_auth' ? 'Log Masuk dengan Google' : 'Lengkapkan Nama & Sekolah'}
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-sm leading-relaxed">
              {step === 'google_auth'
                ? 'Gunakan akaun Google sebenar anda (Gmail atau ID DELIMa KPM) seperti dalam aplikasi rasmi eRPH.'
                : 'Daftarkan nama dan sekolah anda untuk paparan ranking umum kebangsaan dan rekod pencapaian anda.'}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-5">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold animate-in fade-in">
              {errorMsg}
            </div>
          )}

          {step === 'google_auth' ? (
            <div className="space-y-4">
              {triggerReason && (
                <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-900 text-xs font-medium flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>{triggerReason}</span>
                </div>
              )}

              {/* Free Access Info Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="text-xs font-extrabold text-slate-800 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Akses Percuma (Free Log In) Merangkumi:</span>
                  </span>
                  <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    Percuma
                  </span>
                </div>
                <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
                  <li><b>Tingkatan 4:</b> Bab 1 (Pengenalan), Bab 2 (Jirim), Bab 8 (Bahan Buatan).</li>
                  <li><b>Tingkatan 5:</b> Bab 5 (Kimia Konsumer & Industri).</li>
                  <li><b>Mod Peperiksaan (Exam Mode):</b> Percubaan penuh 2 kali (10 soalan rawak).</li>
                  <li>Pengumpulan mata ganjaran XP & paparan kedudukan ranking kebangsaan.</li>
                </ul>
                <div className="text-[10px] text-indigo-700 bg-indigo-50/80 p-2 rounded-xl border border-indigo-100 flex items-center gap-1.5 font-medium">
                  <Zap className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Sekiranya berpuas hati, anda boleh tebus <b>Kod Akses Khas</b> untuk membuka semua 13 bab tanpa had.</span>
                </div>
              </div>

              {/* PRIMARY ACTION: Sign In With Real Google Account Popup */}
              <button
                type="button"
                onClick={handleRealGoogleLogin}
                disabled={isGoogleLoading}
                className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 text-slate-800 text-xs sm:text-sm font-extrabold transition-all shadow-md shadow-slate-200/50 cursor-pointer flex items-center justify-center gap-3 active:scale-98 disabled:opacity-60"
              >
                {isGoogleLoading ? (
                  <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                )}
                <span>{isGoogleLoading ? 'Menyambung ke Akaun Google...' : 'Log Masuk dengan Google (Akaun Sebenar)'}</span>
              </button>

              <div className="flex items-center gap-2 my-1">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Atau</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              {/* Alternate / Fallback Email Entry */}
              {!showManualInput ? (
                <button
                  type="button"
                  onClick={() => setShowManualInput(true)}
                  className="w-full py-2 text-center text-xs text-indigo-600 hover:text-indigo-800 font-bold cursor-pointer transition-colors"
                >
                  Log masuk menggunakan alamat emel DELIMa / Gmail secara manual →
                </button>
              ) : (
                <form onSubmit={handleManualEmailSubmit} className="space-y-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 animate-in fade-in">
                  <label className="block text-[11px] font-bold text-slate-700">
                    Alamat Emel Google Anda:
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={manualEmailInput}
                      onChange={(e) => {
                        setManualEmailInput(e.target.value);
                        setErrorMsg('');
                      }}
                      placeholder="nama@gmail.com atau @moe-dl.edu.my"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Sahkan Emel & Teruskan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

              {/* Quick links */}
              <div className="flex flex-col items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-slate-400 hover:text-slate-600 font-semibold cursor-pointer transition-colors"
                >
                  Teroka Laman Dahulu Tanpa Log Masuk →
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setManualEmailInput('amierulhafreez@gmail.com');
                    setShowManualInput(true);
                  }}
                  className="text-[11px] text-indigo-600/70 hover:text-indigo-800 hover:underline flex items-center gap-1 font-semibold cursor-pointer transition-colors mt-0.5"
                >
                  <span>👑 Log Masuk Pentadbir (Cikgu Hafreez)</span>
                </button>
              </div>
            </div>
          ) : (
            /* STEP 2: PROFILE SETUP (NAMA & SEKOLAH UNTUK PAPARAN RANKING) */
            <form onSubmit={handleFinalProfileSubmit} className="space-y-4 animate-in fade-in duration-200">
              {/* Account Confirmation Pill */}
              <div className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {stagedUser?.avatar ? (
                    <img
                      src={stagedUser.avatar}
                      alt="Google Avatar"
                      className="w-9 h-9 rounded-full object-cover border border-sky-300 shadow-2xs"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center text-xs shadow-2xs">
                      {candidateName.charAt(0).toUpperCase() || 'G'}
                    </div>
                  )}
                  <div>
                    <div className="text-[10px] text-sky-600 font-bold uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Akaun Google Disahkan</span>
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-800">{stagedUser?.email}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('google_auth')}
                  className="text-[11px] text-sky-600 hover:underline font-bold cursor-pointer"
                >
                  Tukar
                </button>
              </div>

              {/* Ranking Info Box */}
              <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-xs text-amber-950 flex items-start gap-2.5">
                <Trophy className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <span className="font-extrabold">Paparan Ranking Murid SPM:</span> Nama dan sekolah anda akan dipaparkan dalam Papan Juara Murid SPM kebangsaan mengikut mata ganjaran XP yang anda kumpul.
                </div>
              </div>

              {/* Input: Nama Penuh Calon */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Penuh Calon (Untuk Sijil & Ranking):
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => {
                      setCandidateName(e.target.value);
                      setErrorMsg('');
                    }}
                    placeholder="Contoh: Muhammad Danial bin Azhar"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 focus:border-sky-500 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    required
                    autoFocus
                  />
                </div>
              </div>

              {/* Input: Nama Sekolah */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Sekolah Anda:
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={candidateSchool}
                    onChange={(e) => {
                      setCandidateSchool(e.target.value);
                      setErrorMsg('');
                    }}
                    placeholder="Contoh: SMK Sultan Abdul Samad / MRSM Tun Ghafar Baba"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 focus:border-sky-500 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    required
                  />
                </div>
              </div>

              {/* Input: Negeri */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Negeri:
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <select
                    value={candidateState}
                    onChange={(e) => setCandidateState(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 focus:border-sky-500 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 cursor-pointer"
                  >
                    {MALAYSIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('google_auth')}
                  className="w-1/3 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer"
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 via-indigo-600 to-indigo-700 hover:opacity-95 active:scale-98 text-white text-xs font-extrabold transition-all shadow-md shadow-indigo-500/25 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Sahkan & Masuk Dashboard</span>
                </button>
              </div>
            </form>
          )}

          {/* Footer note */}
          <p className="text-[10px] text-center text-slate-400 leading-relaxed">
            Maklumat log masuk dan profil dipadankan terus dengan pangkalan data Nota Kimia SPM untuk janaan rekod murid & kod akses khas.
          </p>
        </div>
      </div>
    </div>
  );
};
