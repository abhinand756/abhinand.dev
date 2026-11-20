"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface ChatbotAvatarProps {
  size?: number;
  /** Shows the green "online" dot. */
  showStatus?: boolean;
  /** Gentle breathing glow, orbiting satellite and rotating rings. */
  animated?: boolean;
  className?: string;
}

/**
 * JARVIS's animated core: a rotating conic-gradient ring, a dashed orbit, an
 * inner glass core with a pulsing sparkle and a single orbiting satellite.
 * Matches the portfolio's cyan → blue identity.
 */
export default function ChatbotAvatar({
  size = 40,
  showStatus = false,
  animated = true,
  className = "",
}: ChatbotAvatarProps) {
  const reduceMotion = useReducedMotion();
  const spin = animated && !reduceMotion;
  const satellite = Math.max(4, Math.round(size * 0.14));

  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Soft breathing halo */}
      {animated && !reduceMotion && (
        <motion.span
          className="absolute rounded-full"
          style={{
            inset: -Math.round(size * 0.24),
            background: "radial-gradient(circle, rgba(26,165,193,0.4) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.22, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Rotating dashed orbit */}
      {animated && !reduceMotion && (
        <motion.span
          className="absolute rounded-full"
          style={{
            inset: -Math.round(size * 0.14),
            border: "1px dashed rgba(125,214,246,0.35)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Conic gradient ring */}
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{
          background: "conic-gradient(from 0deg, #1aa5c1, #0054ff, #7dd6f6, #0054ff, #1aa5c1)",
          boxShadow: "0 0 16px rgba(26,165,193,0.5)",
        }}
        animate={spin ? { rotate: 360 } : undefined}
        transition={spin ? { duration: 6.5, repeat: Infinity, ease: "linear" } : undefined}
      />

      {/* Glass core */}
      <span
        className="absolute rounded-full"
        style={{
          top: 2,
          right: 2,
          bottom: 2,
          left: 2,
          background:
            "radial-gradient(circle at 32% 28%, #14273e 0%, #0a1526 46%, #050810 100%)",
          boxShadow: "inset 0 0 10px rgba(26,165,193,0.28)",
        }}
      />

      {/* Inner highlight ring */}
      <span
        className="absolute rounded-full"
        style={{ inset: 3, border: "1px solid rgba(125,214,246,0.18)" }}
      />

      {/* Pulsing sparkle core */}
      <span className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="flex items-center justify-center"
          animate={spin ? { scale: [1, 1.14, 1], opacity: [0.85, 1, 0.85] } : undefined}
          transition={spin ? { duration: 2.6, repeat: Infinity, ease: "easeInOut" } : undefined}
        >
          <Sparkles size={Math.round(size * 0.4)} className="text-[#a5e6fb]" strokeWidth={1.8} />
        </motion.span>
      </span>

      {/* Orbiting satellite */}
      {animated && !reduceMotion && (
        <motion.span
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        >
          <span
            className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a5e6fb]"
            style={{ width: satellite, height: satellite, boxShadow: "0 0 8px #7dd6f6" }}
          />
        </motion.span>
      )}

      {/* Online status */}
      {showStatus && (
        <span
          className="absolute rounded-full border-2"
          style={{
            width: Math.max(10, Math.round(size * 0.28)),
            height: Math.max(10, Math.round(size * 0.28)),
            bottom: -1,
            right: -1,
            background: "#22c55e",
            borderColor: "#060a13",
            boxShadow: "0 0 10px rgba(34,197,94,0.9)",
          }}
        >
          {animated && !reduceMotion && (
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ background: "#22c55e" }}
              animate={{ scale: [1, 2], opacity: [0.7, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </span>
      )}
    </div>
  );
}
