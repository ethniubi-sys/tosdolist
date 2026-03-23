<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/3fb90bca-c5bc-422c-9bb5-6c1fb6d0942f

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and fill in your API keys
3. Run:
   - Frontend only: `npm run dev`
   - Full stack (including LLM API): `npx vercel dev`

## Deploy to Vercel (API Key 安全)

1. 推送代码到 GitHub，在 [Vercel](https://vercel.com) Import 仓库
2. 在项目 **Settings → Environment Variables** 添加：
   - `DEEPSEEK_API_KEY`：你的 DeepSeek Key
   - `GEMINI_API_KEY`：备用 Gemini Key（可选）
   - `LLM_PROVIDER`：`deepseek`（或 `gemini`）
   - `BASE_PATH`：`/`（若部署到根路径；否则可省略或设为 `/tosdolist/`）
3. Deploy 后，API Key 仅在服务端 `api/llm` 使用，不会暴露到前端
