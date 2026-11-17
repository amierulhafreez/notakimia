import { SimulationAnalytics } from '../types/simulation';

const STORAGE_KEY = 'cikguhafreez_simulasi_analytics_v1';
const ANON_UID_KEY = 'cikguhafreez_anon_visitor_uid';
const DAILY_CACHE_PREFIX = 'ch_admin_day_cache_v1_';

const CLOUD_API_BASE = 'https://countapi.mileshilliard.com/api/v1';
const CLOUD_KEY_HOME = 'cikguhafreez_simulasi_v1_home_visits';
const CLOUD_KEY_TOTAL_CLICKS = 'cikguhafreez_simulasi_v1_total_clicks';

export interface DailySimStats {
  views: number;
  clicks: number;
  completed: number;
}

export interface DailyReport {
  date: string;
  visits: number;
  uniqueVisitors: number;
  simulations: Record<string, DailySimStats>;
  fetchedAt: string;
}

export interface DailyTrendPoint {
  date: string;
  label: string;
  visits: number;
  uniqueVisitors: number;
}

/** Returns YYYY-MM-DD in Malaysia timezone (Asia/Kuala_Lumpur). */
export function getMalaysiaDateStr(offsetDays: number = 0): string {
  const target = new Date(Date.now() + offsetDays * 86400000);
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kuala_Lumpur',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(target);
  } catch {
    return target.toISOString().slice(0, 10);
  }
}

function toCompactDate(dateStr: string): string {
  return dateStr.replace(/-/g, '');
}

// Baseline counts representing initial usage records
const DEFAULT_ANALYTICS: SimulationAnalytics = {
  totalHomeVisits: 1485,
  simulations: {
    'pentitratan-asid-alkali': { views: 412, clicks: 1250, completed: 290 },
    'ujian-gas': { views: 368, clicks: 980, completed: 245 },
    'penggumpalan-lateks': { views: 295, clicks: 810, completed: 180 },
    'pemanasan-dan-penyejukkan-naftalena': { views: 340, clicks: 890, completed: 210 },
    'penyeimbangan-persamaan-kimia': { views: 490, clicks: 1420, completed: 330 },
    'penghasilan-formula-kimia': { views: 280, clicks: 640, completed: 175 },
    'kereaktifan-k1-dan-k17': { views: 260, clicks: 710, completed: 160 },
    'penghasilan-sebatian-kovalen': { views: 230, clicks: 590, completed: 140 },
    'elektrolisis': { views: 385, clicks: 1120, completed: 265 },
    'keterlarutan-garam': { views: 310, clicks: 780, completed: 195 },
    'ujian-kation': { views: 345, clicks: 920, completed: 215 },
    'ujian-anion': { views: 320, clicks: 870, completed: 200 },
    'daya-tarikan-zarah': { views: 190, clicks: 450, completed: 120 },
    'penentuan-isomer': { views: 275, clicks: 760, completed: 170 },
    'formula-struktur-karbon': { views: 290, clicks: 810, completed: 185 },
    'penghasilan-sabun': { views: 240, clicks: 630, completed: 155 },
    'pencucian-sabun-detergen-air-liat': { views: 215, clicks: 580, completed: 140 },
    'haba-penyesaran': { views: 315, clicks: 840, completed: 190 },
    'haba-peneutralan': { views: 270, clicks: 720, completed: 165 },
    'haba-pemendakan': { views: 255, clicks: 690, completed: 150 },
    'penyediaan-larutan-piawai': { views: 210, clicks: 540, completed: 145 },
    'kadar-tindak-balas-saiz': { views: 235, clicks: 620, completed: 165 },
    'kadar-tindak-balas-kepekatan': { views: 220, clicks: 590, completed: 150 },
    'kadar-tindak-balas-suhu': { views: 245, clicks: 640, completed: 160 },
    'kadar-tindak-balas-mangkin': { views: 210, clicks: 530, completed: 135 },
    'keadaan-zarah-jirim': { views: 265, clicks: 710, completed: 195 },
    'pengekstrakan-besi': { views: 195, clicks: 510, completed: 135 },
    'pengekstrakan-aluminium': { views: 205, clicks: 530, completed: 140 },
    'haba-pembakaran': { views: 250, clicks: 680, completed: 175 },
    'nilai-bahan-api': { views: 220, clicks: 590, completed: 155 },
    'pengaratan-besi': { views: 205, clicks: 520, completed: 130 },
    'pengoksidaan-etanol': { views: 195, clicks: 490, completed: 125 },
    'pengesteran-alkohol-asid-karboksilik': { views: 225, clicks: 560, completed: 145 },
    'tindak-balas-alkena': { views: 185, clicks: 470, completed: 120 },
    'fermentasi-dan-penyulingan-etanol': { views: 210, clicks: 530, completed: 135 },
    'alkana-vs-alkena': { views: 190, clicks: 480, completed: 125 },
    'kekerasan-aloi-logam-tulen': { views: 230, clicks: 610, completed: 150 },
    'kekenyalan-getah-asli-tervulkan': { views: 240, clicks: 620, completed: 155 }
  }
};

function sanitizeKey(simId: string): string {
  return simId.replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase();
}

async function cloudHit(key: string): Promise<number | null> {
  try {
    const res = await fetch(`${CLOUD_API_BASE}/hit/${key}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    const val = typeof json.value === 'number' ? json.value : parseInt(json.value, 10);
    return isNaN(val) ? null : val;
  } catch {
    return null;
  }
}

async function cloudGet(key: string): Promise<number | null> {
  try {
    const res = await fetch(`${CLOUD_API_BASE}/get/${key}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    const val = typeof json.value === 'number' ? json.value : parseInt(json.value, 10);
    return isNaN(val) ? null : val;
  } catch {
    return null;
  }
}

class AnalyticsService {
  private listeners: Array<(data: SimulationAnalytics) => void> = [];
  private memoryCache: SimulationAnalytics | null = null;
  private persistTimer: ReturnType<typeof setTimeout> | null = null;
  private isSyncing = false;
  private syncTimer: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.ensureAnonymousUid();
    this.initBackgroundSync();
  }

  // Generate or retrieve persistent anonymous device/visitor ID (no login needed)
  public ensureAnonymousUid(): string {
    if (typeof window === 'undefined') return 'server';
    try {
      let uid = localStorage.getItem(ANON_UID_KEY);
      if (!uid) {
        uid = 'anon_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
        localStorage.setItem(ANON_UID_KEY, uid);
      }
      return uid;
    } catch {
      return 'anon_fallback';
    }
  }

  public getAnalytics(): SimulationAnalytics {
    if (this.memoryCache) return this.memoryCache;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as SimulationAnalytics;
        this.memoryCache = {
          totalHomeVisits: Math.max(parsed.totalHomeVisits ?? 0, DEFAULT_ANALYTICS.totalHomeVisits),
          simulations: {
            ...DEFAULT_ANALYTICS.simulations,
            ...(parsed.simulations || {}),
          },
        };
        return this.memoryCache;
      }
    } catch {
      // Fallback
    }
    this.memoryCache = {
      totalHomeVisits: DEFAULT_ANALYTICS.totalHomeVisits,
      simulations: { ...DEFAULT_ANALYTICS.simulations },
    };
    return this.memoryCache;
  }

  private save(data: SimulationAnalytics) {
    this.memoryCache = data;
    this.notify(data);

    // Debounce localStorage serialization so UI clicks stay 0ms instant
    if (this.persistTimer) clearTimeout(this.persistTimer);
    this.persistTimer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.warn('Analytics save failed', e);
      }
    }, 200);
  }

  public subscribe(fn: (data: SimulationAnalytics) => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  private notify(data: SimulationAnalytics) {
    this.listeners.forEach(fn => fn(data));
  }

  // Initialize background live sync every 45s and on tab focus
  private initBackgroundSync() {
    if (typeof window === 'undefined') return;

    // Sync on tab active
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.syncFromCloud();
      }
    });

    // Periodic sync
    this.syncTimer = setInterval(() => {
      if (document.visibilityState === 'visible') {
        this.syncFromCloud();
      }
    }, 45000);
  }

  // Fetch latest global visit count from real-time cloud API
  public async syncFromCloud(): Promise<SimulationAnalytics> {
    if (this.isSyncing) return this.getAnalytics();
    this.isSyncing = true;

    try {
      const cloudVisits = await cloudGet(CLOUD_KEY_HOME);
      if (cloudVisits && cloudVisits > 0) {
        const current = this.getAnalytics();
        if (cloudVisits > current.totalHomeVisits) {
          current.totalHomeVisits = cloudVisits;
          this.save(current);
        }
      }
    } catch {
      // Silently fall back to cached data
    } finally {
      this.isSyncing = false;
    }

    return this.getAnalytics();
  }

  // Rekod bila pelawat tiba di laman utama (Atomic Real-time Hit + Daily Unique/Visits)
  public recordHomeVisit(): SimulationAnalytics {
    const data = this.getAnalytics();
    const todayStr = getMalaysiaDateStr();
    const compactDate = toCompactDate(todayStr);
    const sessionKey = 'session_counted_' + todayStr;

    if (!sessionStorage.getItem(sessionKey)) {
      sessionStorage.setItem(sessionKey, 'true');
      data.totalHomeVisits += 1;
      this.save(data);

      // Hit real-time cloud counter asynchronously
      cloudHit(CLOUD_KEY_HOME).then((cloudVal) => {
        if (cloudVal && cloudVal > data.totalHomeVisits) {
          data.totalHomeVisits = cloudVal;
          this.save(data);
        }
      });

      // Record daily visit
      cloudHit(`ch_d_${compactDate}_visits`);

      // Record daily unique visitor (max once per day per browser)
      try {
        const uniqKey = `ch_daily_uniq_${todayStr}`;
        if (!localStorage.getItem(uniqKey)) {
          localStorage.setItem(uniqKey, '1');
          cloudHit(`ch_d_${compactDate}_unique`);
        }
      } catch {
        // Ignore storage errors
      }
    } else {
      // Already counted this session, sync latest cloud number
      this.syncFromCloud();
    }

    return data;
  }

  // Rekod bila mana-mana simulasi dibuka (Atomic Real-time View + Daily View)
  public recordSimulationView(simId: string): SimulationAnalytics {
    const data = this.getAnalytics();
    if (!data.simulations[simId]) {
      data.simulations[simId] = { views: 0, clicks: 0, completed: 0 };
    }
    data.simulations[simId].views += 1;
    this.save(data);

    const sKey = sanitizeKey(simId);
    const compactDate = toCompactDate(getMalaysiaDateStr());
    cloudHit(`cikguhafreez_v1_view_${sKey}`);
    cloudHit(`ch_d_${compactDate}_v_${sKey}`);

    return data;
  }

  // Rekod bila pelajar klik radas atau butang interaksi (Atomic Real-time Click + Daily Click)
  public recordSimulationClick(simId: string, count: number = 1): SimulationAnalytics {
    const data = this.getAnalytics();
    if (!data.simulations[simId]) {
      data.simulations[simId] = { views: 0, clicks: 0, completed: 0 };
    }
    data.simulations[simId].clicks += count;
    this.save(data);

    const sKey = sanitizeKey(simId);
    const compactDate = toCompactDate(getMalaysiaDateStr());
    cloudHit(`cikguhafreez_v1_click_${sKey}`);
    cloudHit(CLOUD_KEY_TOTAL_CLICKS);
    cloudHit(`ch_d_${compactDate}_c_${sKey}`);

    return data;
  }

  // Rekod bila eksperimen berjaya diselesaikan (All-time + Daily Completed)
  public recordSimulationCompleted(simId: string): SimulationAnalytics {
    const data = this.getAnalytics();
    if (!data.simulations[simId]) {
      data.simulations[simId] = { views: 0, clicks: 0, completed: 0 };
    }
    data.simulations[simId].completed += 1;
    this.save(data);

    const sKey = sanitizeKey(simId);
    const compactDate = toCompactDate(getMalaysiaDateStr());
    cloudHit(`cikguhafreez_v1_done_${sKey}`);
    cloudHit(`ch_d_${compactDate}_x_${sKey}`);

    return data;
  }

  /** Admin Only: Fetch daily report (visits, unique visitors, and per-simulation stats) for a date */
  public async fetchDailyReport(
    dateStr: string,
    simIds: string[],
    forceRefresh: boolean = false
  ): Promise<DailyReport> {
    const todayStr = getMalaysiaDateStr();
    const isPastDate = dateStr < todayStr;
    const cacheKey = `${DAILY_CACHE_PREFIX}${dateStr}`;

    if (isPastDate && !forceRefresh) {
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          return JSON.parse(cached) as DailyReport;
        }
      } catch {
        // Ignore cache read errors
      }
    }

    const compact = toCompactDate(dateStr);
    const [visitsRaw, uniqueRaw] = await Promise.all([
      cloudGet(`ch_d_${compact}_visits`),
      cloudGet(`ch_d_${compact}_unique`),
    ]);

    const simulations: Record<string, DailySimStats> = {};
    const batchSize = 9;
    for (let i = 0; i < simIds.length; i += batchSize) {
      const batch = simIds.slice(i, i + batchSize);
      await Promise.all(
        batch.map(async (simId) => {
          const sKey = sanitizeKey(simId);
          const [v, c, x] = await Promise.all([
            cloudGet(`ch_d_${compact}_v_${sKey}`),
            cloudGet(`ch_d_${compact}_c_${sKey}`),
            cloudGet(`ch_d_${compact}_x_${sKey}`),
          ]);
          simulations[simId] = {
            views: v ?? 0,
            clicks: c ?? 0,
            completed: x ?? 0,
          };
        })
      );
    }

    const report: DailyReport = {
      date: dateStr,
      visits: visitsRaw ?? 0,
      uniqueVisitors: uniqueRaw ?? 0,
      simulations,
      fetchedAt: new Date().toISOString(),
    };

    if (isPastDate) {
      try {
        localStorage.setItem(cacheKey, JSON.stringify(report));
      } catch {
        // Ignore storage quota errors
      }
    }

    return report;
  }

  /** Admin Only: Fetch last N days of visits & unique visitors for trend chart */
  public async fetchMultiDayTrend(days: number = 7): Promise<DailyTrendPoint[]> {
    const dates: string[] = [];
    for (let i = days - 1; i >= 0; i--) {
      dates.push(getMalaysiaDateStr(-i));
    }

    const points = await Promise.all(
      dates.map(async (dateStr) => {
        const compact = toCompactDate(dateStr);
        const [visitsRaw, uniqueRaw] = await Promise.all([
          cloudGet(`ch_d_${compact}_visits`),
          cloudGet(`ch_d_${compact}_unique`),
        ]);
        const [, mm, dd] = dateStr.split('-');
        return {
          date: dateStr,
          label: `${dd}/${mm}`,
          visits: visitsRaw ?? 0,
          uniqueVisitors: uniqueRaw ?? 0,
        };
      })
    );

    return points;
  }
}

export const analytics = new AnalyticsService();
