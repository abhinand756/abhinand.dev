"use client";

/**
 * JARVIS — global mount.
 *
 * Owns the always-on conversation state (so history survives closing the
 * window and navigating between pages) and renders the floating launcher.
 * The window itself is lazy-loaded so the chatbot never delays first paint.
 */

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import ChatbotAvatar from "./ChatbotAvatar";
import { useChat } from "./useChat";

const ChatWindow = dynamic(() => import("./ChatWindow"), { ssr: false });

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [autoTip, setAutoTip] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const { messages, isStreaming, canRetry, send, retry, reset, stop } = useChat();

  // Reveal the "Chat with JARVIS" tooltip once shortly after load.
  useEffect(() => {
    if (reduceMotion) return;
    const show = window.setTimeout(() => setAutoTip(true), 1500);
    const hide = window.setTimeout(() => setAutoTip(false), 7000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, [reduceMotion]);

  const handleClose = useCallback(() => {
    setOpen(false);
    window.requestAnimationFrame(() => launcherRef.current?.focus());
  }, []);

  const tipVisible = !open && (hovered || autoTip);

  return (
    <>
      <AnimatePresence>
        {open && (
          <ChatWindow
            key="jarvis-chat-window"
            onClose={handleClose}
            messages={messages}
            isStreaming={isStreaming}
            canRetry={canRetry}
            onSend={send}
            onRetry={retry}
            onReset={reset}
            onStop={stop}
          />
        )}
      </AnimatePresence>

      {/* Launcher */}
      <motion.div
        className="fixed bottom-5 right-5 z-[1250] sm:bottom-6 sm:right-6"
        initial={reduceMotion ? false : { scale: 0, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={
          reduceMotion
            ? { duration: 0.2 }
            : { type: "spring", stiffness: 300, damping: 20, delay: 1 }
        }
      >
        <motion.div
          animate={!open && !reduceMotion ? { y: [0, -4, 0] } : undefined}
          transition={
            !open && !reduceMotion
              ? { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
        >
          <motion.button
            ref={launcherRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close JARVIS chat" : "Chat with JARVIS"}
            aria-expanded={open}
            aria-haspopup="dialog"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.93 }}
            className="group relative flex h-[62px] w-[62px] items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1aa5c1]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {/* Aurora halo */}
            <span
              className="pointer-events-none absolute -inset-3 rounded-full opacity-80"
              style={{
                background: "radial-gradient(circle, rgba(26,165,193,0.4), transparent 65%)",
                filter: "blur(6px)",
              }}
              aria-hidden
            />

            {/* Expanding pulse rings */}
            {!open && !reduceMotion && (
              <>
                <motion.span
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{ border: "1px solid rgba(26,165,193,0.55)" }}
                  animate={{ scale: [1, 1.55], opacity: [0.5, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.span
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{ border: "1px solid rgba(0,84,255,0.5)" }}
                  animate={{ scale: [1, 1.55], opacity: [0.45, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
                />
              </>
            )}

            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={reduceMotion ? { opacity: 0 } : { rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={reduceMotion ? { opacity: 1 } : { rotate: 0, opacity: 1, scale: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 flex h-full w-full items-center justify-center rounded-full border border-[#1aa5c1]/45 bg-[#0b1626] text-white"
                  style={{ boxShadow: "0 0 24px rgba(26,165,193,0.45)" }}
                >
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span
                  key="orb"
                  initial={reduceMotion ? { opacity: 0 } : { scale: 0.8, opacity: 0 }}
                  animate={reduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  <ChatbotAvatar size={54} animated showStatus />
                </motion.span>
              )}
            </AnimatePresence>

            {/* Tooltip */}
            <AnimatePresence>
              {tipVisible && (
                <motion.span
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.2 }}
                  className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-xl border border-[#1aa5c1]/30 bg-[#0b1626]/95 px-3 py-1.5 text-[12px] font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,0.5)] backdrop-blur-md"
                >
                  Chat with JARVIS
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
}
