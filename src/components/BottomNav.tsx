import { CheckCircle, Insights } from './Icons';
import { useLanguage } from '../i18n/LanguageContext';

interface BottomNavProps {
  active: 'tasks' | 'progress';
  onNavigate: (target: 'dashboard' | 'progress') => void;
}

export default function BottomNav({ active, onNavigate }: BottomNavProps) {
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-4 left-4 right-4 flex justify-around items-center px-4 py-2 bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_4px_24px_0_rgba(0,0,0,0.08)] z-50">
      <button
        onClick={() => onNavigate('dashboard')}
        className={`flex flex-col items-center justify-center rounded-2xl px-6 py-2 transition-all active:scale-90 duration-200 ${active === 'tasks' ? 'bg-primary-container text-on-primary-container' : 'text-outline'}`}
      >
        <CheckCircle filled={active === 'tasks'} />
        <span className="font-body text-xs font-medium mt-1">{t.nav.tasks}</span>
      </button>
      <button
        onClick={() => onNavigate('progress')}
        className={`flex flex-col items-center justify-center rounded-2xl px-6 py-2 transition-all active:scale-90 duration-200 ${active === 'progress' ? 'bg-primary-container text-on-primary-container' : 'text-outline'}`}
      >
        <Insights filled={active === 'progress'} />
        <span className="font-body text-xs font-medium mt-1">{t.nav.progress}</span>
      </button>
    </nav>
  );
}
