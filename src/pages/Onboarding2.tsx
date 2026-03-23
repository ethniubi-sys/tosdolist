import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowForward, Lightbulb, Check } from '../components/Icons';
import { useLanguage } from '../i18n/LanguageContext';
import { fetchMicroActions, fetchTips, type Tip, type MicroActionsByLang, type TipsByLang } from '../services/llm';
import type { Habit } from '../types';

interface Props {
  habit: Habit;
  updateHabit: (partial: Partial<Habit>) => void;
  onNext: () => void;
}

export default function Onboarding2({ habit, updateHabit, onNext }: Props) {
  const { lang, t } = useLanguage();
  const s = t.onboarding2;

  const [suggestionsByLang, setSuggestionsByLang] = useState<MicroActionsByLang | null>(null);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number | null>(null);
  const [sugLoading, setSugLoading] = useState(false);
  const [sugError, setSugError] = useState(false);

  const [tipsByLang, setTipsByLang] = useState<TipsByLang | null>(null);
  const [tipIdx, setTipIdx] = useState(0);
  const [tipsLoading, setTipsLoading] = useState(false);
  const [swipeDir, setSwipeDir] = useState(1);
  const touchRef = useRef(0);

  const suggestions = suggestionsByLang?.[lang] ?? [];
  const tips = tipsByLang?.[lang]?.length ? tipsByLang[lang] : (s.defaultTips as unknown as Tip[]);

  // When lang changes, sync habit.microAction if a suggestion is selected
  useEffect(() => {
    if (selectedSuggestionIndex !== null && suggestions.length > selectedSuggestionIndex) {
      const text = suggestions[selectedSuggestionIndex];
      if (text) updateHabit({ microAction: text });
    }
  }, [lang]);

  const loadSuggestions = useCallback(async () => {
    if (!habit.goal) return;
    setSugLoading(true);
    setSugError(false);
    try {
      const result = await fetchMicroActions(habit.goal);
      const hasData = result.en?.length || result.zh?.length || result.zhHant?.length;
      if (hasData) setSuggestionsByLang(result);
      else setSugError(true);
    } catch {
      setSugError(true);
    } finally {
      setSugLoading(false);
    }
  }, [habit.goal]);

  const loadTips = useCallback(async () => {
    if (!habit.goal) return;
    setTipsLoading(true);
    try {
      const result = await fetchTips(habit.goal);
      const hasData = result.en?.length || result.zh?.length || result.zhHant?.length;
      if (hasData) {
        setTipsByLang(result);
        setTipIdx(0);
      }
    } catch {
      // keep existing tips on error
    } finally {
      setTipsLoading(false);
    }
  }, [habit.goal]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await loadSuggestions();
      if (!cancelled) await loadTips();
    })();
    return () => { cancelled = true; };
  }, [loadSuggestions, loadTips]);

  const goTip = (dir: number) => {
    setSwipeDir(dir);
    setTipIdx((prev) => (prev + dir + tips.length) % tips.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchRef.current;
    if (Math.abs(delta) > 40) goTip(delta < 0 ? 1 : -1);
  };

  const currentTip = tips[tipIdx];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-2xl px-6 mt-2"
    >
      <div className="mb-4 text-center md:text-left">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary-container text-on-primary-container text-xs font-bold tracking-widest uppercase font-headline mb-2">
          {s.phase}
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold font-headline text-on-surface leading-tight tracking-tighter">
          {s.title} <br className="hidden md:block"/> {s.titleLine2}
        </h2>
      </div>

      <section className="space-y-4">
        <div className="space-y-2.5">
          <label className="block text-sm font-semibold text-on-surface font-headline leading-snug">
            {s.label}
          </label>

          {sugLoading && (
            <div className="flex items-center gap-2 py-3">
              <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              <span className="text-sm text-on-surface-variant">{s.aiSuggesting}</span>
            </div>
          )}

          {sugError && !sugLoading && (
            <div className="flex items-center gap-2 py-2">
              <span className="text-sm text-on-surface-variant">{s.aiError}</span>
              <button onClick={loadSuggestions} className="text-xs font-bold text-primary underline">{s.retry}</button>
            </div>
          )}

          {!sugLoading && suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {suggestions.map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedSuggestionIndex(i);
                    updateHabit({ microAction: item });
                  }}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all border ${
                    selectedSuggestionIndex === i
                      ? 'bg-primary-container border-primary-container text-on-primary-container scale-[1.02] shadow-sm'
                      : 'bg-surface-container-lowest border-outline-variant/20 text-on-surface hover:border-primary-container/50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          <div className="relative">
            <input
              type="text"
              value={habit.microAction}
              onChange={(e) => { setSelectedSuggestionIndex(null); updateHabit({ microAction: e.target.value }); }}
              className="w-full bg-surface-container-highest border-2 border-transparent rounded-xl px-5 py-3 text-sm font-medium text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary-container/60 transition-all duration-300"
              placeholder={s.placeholder}
            />
          </div>
        </div>

        <div
          className="bg-surface-container-low rounded-xl p-4 relative overflow-hidden select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="text-primary"><Lightbulb /></div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary font-headline">{s.tipsTitle}</h3>
            </div>
            <button
              onClick={loadTips}
              disabled={tipsLoading}
              className="text-[10px] font-bold text-primary/70 hover:text-primary transition-colors disabled:opacity-40"
            >
              {tipsLoading ? s.tipsLoading : s.tipsRefresh}
            </button>
          </div>

          <div className="relative h-[72px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tipIdx}
                initial={{ opacity: 0, x: swipeDir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: swipeDir * -60 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                {currentTip && (
                  <>
                    <p className="font-headline font-bold text-on-surface text-sm mb-1">{currentTip.title}</p>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{currentTip.body}</p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2 pt-2">
            {tips.map((_, i) => (
              <button
                key={i}
                onClick={() => { setSwipeDir(i > tipIdx ? 1 : -1); setTipIdx(i); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === tipIdx ? 'flex-[3] bg-primary' : 'flex-[1] bg-surface-container-highest'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-1">
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
