import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { SIMULATIONS_DATA } from './data/simulations';
import { FormLevel, SimulationAnalytics, SimulationItem } from './types/simulation';
import { analytics } from './services/analytics';
import { Header } from './components/Header';
import { AppleHeroShowcase } from './components/AppleHeroShowcase';
import { SimulationCard } from './components/SimulationCard';
import { TopicCarouselRow } from './components/TopicCarouselRow';
import { SimulationModal } from './components/SimulationModal';
import { TeacherErphSection } from './components/TeacherErphSection';
import { Footer } from './components/Footer';

const AnalyticsModal = React.lazy(() =>
  import('./components/AnalyticsModal').then((m) => ({ default: m.AnalyticsModal }))
);
const FeedbackModal = React.lazy(() =>
  import('./components/FeedbackModal').then((m) => ({ default: m.FeedbackModal }))
);
const UserGuideModal = React.lazy(() =>
  import('./components/UserGuideModal').then((m) => ({ default: m.UserGuideModal }))
);
const AdminAnalyticsModal = React.lazy(() =>
  import('./components/AdminAnalyticsModal').then((m) => ({ default: m.AdminAnalyticsModal }))
);
import {
  ArrowDown,
  ArrowUpRight,
  Atom,
  BookOpen,
  Calculator,
  ChevronRight,
  HelpCircle,
  Layers,
  Search,
  Sparkles,
  X,
} from 'lucide-react';

interface TopicGroup {
  key: string;
  babCode: string;
  title: string;
  items: SimulationItem[];
}

const T4_TOPICS: Array<{ key: string; babCode: string; title: string; match: (s: SimulationItem) => boolean }> = [
  {
    key: 't4-bab2',
    babCode: 'Bab 2',
    title: 'Jirim dan Struktur Atom',
    match: (s) => s.chapter.startsWith('Bab 2:'),
  },
  {
    key: 't4-bab3',
    babCode: 'Bab 3',
    title: 'Konsep Mol, Formula dan Persamaan Kimia',
    match: (s) => s.chapter.startsWith('Bab 3:'),
  },
  {
    key: 't4-bab4',
    babCode: 'Bab 4',
    title: 'Jadual Berkala Unsur',
    match: (s) => s.chapter.startsWith('Bab 4:'),
  },
  {
    key: 't4-bab5',
    babCode: 'Bab 5',
    title: 'Ikatan Kimia',
    match: (s) => s.chapter.startsWith('Bab 5:') || s.chapter.startsWith('Bab 4 & Bab 5:'),
  },
  {
    key: 't4-bab6',
    babCode: 'Bab 6',
    title: 'Asid, Bes dan Garam',
    match: (s) => s.chapter.startsWith('Bab 6:'),
  },
  {
    key: 't4-bab7',
    babCode: 'Bab 7',
    title: 'Kadar Tindak Balas',
    match: (s) => s.chapter.startsWith('Bab 7:'),
  },
  {
    key: 't4-bab8',
    babCode: 'Bab 8',
    title: 'Bahan Buatan dalam Industri',
    match: (s) => s.chapter.startsWith('Bab 8:'),
  },
];

const T5_TOPICS: Array<{ key: string; babCode: string; title: string; match: (s: SimulationItem) => boolean }> = [
  {
    key: 't5-bab1',
    babCode: 'Bab 1',
    title: 'Keseimbangan Redoks',
    match: (s) => s.chapter.startsWith('Bab 1:'),
  },
  {
    key: 't5-bab2',
    babCode: 'Bab 2',
    title: 'Sebatian Karbon',
    match: (s) => s.chapter.startsWith('Bab 2:'),
  },
  {
    key: 't5-bab3',
    babCode: 'Bab 3',
    title: 'Termokimia',
    match: (s) => s.chapter.startsWith('Bab 3:'),
  },
  {
    key: 't5-bab4',
    babCode: 'Bab 4',
    title: 'Kimia Polimer',
    match: (s) => s.chapter.startsWith('Bab 4:'),
  },
  {
    key: 't5-bab5',
    babCode: 'Bab 5',
    title: 'Kimia Konsumer dan Industri',
    match: (s) => s.chapter.startsWith('Bab 5:'),
  },
];

function groupByTopics(sims: SimulationItem[], defs: typeof T4_TOPICS): TopicGroup[] {
  return defs
    .map((def) => ({
      key: def.key,
      babCode: def.babCode,
      title: def.title,
      items: sims.filter(def.match),
    }))
    .filter((group) => group.items.length > 0);
}

export const App: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<SimulationAnalytics>(analytics.getAnalytics());
  const [selectedSimulation, setSelectedSimulation] = useState<SimulationItem | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const simId = params.get('sim') || params.get('id') || (window.location.hash ? window.location.hash.replace('#', '') : '');
      if (simId) {
        const found = SIMULATIONS_DATA.find((s) => s.id === simId);
        if (found) return found;
      }
    }
    return null;
  });

  // Listen to popstate or direct link changes
  useEffect(() => {
    const handleCheckUrlSim = () => {
      const params = new URLSearchParams(window.location.search);
      const simId = params.get('sim') || params.get('id') || (window.location.hash ? window.location.hash.replace('#', '') : '');
      if (simId) {
        const found = SIMULATIONS_DATA.find((s) => s.id === simId);
        if (found) setSelectedSimulation(found);
      }
    };
    window.addEventListener('popstate', handleCheckUrlSim);
    window.addEventListener('hashchange', handleCheckUrlSim);
    return () => {
      window.removeEventListener('popstate', handleCheckUrlSim);
      window.removeEventListener('hashchange', handleCheckUrlSim);
    };
  }, []);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState<boolean>(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const [showAdminModal, setShowAdminModal] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('admin') === '1';
    }
    return false;
  });
  const [activeFormTab, setActiveFormTab] = useState<'all' | FormLevel>('all');
  const [selectedT4Topic, setSelectedT4Topic] = useState<string>('all');
  const [selectedT5Topic, setSelectedT5Topic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const heroRef = useRef<HTMLElement | null>(null);
  const bentoRef = useRef<HTMLElement | null>(null);
  const catalogRef = useRef<HTMLElement | null>(null);
  const t4Ref = useRef<HTMLElement | null>(null);
  const t5Ref = useRef<HTMLElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const updated = analytics.recordHomeVisit();
    setAnalyticsData(updated);

    const unsubscribe = analytics.subscribe((data) => {
      setAnalyticsData({ ...data });
    });

    return () => unsubscribe();
  }, []);

  // Scrollytelling reveal observer
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.apple-reveal'));
    if (elements.length === 0) return;

    if (typeof IntersectionObserver === 'undefined') {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const vh = window.innerHeight || 800;
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh + 80) {
        el.classList.add('is-visible');
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );

    elements.forEach((el) => {
      if (!el.classList.contains('is-visible')) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [activeFormTab, selectedT4Topic, selectedT5Topic, searchQuery]);

  const t4Sims = useMemo(
    () => SIMULATIONS_DATA.filter((s) => s.form === 'Tingkatan 4'),
    []
  );
  const t5Sims = useMemo(
    () => SIMULATIONS_DATA.filter((s) => s.form === 'Tingkatan 5'),
    []
  );

  const t4Groups = useMemo(() => groupByTopics(t4Sims, T4_TOPICS), [t4Sims]);
  const t5Groups = useMemo(() => groupByTopics(t5Sims, T5_TOPICS), [t5Sims]);

  const visibleT4Groups = useMemo(
    () =>
      selectedT4Topic === 'all'
        ? t4Groups
        : t4Groups.filter((g) => g.key === selectedT4Topic),
    [t4Groups, selectedT4Topic]
  );

  const visibleT5Groups = useMemo(
    () =>
      selectedT5Topic === 'all'
        ? t5Groups
        : t5Groups.filter((g) => g.key === selectedT5Topic),
    [t5Groups, selectedT5Topic]
  );

  const searchFilteredSimulations = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return [];
    return SIMULATIONS_DATA.filter((sim) => {
      const matchesForm = activeFormTab === 'all' || sim.form === activeFormTab;
      const matchesSearch =
        sim.title.toLowerCase().includes(query) ||
        sim.chapter.toLowerCase().includes(query) ||
        sim.category.toLowerCase().includes(query) ||
        sim.tags.some((t) => t.toLowerCase().includes(query));
      return matchesForm && matchesSearch;
    });
  }, [activeFormTab, searchQuery]);

  const t4Count = t4Sims.length;
  const t5Count = t5Sims.length;

  const handleLaunchById = (simId: string) => {
    const found = SIMULATIONS_DATA.find((s) => s.id === simId);
    if (found) setSelectedSimulation(found);
  };

  const scrollToElement = (el: HTMLElement | null) => {
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleNavigateSection = (section: 'hero' | 'bento' | 't4' | 't5') => {
    if (section === 'hero') {
      scrollToElement(heroRef.current);
      return;
    }
    if (section === 'bento') {
      scrollToElement(bentoRef.current);
      return;
    }
    if (section === 't4') {
      setSearchQuery('');
      setActiveFormTab('Tingkatan 4');
      window.setTimeout(() => scrollToElement(t4Ref.current ?? catalogRef.current), 60);
      return;
    }
    if (section === 't5') {
      setSearchQuery('');
      setActiveFormTab('Tingkatan 5');
      window.setTimeout(() => scrollToElement(t5Ref.current ?? catalogRef.current), 60);
    }
  };

  const handleFocusSearch = () => {
    scrollToElement(catalogRef.current);
    window.setTimeout(() => searchInputRef.current?.focus(), 320);
  };

  const renderT4Section = () => (
    <section
      ref={t4Ref}
      id="tingkatan-4"
      data-testid="section-tingkatan-4"
      className="scroll-mt-20 rounded-[32px] p-6 sm:p-10 bg-[#f5f5f7] border border-black/[0.05] space-y-8"
    >
      {/* Apple Clean Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-black/[0.07]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-[#0071e3]">
            <Layers className="w-3.5 h-3.5" />
            <span>Kurikulum Standard Sekolah Menengah</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-3">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1d1d1f] tracking-tight">
              Tingkatan 4.
            </h2>
            <span className="text-base sm:text-lg font-medium text-[#6e6e73]">
              Bab 2 hingga Bab 8 · {t4Count} Simulasi
            </span>
          </div>
        </div>
      </div>

      {/* Topic Filter Pills */}
      <div
        className="flex flex-wrap items-center gap-2"
        role="tablist"
        aria-label="Penapis topik Tingkatan 4"
      >
        <button
          type="button"
          data-testid="t4-topic-all"
          onClick={() => setSelectedT4Topic('all')}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
            selectedT4Topic === 'all'
              ? 'bg-[#1d1d1f] text-white shadow-xs'
              : 'bg-white text-[#1d1d1f]/80 border border-black/[0.07] hover:border-black/20'
          }`}
        >
          Semua Topik ({t4Count})
        </button>
        {t4Groups.map((group) => {
          const isActive = selectedT4Topic === group.key;
          return (
            <button
              key={group.key}
              type="button"
              data-testid={`t4-topic-${group.key}`}
              onClick={() => setSelectedT4Topic(group.key)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#0071e3] text-white shadow-xs'
                  : 'bg-white text-[#1d1d1f]/80 border border-black/[0.07] hover:border-[#0071e3]/40'
              }`}
            >
              <span>{group.babCode}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#f5f5f7] text-[#6e6e73]'
                }`}
              >
                {group.items.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Topic Horizontal Slideable Carousels */}
      <div className="space-y-8">
        {visibleT4Groups.map((group) => (
          <TopicCarouselRow
            key={group.key}
            groupKey={group.key}
            babCode={group.babCode}
            title={group.title}
            items={group.items}
            accentTheme="blue"
            analyticsData={analyticsData}
            onSelectSimulation={setSelectedSimulation}
          />
        ))}
      </div>
    </section>
  );

  const renderT5Section = () => (
    <section
      ref={t5Ref}
      id="tingkatan-5"
      data-testid="section-tingkatan-5"
      className="scroll-mt-20 rounded-[32px] p-6 sm:p-10 bg-white border border-black/[0.08] apple-bento-shadow space-y-8"
    >
      {/* Apple Clean Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-black/[0.07]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-[#059669]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Kurikulum Standard Sekolah Menengah</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-3">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1d1d1f] tracking-tight">
              Tingkatan 5.
            </h2>
            <span className="text-base sm:text-lg font-medium text-[#6e6e73]">
              Bab 1 hingga Bab 5 · {t5Count} Simulasi
            </span>
          </div>
        </div>
      </div>

      {/* Topic Filter Pills */}
      <div
        className="flex flex-wrap items-center gap-2"
        role="tablist"
        aria-label="Penapis topik Tingkatan 5"
      >
        <button
          type="button"
          data-testid="t5-topic-all"
          onClick={() => setSelectedT5Topic('all')}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
            selectedT5Topic === 'all'
              ? 'bg-[#1d1d1f] text-white shadow-xs'
              : 'bg-[#f5f5f7] text-[#1d1d1f]/80 hover:bg-black/[0.07]'
          }`}
        >
          Semua Topik ({t5Count})
        </button>
        {t5Groups.map((group) => {
          const isActive = selectedT5Topic === group.key;
          return (
            <button
              key={group.key}
              type="button"
              data-testid={`t5-topic-${group.key}`}
              onClick={() => setSelectedT5Topic(group.key)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#059669] text-white shadow-xs'
                  : 'bg-[#f5f5f7] text-[#1d1d1f]/80 hover:bg-[#ecfdf5] hover:text-[#047857]'
              }`}
            >
              <span>{group.babCode}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${
                  isActive ? 'bg-white/20 text-white' : 'bg-white text-[#6e6e73]'
                }`}
              >
                {group.items.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Topic Horizontal Slideable Carousels */}
      <div className="space-y-8">
        {visibleT5Groups.map((group) => (
          <TopicCarouselRow
            key={group.key}
            groupKey={group.key}
            babCode={group.babCode}
            title={group.title}
            items={group.items}
            accentTheme="emerald"
            analyticsData={analyticsData}
            onSelectSimulation={setSelectedSimulation}
          />
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] flex flex-col justify-between selection:bg-[#0071e3] selection:text-white">
      <div>
        {/* Sticky Apple Frosted Glass Navbar */}
        <Header
          totalVisitors={analyticsData.totalHomeVisits}
          onOpenAnalytics={() => setShowAnalyticsModal(true)}
          onOpenGuide={() => setShowGuideModal(true)}
          onNavigateSection={handleNavigateSection}
          onFocusSearch={handleFocusSearch}
        />

        {/* SECTION 1: APPLE HERO WITH GENEROUS WHITESPACE & STUDIO SHOWCASE */}
        <section
          ref={heroRef}
          id="hero"
          className="relative bg-white pt-7 sm:pt-10 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden"
        >
          <div className="max-w-5xl mx-auto text-center space-y-3.5 apple-reveal is-visible">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5f5f7] border border-black/[0.06] text-[11px] font-semibold text-[#6e6e73] tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>MRSM Bagan Datuk · Kami Nak Kimia A+</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-[58px] leading-[1.06] tracking-[-0.03em] text-[#1d1d1f]">
              Makmal Maya Kimia.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071e3] via-[#4f46e5] to-[#059669]">
                Dirumus untuk A+.
              </span>
            </h1>

            <p className="text-sm sm:text-[18px] text-[#6e6e73] font-normal max-w-2xl mx-auto leading-relaxed">
              {SIMULATIONS_DATA.length} simulasi interaktif Kimia SPM KSSM — gabungkan pemerhatian makroskopik, zarah submikroskopik dan pengiraan langkah demi langkah.
            </p>

            {/* Primary Apple Liquid Glass CTAs */}
            <div className="pt-1 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => scrollToElement(catalogRef.current)}
                className="liquid-glass-blue px-6 py-3 rounded-full text-white text-sm font-semibold inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Teroka Simulasi</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleNavigateSection('t5')}
                className="liquid-glass-btn px-6 py-3 rounded-full text-[#1d1d1f] text-sm font-semibold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Lihat Tingkatan 5</span>
                <ChevronRight className="w-4 h-4 text-[#6e6e73]" />
              </button>

              <button
                type="button"
                onClick={() => setShowGuideModal(true)}
                className="liquid-glass-btn px-5 py-3 rounded-full text-[#0071e3] hover:text-[#005bb5] text-sm font-semibold inline-flex items-center gap-1.5 cursor-pointer border-[#0071e3]/30"
              >
                <HelpCircle className="w-4 h-4 text-[#0071e3]" />
                <span>Panduan Penggunaan</span>
              </button>
            </div>
          </div>

          {/* High-Craft Studio Product Showcase with Scrollytelling Parallax */}
          <AppleHeroShowcase onLaunchById={handleLaunchById} />
        </section>

        {/* SECTION 2: APPLE BENTO GRID FEATURE HIGHLIGHTS */}
        <section
          ref={bentoRef}
          id="bento"
          className="scroll-mt-16 bg-[#f5f5f7] border-y border-black/[0.05] py-16 sm:py-24 px-4 sm:px-6"
        >
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="apple-reveal text-center sm:text-left max-w-2xl space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0071e3]">
                Sorotan Pembelajaran
              </p>
              <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-[#1d1d1f]">
                Lebih jelas. Lebih mendalam.
              </h2>
              <p className="text-base text-[#6e6e73]">
                Setiap eksperimen disusun mengikut format rasmi buku teks KSSM agar pelajar terus faham tanpa kekeliruan.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Bento Card 1 (Large Dark Hero Tile) */}
              <button
                type="button"
                onClick={() => handleLaunchById('elektrolisis')}
                className="apple-reveal md:col-span-7 text-left rounded-[28px] p-7 sm:p-8 bg-[#111114] text-white border border-white/10 apple-bento-shadow-hover cursor-pointer flex flex-col justify-between min-h-[250px] relative overflow-hidden"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl"
                />
                <div className="relative z-10 space-y-3 max-w-lg">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-sky-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Visualisasi Aras Johnstone</span>
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl leading-tight">
                    Nampak atom &amp; elektron bergerak secara masa nyata.
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed">
                    Selaraskan pemerhatian bikar makroskopik bersama nyahcas ion pada anod dan katod dalam satu paparan serentak.
                  </p>
                </div>

                <div className="relative z-10 pt-6 flex items-center justify-between">
                  <span className="text-xs font-semibold text-sky-400 inline-flex items-center gap-1">
                    Cuba Elektrolisis <ArrowUpRight className="w-4 h-4" />
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_12px_#fbbf24]" />
                    <span className="w-3 h-3 rounded-full bg-sky-400 shadow-[0_0_12px_#38bdf8]" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
                  </div>
                </div>
              </button>

              {/* Bento Card 2 (Clean White Calculation Card) */}
              <button
                type="button"
                onClick={() => handleLaunchById('haba-pembakaran')}
                className="apple-reveal md:col-span-5 text-left rounded-[28px] p-7 sm:p-8 bg-white border border-black/[0.06] apple-bento-shadow apple-bento-shadow-hover cursor-pointer flex flex-col justify-between min-h-[250px]"
              >
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-[#1d1d1f] leading-tight">
                    Perancang pengiraan langkah demi langkah.
                  </h3>
                  <p className="text-sm text-[#6e6e73] leading-relaxed">
                    Daripada Q = mcθ hingga ΔH dan gambar rajah aras tenaga buku teks Rajah 3.1.
                  </p>
                </div>

                <div className="pt-6 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0071e3] inline-flex items-center gap-1">
                    Buka Termokimia <ArrowUpRight className="w-4 h-4" />
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#1d1d1f] bg-[#f5f5f7] px-3 py-1 rounded-full">
                    ΔH = -1260 kJ
                  </span>
                </div>
              </button>

              {/* Bento Card 3 (Clean White Molecular Builder Card) */}
              <button
                type="button"
                onClick={() => handleLaunchById('penentuan-isomer')}
                className="apple-reveal md:col-span-5 text-left rounded-[28px] p-7 sm:p-8 bg-white border border-black/[0.06] apple-bento-shadow apple-bento-shadow-hover cursor-pointer flex flex-col justify-between min-h-[220px]"
              >
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Atom className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-[#1d1d1f] leading-tight">
                    Bina struktur karbon &amp; sahkan isomer IUPAC.
                  </h3>
                  <p className="text-sm text-[#6e6e73] leading-relaxed">
                    Susun rantai alkana, alkena &amp; alkohol secara interaktif untuk mengumpul semua isomer sah.
                  </p>
                </div>

                <div className="pt-5">
                  <span className="text-xs font-semibold text-[#0071e3] inline-flex items-center gap-1">
                    Bina Isomer Sekarang <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </button>

              {/* Bento Card 4 (Quick Form Navigation Bento Card) */}
              <div className="apple-reveal md:col-span-7 rounded-[28px] p-7 sm:p-8 bg-gradient-to-br from-[#eef4ff] via-[#f5f7ff] to-[#ecfdf5] border border-black/[0.06] apple-bento-shadow flex flex-col justify-between min-h-[220px]">
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0071e3]">
                    Navigasi Pantas Mengikut Tingkatan
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#1d1d1f]">
                    {SIMULATIONS_DATA.length} Simulasi KSSM Lengkap.
                  </h3>
                  <p className="text-sm text-[#6e6e73] max-w-lg">
                    Pilih tingkatan anda untuk terus melompat ke senarai eksperimen yang tersusun kemas mengikut bab.
                  </p>
                </div>

                <div className="pt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => handleNavigateSection('t4')}
                    className="px-5 py-2.5 rounded-full bg-white hover:bg-[#0071e3] text-[#1d1d1f] hover:text-white border border-black/[0.08] text-xs font-semibold inline-flex items-center gap-2 transition cursor-pointer shadow-2xs"
                  >
                    <span>Tingkatan 4 ({t4Count} Simulasi)</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavigateSection('t5')}
                    className="px-5 py-2.5 rounded-full bg-white hover:bg-[#059669] text-[#1d1d1f] hover:text-white border border-black/[0.08] text-xs font-semibold inline-flex items-center gap-2 transition cursor-pointer shadow-2xs"
                  >
                    <span>Tingkatan 5 ({t5Count} Simulasi)</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: CLEAN SIMULATION CATALOG & SPOTLIGHT FILTER */}
        <main
          ref={catalogRef}
          id="katalog"
          className="scroll-mt-16 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 space-y-10"
        >
          {/* Catalog Heading + Apple Segmented Control & Spotlight Search */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#86868b]">
                  Direktori Makmal Maya
                </p>
                <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#1d1d1f]">
                  Pilih eksperimen anda.
                </h2>
              </div>

              {/* Search Input (Apple Spotlight Pill) */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-[#86868b] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Cari eksperimen, topik, gas, radas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#f5f5f7] border border-transparent rounded-full pl-10 pr-9 py-2.5 text-xs font-medium text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:bg-white focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/20 transition"
                />
                {searchQuery && (
                  <button
                    type="button"
                    aria-label="Kosongkan carian"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#86868b] hover:text-[#1d1d1f] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sticky Floating Apple Liquid Glass Segmented Control (Semua / T4 / T5) */}
          <div className="sticky top-14 sm:top-16 z-30 py-1 pointer-events-none">
            <div className="liquid-glass-bar pointer-events-auto inline-flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full max-w-full overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveFormTab('all')}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                  activeFormTab === 'all'
                    ? 'liquid-glass-btn text-[#1d1d1f]'
                    : 'text-[#424245] hover:text-[#1d1d1f] hover:bg-white/40'
                }`}
              >
                Semua ({SIMULATIONS_DATA.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveFormTab('Tingkatan 4')}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeFormTab === 'Tingkatan 4'
                    ? 'liquid-glass-blue text-white'
                    : 'text-[#424245] hover:text-[#1d1d1f] hover:bg-white/40'
                }`}
              >
                <span>Tingkatan 4</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${
                    activeFormTab === 'Tingkatan 4' ? 'bg-white/25 text-white' : 'bg-black/[0.06] text-[#424245]'
                  }`}
                >
                  {t4Count}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFormTab('Tingkatan 5')}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeFormTab === 'Tingkatan 5'
                    ? 'liquid-glass-emerald text-white'
                    : 'text-[#424245] hover:text-[#1d1d1f] hover:bg-white/40'
                }`}
              >
                <span>Tingkatan 5</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${
                    activeFormTab === 'Tingkatan 5' ? 'bg-white/25 text-white' : 'bg-black/[0.06] text-[#424245]'
                  }`}
                >
                  {t5Count}
                </span>
              </button>
            </div>
          </div>

          {/* Simulations Content */}
          {!searchQuery.trim() ? (
            <div className="space-y-12">
              {(activeFormTab === 'all' || activeFormTab === 'Tingkatan 4') && renderT4Section()}
              {(activeFormTab === 'all' || activeFormTab === 'Tingkatan 5') && renderT5Section()}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs text-[#6e6e73]">
                <span>Memaparkan {searchFilteredSimulations.length} simulasi untuk "{searchQuery}"</span>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-[#0071e3] font-semibold hover:underline cursor-pointer"
                >
                  Kosongkan carian
                </button>
              </div>

              {searchFilteredSimulations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchFilteredSimulations.map((sim) => (
                    <SimulationCard
                      key={sim.id}
                      simulation={sim}
                      views={analyticsData.simulations[sim.id]?.views || 0}
                      completed={analyticsData.simulations[sim.id]?.completed || 0}
                      onSelect={setSelectedSimulation}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-[#f5f5f7] rounded-[28px] space-y-4">
                  <p className="text-[#6e6e73] text-sm">
                    Tiada simulasi ditemui untuk carian "{searchQuery}".
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="px-5 py-2.5 rounded-full bg-[#0071e3] text-white text-xs font-semibold cursor-pointer"
                  >
                    Papar Semua Eksperimen
                  </button>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Ruangan Khas Guru: e-RPH Kimia */}
        <div className="mt-14 mb-4">
          <TeacherErphSection />
        </div>
      </div>

      {/* Interactive Simulation Modal */}
      <SimulationModal
        simulation={selectedSimulation}
        onClose={() => setSelectedSimulation(null)}
        onOpenGuide={() => setShowGuideModal(true)}
      />

      {/* Analytics Modal */}
      {showAnalyticsModal && (
        <Suspense fallback={null}>
          <AnalyticsModal
            analyticsData={analyticsData}
            onClose={() => setShowAnalyticsModal(false)}
            onOpenAdmin={() => {
              setShowAnalyticsModal(false);
              setShowAdminModal(true);
            }}
          />
        </Suspense>
      )}

      {/* In-App Direct Feedback Modal */}
      {showFeedbackModal && (
        <Suspense fallback={null}>
          <FeedbackModal
            isOpen={showFeedbackModal}
            onClose={() => setShowFeedbackModal(false)}
          />
        </Suspense>
      )}

      {/* Interactive User Guide Modal */}
      {showGuideModal && (
        <Suspense fallback={null}>
          <UserGuideModal
            isOpen={showGuideModal}
            onClose={() => setShowGuideModal(false)}
            onSelectSimulationById={handleLaunchById}
          />
        </Suspense>
      )}

      {/* Admin Daily Analytics Modal (PIN Protected) */}
      {showAdminModal && (
        <Suspense fallback={null}>
          <AdminAnalyticsModal
            isOpen={showAdminModal}
            onClose={() => setShowAdminModal(false)}
          />
        </Suspense>
      )}

      {/* Floating Quick Reference Help Button */}
      <button
        type="button"
        onClick={() => setShowGuideModal(true)}
        aria-label="Panduan Penggunaan & Navigasi Web App"
        title="Perlukan bantuan untuk menggunakan web app? Klik untuk panduan pantas!"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 liquid-glass-btn px-3 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-lg border border-white/80 flex items-center gap-2 text-xs font-semibold text-[#1d1d1f] hover:text-[#0071e3] hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer bg-white/85 backdrop-blur-md"
      >
        <div className="w-5 h-5 rounded-full bg-[#0071e3] text-white flex items-center justify-center text-[11px] font-bold shadow-2xs">
          ?
        </div>
        <span className="hidden xs:inline">Panduan</span>
        <span className="hidden sm:inline">Penggunaan</span>
      </button>

      {/* Minimalist Footer */}
      <Footer
        onOpenFeedback={() => setShowFeedbackModal(true)}
        onOpenGuide={() => setShowGuideModal(true)}
        onOpenAdmin={() => setShowAdminModal(true)}
      />
    </div>
  );
};

export default App;
