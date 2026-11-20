"use client";

/**
 * JARVIS — the chat panel.
 *
 * Rendered only while open (mounted by <Chatbot /> inside an AnimatePresence).
 * Desktop: a floating glass card with an animated conic-gradient border.
 * Mobile: a full-screen sheet that locks background scroll.
 */

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "usehooks-ts";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import type { ChatMessage } from "../../lib/chat-types";

interface ChatWindowProps {
  onClose: () => void;
  messages: ChatMessage[];
  isStreaming: boolean;
  canRetry: boolean;
  onSend: (text: string) => void;
  onRetry: () => void;
  onReset: () => void;
  onStop: () => void;
}

export default function ChatWindow({
  onClose,
  messages,
  isStreaming,
  canRetry,
  onSend,
  onRetry,
  onReset,
  onStop,
}: ChatWindowProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const reduceMotion = useReducedMotion();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Close on Escape.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock background scroll on mobile only.
  useEffect(() => {
    if (!isMobile) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMobile]);

  // Focus the composer once the open animation has settled.
  useEffect(() => {
    const timer = window.setTimeout(() => inputRef.current?.focus(), isMobile ? 320 : 240);
    return () => window.clearTimeout(timer);
  }, [isMobile]);

  return (
    <motion.div
      role="dialog"
      aria-modal={isMobile}
      aria-label="Chat with JARVIS"
      initial={reduceMotion ? { opacity: 0 } : isMobile ? { opacity: 0, y: "100%" } : { opacity: 0, scale: 0.94, y: 24 }}
      animate={reduceMotion ? { opacity: 1 } : isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 0 } : isMobile ? { opacity: 0, y: "100%" } : { opacity: 0, scale: 0.96, y: 16 }}
      transition={reduceMotion ? { duration: 0.15 } : { type: "spring", stiffness: 320, damping: 30 }}
      className={
        isMobile
          ? "fixed inset-0 z-[1255] overflow-hidden bg-[#05080f]"
          : "fixed bottom-[104px] right-6 z-[1255] h-[min(620px,calc(100dvh-140px))] w-[384px] max-w-[calc(100vw-48px)] overflow-hidden rounded-2xl bg-[#05080f]"
      }
      style={{ boxShadow: "0 0 60px rgba(26,165,193,0.18), 0 24px 60px rgba(0,0,0,0.6)" }}
    >
      {/* Animated conic-gradient border (desktop) */}
      {!isMobile &&
        (reduceMotion ? (
          <span className="pointer-events-none absolute inset-0 rounded-2xl border border-[#1aa5c1]/30" />
        ) : (
          <motion.span
            className="pointer-events-none absolute"
            style={{
              left: "-80%",
              top: "-80%",
              width: "260%",
              height: "260%",
              background:
                "conic-gradient(from 0deg, transparent 0deg, #1aa5c1 70deg, #0054ff 130deg, #a5e6fb 180deg, #0054ff 230deg, transparent 300deg)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          />
        ))}

      {/* Inner panel */}
      <div
        className={`absolute flex flex-col overflow-hidden ${
          isMobile ? "inset-0" : "inset-px rounded-[15px]"
        }`}
        style={{ background: "linear-gradient(135deg, #0a1526 0%, #060a13 100%)" }}
      >
        {/* Ambient glows */}
        <motion.div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(26,165,193,0.16) 0%, transparent 70%)" }}
          animate={reduceMotion ? undefined : { scale: [1, 1.25, 1], opacity: [0.5, 1, 0.5] }}
          transition={reduceMotion ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,84,255,0.14) 0%, transparent 70%)" }}
          animate={reduceMotion ? undefined : { scale: [1, 1.3, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={reduceMotion ? undefined : { duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />

        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage: "radial-gradient(rgba(26,165,193,0.10) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage: "linear-gradient(180deg, black, transparent 70%)",
            WebkitMaskImage: "linear-gradient(180deg, black, transparent 70%)",
          }}
        />

        {/* Drifting scanline */}
        {!reduceMotion && (
          <motion.div
            className="pointer-events-none absolute left-0 right-0 h-24"
            style={{
              background: "linear-gradient(180deg, transparent, rgba(26,165,193,0.06), transparent)",
            }}
            animate={{ top: ["-20%", "120%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Corner accents */}
        <span className="pointer-events-none absolute left-[7px] top-[7px] z-20 h-[5px] w-[5px] rounded-full bg-[#1aa5c1] opacity-70" />
        <span className="pointer-events-none absolute right-[7px] top-[7px] z-20 h-[5px] w-[5px] rounded-full bg-[#0054ff] opacity-70" />
        <span className="pointer-events-none absolute bottom-[7px] left-[7px] z-20 h-[5px] w-[5px] rounded-full bg-[#0054ff] opacity-70" />
        <span className="pointer-events-none absolute bottom-[7px] right-[7px] z-20 h-[5px] w-[5px] rounded-full bg-[#1aa5c1] opacity-70" />

        {/* Content */}
        <div className="relative z-10 flex min-h-0 flex-1 flex-col">
          <ChatHeader
            onClose={onClose}
            onReset={onReset}
            canReset={!isStreaming && messages.length > 0}
          />

          <ChatMessages
            messages={messages}
            isStreaming={isStreaming}
            onSelectSuggestion={onSend}
            onRetry={onRetry}
          />

          <ChatInput onSend={onSend} onStop={onStop} isStreaming={isStreaming} inputRef={inputRef} />
        </div>
      </div>

      {!isMobile && (
        <span className="sr-only" aria-live="polite">
          {canRetry ? "The last response failed. A retry option is available." : ""}
        </span>
      )}
    </motion.div>
  );
}
