/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import type { Phase } from './types';
import { useHabit } from './hooks/useHabit';
import { useLanguage } from './i18n/LanguageContext';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Onboarding1 from './pages/Onboarding1';
import Onboarding2 from './pages/Onboarding2';
import Onboarding3 from './pages/Onboarding3';
import Dashboard from './pages/Dashboard';
import Progress from './pages/Progress';

export default function App() {
  const { habit, updateHabit, checkIn } = useHabit();
  const [phase, setPhase] = useState<Phase>('onboarding-1');
  const { t } = useLanguage();
  const isOnboarding = phase.startsWith('onboarding');

  const handleNext = () => {
    if (phase === 'onboarding-1') setPhase('onboarding-2');
    else if (phase === 'onboarding-2') setPhase('onboarding-3');
    else if (phase === 'onboarding-3') setPhase('dashboard');
  };

  const handleBack = () => {
    if (phase === 'onboarding-2') setPhase('onboarding-1');
    else if (phase === 'onboarding-3') setPhase('onboarding-2');
    else if (phase === 'dashboard') setPhase('onboarding-3');
    else if (phase === 'progress') setPhase('dashboard');
  };

  const headerTitle = isOnboarding
    ? t.header.onboardingTitle
    : phase === 'dashboard'
      ? t.header.tasksTitle
      : t.header.progressTitle;

  return (
    <div className={`flex flex-col overflow-x-hidden ${isOnboarding ? 'h-screen overflow-y-hidden' : 'min-h-screen'}`}>
      <Header
        title={headerTitle}
        onBack={phase !== 'onboarding-1' ? handleBack : undefined}
        showProgress={isOnboarding}
        progress={phase === 'onboarding-1' ? 33 : phase === 'onboarding-2' ? 66 : 100}
      />

      <main className={`flex-grow flex flex-col items-center pt-16 ${isOnboarding ? 'pb-6' : 'pb-20'}`}>
        <AnimatePresence mode="wait">
          {phase === 'onboarding-1' && (
            <Onboarding1 habit={habit} updateHabit={updateHabit} onNext={handleNext} />
          )}
          {phase === 'onboarding-2' && (
            <Onboarding2 habit={habit} updateHabit={updateHabit} onNext={handleNext} />
          )}
          {phase === 'onboarding-3' && (
            <Onboarding3 habit={habit} updateHabit={updateHabit} onNext={handleNext} />
          )}
          {phase === 'dashboard' && (
            <Dashboard habit={habit} onCheckIn={checkIn} />
          )}
          {phase === 'progress' && (
            <Progress habit={habit} onReset={() => setPhase('onboarding-1')} />
          )}
        </AnimatePresence>
      </main>

      {!isOnboarding && (
        <BottomNav
          active={phase === 'dashboard' ? 'tasks' : 'progress'}
          onNavigate={(target) => setPhase(target)}
        />
      )}
    </div>
  );
}
