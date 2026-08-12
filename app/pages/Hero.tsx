"use client";
/* eslint-disable react/no-unescaped-entities */

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const roles = [
  "Full Stack Developer",
  "React & Next.js Engineer",
  "Mobile App Developer",
  "UI / UX Enthusiast",
];

function useTypewriter(
  words: string[],
  typingSpeed = 75,
  deletingSpeed = 40,
  pauseMs = 1800,
  ready = false
) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [wordKey, setWordKey] = useState(0);

  useEffect(() => {
    if (!ready) return;
    const current = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex));
        setCharIndex((c) => c + 1);
      }, typingSpeed);
    } else if (!deleting && charIndex > current.length) {
      timeout = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex));
        setCharIndex((c) => c - 1);
      }, deletingSpeed);
    } else {
      setDeleting(false);
      setWordIndex((w) => (w + 1) % words.length);
      setWordKey((k) => k + 1);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs, ready]);

  return { displayed, wordKey };
}

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const { displayed: typed, wordKey } = useTypewriter(roles, 75, 40, 1800, ready);

  useEffect(() => {
    const el = wrapperRef.current;
    if (el) {
      el.classList.remove("hero-hidden");
      el.classList.add("hero-visible");
    }
    setReady(true);
  }, []);

  return (
    <div
      id="hero"
      ref={wrapperRef}
      className="hero-hidden relative min-h-screen flex flex-col justify-center items-center px-4 overflow-hidden"
    >
      {ready && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(26,165,193,0.11) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(0,84,255,0.1) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.85, 0.4] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </>
      )}

      {/* ── Profile image block ── */}
      <motion.div
        className="relative mb-7 flex-shrink-0"
        variants={fadeUp(0)}
        initial="hidden"
        animate={ready ? "visible" : "hidden"}
      >
        {ready && (
          <>
            {/* Outermost slow-rotating gradient ring */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: "calc(100% + 72px)",
                height: "calc(100% + 72px)",
                top: "-36px",
                left: "-36px",
                background:
                  "conic-gradient(from 0deg, #1aa5c1, #0054ff, transparent, #1aa5c1)",
                WebkitMask:
                  "radial-gradient(farthest-side, transparent calc(100% - 2px), white calc(100% - 2px))",
                mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), white calc(100% - 2px))",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />

            {/* Middle dashed ring */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: "calc(100% + 44px)",
                height: "calc(100% + 44px)",
                top: "-22px",
                left: "-22px",
                border: "1px dashed rgba(26,165,193,0.35)",
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            {/* Orbiting bright dot on the conic ring */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                width: "calc(100% + 72px)",
                height: "calc(100% + 72px)",
                top: "-36px",
                left: "-36px",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <span
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-[#1aa5c1]"
                style={{ boxShadow: "0 0 10px 3px rgba(26,165,193,0.9)" }}
              />
            </motion.div>

            {/* Second orbiting dot (counter, opposite side) */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                width: "calc(100% + 72px)",
                height: "calc(100% + 72px)",
                top: "-36px",
                left: "-36px",
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
            >
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[7px] h-[7px] rounded-full bg-[#0054ff]"
                style={{ boxShadow: "0 0 8px 2px rgba(0,84,255,0.9)" }}
              />
            </motion.div>

            {/* Inner pulsing glow */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(26,165,193,0.35) 0%, transparent 68%)",
              }}
              animate={{ scale: [1, 1.18, 1], opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

        {/* The actual image */}
        <motion.div
          whileHover={{ scale: 1.06 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="relative z-10"
        >
          {/* Hexagonal clip via border + overflow trick */}
          <div
            className="rounded-full overflow-hidden"
            style={{
              padding: "3px",
              background: "linear-gradient(135deg, #1aa5c1, #0054ff, #1aa5c1)",
            }}
          >
            <Image
              src="/images/profile.png"
              className="h-[155px] w-[155px] md:h-[185px] md:w-[185px] rounded-full object-cover block"
              alt="Profile"
              width={185}
              height={185}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Greeting badge */}
      <motion.div
        variants={fadeUp(0.15)}
        initial="hidden"
        animate={ready ? "visible" : "hidden"}
        className="flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
      >
        <motion.span
          animate={ready ? { rotate: [0, 20, -10, 20, 0] } : {}}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3 }}
          className="text-lg"
        >
          👋
        </motion.span>
        <span className="text-white/60 text-sm tracking-wide">Hello, I'm</span>
      </motion.div>

      {/* Name */}
      <motion.h1
        variants={fadeUp(0.25)}
        initial="hidden"
        animate={ready ? "visible" : "hidden"}
        className="text-[48px] md:text-[64px] lg:text-[76px] font-[fantasy] leading-none mb-4 text-center bg-gradient-to-r from-[#1aa5c1] via-[#5fb8d4] to-[#0054ff] bg-clip-text text-transparent"
      >
        ABHINAND
      </motion.h1>

      {/* ── Typewriter styled block ── */}
      <motion.div
        variants={fadeUp(0.38)}
        initial="hidden"
        animate={ready ? "visible" : "hidden"}
        className="relative flex items-center justify-center mb-6 h-[44px] w-full max-w-xs md:max-w-sm"
      >
        <div
          className="relative w-full flex items-center justify-center px-5 py-2 rounded-xl"
          style={{
            background: "rgba(26,165,193,0.06)",
            border: "1px solid rgba(26,165,193,0.25)",
            boxShadow: "0 0 18px rgba(26,165,193,0.12), inset 0 0 12px rgba(26,165,193,0.05)",
            height: "44px",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={wordKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-lg md:text-xl font-normal bg-gradient-to-r from-[#c6fafa] to-[#497fed] bg-clip-text text-transparent"
              style={{ fontFamily: "'LXGW WenKai TC', cursive" }}
            >
              {typed}
            </motion.span>
          </AnimatePresence>

          <motion.span
            className="inline-block w-[3px] h-[20px] ml-[3px] rounded-sm bg-[#1aa5c1] flex-shrink-0"
            animate={ready ? { opacity: [1, 0, 1] } : { opacity: 0 }}
            transition={{ duration: 0.65, repeat: Infinity }}
            style={{ boxShadow: "0 0 6px rgba(26,165,193,0.8)" }}
          />

          <span className="absolute top-[3px] left-[3px] w-[4px] h-[4px] rounded-full bg-[#1aa5c1] opacity-60" />
          <span className="absolute top-[3px] right-[3px] w-[4px] h-[4px] rounded-full bg-[#0054ff] opacity-60" />
          <span className="absolute bottom-[3px] left-[3px] w-[4px] h-[4px] rounded-full bg-[#0054ff] opacity-60" />
          <span className="absolute bottom-[3px] right-[3px] w-[4px] h-[4px] rounded-full bg-[#1aa5c1] opacity-60" />
        </div>
      </motion.div>

      {/* Divider */}
      <motion.div
        variants={fadeUp(0.48)}
        initial="hidden"
        animate={ready ? "visible" : "hidden"}
        className="flex items-center gap-3 mb-6 w-full max-w-xs md:max-w-sm"
      >
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#1aa5c1]/40 to-transparent" />
        <span className="text-[#1aa5c1]/50 text-[10px] tracking-[0.3em] uppercase">portfolio</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#1aa5c1]/40 to-transparent" />
      </motion.div>

      {/* Buttons */}
      <motion.div
        variants={fadeUp(0.7)}
        initial="hidden"
        animate={ready ? "visible" : "hidden"}
        className="flex flex-wrap justify-center gap-1"
      >
        <Link href="#about">
          <button
            className="m-1.5 px-5 py-2 rounded-[10px] border border-[#1aa5c173] text-sm text-[#c6fafa] transition-all duration-300 ease-in-out hover:scale-[1.04]"
            style={{
             fontFamily: "'LXGW WenKai TC', cursive",
              background: "rgba(26,165,193,0.07)",
              border: "1px solid rgba(26,165,193,0.45)",
              boxShadow: "0 0 10px rgba(26,165,193,0.1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.border = "1px solid rgba(0,84,255,0.7)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 16px rgba(0,84,255,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.border = "1px solid rgba(26,165,193,0.45)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 10px rgba(26,165,193,0.1)";
            }}
          >
            More info
          </button>
        </Link>
        <button
          className="m-1.5 px-5 py-2 rounded-[10px] border border-[#1aa5c173] text-sm text-[#c6fafa] transition-all duration-300 ease-in-out hover:scale-[1.04]"
          style={{
             fontFamily: "'LXGW WenKai TC', cursive",
            background: "rgba(26,165,193,0.07)",
            border: "1px solid rgba(26,165,193,0.45)",
            boxShadow: "0 0 10px rgba(26,165,193,0.1)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.border = "1px solid rgba(0,84,255,0.7)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 16px rgba(0,84,255,0.25)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.border = "1px solid rgba(26,165,193,0.45)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 10px rgba(26,165,193,0.1)";
          }}
        >
          Download CV
        </button>
      </motion.div>
    </div>
  );
}
