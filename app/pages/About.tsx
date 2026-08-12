"use client";
/* eslint-disable react/no-unescaped-entities */

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const services = [
  {
    src: "/images/services1.jpg",
    label: "UI & UX DEVELOPMENT",
    desc: "Crafting pixel-perfect interfaces with smooth micro-interactions and intuitive user flows.",
    icon: "✦",
    accent: "#1aa5c1",
  },
  {
    src: "/images/services2.jpg",
    label: "WEB DEVELOPMENT",
    desc: "Building fast, scalable web apps using React, Next.js and modern full-stack patterns.",
    icon: "◈",
    accent: "#497fed",
  },
  {
    src: "/images/services3.jpg",
    label: "MOBILE DEVELOPMENT",
    desc: "Cross-platform mobile experiences with React Native and Flutter.",
    icon: "◉",
    accent: "#0054ff",
  },
];

const stats = [
  { value: "3+", label: "Years Exp." },
  { value: "20+", label: "Projects" },
  { value: "12+", label: "Technologies" },
];

function useReveal(threshold = 0.15) {
  return useInView({ triggerOnce: true, threshold });
}

export default function About() {
  const [titleRef, titleInView] = useReveal(0.3);
  const [bioRef, bioInView] = useReveal(0.2);
  const [statsRef, statsInView] = useReveal(0.2);
  const [cardsRef, cardsInView] = useReveal(0.05);
  const [btnRef, btnInView] = useReveal(0.3);

  return (
    <div
      id="about"
      className="min-h-screen flex flex-col items-center justify-center py-12 md:py-24 px-4 overflow-hidden"
    >
      {/* ── Section title ── */}
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 36 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-[fantasy] bg-gradient-to-r from-[#1aa5c1] to-[#0054ff] bg-clip-text text-transparent mb-3">
          About Me
        </h2>
        <div className="w-16 h-[3px] rounded-full bg-gradient-to-r from-[#1aa5c1] to-[#0054ff]" />
      </motion.div>

      {/* ── Bio card ── */}
      <motion.div
        ref={bioRef}
        initial={{ opacity: 0, y: 40 }}
        animate={bioInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full max-w-3xl mb-12 px-6 py-8 rounded-2xl"
        style={{
          background: "rgba(26,165,193,0.04)",
          border: "1px solid rgba(26,165,193,0.18)",
          boxShadow: "0 0 40px rgba(26,165,193,0.06)",
        }}
      >
        {/* Corner accents */}
        <span className="absolute top-[6px] left-[6px] w-[6px] h-[6px] rounded-full bg-[#1aa5c1] opacity-60" />
        <span className="absolute top-[6px] right-[6px] w-[6px] h-[6px] rounded-full bg-[#0054ff] opacity-60" />
        <span className="absolute bottom-[6px] left-[6px] w-[6px] h-[6px] rounded-full bg-[#0054ff] opacity-60" />
        <span className="absolute bottom-[6px] right-[6px] w-[6px] h-[6px] rounded-full bg-[#1aa5c1] opacity-60" />

        {/* Profile image with glow ring */}
        <div className="relative flex-shrink-0">
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(26,165,193,0.25) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <div
            className="rounded-2xl overflow-hidden flex-shrink-0"
            style={{
              padding: "2.5px",
              background: "linear-gradient(135deg, #1aa5c1, #0054ff, #1aa5c1)",
            }}
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <Image
                src="/images/profile-home.png"
                alt="Profile"
                width={145}
                height={145}
                className="h-[135px] w-[135px] md:h-[145px] md:w-[145px] rounded-2xl object-cover block"
              />
            </motion.div>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center md:items-start">
          <p className="text-white/80 text-base leading-7 text-center md:text-left mb-4 max-w-sm">
            Hey 👋, I'm an experienced{" "}
            <span className="text-[#1aa5c1] font-semibold">Web & App Developer</span>{" "}
            specialising in JavaScript technologies. On a mission to become a{" "}
            <span className="text-[#497fed] font-semibold">Full-Stack developer</span>{" "}
            with the MERN stack.
          </p>

          {/* Skill tags */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {["React", "Next.js", "Node.js", "Flutter", "MERN"].map((tag, i) => (
              <motion.span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full text-[#7dd6f6] tracking-wide"
                style={{
                  background: "rgba(26,165,193,0.08)",
                  border: "1px solid rgba(26,165,193,0.28)",
                }}
                initial={{ opacity: 0, scale: 0.75 }}
                animate={bioInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.4, ease: "backOut" }}
                whileHover={{ scale: 1.1, borderColor: "rgba(26,165,193,0.7)" }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Stats row ── */}
      <motion.div
        ref={statsRef}
        className="flex flex-wrap justify-center gap-4 mb-16 w-full max-w-3xl"
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center flex-1 min-w-[100px] py-4 px-6 rounded-xl"
            style={{
              background: "rgba(26,165,193,0.05)",
              border: "1px solid rgba(26,165,193,0.15)",
            }}
            whileHover={{ scale: 1.05, borderColor: "rgba(26,165,193,0.4)", boxShadow: "0 0 20px rgba(26,165,193,0.12)" }}
          >
            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#1aa5c1] to-[#0054ff] bg-clip-text text-transparent">
              {s.value}
            </span>
            <span className="text-xs text-white/50 mt-1 tracking-wide">{s.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Services cards ── */}
      <motion.div
        ref={cardsRef}
        className="flex flex-wrap justify-center gap-6 w-full max-w-5xl"
      >
        {services.map((svc, i) => (
          <motion.div
            key={svc.label}
            initial={{ opacity: 0, y: 50 }}
            animate={cardsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, boxShadow: `0 0 36px ${svc.accent}22` }}
            className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer w-full sm:w-[280px] md:w-[300px]"
            style={{
              background: "rgba(10,16,28,0.85)",
              border: `1px solid rgba(26,165,193,0.18)`,
            }}
          >
            {/* Image with zoom on hover */}
            <div className="overflow-hidden h-[170px]">
              <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.07 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <Image
                  src={svc.src}
                  alt={svc.label}
                  width={300}
                  height={170}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Gradient overlay */}
            <div
              className="absolute top-0 left-0 right-0 h-[170px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{
                background: `linear-gradient(to bottom, transparent 30%, ${svc.accent}33 100%)`,
              }}
            />

            {/* Card body */}
            <div className="flex flex-col px-4 py-4 gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="text-lg"
                  style={{ color: svc.accent, textShadow: `0 0 8px ${svc.accent}` }}
                >
                  {svc.icon}
                </span>
                <h3
                  className="text-xs font-bold tracking-[0.12em] uppercase"
                  style={{ color: svc.accent }}
                >
                  {svc.label}
                </h3>
              </div>
              <p className="text-white/55 text-xs leading-[1.6] group-hover:text-white/80 transition-colors duration-300">
                {svc.desc}
              </p>
            </div>

            {/* Animated bottom border */}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
              style={{ background: `linear-gradient(90deg, ${svc.accent}, #0054ff)` }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* ── Know Me Better button ── */}
      <motion.div
        ref={btnRef}
        initial={{ opacity: 0, y: 28 }}
        animate={btnInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-14 flex flex-col items-center gap-3"
      >
        <p className="text-white/35 text-xs tracking-widest uppercase">Want to know the person behind the code?</p>
        <Link href="/about-me">
          <motion.span
            className="relative inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-sm font-semibold text-white cursor-pointer select-none overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(26,165,193,0.15), rgba(0,84,255,0.15))",
              border: "1px solid rgba(26,165,193,0.35)",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 28px rgba(26,165,193,0.3)",
              borderColor: "rgba(26,165,193,0.7)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 22 }}
          >
            {/* Shimmer sweep */}
            <motion.span
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(105deg, transparent 35%, rgba(26,165,193,0.18) 50%, transparent 65%)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "linear", repeatDelay: 1.2 }}
            />
            <span className="text-base">✦</span>
            <span className="bg-gradient-to-r from-[#7dd6f6] to-[#a5c4ff] bg-clip-text text-transparent font-semibold">
              Know Me Better
            </span>
            <motion.span
              className="text-[#1aa5c1] text-base"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </motion.span>
        </Link>
      </motion.div>
    </div>
  );
}
