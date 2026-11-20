/**
 * JARVIS — chat endpoint.
 *
 * POST /api/chat
 *   body: { messages: [{ role: "user" | "assistant", content: string }] }
 *   returns: newline-delimited JSON stream of ChatStreamEvent objects
 *            ({ type: "text" | "error" | "done" })
 *
 * The Gemini API key never leaves the server. All validation, rate limiting
 * and error handling happens here.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  CHAT_LIMITS,
  type ChatApiMessage,
  type ChatErrorCode,
  type ChatRole,
  type ChatStreamEvent,
} from "../../lib/chat-types";
import { classifyGeminiError, isGeminiConfigured, streamPortfolioChat } from "../../lib/gemini";
import { checkRateLimit, getClientKey } from "../../lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const MAX_INPUT_MESSAGES = 40;

function jsonError(status: number, error: string, extra?: Record<string, unknown>) {
  return NextResponse.json(
    { error, ...extra },
    {
      status,
      headers: { "Cache-Control": "no-store" },
    }
  );
}

/**
 * Validates and normalises the incoming conversation.
 * Returns null when the payload is unusable.
 */
function normalizeMessages(input: unknown): ChatApiMessage[] | null {
  if (!Array.isArray(input) || input.length === 0) return null;
  if (input.length > MAX_INPUT_MESSAGES) return null;

  const cleaned: ChatApiMessage[] = [];

  for (const raw of input) {
    if (!raw || typeof raw !== "object") return null;
    const { role, content } = raw as { role?: unknown; content?: unknown };
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string") return null;

    const text = content.trim();
    if (!text) continue;
    if (text.length > CHAT_LIMITS.maxMessageChars) return null;

    const previous = cleaned[cleaned.length - 1];
    if (previous && previous.role === role) {
      // Merge consecutive turns of the same role (the Gemini API expects an
      // alternating conversation).
      previous.content = `${previous.content}\n\n${text}`;
      if (previous.content.length > CHAT_LIMITS.maxMessageChars * 2) {
        previous.content = previous.content.slice(-CHAT_LIMITS.maxMessageChars * 2);
      }
    } else {
      cleaned.push({ role: role as ChatRole, content: text });
    }
  }

  // A conversation must start with the visitor and end with the visitor.
  while (cleaned.length > 0 && cleaned[0].role !== "user") cleaned.shift();
  if (cleaned.length === 0) return null;
  if (cleaned[cleaned.length - 1].role !== "user") return null;

  // Trim history to keep token usage (and free-tier quota) in check.
  return cleaned.slice(-CHAT_LIMITS.serverHistoryMessages);
}

export async function POST(request: NextRequest) {
  // ── Body size guard ─────────────────────────────────────────────────────
  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > CHAT_LIMITS.maxBodyBytes) {
    return jsonError(413, "That request was too large. Please send a shorter message.");
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return jsonError(400, "We couldn't read that request. Please try again.");
  }

  if (rawBody.length > CHAT_LIMITS.maxBodyBytes) {
    return jsonError(413, "That request was too large. Please send a shorter message.");
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return jsonError(400, "We couldn't read that request. Please try again.");
  }

  const messages = normalizeMessages((payload as { messages?: unknown } | null)?.messages);
  if (!messages) {
    return jsonError(400, "Please send a valid question about Abhinand.");
  }

  // ── Rate limiting ───────────────────────────────────────────────────────
  const clientKey = getClientKey(request.headers);
  const rate = checkRateLimit(clientKey, {
    limit: CHAT_LIMITS.rateLimitRequests,
    windowMs: CHAT_LIMITS.rateLimitWindowMs,
    dailyLimit: CHAT_LIMITS.dailyLimitRequests,
  });

  if (!rate.ok) {
    const message =
      rate.scope === "daily"
        ? "You've reached today's limit for JARVIS. Please come back tomorrow — or reach Abhinand directly at abhinandabhi756@gmail.com."
        : "Whoa, that was fast! 🚀 Give me a few seconds to catch up, then ask again.";
    return NextResponse.json(
      { error: message, code: "rate-limit" as ChatErrorCode, retryAfter: rate.retryAfter },
      {
        status: 429,
        headers: {
          "Cache-Control": "no-store",
          "Retry-After": String(rate.retryAfter),
        },
      }
    );
  }

  // ── Configuration check ─────────────────────────────────────────────────
  if (!isGeminiConfigured()) {
    console.error(
      "[JARVIS] GEMINI_API_KEY is not set. Add it to .env.local (and to your Vercel project env vars)."
    );
    return jsonError(
      503,
      "JARVIS isn't fully set up yet — the server is missing its API key. Please try again later.",
      { code: "missing-key" satisfies ChatErrorCode }
    );
  }

  // ── Stream the answer ───────────────────────────────────────────────────
  const encoder = new TextEncoder();
  const encode = (event: ChatStreamEvent) => encoder.encode(`${JSON.stringify(event)}\n`);

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false;
      const safeEnqueue = (event: ChatStreamEvent) => {
        if (closed) return;
        try {
          controller.enqueue(encode(event));
        } catch {
          closed = true;
        }
      };

      let producedText = false;

      try {
        for await (const chunk of streamPortfolioChat({
          messages,
          signal: request.signal,
        })) {
          if (request.signal.aborted) break;
          producedText = true;
          safeEnqueue({ type: "text", value: chunk });
        }

        if (!producedText && !request.signal.aborted) {
          safeEnqueue({
            type: "text",
            value:
              "Hmm, I couldn't put that into words. Could you rephrase your question about Abhinand?",
          });
        }

        safeEnqueue({ type: "done" });
      } catch (error) {
        if (!request.signal.aborted) {
          const failure = classifyGeminiError(error);
          console.error(`[JARVIS] ${failure.code}: ${failure.detail}`);
          safeEnqueue({ type: "error", code: failure.code, message: failure.userMessage });
        }
      } finally {
        closed = true;
        try {
          controller.close();
        } catch {
          /* already closed */
        }
      }
    },
    cancel() {
      /* The request signal aborts the upstream call automatically. */
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      "X-Accel-Buffering": "no",
      Connection: "keep-alive",
    },
  });
}

export async function GET() {
  return jsonError(405, "Method not allowed. Send a POST request to chat with JARVIS.");
}
