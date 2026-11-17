import React from 'react';
import {
  Send,
  MessageSquareQuote,
  Sparkles,
  Heart,
  ChevronRight,
  BookOpen,
  FileText,
  ArrowUpRight,
  BookmarkCheck,
  Compass,
  Lock,
} from 'lucide-react';

interface FooterProps {
  onOpenFeedback: () => void;
  onOpenGuide?: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenFeedback, onOpenGuide, onOpenAdmin }) => {
  return (
    <footer className="bg-[#f5f5f7] border-t border-black/[0.06] pt-16 pb-14 px-4 sm:px-6 mt-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Top 3 Minimal Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Teacher Profile Card */}
          <div className="bg-white border border-black/[0.06] p-7 rounded-[24px] flex flex-col justify-between space-y-5 apple-bento-shadow">
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#0071e3]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Profil Pendidik</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-[#1d1d1f]">
                Cikgu Hafreez
              </h3>
              <p className="text-[12px] font-semibold text-[#6e6e73]">
                Guru Kimia · MRSM Bagan Datuk
              </p>
              <p className="text-[13px] text-[#424245] leading-relaxed pt-1">
                Membantu pelajar menguasai konsep amali dan teori Kimia KSSM SPM menerusi visualisasi makmal maya interaktif dan inovasi digital pendidikan.
              </p>
            </div>

            <div className="space-y-2">
              {onOpenGuide && (
                <button
                  type="button"
                  onClick={onOpenGuide}
                  className="liquid-glass-btn inline-flex items-center justify-between w-full px-4 py-2.5 rounded-full text-[#1d1d1f] hover:text-[#0071e3] text-[12px] font-semibold group cursor-pointer"
                >
                  <span className="inline-flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-[#0071e3]" />
                    Panduan Penggunaan Web App
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>
              )}

              <a
                href="https://t.me/amierulhafreez"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass-btn inline-flex items-center justify-between w-full px-4 py-2 rounded-full text-[#1d1d1f] hover:text-[#0071e3] text-[11.5px] font-semibold group"
              >
                <span className="inline-flex items-center gap-2">
                  <Send className="w-3.5 h-3.5 text-[#0088cc]" />
                  Telegram: @AmierulHafreez
                </span>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </a>

              <a
                href="https://www.erphkimia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass-btn inline-flex items-center justify-between w-full px-4 py-2 rounded-full text-indigo-900 hover:text-indigo-700 text-[11.5px] font-semibold group"
              >
                <span className="inline-flex items-center gap-1.5">
                  <BookmarkCheck className="w-3.5 h-3.5 text-indigo-600" />
                  e-RPH Kimia Pintar (www.erphkimia.com)
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>

          {/* Feedback Form Card */}
          <div className="bg-white border border-black/[0.06] p-7 rounded-[24px] flex flex-col justify-between space-y-5 apple-bento-shadow">
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-pink-600">
                <MessageSquareQuote className="w-3.5 h-3.5" />
                <span>Maklum Balas & Spreadsheet</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-[#1d1d1f]">
                Bantu Kami Tambah Baik
              </h3>
              <p className="text-[13px] text-[#424245] leading-relaxed">
                Kongsikan penilaian atau cadangan topik amali baharu. Borang boleh diisi terus secara interaktif dan data disimpan ke dalam spreadsheet.
              </p>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={onOpenFeedback}
                className="liquid-glass-dark inline-flex items-center justify-between w-full px-4 py-2.5 rounded-full text-white text-[12px] font-semibold cursor-pointer"
              >
                <span className="inline-flex items-center gap-2">
                  <MessageSquareQuote className="w-3.5 h-3.5" />
                  Isi Borang Maklum Balas
                </span>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>

              <a
                href="https://forms.gle/1CDwrQcxfck95Vb17"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full px-4 py-1.5 rounded-full text-slate-500 hover:text-slate-800 text-[11px] font-medium transition"
              >
                <span>Atau buka Google Form asal</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Official SPM References Card */}
          <div className="bg-white border border-black/[0.06] p-7 rounded-[24px] flex flex-col justify-between space-y-5 apple-bento-shadow">
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-600">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Silibus KSSM SPM</span>
              </div>
              <h3 className="font-display font-bold text-xl text-[#1d1d1f]">
                Pautan Rujukan Rasmi SPM
              </h3>
              <p className="text-[13px] text-[#424245] leading-relaxed">
                Akses pantas buku teks digital dan dokumen standard kurikulum KPM bagi rujukan sukatan amali.
              </p>
            </div>

            <div className="space-y-1.5 pt-1">
              {/* Buku Teks F4 */}
              <a
                href="https://anyflip.com/dsfoh/vsrg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#f5f5f7] hover:bg-emerald-50 hover:text-emerald-900 border border-transparent hover:border-emerald-200 transition group text-xs font-semibold text-slate-800"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>Buku Teks Kimia Tingkatan 4</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition" />
              </a>

              {/* Buku Teks F5 */}
              <a
                href="https://anyflip.com/wsjst/issq/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#f5f5f7] hover:bg-emerald-50 hover:text-emerald-900 border border-transparent hover:border-emerald-200 transition group text-xs font-semibold text-slate-800"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Buku Teks Kimia Tingkatan 5</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition" />
              </a>

              {/* DSKP Kimia */}
              <a
                href="https://anyflip.com/wufp/vujh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#f5f5f7] hover:bg-purple-50 hover:text-purple-900 border border-transparent hover:border-purple-200 transition group text-xs font-semibold text-slate-800"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-purple-600" />
                  <span>DSKP Kimia KSSM (T4 & T5)</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 transition" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 border-t border-black/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#6e6e73] font-medium">
          <p>© {new Date().getFullYear()} Simulasi Kimia Cikgu Hafreez · MRSM Bagan Datuk. Hak Cipta Terpelihara.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.erphkimia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 font-semibold transition"
            >
              www.erphkimia.com
            </a>
            <span>·</span>
            <p className="flex items-center gap-1.5">
              Dibangunkan untuk kecemerlangan Kimia SPM Malaysia <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            </p>
            {onOpenAdmin && (
              <>
                <span>·</span>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  title="Log masuk Admin untuk laporan harian"
                  className="inline-flex items-center gap-1 text-[#6e6e73] hover:text-[#1d1d1f] transition cursor-pointer"
                >
                  <Lock className="w-3 h-3" />
                  <span>Admin</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
