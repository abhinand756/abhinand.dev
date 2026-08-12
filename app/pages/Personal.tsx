"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

interface TimelineItem {
  year: string;
  title: string;
  institution: string;
  grade?: string;
  desc: string;
  accent: string;
}

interface HobbyItem {
  icon: string;
  label: string;
  desc: string;
}

interface FavouriteCategory {
  icon: string;
  label: string;
  items: string[];
  accent: string;
}

interface FunFact {
  icon: string;
  text: string;
}

// ── Data ─────────────────────────────────────────────────────────────────────

const education: TimelineItem[] = [
  {
    year: "2018 – 2022",
    title: "BTech – Bachelor of Electrical & Electronics Engineering",
    institution: "Collage of Engineering, Vadakara",
    grade: "CGPA: 6.8 / 10",
    desc: "Focused on software engineering, databases, and full-stack web development.",
    accent: "#1aa5c1",
  },
  {
    year: "2016 – 2018",
    title: "Higher Secondary (Science – Bio)",
    institution: "SGM GHSS Kolathur",
    grade: "86%",
    desc: "Completed higher secondary with 86%",
    accent: "#497fed",
  },
  {
    year: "2016",
    title: "SSLC",
    institution: "SGM GHSS Kolathur",
    grade: "95%",
    desc: "Completed secondary schooling with distinction.",
    accent: "#0054ff",
  },
];

const hobbies: HobbyItem[] = [
  { icon: "🎵", label: "Music", desc: "Love listening to lo-fi, indie and Malayalam film music" },
  { icon: "🎮", label: "Gaming", desc: "PC games are my go-to after a long coding session" },
  { icon: "🏋️", label: "Fitness", desc: "Regular gym sessions keep me focused and energised" },
  { icon: "📸", label: "Photography", desc: "Capturing candid moments and nature shots" },
  { icon: "🌄", label: "Hiking", desc: "Living in the hills of Idukki makes this a weekend ritual" },
  { icon: "📚", label: "Reading", desc: "Tech blogs, science articles and the occasional novel" },
  { icon: "🍳", label: "Cooking", desc: "Experimenting with recipes is stress-relief for me" },
  { icon: "✈️", label: "Travelling", desc: "Always eager to explore new places and cultures" },
];

const favourites: FavouriteCategory[] = [
  {
    icon: "🎬",
    label: "Movies & Shows",
    accent: "#1aa5c1",
    items: ["Interstellar", "Dark (series)", "Inception", "Vikram", "Premam"],
  },
  {
    icon: "🎧",
    label: "Music Artists",
    accent: "#497fed",
    items: ["A.R. Rahman", "Sid Sriram", "Coldplay", "Hans Zimmer", "Lil Peep"],
  },
  {
    icon: "💻",
    label: "Games",
    accent: "#1aa5c1",
    items: ["GTA Vice city", "Next.js", "Figma", "Notion", "Kiro IDE"],
  },
  {
    icon: "📖",
    label: "Books",
    accent: "#497fed",
    items: ["Clean Code", "Atomic Habits", "The Pragmatic Programmer", "Zero to One"],
  },
  {
    icon: "⚽",
    label: "Sports",
    accent: "#0054ff",
    items: ["Football (huge fan!)", "Cricket", "Badminton", "Chess"],
  },
];

const funFacts: FunFact[] = [
  { icon: "🌍", text: "Born and raised in the misty highlands of Idukki, Kerala" },
  { icon: "🌓", text: "A certified night owl — best code comes after midnight" },
  { icon: "☕", text: "Runs on coffee and lo-fi beats during deep-work sessions" },
  { icon: "🚀", text: "Started coding at 17 and never looked back" },
  { icon: "🎯", text: "Currently on a mission to master the MERN stack end-to-end" },
  { icon: "🐾", text: "Dog person through and through" },
  { icon: "🌿", text: "Nature lover — hiking resets my brain better than any vacation" },
  { icon: "🤝", text: "Believes great teams build great products more than solo genius" },
];

function useReveal(threshold = 0.08) {
  return useInView({ triggerOnce: true, threshold });
}

// ── Age calculator ────────────────────────────────────────────────────────────
const DOB = new Date("2001-03-09");

function calcAge() {
  const today = new Date();
  let age = today.getFullYear() - DOB.getFullYear();
  const m = today.getMonth() - DOB.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < DOB.getDate())) age--;
  return age;
}

const profileDetails = [
  { icon: "🎂", label: "Date of Birth", value: "09 March 2001" },
  { icon: "🎉", label: "Age", value: `${calcAge()} years` },
  { icon: "📍", label: "Location", value: "Kozhikode, Kerala, India" },
  { icon: "🗣️", label: "Languages", value: "Malayalam, English, Tamil" },
  { icon: "💼", label: "Job Title", value: "Full Stack Developer" },
  { icon: "🎓", label: "Education", value: "BTech – EEE" },
];

// ── Profile hero section ──────────────────────────────────────────────────────
function ProfileHeroSection() {
  const [ref, inView] = useReveal(0.15);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 120);
    return () => clearTimeout(t);
  }, []);

  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const } },
  });

  return (
    <section ref={ref} className="w-full max-w-4xl mb-20">
      {/* ── Outer container card ── */}
      <div
        className="relative flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-14 rounded-3xl px-6 py-10 md:px-10 md:py-12"
        style={{
          background: "rgba(26,165,193,0.04)",
          border: "1px solid rgba(26,165,193,0.18)",
          boxShadow: "0 0 60px rgba(26,165,193,0.06)",
        }}
      >
        {/* Container corner dots */}
        <span className="absolute top-[6px] left-[6px] w-[7px] h-[7px] rounded-full bg-[#1aa5c1] opacity-60" />
        <span className="absolute top-[6px] right-[6px] w-[7px] h-[7px] rounded-full bg-[#0054ff] opacity-60" />
        <span className="absolute bottom-[6px] left-[6px] w-[7px] h-[7px] rounded-full bg-[#0054ff] opacity-60" />
        <span className="absolute bottom-[6px] right-[6px] w-[7px] h-[7px] rounded-full bg-[#1aa5c1] opacity-60" />

        {/* ── Left: image block ── */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={show ? "visible" : "hidden"}
          className="relative flex-shrink-0 flex flex-col items-center gap-5"
        >
          {/* Image with all decorations */}
          <div className="relative">

            {/* Orbiting cyan dot */}
            <motion.div
              className="absolute pointer-events-none"
              style={{ width: "calc(100% + 52px)", height: "calc(100% + 52px)", top: "-26px", left: "-26px" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <span
                className="absolute w-2.5 h-2.5 rounded-full"
                style={{
                  top: "50%", right: "-5px", transform: "translateY(-50%)",
                  background: "#1aa5c1",
                  boxShadow: "0 0 10px 3px rgba(26,165,193,0.9)",
                }}
              />
            </motion.div>

            {/* Orbiting blue dot (opposite) */}
            <motion.div
              className="absolute pointer-events-none"
              style={{ width: "calc(100% + 52px)", height: "calc(100% + 52px)", top: "-26px", left: "-26px" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
            >
              <span
                className="absolute w-2 h-2 rounded-full"
                style={{
                  bottom: "-4px", left: "50%", transform: "translateX(-50%)",
                  background: "#0054ff",
                  boxShadow: "0 0 8px 3px rgba(0,84,255,0.9)",
                }}
              />
            </motion.div>

            {/* Pulsing glow */}
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{ background: "radial-gradient(circle at 50% 60%, rgba(26,165,193,0.3) 0%, transparent 70%)" }}
              animate={{ scale: [1, 1.12, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Animated corner brackets */}
            {[
              { top: "-5px", left: "-5px", borderTop: "2px solid #1aa5c1", borderLeft: "2px solid #1aa5c1" },
              { top: "-5px", right: "-5px", borderTop: "2px solid #0054ff", borderRight: "2px solid #0054ff" },
              { bottom: "-5px", left: "-5px", borderBottom: "2px solid #0054ff", borderLeft: "2px solid #0054ff" },
              { bottom: "-5px", right: "-5px", borderBottom: "2px solid #1aa5c1", borderRight: "2px solid #1aa5c1" },
            ].map((s, i) => (
              <motion.span
                key={i}
                className="absolute w-4 h-4 pointer-events-none z-30"
                style={{ borderRadius: "3px", ...s }}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={show ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.38, ease: "backOut" }}
              />
            ))}

            {/* Image with gradient border + scan-line */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ padding: "3px", background: "linear-gradient(135deg, #1aa5c1, #0054ff, #1aa5c1)" }}
            >
              {/* Scan-line sweep */}
              <motion.div className="absolute inset-0 z-20 pointer-events-none rounded-2xl overflow-hidden">
                <motion.div
                  className="absolute left-0 right-0 h-[2px]"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(26,165,193,0.85), transparent)",
                    boxShadow: "0 0 10px 3px rgba(26,165,193,0.4)",
                  }}
                  animate={{ top: ["-3px", "calc(100% + 3px)"] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.8 }}
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
              >
                <Image
                  src="/images/profile-inner.png"
                  alt="Abhinand M"
                  width={200}
                  height={240}
                  className="w-[170px] h-[200px] md:w-[200px] md:h-[240px] rounded-2xl object-cover block"
                  style={{ objectPosition: "center top" }}
                />
              </motion.div>
            </div>
          </div>

          {/* Name + job + status */}
          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            className="flex flex-col items-center gap-2 text-center"
          >
            <h3 className="text-2xl font-bold text-white tracking-tight">Abhinand M</h3>
            <span
              className="relative inline-flex items-center gap-1.5 text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase overflow-hidden"
              style={{
                background: "rgba(26,165,193,0.1)",
                border: "1px solid rgba(26,165,193,0.32)",
                color: "#7dd6f6",
              }}
            >
              {/* shimmer */}
              <motion.span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 30%, rgba(26,165,193,0.18) 50%, transparent 70%)",
                  backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
              />
              Full Stack Developer
            </span>
          </motion.div>
        </motion.div>

        {/* ── Right: detail cards grid ── */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          {profileDetails.map((d, i) => (
            <motion.div
              key={d.label}
              variants={fadeUp(0.1 + i * 0.08)}
              initial="hidden"
              animate={show ? "visible" : "hidden"}
              whileHover={{
                y: -4,
                boxShadow: "0 0 22px rgba(26,165,193,0.16)",
                borderColor: "rgba(26,165,193,0.42)",
              }}
              className="flex items-center gap-3 rounded-xl px-4 py-3 cursor-default transition-all duration-300"
              style={{
                background: "rgba(26,165,193,0.05)",
                border: "1px solid rgba(26,165,193,0.13)",
              }}
            >
              <motion.span
                className="text-xl flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl"
                style={{ background: "rgba(26,165,193,0.1)", border: "1px solid rgba(26,165,193,0.2)" }}
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                transition={{ duration: 0.4 }}
              >
                {d.icon}
              </motion.span>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-[#1aa5c1]/60 uppercase tracking-widest font-semibold">
                  {d.label}
                </span>
                <span className="text-sm text-white/85 font-medium truncate">{d.value}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center mb-10"
    >
      <h3 className="text-2xl md:text-3xl font-[fantasy] bg-gradient-to-r from-[#1aa5c1] to-[#0054ff] bg-clip-text text-transparent mb-3">
        {title}
      </h3>
      <div className="w-14 h-[3px] rounded-full bg-gradient-to-r from-[#1aa5c1] to-[#0054ff]" />
    </motion.div>
  );
}

function EducationCard({ item, i }: { item: TimelineItem; i: number }) {
  const [ref, inView] = useReveal(0.2);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-5 pb-10 last:pb-0"
    >
      {/* Dot on the track */}
      <motion.div
        className="absolute left-[-14px] top-[6px] w-[10px] h-[10px] rounded-full flex-shrink-0 z-10"
        style={{ background: item.accent, boxShadow: `0 0 10px ${item.accent}` }}
        animate={inView ? { scale: [0, 1.3, 1] } : { scale: 0 }}
        transition={{ delay: i * 0.12 + 0.2, duration: 0.45 }}
      />

      {/* Card */}
      <motion.div
        whileHover={{ y: -4, boxShadow: `0 0 28px ${item.accent}22` }}
        className="flex-1 rounded-2xl px-5 py-5 relative overflow-hidden"
        style={{
          background: "rgba(26,165,193,0.04)",
          border: `1px solid ${item.accent}28`,
        }}
      >
        {/* Corner accents */}
        <span className="absolute top-[5px] left-[5px] w-[5px] h-[5px] rounded-full opacity-50" style={{ background: item.accent }} />
        <span className="absolute bottom-[5px] right-[5px] w-[5px] h-[5px] rounded-full opacity-50" style={{ background: "#0054ff" }} />

        {/* Subtle glow sweep on hover */}
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{ background: `radial-gradient(ellipse at top left, ${item.accent}0e 0%, transparent 60%)` }}
        />

        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
          <span
            className="text-xs font-semibold px-2.5 py-0.5 rounded-full tracking-wide"
            style={{ background: `${item.accent}18`, color: item.accent, border: `1px solid ${item.accent}30` }}
          >
            {item.year}
          </span>
          {item.grade && (
            <span className="text-xs text-white/40 font-medium">{item.grade}</span>
          )}
        </div>

        <h4 className="text-white/90 font-semibold text-base mt-2 mb-0.5">{item.title}</h4>
        <p className="text-[#1aa5c1]/70 text-xs font-medium mb-2 tracking-wide">{item.institution}</p>
        <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
      </motion.div>
    </motion.div>
  );
}

function EducationSection() {
  return (
    <section className="w-full max-w-3xl mb-20">
      <SectionTitle title="Education" />
      <div className="relative pl-6 flex flex-col gap-0">
        {/* Vertical track line */}
        <div className="absolute left-[10px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#1aa5c1] via-[#497fed] to-[#0054ff] opacity-30 rounded-full" />

        {education.map((item, i) => (
          <EducationCard key={item.title} item={item} i={i} />
        ))}
      </div>
    </section>
  );
}

function HobbiesSection() {
  const [gridRef, gridInView] = useReveal(0.05);

  return (
    <section className="w-full max-w-4xl mb-20">
      <SectionTitle title="Hobbies & Interests" />
      <motion.div
        ref={gridRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
      >
        {hobbies.map((h, i) => (
          <motion.div
            key={h.label}
            initial={{ opacity: 0, y: 28, scale: 0.9 }}
            animate={gridInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, boxShadow: "0 0 24px rgba(26,165,193,0.18)", borderColor: "rgba(26,165,193,0.45)" }}
            className="group flex flex-col items-center text-center gap-2 rounded-2xl px-4 py-5 cursor-default transition-colors duration-300"
            style={{
              background: "rgba(26,165,193,0.04)",
              border: "1px solid rgba(26,165,193,0.14)",
            }}
          >
            <motion.span
              className="text-3xl"
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
              transition={{ duration: 0.4 }}
            >
              {h.icon}
            </motion.span>
            <span className="text-sm font-semibold text-white/80 group-hover:text-[#7dd6f6] transition-colors duration-300">
              {h.label}
            </span>
            <span className="text-[11px] text-white/40 leading-snug group-hover:text-white/60 transition-colors duration-300">
              {h.desc}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function FavouriteCard({ cat, i }: { cat: FavouriteCategory; i: number }) {
  const [ref, inView] = useReveal(0.1);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (i % 3) * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, boxShadow: `0 0 32px ${cat.accent}18` }}
      className="relative rounded-2xl px-5 py-5 flex flex-col gap-3 overflow-hidden"
      style={{
        background: "rgba(26,165,193,0.04)",
        border: `1px solid ${cat.accent}22`,
      }}
    >
      {/* Top corner dot */}
      <span className="absolute top-[5px] left-[5px] w-[5px] h-[5px] rounded-full opacity-50" style={{ background: cat.accent }} />
      <span className="absolute bottom-[5px] right-[5px] w-[5px] h-[5px] rounded-full opacity-50" style={{ background: "#0054ff" }} />

      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-xl">{cat.icon}</span>
        <h4 className="text-sm font-bold tracking-wide uppercase" style={{ color: cat.accent }}>
          {cat.label}
        </h4>
      </div>

      {/* Items */}
      <div className="flex flex-wrap gap-2">
        {cat.items.map((item, j) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: (i % 3) * 0.1 + j * 0.06 + 0.2, duration: 0.35, ease: "backOut" }}
            whileHover={{ scale: 1.08, borderColor: `${cat.accent}99` }}
            className="text-xs px-2.5 py-1 rounded-full font-medium text-white/70"
            style={{
              background: `${cat.accent}10`,
              border: `1px solid ${cat.accent}28`,
            }}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

function FavouritesSection() {
  return (
    <section className="w-full max-w-5xl mb-20">
      <SectionTitle title="Favourites" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {favourites.map((cat, i) => (
          <FavouriteCard key={cat.label} cat={cat} i={i} />
        ))}
      </div>
    </section>
  );
}

export default function Personal() {
  return (
    <div
      id="personal"
      className="min-h-screen flex flex-col items-center justify-start py-12 md:py-24 px-4 overflow-hidden"
    >
      <motion.div
        className="fixed top-[30%] left-[10%] w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(26,165,193,0.07) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.85, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed bottom-[20%] right-[10%] w-[280px] h-[280px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,84,255,0.07) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.22, 1], opacity: [0.35, 0.75, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center mb-16"
      >
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1aa5c1]/60 mb-4">
          — Get to know me —
        </span>
        <h2 className="text-4xl md:text-5xl font-[fantasy] bg-gradient-to-r from-[#1aa5c1] via-[#497fed] to-[#0054ff] bg-clip-text text-transparent mb-4 text-center">
          Personal Details
        </h2>
        <div className="w-20 h-[3px] rounded-full bg-gradient-to-r from-[#1aa5c1] to-[#0054ff]" />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mt-5 text-white/45 text-sm text-center max-w-md leading-relaxed"
        >
          Beyond the code — a little peek into who I am, where I come from, and what makes me tick.
        </motion.p>
      </motion.div>

      <ProfileHeroSection />
      <EducationSection />
      <HobbiesSection />
      <FavouritesSection />
    </div>
  );
}
