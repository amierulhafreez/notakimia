export type FormLevel = 'Tingkatan 4' | 'Tingkatan 5';

export type SimulationCategory = 
  | 'Jirim & Struktur Atom'
  | 'Ikatan Kimia'
  | 'Jadual Berkala'
  | 'Asid, Bes & Garam'
  | 'Kadar Tindak Balas'
  | 'Elektrokimia'
  | 'Termokimia'
  | 'Kimia Karbon'
  | 'Polimer & Bahan Industri';

export interface SimulationItem {
  id: string;
  title: string;
  form: FormLevel;
  chapter: string;
  category: SimulationCategory;
  description: string;
  learningStandard: string; // Kod DSKP / Objektif
  iconName: string;
  colorTheme: string; // e.g. 'purple', 'emerald', 'cyan', 'amber', 'rose'
  isImplemented: boolean;
  tags: string[];
}

export interface SimulationAnalytics {
  totalHomeVisits: number;
  simulations: Record<string, {
    views: number;
    clicks: number;
    completed: number;
  }>;
}
