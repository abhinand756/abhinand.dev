"use client";

/**
 * JARVIS — composer.
 *
 * Auto-growing textarea with Enter-to-send (Shift+Enter for a newline), a
 * gradient send / stop control and a character counter. The `isComposing`
 * guard keeps IME input (e.g. Malayalam, Japanese) from being sent early.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp, Sparkles, Square } from "lucide-react";
import type { KeyboardEvent, RefObject } from "react";
import { CHAT_LIMITS } from "../../lib/chat-types";

interface ChatInputProps {
  onSend: (text: string) => void;
  onStop: () => void;
  isStreaming: boolean;
  /** Lets the window focus the composer when it opens. */
  inputRef?: RefObject<HTMLTextAreaElement>;
  disabled?: boolean;
}

const MAX_HEIGHT = 132;
const COUNTER_THRESHOLD = CHAT_LIMITS.maxMessageChars - 200;

export default function ChatInput({
  onSend,
  onStop,
  isStreaming,
  inputRef,
  disabled = false,
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const localRef = useRef<HTMLTextAreaElement>(null);
  const textareaRef = inputRef ?? localRef;
  const reduceMotion = useReducedMotion();

  const resize = useCallback(() => {
    const element = textareaRef.current;
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${Math.min(element.scrollHeight, MAX_HEIGHT)}px`;
  }, [textareaRef]);

  useEffect(() => {
    resize();
  }, [value, resize]);

  const submit = useCallback(() => {
    const text = value.trim();
    if (!text || isStreaming || disabled) return;
    onSend(text);
    setValue("");
  }, [value, isStreaming, disabled, onSend]);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || event.shiftKey) return;
    // Don't hijack Enter while an IME candidate window is open.
    if (event.nativeEvent.isComposing) return;
    event.preventDefault();
    submit();
  };

  const canSend = value.trim().length > 0 && !isStreaming && !disabled;
  const showCounter = value.length >= COUNTER_THRESHOLD;

  return (
    <footer className="relative border-t border-[#1aa5c1]/15 bg-[#070c15]/85 px-3 pb-2 pt-2.5 backdrop-blur-xl">
      {/* Gradient top divider */}
      <span className="pointer-events-none absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1aa5c1]/40 to-transparent" />

      <div
        className="relative rounded-2xl transition-colors duration-200"
        style={{
          border: `1px solid ${focused ? "rgba(26,165,193,0.6)" : "rgba(255,255,255,0.09)"}`,
          background: focused ? "rgba(26,165,193,0.06)" : "rgba(255,255,255,0.03)",
          boxShadow: focused ? "0 0 22px rgba(26,165,193,0.18)" : "none",
        }}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => setValue(event.target.value.slice(0, CHAT_LIMITS.maxMessageChars))}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={1}
          disabled={disabled}
          placeholder="Ask me anything about Abhinand..."
          aria-label="Message JARVIS"
          className="no-scrollbar block max-h-[132px] w-full resize-none bg-transparent py-3 pl-3.5 pr-12 text-[13.5px] leading-relaxed text-white outline-none placeholder:text-white/35 disabled:opacity-50"
        />

        <div className="absolute bottom-2 right-2">
          {isStreaming ? (
            <motion.button
              type="button"
              onClick={onStop}
              aria-label="Stop generating"
              whileTap={{ scale: 0.9 }}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-red-400/40 bg-red-500/10 text-red-200 transition-colors hover:bg-red-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/70"
            >
              <Square size={12} className="fill-current" />
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={submit}
              disabled={!canSend}
              aria-label="Send message"
              whileTap={canSend ? { scale: 0.9 } : undefined}
              className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40"
              style={{
                background: canSend
                  ? "linear-gradient(135deg, #1aa5c1, #0054ff)"
                  : "rgba(255,255,255,0.08)",
                boxShadow: canSend ? "0 0 18px rgba(26,165,193,0.5)" : "none",
              }}
            >
              {canSend && !reduceMotion && (
                <motion.span
                  className="pointer-events-none absolute inset-y-0 w-6 bg-white/30"
                  animate={{ x: ["-32px", "40px"], skewX: -12 }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.6 }}
                />
              )}
              <ArrowUp size={16} strokeWidth={2.4} className="relative" />
            </motion.button>
          )}
        </div>
      </div>

      <div className="mt-1.5 flex items-center justify-between gap-2 px-1">
        <span className="flex min-w-0 items-center gap-1 truncate text-[10px] tracking-wide text-white/30">
          <Sparkles size={10} className="flex-shrink-0 text-[#1aa5c1]/60" />
          Powered by AI • Built for Abhinand&apos;s Portfolio
        </span>
        {showCounter && (
          <span
            className={`flex-shrink-0 text-[10px] tabular-nums ${
              value.length >= CHAT_LIMITS.maxMessageChars ? "text-red-300/90" : "text-white/35"
            }`}
          >
            {value.length}/{CHAT_LIMITS.maxMessageChars}
          </span>
        )}
      </div>
    </footer>
  );
}
