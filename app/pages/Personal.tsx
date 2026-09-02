"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { Maximize2, X, Loader2 } from "lucide-react";

function ImageWithLoader({
  src,
  alt,
  fill = false,
  width,
  height,
  className = "",
  sizes,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm animate-pulse">
          <Loader2 className="w-5 h-5 text-[#1aa5c1] animate-spin" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        sizes={sizes}
        quality={100}
        unoptimized={src.startsWith("http")}
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </>
  );
}

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
  accent: string;
}

interface FavouriteItem {
  name: string;
  subtitle?: string;
  image?: string;
}

interface FavouriteCategory {
  id: string;
  icon: string;
  label: string;
  subtitle?: string;
  accent: string;
  items: FavouriteItem[];
}

interface FunFact {
  icon: string;
  title: string;
  text: string;
  tag: string;
}

// ── Data ─────────────────────────────────────────────────────────────────────

const education: TimelineItem[] = [
  {
    year: "2018 – 2022",
    title: "BTech – Electrical & Electronics Engineering",
    institution: "College of Engineering, Vadakara",
    grade: "CGPA: 6.8 / 10",
    desc: "Discovered passion for software development, computing fundamentals, logic design & full-stack web applications.",
    accent: "#1aa5c1",
  },
  {
    year: "2016 – 2018",
    title: "Higher Secondary (Science – Bio)",
    institution: "SGM GHSS Kolathur",
    grade: "86%",
    desc: "Graduated with strong foundations in analytical problem solving and scientific reasoning.",
    accent: "#497fed",
  },
  {
    year: "2016",
    title: "Secondary School Leaving Certificate (SSLC)",
    institution: "SGM GHSS Kolathur",
    grade: "95%",
    desc: "Completed secondary education with distinction across all core academic disciplines.",
    accent: "#0054ff",
  },
];

const hobbies: HobbyItem[] = [
  { icon: "🎬", label: "Cinema", desc: "Exploring Malayalam classics, international films & thought-provoking stories", accent: "#1aa5c1" },
  { icon: "🌸", label: "Anime", desc: "Following captivating stories, iconic characters & beautifully crafted worlds", accent: "#1aa5c1" },
  { icon: "🏏", label: "Cricket", desc: "Watching thrilling matches, following favorite players & enjoying weekend games", accent: "#497fed" },
  { icon: "⚽", label: "Football", desc: "Following exciting leagues, supporting favorite teams & playing with friends", accent: "#0054ff" },
  { icon: "🥾", label: "Trekking", desc: "Weekend mountain hikes through serene trails, forests & scenic peaks", accent: "#497fed" },
  { icon: "✈️", label: "Travel", desc: "Exploring offbeat destinations, local cultures & unforgettable experiences", accent: "#0054ff" },
  { icon: "📸", label: "Photography", desc: "Capturing landscapes, street moments, portraits & everyday stories", accent: "#1aa5c1" },
  { icon: "🎥", label: "Filmmaking", desc: "Creating visual stories through cinematography, editing & creative storytelling", accent: "#497fed" },
];

const favourites: FavouriteCategory[] = [
  {
    id: "cinema",
    icon: "🎬",
    label: "Movies",
    subtitle: "Films that stayed with me",
    accent: "#00ff37ff",
    items: [
      { name: "Interstellar", subtitle: "Sci-Fi Masterpiece", image: "/images/personal/interstellar.jpeg" },
      { name: "PK", subtitle: "Satirical Comedy", image: "/images/personal/pk.jpg" },
      { name: "Anbe Sivam", subtitle: "Philosophical Drama", image: "/images/personal/anbesivam.jpeg" },
      { name: "Guru", subtitle: "Fantasy Drama", image: "/images/personal/guru.jpeg" },
      { name: "The Dark Knight", subtitle: "Superhero Crime Thriller", image: "/images/personal/darkknight.webp" },
      { name: "CID Moosa", subtitle: "Comedy Entertainer", image: "/images/personal/cidmoosa.jpg" },
    ],
  },
  {
    id: "series",
    icon: "📺",
    label: "TV Series",
    subtitle: "Web Series that I love",
    accent: "#00eeffff",
    items: [
      { name: "DARK", subtitle: "Mind-Bending Sci-Fi", image: "/images/personal/dark.jpeg" },
      { name: "Stranger Things", subtitle: "Supernatural Adventure", image: "/images/personal/stranger.jpg" },
      { name: "Attack on Titan", subtitle: "Epic Anime", image: "/images/personal/attack.jpg" },
      { name: "Breaking Bad", subtitle: "Crime Drama", image: "/images/personal/breaking.jpg" },
      { name: "The Boys", subtitle: "Dark Superheroes", image: "/images/personal/boys.avif" },
      { name: "Money Heist", subtitle: "Heist Thriller", image: "/images/personal/money.jpg" },
    ],
  },
  {
    id: "artists",
    icon: "🎭",
    label: "Artists",
    subtitle: "Performers & cinematic icons",
    accent: "#004ffaff",
    items: [
      { name: "Mohanlal", subtitle: "The Complete Actor", image: "/images/personal/mohanlal.jpg" },
      { name: "Christian Bale", subtitle: "The Chameleon", image: "/images/personal/bale.jpg" },
      { name: "Shah Rukh Khan", subtitle: "Badshah of Bollywood", image: "/images/personal/srk.jpg" },
      { name: "Leonardo DiCaprio", subtitle: "Versatile Performer", image: "/images/personal/leo.webp" },
      { name: "Brad Pitt", subtitle: "Hollywood Icon", image: "/images/personal/brad.jpeg" },
      { name: "Robert Downey Jr.", subtitle: "I'm Iron Man", image: "/images/personal/rdj.jpg" },
    ]
  },
  {
    id: "music",
    icon: "🎧",
    label: "Musicians",
    subtitle: "Magicians in music world",
    accent: "#00ff37ff",
    items: [
      { name: "A R Rahman", subtitle: "Legendary Musician", image: "/images/personal/rahman.jpeg" },
      { name: "Anirudh Ravichander", subtitle: "The Rockstar", image: "/images/personal/anirudh.webp" },
      { name: "Shreya Ghoshal", subtitle: "The Golden Voice", image: "/images/personal/shreya.jpeg" },
      { name: "Arijit Singh", subtitle: "The Voice of Millions", image: "/images/personal/arijit.jpg" },
      { name: "Hans Zimmer", subtitle: "Music Maestro", image: "/images/personal/zimmer.jpeg" },
      { name: "Sushin Shyam", subtitle: "Rising Talent", image: "/images/personal/sushin.jpg" },
    ],
  },
  {
    id: "sports",
    icon: "⚽",
    label: "Sports & Athletes",
    subtitle: "Legends who inspires me",
    accent: "#00eeffff",
    items: [
      { name: "Sachin Tendulkar", subtitle: "Master Blaster", image: "/images/personal/sachin.jpeg" },
      { name: "Cristiano Ronaldo", subtitle: "Legendary No.7", image: "/images/personal/cr7.jpeg" },
      { name: "Rohit Sharma", subtitle: "The Hitman", image: "/images/personal/rohit.avif" },
      { name: "Tony Kroos", subtitle: "Maestro of Football", image: "/images/personal/tony.jpeg" },
      { name: "Roger Federer", subtitle: "The GOAT", image: "/images/personal/roger.jpg" },
      { name: "Amelia Kerr", subtitle: "Elite All-Rounder", image: "/images/personal/kerr.jpeg" },

    ],
  },
  {
    id: "gaming",
    icon: "🎮",
    label: "Games & Entertainment",
    subtitle: "Games made my childhood awesome",
    accent: "#004ffaff",
    items: [
      { name: "GTA", subtitle: "Iconic Adventure", image: "/images/personal/gta.png" },
      { name: "Need For Speed", subtitle: "Racing Thrills", image: "/images/personal/nfs.jpg" },
      { name: "Minecraft", subtitle: "Creative Sandbox", image: "/images/personal/mine.jpg" },
      { name: "Cricket 07", subtitle: "Cricket Fever", image: "/images/personal/cricket7.jpg" },
      { name: "PUBG", subtitle: "Battle Royale", image: "/images/personal/pubg.jpeg" },
      { name: "Dream League'26", subtitle: "Football Saga", image: "/images/personal/dls26.webp" },
    ],
  },
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
  { icon: "🎉", label: "Age", value: `${calcAge()} years old` },
  { icon: "📍", label: "Location", value: "Kozhikode, Kerala, India" },
  { icon: "🗣️", label: "Languages", value: "Malayalam, English, Tamil" },
  { icon: "💼", label: "Role", value: "Full Stack Developer" },
  { icon: "🎓", label: "Degree", value: "BTech – EEE" },
];

// ── Section Title Component ──────────────────────────────────────────────────
function SectionHeader({ subtitle, title }: { subtitle: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center mb-12 text-center"
    >
      <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#1aa5c1] mb-2 px-3.5 py-1 rounded-full bg-[#1aa5c1]/10 border border-[#1aa5c1]/20">
        {subtitle}
      </span>
      <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#1aa5c1] via-[#497fed] to-[#0054ff] bg-clip-text text-transparent mb-3">
        {title}
      </h3>
      <div className="w-16 h-[3px] rounded-full bg-gradient-to-r from-[#1aa5c1] via-[#497fed] to-[#0054ff]" />
    </motion.div>
  );
}

// ── Profile Hero Section ─────────────────────────────────────────────────────
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
    <section ref={ref} className="w-full max-w-5xl mb-24">
      <div
        className="relative flex flex-col lg:flex-row items-center lg:items-stretch gap-10 lg:gap-14 rounded-3xl p-6 sm:p-10 md:p-12 overflow-hidden"
        style={{
          background: "linear-gradient(145deg, rgba(26,165,193,0.06) 0%, rgba(10,16,28,0.7) 100%)",
          border: "1px solid rgba(26,165,193,0.22)",
          boxShadow: "0 20px 80px -20px rgba(26,165,193,0.15)",
        }}
      >
        {/* Animated backdrop glow */}
        <motion.div
          className="absolute -top-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(26,165,193,0.18) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,84,255,0.18) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Tech Corner Accent Dots */}
        <span className="absolute top-3 left-3 w-2 h-2 rounded-full bg-[#1aa5c1] opacity-70" />
        <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#0054ff] opacity-70" />
        <span className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-[#0054ff] opacity-70" />
        <span className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-[#1aa5c1] opacity-70" />

        {/* ── Left: Image Avatar Block ── */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={show ? "visible" : "hidden"}
          className="relative flex-shrink-0 flex flex-col items-center gap-5 z-10"
        >
          <div className="relative group">
            {/* Orbiting particles */}
            <motion.div
              className="absolute pointer-events-none"
              style={{ width: "calc(100% + 56px)", height: "calc(100% + 56px)", top: "-28px", left: "-28px" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <span
                className="absolute w-3 h-3 rounded-full"
                style={{
                  top: "50%", right: "-6px", transform: "translateY(-50%)",
                  background: "#1aa5c1",
                  boxShadow: "0 0 12px 4px rgba(26,165,193,0.9)",
                }}
              />
            </motion.div>

            <motion.div
              className="absolute pointer-events-none"
              style={{ width: "calc(100% + 56px)", height: "calc(100% + 56px)", top: "-28px", left: "-28px" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <span
                className="absolute w-2.5 h-2.5 rounded-full"
                style={{
                  bottom: "-5px", left: "50%", transform: "translateX(-50%)",
                  background: "#497fed",
                  boxShadow: "0 0 10px 4px rgba(73,127,237,0.9)",
                }}
              />
            </motion.div>

            {/* Corner Tech Brackets */}
            {[
              { top: "-6px", left: "-6px", borderTop: "2px solid #1aa5c1", borderLeft: "2px solid #1aa5c1" },
              { top: "-6px", right: "-6px", borderTop: "2px solid #0054ff", borderRight: "2px solid #0054ff" },
              { bottom: "-6px", left: "-6px", borderBottom: "2px solid #0054ff", borderLeft: "2px solid #0054ff" },
              { bottom: "-6px", right: "-6px", borderBottom: "2px solid #1aa5c1", borderRight: "2px solid #1aa5c1" },
            ].map((s, i) => (
              <motion.span
                key={i}
                className="absolute w-4 h-4 pointer-events-none z-30"
                style={{ borderRadius: "2px", ...s }}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={show ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.38, ease: "backOut" }}
              />
            ))}

            {/* Image Frame */}
            <div
              className="relative rounded-2xl overflow-hidden p-[3px]"
              style={{ background: "linear-gradient(135deg, #1aa5c1, #0054ff, #1aa5c1)" }}
            >
              {/* Scanline effect */}
              <div className="absolute inset-0 z-20 pointer-events-none rounded-2xl overflow-hidden">
                <motion.div
                  className="absolute left-0 right-0 h-[2px]"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(26,165,193,0.9), transparent)",
                    boxShadow: "0 0 12px 4px rgba(26,165,193,0.6)",
                  }}
                  animate={{ top: ["-4px", "calc(100% + 4px)"] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="relative"
              >
                <Image
                  src="/images/profile-inner.png"
                  alt="Abhinand M"
                  width={220}
                  height={260}
                  priority
                  className="w-[180px] h-[210px] sm:w-[210px] sm:h-[250px] rounded-2xl object-cover block shadow-2xl"
                  style={{ objectPosition: "center top" }}
                />
              </motion.div>
            </div>
          </div>

          <motion.div
            variants={fadeUp(0.15)}
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            className="flex flex-col items-center gap-1.5 text-center"
          >
            <h3 className="text-2xl font-black text-white tracking-tight">Abhinand M</h3>
            <span
              className="relative inline-flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase overflow-hidden"
              style={{
                background: "rgba(26,165,193,0.12)",
                border: "1px solid rgba(26,165,193,0.35)",
                color: "#7dd6f6",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#1aa5c1] animate-pulse" />
              Full Stack Engineer
            </span>
          </motion.div>
        </motion.div>

        {/* ── Right: Personal Specs Grid ── */}
        <div className="flex-1 flex flex-col justify-between gap-6 z-10 w-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#1aa5c1]/70 block mb-2">
              Biography & Summary
            </span>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed font-normal">
              Passionate developer dedicated to engineering intuitive, high-performance web and mobile products.
              Obsessed with crisp design systems, interactive state logic, and smooth motion craft.
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {profileDetails.map((d, i) => (
              <motion.div
                key={d.label}
                variants={fadeUp(0.1 + i * 0.06)}
                initial="hidden"
                animate={show ? "visible" : "hidden"}
                whileHover={{
                  y: -3,
                  scale: 1.02,
                  boxShadow: "0 8px 24px -6px rgba(26,165,193,0.2)",
                  borderColor: "rgba(26,165,193,0.45)",
                }}
                className="flex items-center gap-3.5 rounded-2xl px-4 py-3.5 transition-all duration-300"
                style={{
                  background: "rgba(26,165,193,0.04)",
                  border: "1px solid rgba(26,165,193,0.14)",
                }}
              >
                <motion.span
                  className="text-xl flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl"
                  style={{ background: "rgba(26,165,193,0.1)", border: "1px solid rgba(26,165,193,0.22)" }}
                  whileHover={{ rotate: [0, -12, 12, 0], scale: 1.15 }}
                  transition={{ duration: 0.35 }}
                >
                  {d.icon}
                </motion.span>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-[#1aa5c1]/70 uppercase tracking-widest font-bold">
                    {d.label}
                  </span>
                  <span className="text-xs sm:text-sm text-white/90 font-semibold truncate">{d.value}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Education Timeline Section ───────────────────────────────────────────────
function EducationCard({ item, i }: { item: TimelineItem; i: number }) {
  const [ref, inView] = useReveal(0.15);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-6 pb-10 last:pb-0"
    >
      {/* Node Dot */}
      <motion.div
        className="absolute left-[-15px] top-[6px] w-3 h-3 rounded-full flex-shrink-0 z-10"
        style={{ background: item.accent, boxShadow: `0 0 14px 2px ${item.accent}` }}
        animate={inView ? { scale: [0, 1.4, 1] } : { scale: 0 }}
        transition={{ delay: i * 0.12 + 0.15, duration: 0.45 }}
      />

      {/* Card Body */}
      <motion.div
        whileHover={{ y: -4, boxShadow: `0 12px 30px -10px ${item.accent}30` }}
        className="flex-1 rounded-2xl p-6 relative overflow-hidden transition-all duration-300"
        style={{
          background: "rgba(10,16,28,0.75)",
          border: `1px solid ${item.accent}30`,
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span
            className="text-xs font-bold px-3 py-1 rounded-full tracking-wide"
            style={{ background: `${item.accent}18`, color: item.accent, border: `1px solid ${item.accent}35` }}
          >
            {item.year}
          </span>
          {item.grade && (
            <span className="text-xs text-white/60 font-semibold px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10">
              {item.grade}
            </span>
          )}
        </div>

        <h4 className="text-white text-lg font-bold mt-1 mb-1">{item.title}</h4>
        <p className="text-[#1aa5c1] text-xs font-semibold mb-3 tracking-wide">{item.institution}</p>
        <p className="text-white/65 text-sm leading-relaxed">{item.desc}</p>
      </motion.div>
    </motion.div>
  );
}

function EducationSection() {
  return (
    <section className="w-full max-w-4xl mb-24">
      <SectionHeader subtitle="Academic Journey" title="Education & Qualifications" />
      <div className="relative pl-6 sm:pl-8 flex flex-col">
        <div className="absolute left-[9px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#1aa5c1] via-[#497fed] to-[#0054ff] opacity-40 rounded-full" />
        {education.map((item, i) => (
          <EducationCard key={item.title} item={item} i={i} />
        ))}
      </div>
    </section>
  );
}

// ── Hobbies Section ──────────────────────────────────────────────────────────
function HobbiesSection() {
  const [gridRef, gridInView] = useReveal(0.05);

  return (
    <section className="w-full max-w-5xl mb-24">
      <SectionHeader subtitle="Passions & Leisure" title="Hobbies & Interests" />
      <motion.div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {hobbies.map((h, i) => (
          <motion.div
            key={h.label}
            initial={{ opacity: 0, y: 28, scale: 0.92 }}
            animate={gridInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
              y: -8,
              scale: 1.02,
              boxShadow: `0 12px 28px -8px ${h.accent}30`,
              borderColor: `${h.accent}55`,
            }}
            className="group relative flex flex-col p-5 rounded-2xl cursor-default transition-all duration-300 overflow-hidden"
            style={{
              background: "rgba(10,16,28,0.75)",
              border: "1px solid rgba(26,165,193,0.16)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <motion.span
                className="text-3xl p-2.5 rounded-2xl"
                style={{ background: `${h.accent}15`, border: `1px solid ${h.accent}30` }}
                whileHover={{ rotate: [0, -12, 12, 0], scale: 1.15 }}
                transition={{ duration: 0.4 }}
              >
                {h.icon}
              </motion.span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: h.accent }} />
            </div>

            <span className="text-base font-bold text-white group-hover:text-[#7dd6f6] transition-colors duration-300 mb-1">
              {h.label}
            </span>
            <span className="text-xs text-white/50 leading-relaxed group-hover:text-white/75 transition-colors duration-300">
              {h.desc}
            </span>

            {/* Hover accent bar */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `linear-gradient(90deg, ${h.accent}, transparent)` }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ── RE-DESIGNED FAVOURITES SECTION (Rich Media Images + Interactive Hover) ──
function FavouritesSection() {
  const [selectedImg, setSelectedImg] = useState<{ name: string; subtitle?: string; image?: string; accent: string } | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredCategories = activeTab === "all"
    ? favourites
    : favourites.filter((cat) => cat.id === activeTab);

  return (
    <section className="w-full max-w-6xl mb-24">
      <SectionHeader subtitle="Curated Picks" title="My Favourites & Inspirations" />

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-3xl p-6 flex flex-col justify-between overflow-hidden transition-all duration-500"
            style={{
              background: "linear-gradient(160deg, rgba(15,23,42,0.85) 0%, rgba(10,16,28,0.95) 100%)",
              border: `1px solid ${cat.accent}30`,
              boxShadow: `0 10px 30px -10px ${cat.accent}15`,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5 z-10">
              <div className="flex items-center gap-3">
                <span
                  className="w-12 h-12 text-xl p-2.5 rounded-xl flex items-center justify-center"
                  style={{ background: `${cat.accent}20`, border: `1px solid ${cat.accent}40` }}
                >
                  {cat.icon}
                </span>
                <div>
                  <h4 className="text-base font-bold text-white tracking-wide">{cat.label}</h4>
                  {cat.subtitle && (
                    <span className="text-[11px] font-semibold text-[#1aa5c1]/80 leading-none block mt-0.5">
                      {cat.subtitle}
                    </span>
                  )}
                </div>
              </div>
              <span className="w-2 h-2 rounded-full" style={{ background: cat.accent }} />
            </div>

            {/* Favourites Cards Showcase */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 z-10">
              {cat.items.map((item, j) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: j * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setSelectedImg({ ...item, accent: cat.accent })}
                  className="group/item relative aspect-square rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-end p-3 border border-white/50 transition-all duration-300"
                  style={{
                    borderColor: `${cat.accent}30`,
                  }}
                >
                  {/* Background Image with Zoom & Dark Gradient */}
                  {item.image && (
                    <ImageWithLoader
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover/item:scale-110 transition-transform duration-700 ease-out"
                    />
                  )}
                  <div
                    className="absolute inset-0 transition-opacity duration-300 pointer-events-none z-[5]"
                    style={{
                      background: item.image
                        ? `linear-gradient(to top, rgba(10,16,28,0.95) 10%, rgba(10,16,28,0.4) 50%, transparent 100%)`
                        : `${cat.accent}15`,
                    }}
                  />

                  {/* Content Overlay */}
                  <div className="relative z-10 flex flex-col">
                    <span className="text-xs font-bold text-white group-hover/item:text-[#7dd6f6] transition-colors duration-200 truncate">
                      {item.name}
                    </span>
                    {item.subtitle && (
                      <span className="text-[10px] font-medium text-white/60 truncate">
                        {item.subtitle}
                      </span>
                    )}
                  </div>

                  {/* Expand icon on hover */}
                  <div className="absolute top-2 right-2 z-10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                    <span className="w-6 h-6 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Glow Sweep */}
            <div
              className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle, ${cat.accent} 0%, transparent 70%)` }}
            />
          </motion.div>
        ))}
      </div>

      {/* ── Image Preview Modal ── */}
      {selectedImg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImg(null)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.85, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm sm:max-w-md w-full rounded-2xl overflow-hidden p-6 border border-white/50"
            style={{
              background: "rgba(15,23,42,0.95)",
              borderColor: `${selectedImg.accent}60`,
              boxShadow: `0 0 50px ${selectedImg.accent}30`,
            }}
          >
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-bold transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {selectedImg.image && (
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4">
                <ImageWithLoader
                  src={selectedImg.image}
                  alt={selectedImg.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <h3 className="text-xl font-bold text-white mb-1">{selectedImg.name}</h3>
            {selectedImg.subtitle && (
              <p className="text-sm font-semibold" style={{ color: selectedImg.accent }}>
                {selectedImg.subtitle}
              </p>
            )}
            <p className="mt-3 text-xs text-white/60 leading-relaxed">
              One of my top pick inspirations that shapes my perspective, aesthetic taste, or problem-solving mindset!
            </p>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

// ── Main Page Layout Component ───────────────────────────────────────────────
export default function Personal() {
  return (
    <div
      id="personal"
      className="min-h-screen flex flex-col items-center justify-start py-12 md:py-20 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background Ambient Orbs */}
      <motion.div
        className="fixed top-[20%] left-[5%] w-[420px] h-[420px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(26,165,193,0.08) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed bottom-[15%] right-[5%] w-[380px] h-[380px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(0,84,255,0.08) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Main Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center mb-16 z-10 text-center"
      >
        <span className="text-[10px] font-extrabold tracking-[0.25em] uppercase text-[#1aa5c1] mb-3 px-4 py-1 rounded-full bg-[#1aa5c1]/10 border border-[#1aa5c1]/25 shadow-sm">
          — Beyond The Code —
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-[#1aa5c1] via-[#497fed] to-[#0054ff] bg-clip-text text-transparent mb-4">
          About Me & Personal Story
        </h2>
        <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-[#1aa5c1] via-[#497fed] to-[#0054ff]" />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-4 text-white/60 text-sm sm:text-base text-center max-w-lg leading-relaxed"
        >
          A closer look into my background, passions, inspiration sources, and what drives my craft every single day.
        </motion.p>
      </motion.div>

      {/* Page Sections */}
      <ProfileHeroSection />
      <EducationSection />
      <HobbiesSection />
      <FavouritesSection />
    </div>
  );
}

