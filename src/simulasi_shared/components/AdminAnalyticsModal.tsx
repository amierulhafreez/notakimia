import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  X,
  Lock,
  Unlock,
  Calendar,
  RefreshCw,
  Download,
  Users,
  Eye,
  MousePointerClick,
  CheckCircle2,
  BarChart3,
  Search,
  ShieldCheck,
  LogOut,
  TrendingUp,
} from 'lucide-react';
import { SIMULATIONS_DATA } from '../data/simulations';
import {
  analytics,
  DailyReport,
  DailyTrendPoint,
  getMalaysiaDateStr,
} from '../services/analytics';

interface AdminAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_PIN_HASH =
  '588505a0785bab576624a7783e03236d3858987ca0a59b5ce340c6c5e808e5bf'; // 202600
const CUSTOM_HASH_KEY = 'ch_admin_custom_pin_hash_v1';
const SESSION_UNLOCK_KEY = 'ch_admin_unlocked_v1';

async function sha256Hex(input: string): Promise<string> {
  if (typeof window !== 'undefined' && window.crypto?.subtle) {
    const buf = await window.crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(input)
    );
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
  return input;
}

export const AdminAnalyticsModal: React.FC<AdminAnalyticsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(SESSION_UNLOCK_KEY) === '1';
    } catch {
      return false;
    }
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState<string | null>(null);

  const todayStr = useMemo(() => getMalaysiaDateStr(0), []);
  const yesterdayStr = useMemo(() => getMalaysiaDateStr(-1), []);

  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [report, setReport] = useState<DailyReport | null>(null);
  const [trend, setTrend] = useState<DailyTrendPoint[]>([]);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [isLoadingTrend, setIsLoadingTrend] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [formFilter, setFormFilter] = useState<'all' | 'Tingkatan 4' | 'Tingkatan 5'>('all');
  const [onlyActiveSims, setOnlyActiveSims] = useState(false);

  const allSimIds = useMemo(() => SIMULATIONS_DATA.map((s) => s.id), []);

  const loadDay = useCallback(
    async (dateStr: string, forceRefresh: boolean = false) => {
      setIsLoadingReport(true);
      try {
        const res = await analytics.fetchDailyReport(dateStr, allSimIds, forceRefresh);
        setReport(res);
      } finally {
        setIsLoadingReport(false);
      }
    },
    [allSimIds]
  );

  const loadTrend = useCallback(async () => {
    setIsLoadingTrend(true);
    try {
      const pts = await analytics.fetchMultiDayTrend(7);
      setTrend(pts);
    } finally {
      setIsLoadingTrend(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen || !isUnlocked) return;
    loadDay(selectedDate);
  }, [isOpen, isUnlocked, selectedDate, loadDay]);

  useEffect(() => {
    if (!isOpen || !isUnlocked) return;
    loadTrend();
  }, [isOpen, isUnlocked, loadTrend]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError(null);
    const trimmed = pinInput.trim();
    if (!trimmed) {
      setPinError('Sila masukkan PIN Admin.');
      return;
    }
    const enteredHash = await sha256Hex(trimmed);
    let expectedHash = DEFAULT_PIN_HASH;
    try {
      expectedHash = localStorage.getItem(CUSTOM_HASH_KEY) || DEFAULT_PIN_HASH;
    } catch {
      // fallback to default
    }

    if (enteredHash === expectedHash) {
      setIsUnlocked(true);
      setPinInput('');
      try {
        sessionStorage.setItem(SESSION_UNLOCK_KEY, '1');
      } catch {
        // ignore
      }
    } else {
      setPinError('PIN Admin tidak sah. Sila cuba lagi.');
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setPinInput('');
    try {
      sessionStorage.removeItem(SESSION_UNLOCK_KEY);
    } catch {
      // ignore
    }
  };

  const simRows = useMemo(() => {
    if (!report) return [];
    const q = searchQuery.toLowerCase().trim();
    return SIMULATIONS_DATA.map((sim) => {
      const st = report.simulations[sim.id] || { views: 0, clicks: 0, completed: 0 };
      return {
        ...sim,
        views: st.views,
        clicks: st.clicks,
        completed: st.completed,
      };
    })
      .filter((s) => {
        if (formFilter !== 'all' && s.form !== formFilter) return false;
        if (onlyActiveSims && s.views === 0 && s.clicks === 0 && s.completed === 0) return false;
        if (
          q &&
          !s.title.toLowerCase().includes(q) &&
          !s.chapter.toLowerCase().includes(q)
        ) {
          return false;
        }
        return true;
      })
      .sort((a, b) => b.views - a.views || b.clicks - a.clicks || b.completed - a.completed);
  }, [report, searchQuery, formFilter, onlyActiveSims]);

  const totalsForDay = useMemo(() => {
    if (!report) return { views: 0, clicks: 0, completed: 0, activeCount: 0 };
    let views = 0;
    let clicks = 0;
    let completed = 0;
    let activeCount = 0;
    for (const st of Object.values(report.simulations)) {
      views += st.views;
      clicks += st.clicks;
      completed += st.completed;
      if (st.views > 0 || st.clicks > 0 || st.completed > 0) activeCount += 1;
    }
    return { views, clicks, completed, activeCount };
  }, [report]);

  const maxTrendVal = useMemo(() => {
    const m = Math.max(...trend.map((t) => Math.max(t.visits, t.uniqueVisitors)), 1);
    return m;
  }, [trend]);

  const handleExportCSV = () => {
    if (!report) return;
    const header = [
      'Tarikh',
      'Pelawat Unik Harian',
      'Jumlah Visit Harian',
      'ID Simulasi',
      'Tajuk Simulasi',
      'Tingkatan',
      'Bab',
      'Dibuka (Views)',
      'Klik Radas',
      'Selesai',
    ];
    const lines = [header.join(',')];
    for (const sim of SIMULATIONS_DATA) {
      const st = report.simulations[sim.id] || { views: 0, clicks: 0, completed: 0 };
      const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
      lines.push(
        [
          report.date,
          report.uniqueVisitors,
          report.visits,
          escape(sim.id),
          escape(sim.title),
          escape(sim.form),
          escape(sim.chapter),
          st.views,
          st.clicks,
          st.completed,
        ].join(',')
      );
    }
    const blob = new Blob(['\uFEFF' + lines.join('\n')], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `laporan-harian-simulasikimia-${report.date}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Panel Pemantauan Admin"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/65 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-slate-200 rounded-t-3xl sm:rounded-3xl w-full max-w-4xl max-h-[92dvh] sm:max-h-[90dvh] flex flex-col shadow-2xl overflow-hidden pb-[env(safe-area-inset-bottom)]"
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-slate-100 flex items-center justify-between gap-3 bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-display font-bold text-sm sm:text-base truncate">
                Panel Pemantauan Harian Admin
              </h3>
              <p className="text-[11px] text-slate-300 truncate">
                Paparan eksklusif Cikgu Hafreez · Rekod harian pelawat &amp; 45 simulasi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isUnlocked && (
              <button
                type="button"
                onClick={handleLock}
                title="Kunci semula paparan Admin"
                className="px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Kunci</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup"
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        {!isUnlocked ? (
          <div className="p-6 sm:p-10 flex flex-col items-center justify-center text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
              <Lock className="w-7 h-7" />
            </div>
            <div className="space-y-1 max-w-sm">
              <h4 className="font-display font-bold text-lg text-slate-900">
                Akses Terhad kepada Admin
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Masukkan PIN Admin untuk melihat rekod harian pelawat masuk, jumlah lawatan, dan penggunaan setiap simulasi mengikut tarikh.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="w-full max-w-xs space-y-3">
              <input
                type="password"
                inputMode="numeric"
                autoFocus
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Masukkan PIN Admin"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-center font-mono text-base tracking-[0.25em] focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {pinError && (
                <p className="text-xs font-semibold text-rose-600">{pinError}</p>
              )}
              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>Buka Laporan Harian</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain space-y-5 bg-[#fbfbfd] [-webkit-overflow-scrolling:touch]">
            {/* Date Controls & Export */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                  <input
                    type="date"
                    value={selectedDate}
                    max={todayStr}
                    onChange={(e) => e.target.value && setSelectedDate(e.target.value)}
                    className="bg-transparent focus:outline-none font-mono text-xs cursor-pointer"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedDate(todayStr)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer transition ${
                    selectedDate === todayStr
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Hari Ini
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDate(yesterdayStr)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer transition ${
                    selectedDate === yesterdayStr
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Semalam
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    loadDay(selectedDate, true);
                    loadTrend();
                  }}
                  disabled={isLoadingReport}
                  className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingReport ? 'animate-spin text-indigo-600' : ''}`} />
                  <span>Segarkan</span>
                </button>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  disabled={!report}
                  className="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Eksport CSV</span>
                </button>
              </div>
            </div>

            {/* 4 Daily KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Orang Masuk (Unik)</span>
                </div>
                <div className="text-2xl font-display font-black text-slate-900 mt-1 tabular-nums">
                  {isLoadingReport && !report ? '...' : (report?.uniqueVisitors ?? 0).toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Peranti berbeza pada {selectedDate}</div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                  <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Jumlah Visit</span>
                </div>
                <div className="text-2xl font-display font-black text-slate-900 mt-1 tabular-nums">
                  {isLoadingReport && !report ? '...' : (report?.visits ?? 0).toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Sesi lawatan laman utama</div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                  <Eye className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Simulasi Dibuka</span>
                </div>
                <div className="text-2xl font-display font-black text-slate-900 mt-1 tabular-nums">
                  {isLoadingReport && !report ? '...' : totalsForDay.views.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {totalsForDay.activeCount}/45 modul digunakan
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Selesai &amp; Klik</span>
                </div>
                <div className="text-2xl font-display font-black text-slate-900 mt-1 tabular-nums">
                  {isLoadingReport && !report ? '...' : totalsForDay.completed.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {totalsForDay.clicks.toLocaleString()} klik radas
                </div>
              </div>
            </div>

            {/* 7-Day Trend Mini Bar Chart */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  <span>Trend 7 Hari Terakhir (Klik bar untuk tukar tarikh)</span>
                </div>
                <div className="flex items-center gap-3 text-[10.5px] font-semibold text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-blue-500" /> Visit
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500" /> Unik
                  </span>
                </div>
              </div>

              {isLoadingTrend && trend.length === 0 ? (
                <div className="h-24 flex items-center justify-center text-xs text-slate-400">
                  Memuatkan trend 7 hari...
                </div>
              ) : (
                <div className="grid grid-cols-7 gap-2 items-end h-28 pt-2">
                  {trend.map((pt) => {
                    const vH = Math.max(4, Math.round((pt.visits / maxTrendVal) * 72));
                    const uH = Math.max(4, Math.round((pt.uniqueVisitors / maxTrendVal) * 72));
                    const isSelected = pt.date === selectedDate;
                    return (
                      <button
                        key={pt.date}
                        type="button"
                        onClick={() => setSelectedDate(pt.date)}
                        className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition cursor-pointer ${
                          isSelected ? 'bg-indigo-50 ring-1 ring-indigo-300' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-end gap-1 h-[76px]">
                          <div
                            title={`${pt.visits} visit`}
                            style={{ height: `${vH}px` }}
                            className="w-3 sm:w-4 rounded-t-md bg-blue-500 transition-all"
                          />
                          <div
                            title={`${pt.uniqueVisitors} unik`}
                            style={{ height: `${uH}px` }}
                            className="w-3 sm:w-4 rounded-t-md bg-emerald-500 transition-all"
                          />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-700">
                          {pt.label}
                        </span>
                        <span className="text-[9px] text-slate-400 tabular-nums">
                          {pt.uniqueVisitors}/{pt.visits}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Per-Simulation Daily Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="p-3.5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
                <div className="relative flex-1 min-w-[180px]">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari nama simulasi atau bab..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {(['all', 'Tingkatan 4', 'Tingkatan 5'] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFormFilter(f)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer ${
                        formFilter === f
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {f === 'all' ? 'Semua (45)' : f}
                    </button>
                  ))}

                  <label className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 ml-1 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={onlyActiveSims}
                      onChange={(e) => setOnlyActiveSims(e.target.checked)}
                      className="rounded border-slate-300 text-indigo-600"
                    />
                    <span>Ada aktiviti sahaja</span>
                  </label>
                </div>
              </div>

              <div className="overflow-x-auto max-h-[340px] overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-[10.5px] uppercase tracking-wider text-slate-500 sticky top-0 border-b border-slate-200">
                    <tr>
                      <th className="px-3.5 py-2.5">#</th>
                      <th className="px-3.5 py-2.5">Simulasi</th>
                      <th className="px-3 py-2.5 text-right">Dibuka</th>
                      <th className="px-3 py-2.5 text-right">Klik Radas</th>
                      <th className="px-3.5 py-2.5 text-right">Selesai</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {isLoadingReport && simRows.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                          Memuatkan statistik harian untuk 45 simulasi...
                        </td>
                      </tr>
                    ) : simRows.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                          Tiada rekod simulasi sepadan untuk tarikh {selectedDate}.
                        </td>
                      </tr>
                    ) : (
                      simRows.map((row, idx) => (
                        <tr key={row.id} className="hover:bg-slate-50/80">
                          <td className="px-3.5 py-2 text-slate-400 font-mono text-[11px]">
                            {idx + 1}
                          </td>
                          <td className="px-3.5 py-2">
                            <div className="font-semibold text-slate-900">{row.title}</div>
                            <div className="text-[10.5px] text-slate-500">
                              {row.form} · {row.chapter.split(':')[0]}
                            </div>
                          </td>
                          <td className="px-3 py-2 text-right font-mono font-bold text-indigo-700 tabular-nums">
                            {row.views}
                          </td>
                          <td className="px-3 py-2 text-right font-mono text-slate-700 tabular-nums">
                            <span className="inline-flex items-center gap-1">
                              <MousePointerClick className="w-3 h-3 text-slate-400" />
                              {row.clicks}
                            </span>
                          </td>
                          <td className="px-3.5 py-2 text-right font-mono font-semibold text-emerald-700 tabular-nums">
                            {row.completed}
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
