import { motion } from 'motion/react';
import { ArrowForward, Lightbulb, Check } from '../components/Icons';
import { useLanguage } from '../i18n/LanguageContext';
import type { Habit } from '../types';

interface Props {
  habit: Habit;
  updateHabit: (partial: Partial<Habit>) => void;
  onNext: () => void;
}

export default function Onboarding2({ habit, updateHabit, onNext }: Props) {
  const { t } = useLanguage();
  const s = t.onboarding2;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-2xl px-6 mt-2"
    >
      <div className="mb-5 text-center md:text-left">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary-container text-on-primary-container text-xs font-bold tracking-widest uppercase font-headline mb-3">
          {s.phase}
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold font-headline text-on-surface leading-tight tracking-tighter">
          {s.title} <br className="hidden md:block"/> {s.titleLine2}
        </h2>
      </div>

      <section className="space-y-5">
        <div className="space-y-3">
          <label className="block text-base font-semibold text-on-surface font-headline leading-snug">
            {s.label}
          </label>
          <div className="relative group">
            <input
              type="text"
              value={habit.microAction}
              onChange={(e) => updateHabit({ microAction: e.target.value })}
              className="w-full bg-surface-container-highest border-2 border-transparent rounded-xl px-5 py-3.5 text-base font-medium text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary-container/60 transition-all duration-300"
              placeholder={s.placeholder}
            />
          </div>
        </div>

        <div className="bg-surface-container-low rounded-xl p-4 space-y-2.5 relative overflow-hidden group">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-container/20 rounded-full blur-2xl group-hover:bg-primary-container/40 transition-colors"></div>
          <div className="flex items-start gap-3">
            <div className="text-primary"><Lightbulb /></div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary font-headline">{s.scienceTitle}</h3>
          </div>
          <p className="text-on-surface-variant leading-relaxed text-sm font-medium">
            {s.scienceBody}<span className="text-on-surface border-b-2 border-primary-container">{s.scienceHighlight}</span>{s.scienceEnd}
          </p>
          <div className="pt-2 flex items-center gap-2">
            <div className="h-1.5 w-8 rounded-full bg-primary"></div>
            <div className="h-1.5 w-16 rounded-full bg-primary-container"></div>
            <div className="h-1.5 w-24 rounded-full bg-surface-container-highest"></div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex -space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary-fixed border-4 border-background flex items-center justify-center">
              <div className="text-xs text-on-primary-fixed"><Check /></div>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary-container border-4 border-background flex items-center justify-center text-xs font-bold text-on-primary-container font-headline">
              2
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-container-highest border-4 border-background flex items-center justify-center text-xs font-bold text-on-surface-variant font-headline">
              3
            </div>
          </div>
          <button
            onClick={onNext}
            disabled={!habit.microAction}
            className="w-full md:w-auto px-10 py-3 bg-primary-container text-on-primary-container font-bold rounded-full text-base shadow-lg shadow-primary-container/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {s.next}
            <ArrowForward />
          </button>
        </div>
      </section>
    </motion.div>
  );
}
