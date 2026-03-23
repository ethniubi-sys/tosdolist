import type { Lang } from '../i18n/locales';

export const LANG_KEYS: Lang[] = ['en', 'zh', 'zhHant'];

async function callApi(goal: string, type: 'microActions' | 'tips'): Promise<any> {
  const res = await fetch('/api/llm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ goal, type }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error ?? `API error: ${res.status}`);
  }
  return res.json();
}

async function callWithRetry<T>(fn: () => Promise<T>, retries = 2, delay = 2000): Promise<T> {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (e: any) {
      if (i === retries) throw e;
      const status = e?.status ?? e?.message?.match(/(\d{3})/)?.[1];
      if (status === '429' || status === 429) {
        await new Promise(r => setTimeout(r, delay * (i + 1)));
      } else {
        throw e;
      }
    }
  }
  throw new Error('Unreachable');
}

export type MicroActionsByLang = Record<Lang, string[]>;

export async function fetchMicroActions(goal: string): Promise<MicroActionsByLang> {
  const data = await callWithRetry(() => callApi(goal, 'microActions'));
  return {
    en: data.en ?? [],
    zh: data.zh ?? [],
    zhHant: data.zhHant ?? [],
  };
}

export interface Tip {
  title: string;
  body: string;
}

export type TipsByLang = Record<Lang, Tip[]>;

export async function fetchTips(goal: string): Promise<TipsByLang> {
  const data = await callWithRetry(() => callApi(goal, 'tips'));
  return {
    en: data.en ?? [],
    zh: data.zh ?? [],
    zhHant: data.zhHant ?? [],
  };
}
