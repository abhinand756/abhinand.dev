"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RotateCcw, X } from "lucide-react";
import ChatbotAvatar from "./ChatbotAvatar";

interface ChatHeaderProps {
  onClose: () => void;
  onReset: () => void;
  /** Disables "new conversation" while a response is streaming. */
  canReset: boolean;
}

/**
 * JARVIS window header: animated orb, gradient wordmark, a live equalizer
 * "online" badge, a sweeping underline and the conversation controls.
 */
export default function ChatHeader({ onClose, onReset, canReset }: ChatHeaderProps) {
  const reduceMotion = useReducedMotion();

  return (
    <header
      className="relative z-20 flex items-center gap-3 border-b border-[#1aa5c1]/15 bg-[#0a1322]/70 px-4 py-3 backdrop-blur-xl"
      aria-label="JARVIS chat header"
    >
      {/* Sweeping underline */}
      {!reduceMotion && (
        <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-px overflow-hidden">
          <motion.span
            className="block h-full w-1/3"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(125,214,246,0.8), transparent)",
            }}
            animate={{ x: ["-120%", "420%"] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }}
          />
        </span>
      )}

      <ChatbotAvatar size={38} showStatus />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h2 className="text-[14px] font-bold leading-none">
            <span className="bg-gradient-to-r from-[#a5e6fb] via-white to-[#a5e6fb] bg-clip-text text-transparent">
              JARVIS
            </span>
          </h2>

          <span className="flex items-center gap-1.5 rounded-full border border-[#22c55e]/30 bg-[#22c55e]/10 px-2 py-[3px]">
            <span className="flex h-2.5 items-end gap-[2px]">
              {[0, 1, 2].map((index) => (
                <motion.span
                  key={index}
                  className="w-[2px] rounded-full bg-[#22c55e]"
                  style={{
                    height: 9,
                    transformOrigin: "bottom",
                    boxShadow: "0 0 5px rgba(34,197,94,0.9)",
                  }}
                  animate={reduceMotion ? undefined : { scaleY: [0.35, 1, 0.5, 0.85, 0.35] }}
                  transition={
                    reduceMotion
                      ? undefined
                      : { duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }
                  }
                />
              ))}
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-wider text-[#86efac]">
              Online
            </span>
          </span>
        </div>

        <p className="mt-1 truncate text-[11px] leading-none text-white/45">
          Abhinand&apos;s AI Assistant
        </p>
      </div>

      <div className="flex items-center gap-1">
        <motion.button
          type="button"
          onClick={onReset}
          disabled={!canReset}
          aria-label="Start a new conversation"
          title="New conversation"
          whileTap={canReset ? { scale: 0.88, rotate: -40 } : undefined}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-all duration-200 hover:border-[#1aa5c1]/45 hover:bg-[#1aa5c1]/10 hover:text-white hover:shadow-[0_0_14px_rgba(26,165,193,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1aa5c1]/70 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <RotateCcw size={15} />
        </motion.button>

        <motion.button
          type="button"
          onClick={onClose}
          aria-label="Close JARVIS chat"
          whileTap={{ scale: 0.88, rotate: 90 }}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-all duration-200 hover:border-[#1aa5c1]/45 hover:bg-[#1aa5c1]/10 hover:text-white hover:shadow-[0_0_14px_rgba(26,165,193,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1aa5c1]/70"
        >
          <X size={16} />
        </motion.button>
      </div>
    </header>
  );
}
