"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { ExternalLink, Layers } from "lucide-react";

const projects = [
  {
    src: "/images/website-dev.webp",
    label: "Web Projects",
    count: "10+",
    desc: "Full-stack web apps built with React, Next.js and Node.js. Responsive, performant and accessible across all devices.",
    tags: ["React", "Next.js", "Node.js", "MongoDB"],
    accent: "#1aa5c1",
  },
  {
    src: "/images/mobile-app.webp",
    label: "App Projects",
    count: "5+",
    desc: "Cross-platform mobile applications with React Native & Flutter. Smooth UX with native-level performance.",
    tags: ["React Native", "Flutter", "Firebase"],
    accent: "#497fed",
  },
];

const MotionLink = motion(Link);

function BookCard({
  src,
  label,
  count,
  desc,
  tags,
  accent,
  index,
}: (typeof projects)[0] & { index: number }) {
  const [open, setOpen] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [hasHover, setHasHover] = useState(true);

  const openToRight = index === 1;

  useEffect(() => {
    const mql = window.matchMedia("(hover: hover)");
    setHasHover(mql.matches);
  }, []);

  if (!hasHover) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.2, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full sm:w-[340px] md:w-[380px] rounded-2xl overflow-hidden"
        style={{
          background: "rgba(6,11,20,0.97)",
          border: `1px solid ${accent}44`,
          boxShadow: `0 0 30px ${accent}11`,
        }}
      >
        <div className="relative h-[180px] overflow-hidden">
          <Image
            src={src}
            alt={label}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 380px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060b14] via-[#060b14]/50 to-transparent" />
          <span
            className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}55` }}
          >
            {count}
          </span>
        </div>
        <div className="flex flex-col gap-3 px-5 py-4">
          <div className="flex items-center gap-2">
            <Layers size={16} color={accent} />
            <h3 className="text-base font-bold tracking-wide" style={{ color: accent }}>
              {label}
            </h3>
          </div>
          <p className="text-white/65 text-sm leading-6">{desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-[3px] rounded-full text-[10px] font-medium text-white/50"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <MotionLink
            href="/projects"
            className="flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl text-sm font-semibold self-start ml-2 mt-2"
            style={{
              background: `${accent}15`,
              border: `1px solid ${accent}55`,
              color: accent,
              fontFamily: "'LXGW WenKai TC', cursive",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 0 18px ${accent}44`,
            }}
            whileTap={{ scale: 0.97 }}
          >
            <ExternalLink size={14} />
            View Projects
          </MotionLink>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full sm:w-[340px] md:w-[380px]"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Book container — holds both cover and inner page */}
      <div
        className="relative w-full rounded-2xl overflow-visible"
        style={{ height: "320px", transformStyle: "preserve-3d" }}
      >

        {/* ── Inner page (back face, revealed when cover opens) ── */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col justify-between px-6 py-5 overflow-hidden"
          style={{
            background: "rgba(6,11,20,0.97)",
            border: `1px solid ${accent}44`,
            boxShadow: `inset 0 0 40px ${accent}0a`,
            zIndex: 0,
          }}
        >
          {/* Spine glow line — left for card 0, right for card 1 */}
          <div
            className={`absolute ${openToRight ? "right-0" : "left-0"} top-0 bottom-0 w-[3px] ${openToRight ? "rounded-r-2xl" : "rounded-l-2xl"}`}
            style={{ background: `linear-gradient(180deg, ${accent}, #0054ff)` }}
          />

          <div className="flex flex-col gap-3 pl-2">
            <div className="flex items-center gap-2">
              <Layers size={16} color={accent} />
              <h3 className="text-base font-bold tracking-wide" style={{ color: accent }}>
                {label}
              </h3>
              <span
                className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}44` }}
              >
                {count}
              </span>
            </div>

            <p className="text-white/70 text-sm leading-6">{desc}</p>

            <div className="flex flex-wrap gap-1.5 mt-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-[3px] rounded-full text-[10px] font-medium text-white/55"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>


          <MotionLink
            href="/projects"
            className="flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl text-sm font-semibold self-start ml-2 mt-2"
            style={{
              background: `${accent}15`,
              border: `1px solid ${accent}55`,
              color: accent,
              fontFamily: "'LXGW WenKai TC', cursive",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 0 18px ${accent}44`,
            }}
            whileTap={{ scale: 0.97 }}
          >
            <ExternalLink size={14} />
            View Projects
          </MotionLink>
        </div>

        {/* ── Book cover (front face, rotates open on hover) ── */}
        <motion.div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            transformOrigin: openToRight ? "right center" : "left center",
            transformStyle: "preserve-3d",
            zIndex: 1,
          }}
          animate={{ rotateY: open ? (openToRight ? 90 : -90) : 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Cover image */}
          <div className="absolute inset-0">
            <Image
              src={src}
              alt={label}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 380px"
            />
            {/* Gradient so text is readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060b14] via-[#060b14]/40 to-transparent" />
          </div>

          {/* Cover border + glow */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ border: `1px solid ${accent}44` }}
          />

          {/* Cover spine — same side as inner page spine */}
          <div
            className={`absolute ${openToRight ? "right-0" : "left-0"} top-0 bottom-0 w-[4px] ${openToRight ? "rounded-r-2xl" : "rounded-l-2xl"}`}
            style={{ background: `linear-gradient(180deg, ${accent}, #0054ff)` }}
          />

          {/* Cover label at bottom */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <h3
                className="text-base font-bold tracking-wide"
                style={{ color: accent }}
              >
                {label}
              </h3>
              <p className="text-white/45 text-xs">Hover to open</p>
            </div>
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}55` }}
            >
              {count}
            </span>
          </div>

          {/* Cover back face (hidden, just prevents seeing through) */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "rgba(6,11,20,0.97)",
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          />
        </motion.div>

        {/* Page shadow under the card */}
        <motion.div
          className="absolute -bottom-2 left-4 right-4 h-4 rounded-b-2xl pointer-events-none"
          style={{
            background: `${accent}18`,
            filter: "blur(8px)",
            zIndex: 0,
          }}
          animate={{ opacity: open ? 0.9 : 0.3 }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
}

// Company Featured Projects Data
const companyProjects = [
  {
    title: "Enterprise Web Portal",
    company: "Coddle Technologies",
    role: "Front-End Developer",
    src: "/images/services2.jpg",
    desc: "Architected modern web platform with dynamic dashboard UI, real-time analytics, and smooth role-based controls using Next.js & React.",
    tags: ["Next.js", "React.js", "Tailwind CSS", "TypeScript", "REST API"],
    accent: "#1aa5c1",
    badge: "Company Project",
  },
  {
    title: "Mobile E-Commerce App",
    company: "Coddle Technologies",
    role: "Cross-Platform Developer",
    src: "/images/services3.jpg",
    desc: "Built high-performance mobile checkout and shopping experience featuring push notifications, offline cache, and fluid micro-animations.",
    tags: ["React Native", "Redux Toolkit", "Framer Motion", "Node.js"],
    accent: "#497fed",
    badge: "Company Project",
  },
  {
    title: "Client SaaS Application",
    company: "Coddle Technologies",
    role: "Full Stack Contributor",
    src: "/images/services1.jpg",
    desc: "Developed responsive web interface and backend API modules, boosting user onboarding speeds and application responsiveness by 35%.",
    tags: ["React.js", "Node.js", "Express", "MongoDB", "CSS3"],
    accent: "#0054ff",
    badge: "Company Project",
  },
];

export default function Projects() {
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [descRef, descInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div
      id="projects"
      className="min-h-screen flex flex-col justify-center items-center py-12 md:py-24 px-4 overflow-hidden"
    >
      {/* Title */}
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 36 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center mb-6"
      >
        <h2 className="text-3xl md:text-4xl font-[fantasy] bg-gradient-to-r from-[#1aa5c1] to-[#0054ff] bg-clip-text text-transparent mb-3">
          Portfolio & Featured Works
        </h2>
        <div className="w-16 h-[3px] rounded-full bg-gradient-to-r from-[#1aa5c1] to-[#0054ff]" />
      </motion.div>

      <motion.p
        ref={descRef}
        initial={{ opacity: 0, y: 20 }}
        animate={descInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-xl mb-14 text-center leading-7 text-white/55 text-sm md:text-base px-2"
      >
        Explore my personal portfolio categories along with featured enterprise projects built during my tenure at <span className="text-[#1aa5c1] font-semibold">Coddle Technologies</span>.
      </motion.p>

      {/* ── 1. Portfolio Book Cards Section ── */}
      <div className="w-full max-w-4xl flex flex-col items-center mb-20">
        <div className="flex items-center gap-4 w-full mb-10">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#1aa5c1]/30 to-[#1aa5c1]/60" />
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1aa5c1]/10 border border-[#1aa5c1]/30">
            <span className="text-[#1aa5c1] text-xs">💻</span>
            <span className="text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#1aa5c1] to-[#7dd6f6] bg-clip-text text-transparent">
              Portfolio Projects
            </span>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-[#1aa5c1]/60 via-[#1aa5c1]/30 to-transparent" />
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-10 md:gap-14 w-full">
          {projects.map((p, i) => (
            <BookCard key={p.label} {...p} index={i} />
          ))}
        </div>
      </div>

      {/* ── 2. Featured Company Projects (Coddle Technologies) Section ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-5xl flex flex-col items-center"
      >
        <div className="flex items-center gap-4 w-full mb-10">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#1aa5c1]/30 to-[#1aa5c1]/60" />
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1aa5c1]/10 border border-[#1aa5c1]/30">
            <span className="text-[#1aa5c1] text-xs">🏢</span>
            <span className="text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#1aa5c1] to-[#7dd6f6] bg-clip-text text-transparent">
              Featured Projects
            </span>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-[#1aa5c1]/60 via-[#1aa5c1]/30 to-transparent" />
        </div>

        {/* Company Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
          {companyProjects.map((cp, i) => (
            <motion.div
              key={cp.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -7, boxShadow: `0 0 36px ${cp.accent}25` }}
              className="group relative flex flex-col justify-between rounded-2xl overflow-hidden"
              style={{
                background: "rgba(10,16,28,0.85)",
                border: `1px solid rgba(26,165,193,0.2)`,
              }}
            >
              {/* Corner accents */}
              <span className="absolute top-[6px] left-[6px] w-[5px] h-[5px] rounded-full bg-[#1aa5c1] opacity-70 z-20" />
              <span className="absolute top-[6px] right-[6px] w-[5px] h-[5px] rounded-full bg-[#0054ff] opacity-70 z-20" />
              <span className="absolute bottom-[6px] left-[6px] w-[5px] h-[5px] rounded-full bg-[#0054ff] opacity-70 z-20" />
              <span className="absolute bottom-[6px] right-[6px] w-[5px] h-[5px] rounded-full bg-[#1aa5c1] opacity-70 z-20" />

              {/* Project Image Banner */}
              <div className="relative h-[160px] overflow-hidden">
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <Image
                    src={cp.src}
                    alt={cp.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>

              {/* Card Body */}
              <div className="flex flex-col justify-between flex-1 p-5 relative z-10">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#7dd6f6] transition-colors duration-300 mb-2">
                    {cp.title}
                  </h3>

                  <p className="text-white/60 text-xs leading-relaxed mb-4">
                    {cp.desc}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 pt-2 mb-2">
                    {cp.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium text-white/70"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(26,165,193,0.18)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Animated Line on Hover */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: `linear-gradient(90deg, ${cp.accent}, #0054ff)` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── More Featured Projects Button ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-3"
        >
          <Link href="/projects">
            <motion.button
              className="relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-sm font-semibold text-white select-none overflow-hidden cursor-pointer"
              style={{
                background: "linear-gradient(135deg, rgba(26,165,193,0.15), rgba(0,84,255,0.15))",
                border: "1px solid rgba(26,165,193,0.38)",
                boxShadow: "0 0 25px rgba(26,165,193,0.12)",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 32px rgba(26,165,193,0.35)",
                borderColor: "rgba(26,165,193,0.75)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
            >
              {/* Shimmer effect */}
              <motion.span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 35%, rgba(26,165,193,0.2) 50%, transparent 65%)",
                  backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
              />
              <span className="text-base">✦</span>
              <span className="bg-gradient-to-r from-[#7dd6f6] to-[#a5c4ff] bg-clip-text text-transparent font-semibold">
                More Featured Projects
              </span>
              <motion.span
                className="text-[#1aa5c1] text-base"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
