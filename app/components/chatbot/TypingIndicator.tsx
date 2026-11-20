"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Modern "JARVIS is thinking" indicator: a glass pill with gradient dots and a
 * light sweep, shown before the first streamed token arrives.
 */
export default function TypingIndicator({ label = "JARVIS is thinking" }: { label?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex items-center gap-2.5" role="status" aria-live="polite">
      <div className="relative flex items-center gap-1 overflow-hidden rounded-full border border-[#1aa5c1]/25 bg-[#1aa5c1]/10 px-3 py-2">
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: "linear-gradient(135deg, #a5e6fb, #1aa5c1)",
              boxShadow: "0 0 6px rgba(26,165,193,0.85)",
            }}
            animate={
              reduceMotion ? { opacity: 0.6 } : { y: [0, -4, 0], opacity: [0.4, 1, 0.4] }
            }
            transition={
              reduceMotion
                ? undefined
                : { duration: 1, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }
            }
          />
        ))}

        {!reduceMotion && (
          <motion.span
            className="pointer-events-none absolute inset-y-0 w-8"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)",
            }}
            animate={{ x: ["-40px", "120px"], skewX: -12 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>

      <span className="text-[11px] font-medium tracking-wide text-white/45">
        {label}
        <motion.span
          animate={reduceMotion ? undefined : { opacity: [0.25, 1, 0.25] }}
          transition={reduceMotion ? undefined : { duration: 1.4, repeat: Infinity }}
        >
          …
        </motion.span>
      </span>
    </div>
  );
}
