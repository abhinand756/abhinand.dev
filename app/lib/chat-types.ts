/**
 * Shared types + limits for the JARVIS chatbot.
 * Safe to import from both the client components and the server route.
 */

export type ChatRole = "user" | "assistant";

/** A message as held in the UI. */
export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
  /** True while the assistant response is still streaming in. */
  pending?: boolean;
  /** True when this assistant message represents a failed request. */
  failed?: boolean;
}

/** A message as sent to / received from the API. */
export interface ChatApiMessage {
  role: ChatRole;
  content: string;
}

export interface ChatRequestBody {
  messages: ChatApiMessage[];
}

/** Newline-delimited JSON events streamed back by /api/chat. */
export type ChatStreamEvent =
  | { type: "text"; value: string }
  | { type: "error"; code: ChatErrorCode; message: string }
  | { type: "done" };

export type ChatErrorCode =
  | "missing-key"
  | "rate-limit"
  | "quota"
  | "blocked"
  | "invalid-request"
  | "unavailable"
  | "unknown";

export const CHAT_LIMITS = {
  /** Longest single message a visitor may send. */
  maxMessageChars: 2000,
  /** How many previous messages the client sends along. */
  clientHistoryMessages: 16,
  /** Hard cap enforced on the server (older messages are dropped). */
  serverHistoryMessages: 12,
  /** Maximum accepted request body (bytes). */
  maxBodyBytes: 32_000,
  /** Maximum number of assistant tokens per answer. */
  maxOutputTokens: 1024,
  /** Per-IP requests allowed inside the sliding window. */
  rateLimitRequests: 12,
  rateLimitWindowMs: 60_000,
  /** Per-IP requests allowed per day. */
  dailyLimitRequests: 150,
} as const;

export function createMessageId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}
