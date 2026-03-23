import { motion } from 'motion/react';
import { Bolt, Tune, LocalFireDepartment, AutoAwesome } from '../components/Icons';
import { useLanguage } from '../i18n/LanguageContext';
import type { Habit } from '../types';

interface Props {
  habit: Habit;
  onReset: () => void;
}

export default function Progress({ habit, onReset }: Props) {
  const { t } = useLanguage();
  const s = t.progress;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto space-y-5 px-6 mt-2"
    >
      <section className="relative overflow-hidden p-5 rounded-xl bg-gradient-to-br from-primary-container to-surface-bright">
        <div className="relative z-10 flex flex-col gap-1">
          <span className="text-on-primary-container/60 font-label font-bold tracking-widest uppercase text-xs">{s.momentum}</span>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-headline font-extrabold text-on-primary-container tracking-tighter">{habit.streak}</span>
            <span className="text-xl font-headline font-semibold text-on-primary-container/80">{s.dayStreak}</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-on-primary-container font-semibold">
            <div className="text-primary"><LocalFireDepartment filled /></div>
            <span className="font-label text-sm">{s.topAchiever}</span>
          </div>
        </div>
        <div className="absolute -right-8 -bottom-8 opacity-10 text-[10rem] text-primary">
          <AutoAwesome />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-headline font-bold text-on-surface tracking-tight">{s.monthlyProgress}</h2>
            <p className="text-on-surface-variant text-sm font-medium">{s.october}</p>
          </div>
          <div className="text-right">
            <span className="block text-primary font-headline font-bold text-xl">82%</span>
            <span className="text-xs font-label uppercase text-outline font-bold tracking-wider">{s.consistencyLabel}</span>
          </div>
        </div>
        <div className="bg-surface-container-low p-4 rounded-xl">
          <div className="grid grid-cols-7 gap-y-2 gap-x-1.5 text-center">
            {s.days.map(day => (
              <div key={day} className="text-[10px] font-label font-bold text-outline-variant uppercase mb-1">{day}</div>
            ))}
            {Array.from({ length: 31 }).map((_, i) => {
              const day = i + 1;
              const isCompleted = habit.history.some(d => d.endsWith(`-${String(day).padStart(2, '0')}`));
              return (
                <div key={i} className="h-8 flex items-center justify-center relative">
                  <span className={`z-10 text-xs font-bold ${isCompleted ? 'text-on-primary-container' : 'text-on-surface'}`}>{day}</span>
                  {isCompleted && (
                    <div className="absolute inset-0 m-auto w-6 h-6 rounded-full bg-primary-container"></div>
                  )}
                  {!isCompleted && day < 15 && (
                    <div className="absolute inset-0 m-auto w-6 h-6 rounded-full border border-outline-variant/20"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 shadow-sm">
          <div className="text-primary mb-1"><Bolt filled /></div>
          <h3 className="font-headline font-bold text-on-surface text-sm">{s.totalAchievements}</h3>
          <p className="text-2xl font-headline font-extrabold text-on-surface mt-0.5">128</p>
          <p className="text-xs text-on-surface-variant font-medium mt-1">{s.thisMonth}</p>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 shadow-sm">
          <div className="text-primary mb-1"><LocalFireDepartment /></div>
          <h3 className="font-headline font-bold text-on-surface text-sm">{s.evolvedState}</h3>
          <p className="text-2xl font-headline font-extrabold text-on-surface mt-0.5">Level 4</p>
          <p className="text-xs text-on-surface-variant font-medium mt-1">{s.xpToNext}</p>
        </div>
      </section>

      <div className="pt-2 pb-16">
        <button
          onClick={onReset}
          className="w-full bg-primary-container text-on-primary-container font-headline font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-primary-container/20"
        >
          <Tune />
          {s.adjustGoal}
        </button>
      </div>
    </motion.div>
  );
}
