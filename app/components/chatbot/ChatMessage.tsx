"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Copy, RefreshCw, TriangleAlert } from "lucide-react";
import ChatbotAvatar from "./ChatbotAvatar";
import Markdown from "../../lib/markdown";
import type { ChatMessage as ChatMessageType } from "../../lib/chat-types";

interface ChatMessageProps {
  message: ChatMessageType;
  /** True while this specific message is still streaming in. */
  isStreaming?: boolean;
  /** Shows the retry action (only offered for the last failed message). */
  showRetry?: boolean;
  onRetry?: () => void;
}

function formatTime(timestamp: number): string {
  try {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }
  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

export default function ChatMessage({
  message,
  isStreaming = false,
  showRetry = false,
  onRetry,
}: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();
  const isUser = message.role === "user";

  const handleCopy = async () => {
    if (!message.content.trim()) return;
    const ok = await copyToClipboard(message.content);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  if (isUser) {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
        className="flex flex-col items-end gap-1"
      >
        <div
          className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md px-3.5 py-2.5 text-[13.5px] leading-relaxed text-white"
          style={{
            background: "linear-gradient(135deg, rgba(26,165,193,0.34), rgba(0,84,255,0.34))",
            border: "1px solid rgba(26,165,193,0.5)",
            boxShadow:
              "0 6px 20px rgba(26,165,193,0.18), inset 0 1px 0 rgba(255,255,255,0.12)",
          }}
        >
          {message.content}
        </div>
        <span className="px-1 text-[10px] text-white/30">{formatTime(message.createdAt)}</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="group flex items-start gap-2.5"
    >
      <ChatbotAvatar size={28} animated={false} className="mt-0.5" />

      <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
        <div
          className="relative w-full max-w-[95%] overflow-hidden break-words rounded-2xl rounded-bl-md px-3.5 py-2.5 transition-shadow duration-300"
          style={{
            background: message.failed ? "rgba(248,113,113,0.08)" : "rgba(255,255,255,0.045)",
            border: message.failed
              ? "1px solid rgba(248,113,113,0.32)"
              : "1px solid rgba(26,165,193,0.18)",
            boxShadow: message.failed ? "none" : "0 4px 18px rgba(0,0,0,0.22)",
          }}
        >
          {/* Gradient accent bar */}
          {!message.failed && (
            <span
              className="absolute bottom-2 left-0 top-2 w-[2px] rounded-full"
              style={{ background: "linear-gradient(180deg, #1aa5c1, #0054ff)" }}
              aria-hidden
            />
          )}

          {message.failed && (
            <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-red-300/90">
              <TriangleAlert size={12} />
              Something went wrong
            </span>
          )}

          <Markdown content={message.content} />

          {isStreaming && (
            <motion.span
              className="ml-0.5 inline-block h-[13px] w-[3px] translate-y-[2px] rounded-full"
              style={{ background: "linear-gradient(180deg, #a5e6fb, #1aa5c1)" }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: [1, 0.2, 1] }}
              transition={reduceMotion ? undefined : { duration: 0.9, repeat: Infinity }}
            />
          )}
        </div>

        <div className="flex items-center gap-2 px-1">
          <span className="text-[10px] text-white/30">{formatTime(message.createdAt)}</span>

          {message.content.trim().length > 0 && (
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? "Copied" : "Copy JARVIS's response"}
              className="flex items-center gap-1 rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-medium text-white/45 opacity-100 transition-all duration-200 hover:border-[#1aa5c1]/40 hover:bg-white/5 hover:text-[#7dd6f6] focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1aa5c1]/70 sm:opacity-0 sm:group-hover:opacity-100"
            >
              {copied ? <Check size={11} /> : <Copy size={11} />}
              {copied ? "Copied" : "Copy"}
            </button>
          )}

          {showRetry && onRetry && (
            <button
              type="button"
              onClick={onRetry}
              aria-label="Retry this question"
              className="flex items-center gap-1 rounded-full border border-red-400/25 px-2 py-0.5 text-[10px] font-medium text-red-300/80 transition-colors duration-200 hover:border-red-400/50 hover:bg-red-500/10 hover:text-red-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-400/70"
            >
              <RefreshCw size={11} />
              Retry
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
