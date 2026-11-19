import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  KeyRound,
  Users,
  Sparkles,
  Copy,
  Check,
  Plus,
  Trash2,
  Search,
  Filter,
  GraduationCap,
  MapPin,
  Mail,
  CheckCircle2,
  Clock,
  MessageCircle,
  Award,
  Zap,
  ArrowRight,
  Download,
  RefreshCw,
} from 'lucide-react';
import { GoogleUser, GeneratedAccessCode } from '../../types/auth';
import {
  getAdminGeneratedCodes,
  generateNewAccessCodes,
  deleteGeneratedCode,
  getAllRegisteredStudents,
  isAdminEmail,
} from '../../utils/auth';
import {
  fetchAllStudentsRemote,
  fetchGeneratedCodesRemote,
  saveGeneratedCodeRemote,
  subscribeAuthState,
  auth,
} from '../../services/firebase';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentUser: GoogleUser | null;
}

export const AdminDashboardModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentUser,
}) => {
  const [activeTab, setActiveTab] = useState<'generator' | 'students'>('generator');

  // Generator State
  const [codes, setCodes] = useState<GeneratedAccessCode[]>([]);
  const [generateCount, setGenerateCount] = useState<number>(1);
  const [generateNote, setGenerateNote] = useState<string>('');
  const [targetEmail, setTargetEmail] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [copiedMsgCode, setCopiedMsgCode] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [allEmailsCopied, setAllEmailsCopied] = useState(false);
  const [codeFilter, setCodeFilter] = useState<'all' | 'available' | 'redeemed'>('all');
  const [searchCodeQuery, setSearchCodeQuery] = useState('');

  // Students Monitoring State
  const [students, setStudents] = useState<GoogleUser[]>([]);
  const [searchStudentQuery, setSearchStudentQuery] = useState('');
  const [filterTier, setFilterTier] = useState<'all' | 'premium' | 'free'>('all');
  const [filterState, setFilterState] = useState<string>('all');
  const [isLoadingRemote, setIsLoadingRemote] = useState(false);

  const refreshData = async () => {
    // 1. Instant local load
    setCodes(getAdminGeneratedCodes());
    setStudents(getAllRegisteredStudents());

    // 2. Remote Firestore sync
    setIsLoadingRemote(true);
    try {
      const [remoteStudents, remoteCodes] = await Promise.all([
        fetchAllStudentsRemote(),
        fetchGeneratedCodesRemote(),
      ]);
      if (remoteStudents && remoteStudents.length > 0) {
        setStudents(remoteStudents);
      }
      if (remoteCodes && remoteCodes.length > 0) {
        setCodes(remoteCodes);
      }
    } catch (err) {
      console.warn('Sync error:', err);
    } finally {
      setIsLoadingRemote(false);
    }
  };

  useEffect(() => {
    if (!isOpen || !currentUser || !isAdminEmail(currentUser.email)) return;
    refreshData();
    const unsub = subscribeAuthState((fbUser) => {
      if (fbUser) {
        refreshData();
      }
    });
    return () => unsub();
  }, [isOpen, currentUser]);

  if (!isOpen) return null;
  if (!currentUser || !isAdminEmail(currentUser.email)) return null;

  // Handle Generate Codes
  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const newCodes = generateNewAccessCodes(
      generateCount,
      generateNote.trim() || undefined,
      targetEmail.trim() || undefined
    );

    // Update UI immediately
    setCodes(getAdminGeneratedCodes());
    setGenerateNote('');
    setTargetEmail('');

    // Non-blocking sync to Firestore
    newCodes.forEach((c) => {
      saveGeneratedCodeRemote(c).catch(() => {});
    });
  };

  // Handle Quick Pre-fill from Student List to Generator
  const handleAssignCodeForStudent = (student: GoogleUser) => {
    setTargetEmail(student.email);
    setGenerateNote(`Khas untuk ${student.name} (${student.school || 'SPM'})`);
    setGenerateCount(1);
    setActiveTab('generator');
  };

  // Handle Delete Code
  const handleDeleteCode = (codeToDelete: string) => {
    if (window.confirm(`Adakah anda pasti ingin memadamkan kod ${codeToDelete}?`)) {
      deleteGeneratedCode(codeToDelete);
      refreshData();
    }
  };

  // Copy Code to Clipboard
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Copy Email to Clipboard
  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  // Copy All Student Emails (CSV list for broadcast)
  const handleCopyAllEmails = () => {
    const list = students.map((s) => s.email).filter(Boolean).join(', ');
    navigator.clipboard.writeText(list);
    setAllEmailsCopied(true);
    setTimeout(() => setAllEmailsCopied(false), 2500);
  };

  // Copy Pre-formatted WhatsApp Message for Student
  const handleCopyWhatsAppMessage = (item: GeneratedAccessCode) => {
    const targetMsg = item.targetEmail ? ` khas untuk akaun Google anda (${item.targetEmail})` : '';
    const msg = `Salam dan terima kasih kerana menyertai Nota Kimia SPM Cikgu Hafreez! 🧪✨\n\nBerikut adalah Kod Akses Khas VIP anda${targetMsg}:\n🔑 *${item.code}*\n\nSila tebus di web app (klik "Tebus Kod Akses Khas") untuk membuka kesemua 13 bab Tingkatan 4 & 5 serta Exam Mode tanpa had. Selamat mengulang kaji! 🚀`;
    navigator.clipboard.writeText(msg);
    setCopiedMsgCode(item.code);
    setTimeout(() => setCopiedMsgCode(null), 3000);
  };

  // Compute Code Stats
  const totalCodesCount = codes.length;
  const redeemedCodesCount = codes.filter((c) => c.isRedeemed).length;
  const availableCodesCount = totalCodesCount - redeemedCodesCount;

  // Filtered Codes
  const filteredCodes = codes.filter((c) => {
    if (codeFilter === 'available' && c.isRedeemed) return false;
    if (codeFilter === 'redeemed' && !c.isRedeemed) return false;
    if (searchCodeQuery) {
      const q = searchCodeQuery.toLowerCase();
      const matchCode = c.code.toLowerCase().includes(q);
      const matchNote = c.note?.toLowerCase().includes(q);
      const matchTarget = c.targetEmail?.toLowerCase().includes(q);
      const matchUser = c.redeemedByName?.toLowerCase().includes(q) || c.redeemedByEmail?.toLowerCase().includes(q);
      return matchCode || matchNote || matchTarget || matchUser;
    }
    return true;
  });

  // Compute Student Stats
  const totalStudentsCount = students.length;
  const premiumStudentsCount = students.filter((s) => s.isPremium).length;
  const freeStudentsCount = totalStudentsCount - premiumStudentsCount;

  // Filtered Students
  const filteredStudents = students.filter((s) => {
    if (filterTier === 'premium' && !s.isPremium) return false;
    if (filterTier === 'free' && s.isPremium) return false;
    if (filterState !== 'all' && s.state !== filterState) return false;
    if (searchStudentQuery) {
      const q = searchStudentQuery.toLowerCase();
      const matchName = s.name.toLowerCase().includes(q);
      const matchEmail = s.email.toLowerCase().includes(q);
      const matchSchool = s.school?.toLowerCase().includes(q);
      return matchName || matchEmail || matchSchool;
    }
    return true;
  });

  const allStates = Array.from(new Set(students.map((s) => s.state).filter(Boolean)));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl max-w-5xl w-full h-[90vh] max-h-[820px] border border-slate-200/90 shadow-2xl flex flex-col overflow-hidden relative animate-in zoom-in-95 duration-200">
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 sm:p-6 text-white flex items-center justify-between gap-4 border-b border-indigo-900/50 relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-20 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-3.5 relative z-10">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 shrink-0">
              <Sparkles className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 shadow-xs">
                  👑 Dashboard Pentadbir
                </span>
                <span className="text-xs text-indigo-300 font-semibold hidden sm:inline">
                  Akses Rasmi Cikgu Hafreez
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black tracking-tight text-white mt-0.5">
                Panel Kawalan & Janaan Kod Akses
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 relative z-10">
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
              title="Tutup Panel Pentadbir"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="bg-slate-100/90 px-5 py-2.5 border-b border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('generator')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'generator'
                  ? 'bg-white text-indigo-900 shadow-xs border border-indigo-200/80 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5 text-indigo-600" />
              <span>Jana & Urus Kod Akses</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-700 font-mono">
                {totalCodesCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('students')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'students'
                  ? 'bg-white text-indigo-900 shadow-xs border border-indigo-200/80 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-sky-600" />
              <span>Rekod Murid & Emel Sebenar</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-sky-100 text-sky-700 font-mono">
                {totalStudentsCount}
              </span>
            </button>
          </div>

          <div className="text-[11px] text-slate-500 font-medium hidden md:inline">
            Akaun Pentadbir: <b className="text-slate-800">{currentUser?.email}</b>
          </div>
        </div>

        {/* Tab 1: Access Code Generator & Management */}
        {activeTab === 'generator' && (
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* Quick KPI Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 border border-indigo-200 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">Jumlah Kod Dijana</div>
                  <div className="text-2xl font-black text-indigo-950 mt-0.5">{totalCodesCount}</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                  <KeyRound className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Kod Belum Ditebus</div>
                  <div className="text-2xl font-black text-emerald-950 mt-0.5">{availableCodesCount}</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Kod Telah Ditebus</div>
                  <div className="text-2xl font-black text-slate-900 mt-0.5">{redeemedCodesCount}</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-700 text-white flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Code Generator Form with Target Email */}
            <form onSubmit={handleGenerate} className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-wider">
                  <Plus className="w-4 h-4 text-indigo-600" />
                  <span>Jana Kod Akses Baharu:</span>
                </div>
                {targetEmail && (
                  <button
                    type="button"
                    onClick={() => setTargetEmail('')}
                    className="text-[11px] text-rose-600 hover:underline font-bold cursor-pointer"
                  >
                    Batal Penetapan Emel
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Bilangan Kod:</label>
                  <select
                    value={generateCount}
                    onChange={(e) => setGenerateCount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value={1}>1 Kod</option>
                    <option value={5}>5 Kod</option>
                    <option value={10}>10 Kod</option>
                    <option value={20}>20 Kod</option>
                  </select>
                </div>

                <div className="sm:col-span-5">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Emel Sasaran Murid (Pilihan):
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={targetEmail}
                      onChange={(e) => setTargetEmail(e.target.value)}
                      placeholder="Contoh: murid@gmail.com (Kosongkan jika kod terbuka)"
                      className="w-full pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-5">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Catatan / Kumpulan Murid:</label>
                  <input
                    type="text"
                    value={generateNote}
                    onChange={(e) => setGenerateNote(e.target.value)}
                    placeholder="Contoh: Kelas Tuisyen SPM Cikgu Hafreez / MRSM"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <p className="text-[10px] text-slate-400">
                  {targetEmail ? (
                    <span className="text-indigo-600 font-bold">
                      * Kod ini akan dikhaskan eksklusif hanya untuk akaun Google <b className="font-mono">{targetEmail}</b>.
                    </span>
                  ) : (
                    '* Kod terbuka boleh ditebus oleh mana-mana 1 akaun Google calon (1 tebusan bagi setiap kod).'
                  )}
                </p>

                <button
                  type="submit"
                  className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 hover:opacity-95 active:scale-98 text-white text-xs font-extrabold transition-all shadow-md shadow-indigo-500/25 cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Jana Kod Sekarang</span>
                </button>
              </div>
            </form>

            {/* Code Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchCodeQuery}
                  onChange={(e) => setSearchCodeQuery(e.target.value)}
                  placeholder="Cari kod, emel sasaran, catatan atau murid..."
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCodeFilter('all')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    codeFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Semua ({totalCodesCount})
                </button>
                <button
                  type="button"
                  onClick={() => setCodeFilter('available')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    codeFilter === 'available' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  Tersedia ({availableCodesCount})
                </button>
                <button
                  type="button"
                  onClick={() => setCodeFilter('redeemed')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    codeFilter === 'redeemed' ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Ditebus ({redeemedCodesCount})
                </button>
              </div>
            </div>

            {/* Codes List Table */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Kod Akses Khas</th>
                      <th className="py-3 px-4">Sasaran / Catatan</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Penebus (Murid)</th>
                      <th className="py-3 px-4 text-right">Tindakan Pantas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCodes.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400">
                          Tiada kod akses dijumpai.
                        </td>
                      </tr>
                    ) : (
                      filteredCodes.map((item) => (
                        <tr key={item.code} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4">
                            <span className="font-mono font-black text-xs text-indigo-900 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5">
                              {item.code}
                            </span>
                          </td>
                          <td className="py-3 px-4 max-w-[240px]">
                            {item.targetEmail && (
                              <div className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-md mb-1 font-mono">
                                <Mail className="w-3 h-3 text-sky-500" />
                                <span>Khas: {item.targetEmail}</span>
                              </div>
                            )}
                            <div className="text-slate-600 truncate text-[11px]">{item.note || '—'}</div>
                          </td>
                          <td className="py-3 px-4">
                            {item.isRedeemed ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                                <CheckCircle2 className="w-3 h-3 text-slate-500" />
                                <span>Telah Ditebus</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                <Clock className="w-3 h-3 text-emerald-600" />
                                <span>Tersedia</span>
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {item.isRedeemed ? (
                              <div>
                                <div className="font-bold text-slate-900">{item.redeemedByName}</div>
                                <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                                  <Mail className="w-2.5 h-2.5 text-slate-400" />
                                  <span>{item.redeemedByEmail}</span>
                                </div>
                              </div>
                            ) : (
                              <span className="text-slate-400 italic text-[11px]">Belum digunakan</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* 1-Click Copy Code */}
                              <button
                                type="button"
                                onClick={() => handleCopyCode(item.code)}
                                className="p-1.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 transition-all cursor-pointer"
                                title="Salin Kod"
                              >
                                {copiedCode === item.code ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>

                              {/* 1-Click WhatsApp Pre-formatted Message */}
                              <button
                                type="button"
                                onClick={() => handleCopyWhatsAppMessage(item)}
                                className="p-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-50 text-emerald-700 transition-all cursor-pointer"
                                title="Salin Mesej WhatsApp untuk Dihantar kepada Murid"
                              >
                                {copiedMsgCode === item.code ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                                )}
                              </button>

                              {/* Delete code if not yet redeemed */}
                              {!item.isRedeemed && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteCode(item.code)}
                                  className="p-1.5 rounded-lg border border-slate-200 hover:border-rose-300 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-all cursor-pointer"
                                  title="Padam Kod"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Students Monitoring & Analytics */}
        {activeTab === 'students' && (
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {!auth.currentUser && (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-3">
                <span>
                  ⚠️ Sesi Google Firebase belum aktif pada pelayar ini. Sila log keluar dan klik <strong>Log Masuk dengan Google</strong> menggunakan emel admin rasmi anda untuk menarik rekod pelajar daripada awan (Firestore).
                </span>
              </div>
            )}
            {/* Student KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-200 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-sky-600 uppercase tracking-wider">Jumlah Murid Berdaftar</div>
                  <div className="text-2xl font-black text-sky-950 mt-0.5">{totalStudentsCount}</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Calon Akses VIP</div>
                  <div className="text-2xl font-black text-amber-950 mt-0.5">{premiumStudentsCount}</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5 text-amber-200" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Calon Akses Percuma</div>
                  <div className="text-2xl font-black text-slate-900 mt-0.5">{freeStudentsCount}</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-700 text-white flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Search & Actions Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchStudentQuery}
                  onChange={(e) => setSearchStudentQuery(e.target.value)}
                  placeholder="Cari nama calon, emel sebenar, atau sekolah..."
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Manual Sync Button */}
                <button
                  type="button"
                  onClick={refreshData}
                  disabled={isLoadingRemote}
                  className="px-3 py-1.5 rounded-xl border border-sky-200 bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-60"
                  title="Muat semula rekod pelajar terkini daripada pangkalan data"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingRemote ? 'animate-spin' : ''}`} />
                  <span>{isLoadingRemote ? 'Menyegerak...' : 'Segar Semula'}</span>
                </button>

                {/* Copy All Emails button */}
                <button
                  type="button"
                  onClick={handleCopyAllEmails}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                  title="Salin semua emel murid untuk edaran maklumat atau semakan"
                >
                  {allEmailsCopied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                  )}
                  <span>{allEmailsCopied ? 'Semua Emel Disalin!' : 'Salin Semua Emel'}</span>
                </button>

                {/* Tier Filter */}
                <select
                  value={filterTier}
                  onChange={(e) => setFilterTier(e.target.value as any)}
                  className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="all">Semua Akses</option>
                  <option value="premium">VIP Sahaja</option>
                  <option value="free">Percuma Sahaja</option>
                </select>

                {/* State Filter */}
                {allStates.length > 0 && (
                  <select
                    value={filterState}
                    onChange={(e) => setFilterState(e.target.value)}
                    className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="all">Semua Negeri</option>
                    {allStates.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {/* Students List Table with Real Emails & Quick Code Action */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Nama Calon</th>
                      <th className="py-3 px-4">Emel Sebenar Google</th>
                      <th className="py-3 px-4">Sekolah & Negeri</th>
                      <th className="py-3 px-4">Rekod Log Masuk & XP</th>
                      <th className="py-3 px-4">Status Akses</th>
                      <th className="py-3 px-4">Kod Ditebus</th>
                      <th className="py-3 px-4 text-right">Tindakan Janaan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400">
                          Tiada murid berdaftar dijumpai.
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((st) => (
                        <tr key={st.id || st.email} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2.5">
                              {st.avatar ? (
                                <img
                                  src={st.avatar}
                                  alt={st.name}
                                  className="w-7 h-7 rounded-full object-cover border border-slate-200"
                                />
                              ) : (
                                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                                  {st.name.charAt(0).toUpperCase()}
                                </div>
                              )}
                              <span className="font-bold text-slate-900">{st.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-700 font-semibold">
                              <span>{st.email}</span>
                              <button
                                type="button"
                                onClick={() => handleCopyEmail(st.email)}
                                className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                                title="Salin Emel"
                              >
                                {copiedEmail === st.email ? (
                                  <Check className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-slate-800">{st.school || 'Belum Lengkapkan Sekolah'}</div>
                            <div className="text-[10px] text-slate-500 flex items-center gap-1">
                              <MapPin className="w-2.5 h-2.5 text-slate-400" />
                              <span>{st.state || 'Malaysia'}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-sky-500 shrink-0" />
                              <span>
                                {new Date(st.lastLoginAt || st.createdAt || Date.now()).toLocaleString('ms-MY', {
                                  day: '2-digit',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </div>
                            <div className="text-[10px] text-indigo-600 font-bold mt-0.5">
                              {(st.xp || 0).toLocaleString()} XP • {st.loginCount || 1}x Log Masuk
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            {st.isPremium ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-black text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
                                <Sparkles className="w-3 h-3 text-amber-600" />
                                <span>Akses VIP</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-800 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full">
                                <span>Percuma ({st.examAttemptsCount || 0}/2 Exam)</span>
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {st.redeemedCode ? (
                              <span className="font-mono text-[10px] font-black text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                                {st.redeemedCode}
                              </span>
                            ) : (
                              <span className="text-slate-400 text-[10px] italic">—</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            {st.isPremium ? (
                              <span className="text-[11px] font-bold text-emerald-700 inline-flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Aktif</span>
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleAssignCodeForStudent(st)}
                                className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 hover:text-indigo-900 text-[11px] font-bold transition-all cursor-pointer inline-flex items-center gap-1 shadow-2xs"
                                title={`Jana kod khas untuk ${st.email}`}
                              >
                                <KeyRound className="w-3 h-3 text-indigo-600" />
                                <span>Jana Kod Khas</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
