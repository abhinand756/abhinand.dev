"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface SuggestedQuestionsProps {
  questions: readonly string[];
  onSelect: (question: string) => void;
  disabled?: boolean;
  /** Small heading above the chips. */
  title?: string;
  /** Rendered as a compact "follow-up" row instead of the welcome grid. */
  variant?: "welcome" | "follow-up";
  className?: string;
}

/**
 * Interactive suggestion chips with a gradient wash on hover. Clicking a chip
 * immediately sends that question to JARVIS — they are never decorative.
 */
export default function SuggestedQuestions({
  questions,
  onSelect,
  disabled = false,
  title,
  variant = "welcome",
  className = "",
}: SuggestedQuestionsProps) {
  const reduceMotion = useReducedMotion();
  if (questions.length === 0) return null;

  const isFollowUp = variant === "follow-up";

  return (
    <div className={className}>
      {title && (
        <p
          className={`mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1aa5c1]/70 ${
            isFollowUp ? "mt-1" : ""
          }`}
        >
          <Sparkles size={11} />
          {title}
        </p>
      )}

      <div className={isFollowUp ? "flex flex-wrap gap-2" : "grid grid-cols-1 gap-2 sm:grid-cols-2"}>
        {questions.map((question, index) => (
          <motion.button
            key={question}
            type="button"
            onClick={() => onSelect(question)}
            disabled={disabled}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : Math.min(index * 0.05, 0.3), duration: 0.35 }}
            whileHover={disabled ? undefined : { y: -2 }}
            whileTap={disabled ? undefined : { scale: 0.97 }}
            className={`group relative flex items-center gap-2 overflow-hidden rounded-xl border border-[#1aa5c1]/20 bg-white/[0.03] text-left text-[12px] font-medium text-white/75 transition-colors duration-200 hover:border-[#1aa5c1]/55 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1aa5c1]/70 disabled:cursor-not-allowed disabled:opacity-45 ${
              isFollowUp ? "px-3 py-1.5" : "px-3.5 py-2.5"
            }`}
          >
            <span
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1aa5c1]/15 to-[#0054ff]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden
            />
            <span className="relative flex-1 leading-snug">{question}</span>
            <span className="relative text-[#7dd6f6] opacity-60 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100">
              →
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
