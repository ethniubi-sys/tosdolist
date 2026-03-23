import type { Lang } from '../i18n/locales';

export const LANG_KEYS: Lang[] = ['en', 'zh', 'zhHant'];

const MICRO_ACTIONS_PROMPT = (goal: string) =>
  `You are a micro-habit coach. The user's goal is: "${goal}".
Suggest 4-5 very small daily micro-actions that take less than 5 minutes each.
Respond ONLY with a JSON object with keys "en", "zh", "zhHant". Each key maps to an array of strings in that language.
Example: {"en":["Do 5 pushups","Walk 3 min"],"zh":["做5个俯卧撑","走路3分钟"],"zhHant":["做5個伏地挺身","走路3分鐘"]}
Keep the SAME number of items in each array, same order. No markdown.`;

const TIPS_PROMPT = (goal: string) =>
  `You are a motivational science coach. The user wants to build a micro-habit related to: "${goal}".
Generate 4 short motivational/scientific tips about building small habits.
Each tip has "title" (max 5 words) and "body" (max 30 words).
Respond ONLY with a JSON object with keys "en", "zh", "zhHant". Each key maps to an array of tips in that language.
Example: {"en":[{"title":"Start Tiny","body":"..."}],"zh":[{"title":"从小开始","body":"..."}],"zhHant":[{"title":"從小開始","body":"..."}]}
Keep the SAME 4 tips per language, same order. No markdown.`;

function parseJSON<T>(raw: string, fallback: T): T {
  try {
    const cleaned = raw.replace(/```json\n?|```/g, '').trim();
    return JSON.parse(cleaned);
  } catch {
    return fallback;
  }
}

async function callDirect(prompt: string): Promise<string> {
  const provider = import.meta.env.VITE_LLM_PROVIDER || 'deepseek';
  const key =
    provider === 'gemini' ? import.meta.env.VITE_GEMINI_API_KEY
    : provider === 'doubao' ? import.meta.env.VITE_DOUBAO_API_KEY
    : import.meta.env.VITE_DEEPSEEK_API_KEY;
  if (!key) {
    throw new Error('Missing VITE_DEEPSEEK_API_KEY, VITE_GEMINI_API_KEY, or VITE_DOUBAO_API_KEY in .env.development.local');
  }

  if (provider === 'gemini') {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: key });
    const res = await ai.models.generateContent({ model: 'gemini-2.0-flash', contents: prompt });
    return res.text ?? '';
  }

  if (provider === 'doubao') {
    const model = import.meta.env.VITE_DOUBAO_MODEL || 'doubao-seed-1-8-251228';
    const res = await fetch('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Doubao API error: ${res.status} ${err}`);
    }
    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? '';
  }

  const res = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
    body: JSON.stringify({
      model: 'deepseek-reasoner',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    }),
  });
  if (!res.ok) throw new Error(`DeepSeek API error: ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? '';
}

async function callViaApi(goal: string, type: 'microActions' | 'tips'): Promise<any> {
  const base = import.meta.env.VITE_API_URL ?? '';
  const res = await fetch(`${base}/api/llm`, {
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

const useDirectApi =
  import.meta.env.DEV &&
  (import.meta.env.VITE_DEEPSEEK_API_KEY || import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_DOUBAO_API_KEY);

async function callLlm(goal: string, type: 'microActions' | 'tips'): Promise<any> {
  if (useDirectApi) {
    const prompt = type === 'microActions' ? MICRO_ACTIONS_PROMPT(goal) : TIPS_PROMPT(goal);
    const raw = await callDirect(prompt);
    if (type === 'microActions') {
      const parsed = parseJSON<Record<string, string[]>>(raw, { en: [], zh: [], zhHant: [] });
      return { en: parsed.en ?? [], zh: parsed.zh ?? [], zhHant: parsed.zhHant ?? [] };
    }
    const parsed = parseJSON<Record<string, Array<{ title: string; body: string }>>>(raw, { en: [], zh: [], zhHant: [] });
    return { en: parsed.en ?? [], zh: parsed.zh ?? [], zhHant: parsed.zhHant ?? [] };
  }
  return callViaApi(goal, type);
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
  const data = await callWithRetry(() => callLlm(goal, 'microActions'));
  return { en: data.en ?? [], zh: data.zh ?? [], zhHant: data.zhHant ?? [] };
}

export interface Tip {
  title: string;
  body: string;
}

export type TipsByLang = Record<Lang, Tip[]>;

export async function fetchTips(goal: string): Promise<TipsByLang> {
  const data = await callWithRetry(() => callLlm(goal, 'tips'));
  return { en: data.en ?? [], zh: data.zh ?? [], zhHant: data.zhHant ?? [] };
}
