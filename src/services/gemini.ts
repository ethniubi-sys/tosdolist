import { GoogleGenAI } from '@google/genai';
import type { Lang } from '../i18n/locales';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY ?? '' });

async function callWithRetry(fn: () => Promise<any>, retries = 2, delay = 2000): Promise<any> {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (e: any) {
      if (i === retries) throw e;
      const isRateLimit = e?.status === 429 || e?.message?.includes('429');
      if (isRateLimit) await new Promise(r => setTimeout(r, delay * (i + 1)));
      else throw e;
    }
  }
}

const LANG_LABEL: Record<Lang, string> = {
  en: 'English',
  zh: 'Simplified Chinese',
  zhHant: 'Traditional Chinese',
};

export async function fetchMicroActions(goal: string, lang: Lang): Promise<string[]> {
  const langName = LANG_LABEL[lang];
  const res = await callWithRetry(() =>
    ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `You are a micro-habit coach. The user's goal is: "${goal}".
Suggest 4-5 very small daily micro-actions that take less than 5 minutes each.
Respond ONLY with a JSON array of strings, no markdown, no explanation.
Example: ["Do 5 pushups","Walk for 3 minutes","Read 1 page"]
Respond in ${langName}.`,
    })
  );

  try {
    const text = res.text?.replace(/```json\n?|```/g, '').trim() ?? '[]';
    return JSON.parse(text);
  } catch {
    return [];
  }
}

export interface Tip {
  title: string;
  body: string;
}

export async function fetchTips(goal: string, lang: Lang): Promise<Tip[]> {
  const langName = LANG_LABEL[lang];
  const res = await callWithRetry(() =>
    ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `You are a motivational science coach. The user wants to build a micro-habit related to: "${goal}".
Generate 4 short motivational/scientific tips about building small habits.
Each tip should have a "title" (max 5 words) and a "body" (max 30 words).
Respond ONLY with a JSON array, no markdown.
Example: [{"title":"Start Tiny","body":"Research shows that starting with a 2-minute habit increases success rate by 80%."}]
Respond in ${langName}.`,
    })
  );

  try {
    const text = res.text?.replace(/```json\n?|```/g, '').trim() ?? '[]';
    return JSON.parse(text);
  } catch {
    return [];
  }
}
