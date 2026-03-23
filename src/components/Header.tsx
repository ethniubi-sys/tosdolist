import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowBack } from './Icons';
import { useLanguage } from '../i18n/LanguageContext';
import { langLabels, type Lang } from '../i18n/locales';

const LANG_OPTIONS: Lang[] = ['en', 'zh', 'zhHant'];

interface HeaderProps {
  title: string;
  onBack?: () => void;
  showProgress?: boolean;
  progress?: number;
}

export default function Header({ title, onBack, showProgress = false, progress = 0 }: HeaderProps) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const handleSelect = (next: Lang) => {
    setLang(next);
    setOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl flex items-center justify-between px-6 h-16">
      <div className="flex items-center gap-4">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center justify-center p-2 rounded-full hover:bg-surface-container-low transition-transform duration-200 active:scale-95"
          >
            <ArrowBack />
          </button>
        )}
        <h1 className="text-xl font-bold text-primary tracking-tight font-headline">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        {showProgress && (
          <div className="w-16 h-1 rounded-full bg-surface-container overflow-hidden">
            <motion.div
              className="h-full bg-primary-container"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        )}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low transition-colors"
          >
            {langLabels[lang]}
            <svg
              className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 4.5L6 7.5L9 4.5" />
            </svg>
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -4 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute right-0 top-full mt-1.5 min-w-[88px] bg-white/90 backdrop-blur-xl rounded-xl shadow-lg shadow-black/8 border border-outline-variant/15 overflow-hidden py-1"
              >
                {LANG_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`w-full px-3.5 py-2 text-xs font-bold tracking-wide text-left transition-colors ${
                      option === lang
                        ? 'bg-primary-container/30 text-primary'
                        : 'text-on-surface-variant hover:bg-surface-container-low'
                    }`}
                  >
                    {langLabels[option]}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
