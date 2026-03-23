import type { VercelRequest, VercelResponse } from '@vercel/node';

type ReqBody = { goal: string; type: 'microActions' | 'tips' };

async function callDeepSeek(prompt: string): Promise<string> {
  const res = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
    },
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

async function callGemini(prompt: string): Promise<string> {
  const { GoogleGenAI } = await import('@google/genai');
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY ?? '' });
  const res = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt,
  });
  return res.text ?? '';
}

async function callDoubao(prompt: string): Promise<string> {
  const model = process.env.DOUBAO_MODEL || 'doubao-seed-1-8-251228';
  const res = await fetch('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.DOUBAO_API_KEY}`,
    },
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

async function chat(prompt: string): Promise<string> {
  const provider = process.env.LLM_PROVIDER || 'deepseek';
  if (provider === 'gemini') return callGemini(prompt);
  if (provider === 'doubao') return callDoubao(prompt);
  return callDeepSeek(prompt);
}

function parseJSON<T>(raw: string, fallback: T): T {
  try {
    const cleaned = raw.replace(/```json\n?|```/g, '').trim();
    return JSON.parse(cleaned);
  } catch {
    return fallback;
  }
}

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

function setCors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let body: ReqBody;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    res.status(400).json({ error: 'Invalid JSON body' });
    return;
  }

  const { goal, type } = body;
  if (!goal || !type || !['microActions', 'tips'].includes(type)) {
    res.status(400).json({ error: 'Missing or invalid goal/type' });
    return;
  }

  try {
    const prompt = type === 'microActions' ? MICRO_ACTIONS_PROMPT(goal) : TIPS_PROMPT(goal);
    const raw = await chat(prompt);

    if (type === 'microActions') {
      const parsed = parseJSON<Record<string, string[]>>(raw, { en: [], zh: [], zhHant: [] });
      res.status(200).json({ en: parsed.en ?? [], zh: parsed.zh ?? [], zhHant: parsed.zhHant ?? [] });
    } else {
      const parsed = parseJSON<Record<string, Array<{ title: string; body: string }>>>(raw, { en: [], zh: [], zhHant: [] });
      res.status(200).json({ en: parsed.en ?? [], zh: parsed.zh ?? [], zhHant: parsed.zhHant ?? [] });
    }
  } catch (e: any) {
    console.error('[api/llm]', e);
    res.status(500).json({ error: e?.message ?? 'LLM request failed' });
  }
}
