This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## AI — portfolio chatbot

A production-ready AI assistant ("JARVIS") that answers visitor questions about
Abhinand using a verified knowledge base. It is powered by the **Google Gemini
API free tier** and the official [`@google/genai`](https://www.npmjs.com/package/@google/genai)
SDK. The API key lives only on the server.

### Features

- Floating bottom-right launcher with glow, online indicator and a "Chat with JARVIS" tooltip.
- Premium glassmorphism panel that matches the site's dark cyan → blue theme.
- Streaming answers (NDJSON) with a typing indicator, auto-scroll, timestamps, copy and retry.
- Suggestion chips on the welcome screen plus contextual follow-ups after every answer.
- Conversation memory (bounded), "new conversation" reset, and history that survives closing the window.
- Safe, dependency-free Markdown rendering (no `dangerouslySetInnerHTML`, validated link protocols).
- Server-side key, request validation, size limits, per-IP rate limiting and prompt-injection resistance.
- Lazy-loaded chat UI (the panel ships in its own chunk, so first paint is never delayed).
- Keyboard accessible (Enter to send, Shift+Enter for a newline, Escape to close, focus management)
  and respects `prefers-reduced-motion`.
- Mobile full-screen sheet with background scroll lock.

### 1. Get a free Gemini API key

1. Go to <https://aistudio.google.com/apikey> and sign in with a Google account.
2. Click **Create API key** and copy it.
3. The free tier is enough for a portfolio bot. Usage limits depend on the model.

### 2. Configure environment variables

Copy the example file and fill in your key:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
| --- | --- | --- |
| `GEMINI_API_KEY` | yes | Server-only Gemini key. Never prefix with `NEXT_PUBLIC_`. |
| `GEMINI_MODEL` | no | Model name. Defaults to `gemini-3.5-flash-lite`. |
| `NEXT_PUBLIC_ACCESS_KEY` | yes (existing) | Web3Forms key for the Hire Me form. |

The route also accepts `GOOGLE_API_KEY` or `GOOGLE_GENAI_API_KEY` as fallbacks.

### 3. Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>, click the orb in the bottom-right corner and ask
"Who is Abhinand?".

### 4. Deploy to Vercel

1. Push the repository and import it at <https://vercel.com/new>.
2. In **Project → Settings → Environment Variables**, add `GEMINI_API_KEY`
   (and optionally `GEMINI_MODEL`) for Production, Preview and Development.
3. Deploy. The `/api/chat` route runs on the Node.js runtime (`maxDuration = 30`).

### Where things live

| Path | Purpose |
| --- | --- |
| `app/data/portfolio-knowledge.ts` | Single source of truth for every fact JARVIS may state. |
| `app/lib/chatbot-prompt.ts` | Builds the system instruction from the knowledge base. |
| `app/lib/gemini.ts` | Server-only Gemini client, streaming and error mapping. |
| `app/lib/chat-types.ts` | Shared types and limits. |
| `app/lib/chat-suggestions.ts` | Welcome + contextual follow-up questions (client-safe). |
| `app/lib/markdown.tsx` | Safe Markdown renderer. |
| `app/lib/rate-limit.ts` | In-memory per-IP rate limiting. |
| `app/api/chat/route.ts` | Streaming `POST /api/chat` endpoint. |
| `app/components/chatbot/*` | Launcher, window, messages, input and UI primitives. |

> To keep answers accurate, edit `app/data/portfolio-knowledge.ts` — JARVIS is
> instructed never to invent information outside it.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
