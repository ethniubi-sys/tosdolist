import { motion } from 'motion/react';
import { ArrowForward, Lightbulb } from '../components/Icons';
import { useLanguage } from '../i18n/LanguageContext';
import type { Habit } from '../types';

interface Props {
  habit: Habit;
  updateHabit: (partial: Partial<Habit>) => void;
  onNext: () => void;
}

export default function Onboarding1({ habit, updateHabit, onNext }: Props) {
  const { t } = useLanguage();
  const s = t.onboarding1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl px-6 mt-2"
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="px-4 py-1.5 rounded-full bg-primary-container text-on-primary-container text-xs font-bold tracking-widest uppercase font-headline">{s.phase}</span>
        <div className="h-1 flex-grow bg-surface-container rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-primary-container"></div>
        </div>
      </div>

      <div className="mb-5">
        <h2 className="text-2xl md:text-3xl font-extrabold font-headline text-on-surface tracking-tight mb-2.5 leading-tight">
          {s.titleLine1} <br/>
          <span className="text-primary italic">{s.titleLine2}</span>
        </h2>
        <div className="bg-white/40 border-l-4 border-primary-container p-3.5 rounded-r-2xl backdrop-blur-sm surface-container-low transition-all hover:surface-container-high">
          <div className="flex gap-3">
            <div className="text-primary"><Lightbulb filled /></div>
            <p className="text-on-surface-variant text-sm leading-relaxed">{s.tip}</p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="relative group rounded-2xl overflow-hidden">
          <input
            type="text"
            value={habit.goal}
            onChange={(e) => updateHabit({ goal: e.target.value })}
            className="w-full bg-surface-container-lowest border-2 border-transparent rounded-2xl px-6 py-4 text-lg md:text-xl font-headline font-medium text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary-container/60 transition-all editorial-shadow"
            placeholder={s.placeholder}
          />
        </div>
        <div className="flex justify-between items-center pt-2">
          <p className="text-on-surface-variant font-medium text-sm">{s.hint}</p>
          <button
            onClick={onNext}
            disabled={!habit.goal}
            className="bg-primary-container text-on-primary-container px-8 py-3 rounded-full font-headline font-bold text-base hover:opacity-90 transition-all active:scale-95 flex items-center gap-3 editorial-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {s.next}
            <ArrowForward />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
