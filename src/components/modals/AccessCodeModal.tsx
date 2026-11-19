import React, { useState } from 'react';
import {
  X,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Send,
  MessageCircle,
  Flame,
  Layers,
  Lock,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GoogleUser } from '../../types/auth';
import { redeemAccessCode, getAdminGeneratedCodes } from '../../utils/auth';
import { syncUserProfile, saveGeneratedCodeRemote } from '../../services/firebase';

interface Props {
  isOpen: boolean;
  currentUser: GoogleUser | null;
  onClose: () => void;
  onSuccess: (updatedUser: GoogleUser) => void;
  lockedChapterTitle?: string;
  reason?: 'chapter' | 'exam' | 'manual';
}

export const AccessCodeModal: React.FC<Props> = ({
  isOpen,
  currentUser,
  onClose,
  onSuccess,
  lockedChapterTitle,
  reason = 'manual',
}) => {
  const [code, setCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !currentUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      const result = redeemAccessCode(code, currentUser);
      setIsSubmitting(false);

      if (result.success && result.user) {
        syncUserProfile(result.user).catch(() => {});
        const cleanCode = code.trim().toUpperCase();
        const redeemedCodeDoc = getAdminGeneratedCodes().find((c) => c.code.toUpperCase() === cleanCode);
        if (redeemedCodeDoc) {
          saveGeneratedCodeRemote(redeemedCodeDoc).catch(() => {});
        }
        setSuccessMsg(result.message);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        setTimeout(() => {
          onSuccess(result.user!);
          onClose();
        }, 1800);
      } else {
        setErrorMsg(result.message);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative z-10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner shrink-0">
              <KeyRound className="w-6 h-6 text-amber-100" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/25">
                VIP Access Gate
              </span>
              <h2 className="text-xl font-black tracking-tight text-white mt-1">
                Kod Akses Khas Cikgu Hafreez
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {/* Reason Notification Banner if triggered by locked chapter or exam limit */}
          {reason === 'chapter' && lockedChapterTitle && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold">{lockedChapterTitle}</span> merupakan bab dalam kategori Akses Penuh. Sila tebus Kod Akses Khas anda di bawah untuk membuka nota lengkap.
              </div>
            </div>
          )}

          {reason === 'exam' && (
            <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200 text-xs text-orange-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold">Had 2 Kali Percubaan Percuma Tamat:</span> Anda telah menggunakan kuota 2 sesi Exam Mode percuma. Tebus Kod Akses Khas untuk menikmati akses Mod Peperiksaan tanpa had!
              </div>
            </div>
          )}

          {/* User Account Binding Notice */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full border border-slate-300"
              />
              <div>
                <div className="font-bold text-slate-800 text-[11px]">{currentUser.name}</div>
                <div className="text-[10px] text-slate-500 font-mono">{currentUser.email}</div>
              </div>
            </div>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
              {currentUser.isPremium ? 'VIP Aktif' : 'Akaun Percuma'}
            </span>
          </div>

          {/* Strict 1-Account Binding Notice */}
          <div className="p-3 rounded-2xl bg-rose-50/80 border border-rose-200 text-[11px] text-rose-800 leading-relaxed">
            <span className="font-bold">⚠️ Syarat Penebusan:</span> Setiap Kod Akses Khas adalah <b>eksklusif dan unik</b>. Setelah ditebus, kod ini akan terikat secara kekal kepada akaun Google <b>{currentUser.email}</b> dan <b>tidak boleh dikongsi</b> atau dipindah milik.
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 pt-1">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                Masukkan Kod Akses Khas Anda:
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase());
                  setErrorMsg('');
                }}
                placeholder="Contoh: HAFREEZ-SPM-2026 atau NK-XXXX-XXXX"
                className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-200 focus:border-amber-500 rounded-xl text-sm font-mono font-bold text-slate-800 uppercase tracking-wider focus:outline-none transition-all placeholder:text-slate-400"
                disabled={isSubmitting || !!successMsg}
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !code.trim() || !!successMsg}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-98 text-white font-extrabold text-xs shadow-md shadow-amber-500/25 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>{isSubmitting ? 'Mengesahkan Kod...' : 'Tebus & Buka Akses Penuh'}</span>
            </button>
          </form>

          {/* How to get a code: Direct Contact Cikgu Hafreez */}
          <div className="pt-3 border-t border-slate-200/80 text-center space-y-2">
            <p className="text-[11px] text-slate-500">
              Belum mempunyai Kod Akses Khas rasmi? Hubungi terus Cikgu Hafreez:
            </p>

            <div className="flex items-center justify-center gap-2">
              <a
                href="https://wa.me/amierulhafreez?text=Salam%20Cikgu%20Hafreez,%20saya%20berminat%20untuk%20mendapatkan%20Kod%20Akses%20Khas%20Nota%20Kimia%20SPM."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 text-[11px] font-bold transition-all shadow-2xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Cikgu Hafreez</span>
              </a>

              <a
                href="https://t.me/amierulhafreez"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-300 text-[11px] font-bold transition-all shadow-2xs"
              >
                <Send className="w-3.5 h-3.5 text-[#0088cc]" />
                <span>Telegram Cikgu Hafreez</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
