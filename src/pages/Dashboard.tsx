import { motion } from 'motion/react';
import { Bolt, Notifications, CheckCircle } from '../components/Icons';
import { useLanguage } from '../i18n/LanguageContext';
import type { Habit } from '../types';

interface Props {
  habit: Habit;
  onCheckIn: () => void;
}

export default function Dashboard({ habit, onCheckIn }: Props) {
  const { t } = useLanguage();
  const s = t.dashboard;
  const today = new Date().toISOString().split('T')[0];
  const isDone = habit.lastCheckIn === today;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-lg mx-auto flex flex-col items-center px-6 mt-2"
    >
      <section className="w-full mb-2 flex flex-col gap-0.5">
        <p className="font-headline text-on-surface-variant text-sm tracking-widest uppercase">{s.todayFocus}</p>
        <h2 className="font-headline text-2xl font-extrabold text-on-surface tracking-tight leading-tight">{habit.microAction || s.fallbackAction}</h2>
      </section>

      <div className="grid grid-cols-2 gap-2 w-full mb-4">
        <div className="bg-surface-container-low px-3 py-2 rounded-xl flex items-center gap-2">
          <div className="text-primary text-lg"><Bolt filled /></div>
          <div>
            <div className="font-headline text-lg font-extrabold text-primary leading-tight">{habit.streak}</div>
            <div className="font-label text-[10px] text-on-surface-variant font-semibold tracking-wider uppercase">{s.dayStreak}</div>
          </div>
        </div>
        <div className="bg-surface-container-low px-3 py-2 rounded-xl flex items-center gap-2">
          <div className="text-on-surface-variant text-lg"><Notifications /></div>
          <div>
            <div className="font-headline text-sm font-bold text-on-surface leading-tight">{habit.time} {habit.period}</div>
            <div className="font-label text-[10px] text-on-surface-variant font-semibold tracking-wider uppercase">{s.reminder}</div>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center py-3 w-full group flex-grow">
        <div className="absolute inset-0 bg-primary-container/20 scale-150 blur-3xl rounded-full opacity-50"></div>
        <button
          onClick={onCheckIn}
          disabled={isDone}
          className={`relative z-10 w-40 h-40 rounded-full flex flex-col items-center justify-center shadow-2xl active:scale-90 transition-all duration-300 border-[6px] border-surface-container-lowest ${isDone ? 'bg-surface-container-highest text-on-surface-variant cursor-default' : 'bg-primary-container text-on-primary-container luminous-glow group-hover:scale-105'}`}
        >
          <div className="text-4xl mb-1"><CheckCircle filled /></div>
          <span className="font-headline text-lg font-black tracking-tighter">
            {isDone ? s.done : s.checkIn}
          </span>
        </button>
        <p className="mt-3 font-body text-on-surface-variant text-center text-sm max-w-[240px] leading-relaxed">
          {s.motiveLine1} <br/><span className="font-bold text-on-surface">{s.motiveLine2}</span>
        </p>
      </div>

      <div className="w-full mt-3 bg-surface-container-low rounded-xl p-3">
        <div className="flex justify-between items-end mb-2">
          <span className="font-headline font-bold text-on-surface text-sm">{s.weeklyFlow}</span>
          <span className="font-label text-xs text-primary font-bold">{s.consistency}</span>
        </div>
        <div className="flex justify-between gap-2">
          {[1, 1, 1, 0.4, 0.2, 0, 0].map((op, i) => (
            <div key={i} className="h-6 w-full bg-primary-container rounded-lg" style={{ opacity: op || 0.1 }}></div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
