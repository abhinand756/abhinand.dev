/**
 * JARVIS — Gemini integration (server only).
 *
 * Wraps the official Google Gen AI SDK so the rest of the app never touches
 * the API key or the provider directly. Everything here runs on the server
 * (the /api/chat route); the API key is never exposed to the browser.
 *
 * Free-tier friendly: the model is configurable via GEMINI_MODEL and defaults
 * to a Flash-Lite model, which has the most generous free-tier daily quota.
 */

import { ApiError, GoogleGenAI } from "@google/genai";
import { buildSystemInstruction } from "./chatbot-prompt";
import { CHAT_LIMITS, type ChatApiMessage, type ChatErrorCode } from "./chat-types";

/**
 * Default model. `gemini-3.5-flash-lite` is a stable Flash-Lite model with a
 * generous free tier (high RPD) and low latency — ideal for a portfolio bot.
 * Override with GEMINI_MODEL (e.g. gemini-3.6-flash, gemini-3.1-flash-lite).
 */
export const DEFAULT_GEMINI_MODEL = "gemini-3.5-flash-lite";

export function getGeminiModel(): string {
  return process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL;
}

export function getApiKey(): string | undefined {
  const key =
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.GOOGLE_API_KEY?.trim() ||
    process.env.GOOGLE_GENAI_API_KEY?.trim();
  return key || undefined;
}

export function isGeminiConfigured(): boolean {
  return Boolean(getApiKey());
}

let cachedClient: GoogleGenAI | null = null;
let cachedClientKey: string | null = null;

function getClient(): GoogleGenAI {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new MissingApiKeyError();
  }
  if (!cachedClient || cachedClientKey !== apiKey) {
    cachedClient = new GoogleGenAI({ apiKey });
    cachedClientKey = apiKey;
  }
  return cachedClient;
}

export class MissingApiKeyError extends Error {
  constructor() {
    super("GEMINI_API_KEY is not configured");
    this.name = "MissingApiKeyError";
  }
}

export interface StreamChatOptions {
  messages: ChatApiMessage[];
  signal?: AbortSignal;
}

/**
 * Streams JARVIS's answer as plain text chunks.
 * Throws `MissingApiKeyError` when no key is configured.
 */
export async function* streamPortfolioChat({
  messages,
  signal,
}: StreamChatOptions): AsyncGenerator<string, void, unknown> {
  const ai = getClient();

  const contents = messages.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }));

  const response = await ai.models.generateContentStream({
    model: getGeminiModel(),
    contents,
    config: {
      systemInstruction: buildSystemInstruction(),
      temperature: 0.65,
      topP: 0.95,
      maxOutputTokens: CHAT_LIMITS.maxOutputTokens,
      abortSignal: signal,
    },
  });

  for await (const chunk of response) {
    const text = chunk.text;
    if (text) yield text;
  }
}

export interface GeminiFailure {
  code: ChatErrorCode;
  status: number;
  /** Message shown to the visitor — never leaks internals. */
  userMessage: string;
  /** Full detail for server logs only. */
  detail: string;
}

const GENERIC_FAILURE =
  "Something went wrong while generating that answer. Please try again in a moment.";

/** Maps any error from the SDK to a safe, visitor-facing failure. */
export function classifyGeminiError(error: unknown): GeminiFailure {
  if (error instanceof MissingApiKeyError) {
    return {
      code: "missing-key",
      status: 503,
      userMessage:
        "JARVIS isn't fully set up yet — the server is missing its API key. Please try again later.",
      detail: "Missing GEMINI_API_KEY / GOOGLE_API_KEY environment variable.",
    };
  }

  const message = error instanceof Error ? error.message : String(error);
  const status = error instanceof ApiError ? error.status : 0;
  const lower = message.toLowerCase();

  const isQuota =
    status === 429 ||
    lower.includes("resource_exhausted") ||
    lower.includes("quota") ||
    lower.includes("rate limit");

  if (isQuota) {
    return {
      code: "quota",
      status: 429,
      userMessage:
        "I'm getting a lot of questions right now and just hit my rate limit. Please give me a few seconds and try again. 🙏",
      detail: message,
    };
  }

  if (
    lower.includes("safety") ||
    lower.includes("blocked") ||
    lower.includes("prohibited_content") ||
    lower.includes("finish_reason")
  ) {
    return {
      code: "blocked",
      status: 400,
      userMessage:
        "I couldn't answer that one. Try rephrasing your question about Abhinand and I'll do my best.",
      detail: message,
    };
  }

  if (
    status === 404 ||
    lower.includes("not found") ||
    lower.includes("unsupported model") ||
    lower.includes("no such model")
  ) {
    return {
      code: "unavailable",
      status: 503,
      userMessage:
        "JARVIS is temporarily unavailable. Please try again in a little while.",
      detail: `Model "${getGeminiModel()}" rejected the request: ${message}`,
    };
  }

  if (status === 400 && lower.includes("api key")) {
    return {
      code: "missing-key",
      status: 503,
      userMessage:
        "JARVIS isn't fully set up yet — the server API key was rejected. Please try again later.",
      detail: message,
    };
  }

  if (status >= 500 || lower.includes("timeout") || lower.includes("fetch failed")) {
    return {
      code: "unavailable",
      status: 503,
      userMessage: GENERIC_FAILURE,
      detail: message,
    };
  }

  return {
    code: "unknown",
    status: 500,
    userMessage: GENERIC_FAILURE,
    detail: message,
  };
}
