import React from 'react';
import {
  Sparkles,
  ArrowUpRight,
  FileCheck2,
  BookOpenCheck,
  Layers,
  Printer,
  ShieldCheck,
  Send,
  Zap,
} from 'lucide-react';

export const TeacherErphSection: React.FC = () => {
  return (
    <section
      id="ruangan-guru-erph"
      aria-label="Ruangan khas guru kimia"
      className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-[#0f172a] to-indigo-950 text-white p-7 sm:p-11 shadow-xl border border-white/10"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-7">
        {/* Top Tag & Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-[11px] font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Ruangan Khas Guru Kimia Malaysia</span>
          </div>

          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white leading-tight">
            Rancang PdPc Kimia Lebih Pantas & Sistematik dengan{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              e-RPH Kimia KSSM Pintar
            </span>
          </h2>

          <p className="text-sm sm:text-[15px] text-slate-300 max-w-2xl leading-relaxed">
            Aplikasi pengurusan persediaan mengajar digital yang dibangunkan khas oleh <strong>Cikgu Hafreez</strong> untuk
            guru-guru Kimia sekolah menengah & MRSM. Menjimatkan masa persediaan mengajar dengan pemetaan DSKP automatik.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm space-y-2 hover:bg-white/10 transition">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center">
              <BookOpenCheck className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white">DSKP Kimia Terbina</h4>
            <p className="text-[11px] text-slate-300 leading-normal">
              Pangkalan data lengkap DSKP Kimia Tingkatan 4 & 5 (SK, SP, dan Standard Prestasi).
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm space-y-2 hover:bg-white/10 transition">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white">Objektif & Kriteria Auto</h4>
            <p className="text-[11px] text-slate-300 leading-normal">
              Jana objektif pembelajaran dan kriteria kejayaan pintar selaras aktiviti PAK21.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm space-y-2 hover:bg-white/10 transition">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white">Sokongan Multi-SP</h4>
            <p className="text-[11px] text-slate-300 leading-normal">
              Gabungkan beberapa standard pembelajaran dalam satu sesi pengajaran amali.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm space-y-2 hover:bg-white/10 transition">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
              <Printer className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white">Eksport PDF 1-Klik</h4>
            <p className="text-[11px] text-slate-300 leading-normal">
              Format cetakan kemas standard KPM, sedia untuk penghantaran mingguan pentadbir.
            </p>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 border-t border-white/10">
          <a
            href="https://www.erphkimia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass-blue inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-white font-bold text-xs sm:text-[13px] cursor-pointer"
          >
            <span>Cuba e-RPH Kimia Sekarang</span>
            <span className="text-[11px] font-mono opacity-85">(www.erphkimia.com)</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <a
            href="https://t.me/amierulhafreez"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass-dark inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-white font-semibold text-xs cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-blue-300" />
            <span>Tanya Cikgu Hafreez (Telegram)</span>
          </a>

          <div className="sm:ml-auto flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Khas untuk Guru Kimia Malaysia</span>
          </div>
        </div>
      </div>
    </section>
  );
};
