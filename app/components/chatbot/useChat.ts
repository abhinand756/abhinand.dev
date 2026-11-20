"use client";

/**
 * JARVIS — conversation state.
 *
 * Owns the message list, streaming, error handling, retry, stop and reset.
 * Lives in the always-mounted <Chatbot /> shell so the conversation survives
 * closing/re-opening the window and navigating between pages.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CHAT_LIMITS,
  createMessageId,
  type ChatApiMessage,
  type ChatMessage,
  type ChatStreamEvent,
} from "../../lib/chat-types";

export interface UseChatResult {
  messages: ChatMessage[];
  isStreaming: boolean;
  error: string | null;
  canRetry: boolean;
  send: (text: string) => void;
  retry: () => void;
  reset: () => void;
  stop: () => void;
}

/** Drops failed/aborted/empty turns so the API only ever sees clean history. */
function cleanHistory(list: ChatMessage[]): ChatMessage[] {
  return list.filter(
    (message) =>
      message.content.trim().length > 0 &&
      !(message.role === "assistant" && (message.pending || message.failed))
  );
}

export function useChat(): UseChatResult {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesRef = useRef<ChatMessage[]>([]);
  const abortRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      abortRef.current?.abort();
      abortRef.current = null;
    };
  }, []);

  const appendText = useCallback((id: string, value: string) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === id ? { ...message, content: message.content + value } : message
      )
    );
  }, []);

  const run = useCallback(
    async (history: ChatMessage[]) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const assistantId = createMessageId();
      const placeholder: ChatMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
        createdAt: Date.now(),
        pending: true,
      };

      setError(null);
      setIsStreaming(true);
      setMessages([...history, placeholder]);

      const payload: ChatApiMessage[] = history
        .filter((message) => message.content.trim().length > 0)
        .slice(-CHAT_LIMITS.clientHistoryMessages)
        .map(({ role, content }) => ({ role, content }));

      let accumulated = "";

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: payload }),
          signal: controller.signal,
        });

        if (!response.ok) {
          const data = (await response.json().catch(() => null)) as { error?: string } | null;
          throw new Error(data?.error || "Something went wrong while contacting JARVIS.");
        }

        if (!response.body) {
          throw new Error("JARVIS returned an empty response. Please try again.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          let newlineIndex = buffer.indexOf("\n");
          while (newlineIndex >= 0) {
            const line = buffer.slice(0, newlineIndex).trim();
            buffer = buffer.slice(newlineIndex + 1);
            newlineIndex = buffer.indexOf("\n");
            if (!line) continue;

            let event: ChatStreamEvent | null = null;
            try {
              event = JSON.parse(line) as ChatStreamEvent;
            } catch {
              continue;
            }

            if (event.type === "text") {
              accumulated += event.value;
              appendText(assistantId, event.value);
            } else if (event.type === "error") {
              throw new Error(event.message);
            }
          }
        }

        if (!mountedRef.current || controller.signal.aborted) return;

        if (!accumulated.trim()) {
          const fallback =
            "I couldn't come up with an answer for that. Could you rephrase your question about Abhinand?";
          setError(fallback);
          setMessages((prev) =>
            prev.map((message) =>
              message.id === assistantId
                ? { ...message, content: fallback, pending: false, failed: true }
                : message
            )
          );
          return;
        }

        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantId ? { ...message, pending: false } : message
          )
        );
      } catch (caught) {
        if (controller.signal.aborted || !mountedRef.current) return;

        const message =
          caught instanceof Error
            ? caught.message
            : "Something went wrong while contacting JARVIS. Please try again.";

        setError(message);
        setMessages((prev) =>
          prev.map((item) =>
            item.id === assistantId
              ? {
                  ...item,
                  pending: false,
                  failed: true,
                  content: item.content.trim() || message,
                }
              : item
          )
        );
      } finally {
        const isCurrent = abortRef.current === controller;
        if (isCurrent) abortRef.current = null;
        if (isCurrent && mountedRef.current) setIsStreaming(false);
      }
    },
    [appendText]
  );

  const send = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const userMessage: ChatMessage = {
        id: createMessageId(),
        role: "user",
        content: trimmed.slice(0, CHAT_LIMITS.maxMessageChars),
        createdAt: Date.now(),
      };

      const history = [...cleanHistory(messagesRef.current), userMessage];
      void run(history);
    },
    [run]
  );

  const retry = useCallback(() => {
    const history = cleanHistory(messagesRef.current);
    const last = history[history.length - 1];
    if (!last || last.role !== "user") return;
    void run(history);
  }, [run]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsStreaming(false);
    setMessages((prev) =>
      prev.map((message) =>
        message.pending
          ? {
              ...message,
              pending: false,
              failed: message.content.trim().length === 0,
              content: message.content.trim() || "Response stopped.",
            }
          : message
      )
    );
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsStreaming(false);
    setError(null);
    setMessages([]);
  }, []);

  const lastMessage = messages[messages.length - 1];
  const canRetry = !isStreaming && Boolean(lastMessage?.failed);

  return { messages, isStreaming, error, canRetry, send, retry, reset, stop };
}
