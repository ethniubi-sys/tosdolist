export type Phase = 'onboarding-1' | 'onboarding-2' | 'onboarding-3' | 'dashboard' | 'progress';

export interface Habit {
  goal: string;
  microAction: string;
  time: string;
  period: 'AM' | 'PM';
  streak: number;
  lastCheckIn: string | null;
  history: string[];
}
