import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Bolt, LightMode, Bedtime } from '../components/Icons';
import { useLanguage } from '../i18n/LanguageContext';
import type { Habit } from '../types';

interface Props {
  habit: Habit;
  updateHabit: (partial: Partial<Habit>) => void;
  onNext: () => void;
}

interface WheelColumnProps {
  label: string;
  options: string[];
  value: string;
  onChange: (next: string) => void;
}

const ITEM_HEIGHT = 36;
const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

function WheelColumn({ label, options, value, onChange }: WheelColumnProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const selectedIndex = Math.max(0, options.indexOf(value));

  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;
    const index = Math.max(0, options.indexOf(value));
    const targetScroll = index * ITEM_HEIGHT;
    if (Math.abs(listEl.scrollTop - targetScroll) > 1) {
      listEl.scrollTo({ top: targetScroll });
    }
  }, [options, value]);

  const handleScroll = () => {
    const listEl = listRef.current;
    if (!listEl) return;
    const index = Math.round(listEl.scrollTop / ITEM_HEIGHT);
    const clamped = Math.max(0, Math.min(options.length - 1, index));
    const nextValue = options[clamped];
    if (nextValue && nextValue !== value) {
      onChange(nextValue);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[66px]" style={{ height: ITEM_HEIGHT * 3 }}>
        <div
          ref={listRef}
          onScroll={handleScroll}
          className="h-full w-full overflow-y-auto snap-y snap-mandatory touch-pan-y [&::-webkit-scrollbar]:hidden"
          style={{ paddingTop: ITEM_HEIGHT, paddingBottom: ITEM_HEIGHT, scrollbarWidth: 'none' }}
        >
          {options.map((option, index) => {
            const distance = Math.abs(index - selectedIndex);
            const opacity =
              distance === 0 ? 1 : distance === 1 ? 0.58 : distance === 2 ? 0.32 : 0.16;
            const scale =
              distance === 0 ? 1.08 : distance === 1 ? 0.92 : distance === 2 ? 0.84 : 0.78;

            return (
              <button
                key={option}
                type="button"
                onClick={() => onChange(option)}
                style={{ opacity, transform: `scale(${scale})`, height: ITEM_HEIGHT }}
                className={`w-full snap-center font-headline text-[28px] leading-none transition-[color,transform,opacity] duration-200 ${
                  option === value ? 'text-primary font-extrabold' : 'text-outline-variant font-semibold'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-7 bg-gradient-to-b from-surface-container-lowest/90 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-7 bg-gradient-to-t from-surface-container-lowest/90 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 rounded-lg bg-primary-container/25 border border-primary-container/45" style={{ height: ITEM_HEIGHT }} />
      </div>
      <span className="text-[10px] font-bold text-outline uppercase tracking-widest mt-1">{label}</span>
    </div>
  );
}

export default function Onboarding3({ habit, updateHabit, onNext }: Props) {
  const { t } = useLanguage();
  const s = t.onboarding3;
  const [rawHour = '07', rawMinute = '30'] = habit.time.split(':');
  const hourValue = HOURS.includes(rawHour) ? rawHour : '07';
  const minuteValue = MINUTES.includes(rawMinute) ? rawMinute : '30';

  const handleHourChange = (nextHour: string) => {
    updateHabit({ time: `${nextHour}:${minuteValue}` });
  };

  const handleMinuteChange = (nextMinute: string) => {
    updateHabit({ time: `${hourValue}:${nextMinute}` });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="w-full max-w-2xl px-6 flex flex-col items-center mt-2"
    >
      <div className="w-full mb-5 text-center md:text-left">
        <h2 className="font-headline text-2xl font-extrabold text-on-surface leading-tight tracking-tight mb-1.5 md:text-3xl">
          {s.title}
        </h2>
        <p className="font-body text-sm text-secondary leading-relaxed max-w-md mx-auto md:mx-0">
          {s.subtitle}
        </p>
      </div>

      <div className="relative w-full py-6 mb-5 rounded-[2rem] bg-gradient-to-br from-primary-container/30 to-surface-container-low flex items-center justify-center overflow-hidden">
        <div className="relative flex items-center gap-2.5 p-4 bg-surface-container-lowest/80 backdrop-blur-xl rounded-[1.5rem] shadow-sm">
          <WheelColumn label={s.hour} options={HOURS} value={hourValue} onChange={handleHourChange} />
          <div className="text-[30px] font-headline font-bold text-outline-variant leading-none pb-3.5">:</div>
          <WheelColumn label={s.min} options={MINUTES} value={minuteValue} onChange={handleMinuteChange} />
          <div className="ml-2.5 flex flex-col gap-1.5">
            <button
              onClick={() => updateHabit({ period: 'AM' })}
              className={`px-3 py-1.5 rounded-full font-bold text-xs tracking-wide transition-colors ${habit.period === 'AM' ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'}`}
            >
              AM
            </button>
            <button
              onClick={() => updateHabit({ period: 'PM' })}
              className={`px-3 py-1.5 rounded-full font-bold text-xs tracking-wide transition-colors ${habit.period === 'PM' ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'}`}
            >
              PM
            </button>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-2.5 mb-5">
        <div
          onClick={() => updateHabit({ period: 'AM' })}
          className={`flex items-center gap-2.5 p-3.5 rounded-2xl transition-all cursor-pointer ${habit.period === 'AM' ? 'bg-primary-container/20 border border-primary-container' : 'bg-surface-container-low border border-transparent hover:border-primary-container'}`}
        >
          <div className="w-9 h-9 shrink-0 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
            <LightMode />
          </div>
          <div>
            <h4 className="font-headline font-bold text-on-surface text-[13px]">{s.morningTitle}</h4>
            <p className="text-[11px] text-secondary">{s.morningSub}</p>
          </div>
        </div>
        <div
          onClick={() => updateHabit({ period: 'PM' })}
          className={`flex items-center gap-2.5 p-3.5 rounded-2xl transition-all cursor-pointer ${habit.period === 'PM' ? 'bg-primary-container/20 border border-primary-container' : 'bg-surface-container-low border border-transparent hover:border-primary-container'}`}
        >
          <div className="w-9 h-9 shrink-0 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant">
            <Bedtime />
          </div>
          <div>
            <h4 className="font-headline font-bold text-on-surface text-[13px]">{s.nightTitle}</h4>
            <p className="text-[11px] text-secondary">{s.nightSub}</p>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-3 bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-headline font-extrabold text-base rounded-full shadow-lg shadow-primary-container/20 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
      >
        {s.start}
        <Bolt />
      </button>
    </motion.div>
  );
}
