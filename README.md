# Did You Do It?

## 本地开发

1. `npm install`
2. 复制 `.env.example` 为 `.env`，填写 API Key
3. **LLM 可用两种方式**：
   - `npx vercel dev`：完整环境，本地提供 /api
   - `npm run dev`：仅前端，需在 `.env` 中设置 `VITE_API_URL=https://你的Vercel地址.vercel.app`，LLM 会请求线上 API

## 部署 Vercel

Settings → Environment Variables 添加：
- `LLM_PROVIDER`（deepseek / gemini / doubao）
- `DEEPSEEK_API_KEY`（若用 deepseek）
- `GEMINI_API_KEY`（若用 gemini）
- `DOUBAO_API_KEY`、`DOUBAO_MODEL`（若用 doubao）
