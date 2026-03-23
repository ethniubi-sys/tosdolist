import { useState, useEffect } from 'react';
import type { Habit } from '../types';

const STORAGE_KEY = 'did-you-do-it-habit';

const defaultHabit: Habit = {
  goal: '',
  microAction: '',
  time: '07:30',
  period: 'AM',
  streak: 12,
  lastCheckIn: null,
  history: [
    '2023-10-01', '2023-10-02', '2023-10-04', '2023-10-05',
    '2023-10-06', '2023-10-07', '2023-10-08', '2023-10-09',
    '2023-10-11', '2023-10-12', '2023-10-13', '2023-10-14',
  ],
};

export function useHabit() {
  const [habit, setHabit] = useState<Habit>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    return defaultHabit;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habit));
  }, [habit]);

  const updateHabit = (partial: Partial<Habit>) => {
    setHabit(prev => ({ ...prev, ...partial }));
  };

  const checkIn = () => {
    const today = new Date().toISOString().split('T')[0];
    if (habit.lastCheckIn === today) return;
    setHabit(prev => ({
      ...prev,
      streak: prev.streak + 1,
      lastCheckIn: today,
      history: [...prev.history, today],
    }));
  };

  return { habit, updateHabit, checkIn };
}
