import { UserStudyProgress } from './nota';

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  school?: string;
  state?: string;
  avatar: string;
  isPremium: boolean;
  role?: 'admin' | 'student';
  redeemedCode?: string;
  examAttemptsCount: number;
  createdAt: number;
  lastLoginAt?: number;
  loginCount?: number;
  xp?: number;
  completedSubtopicsCount?: number;
  quizAccuracy?: number;
  badgesCount?: number;
  studyProgress?: UserStudyProgress;
  directGrantNote?: string;
  directGrantedAt?: number;
  directGrantedBy?: string;
}

export interface RedeemedCodeRecord {
  code: string;
  redeemedByEmail: string;
  redeemedByName: string;
  redeemedAt: number;
}

export interface GeneratedAccessCode {
  code: string;
  note?: string;
  targetEmail?: string;
  createdAt: number;
  isRedeemed: boolean;
  redeemedByEmail?: string;
  redeemedByName?: string;
  redeemedAt?: number;
}

export type AccessTier = 'free' | 'premium';
