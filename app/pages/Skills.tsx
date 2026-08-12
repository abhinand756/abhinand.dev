"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skills = [
  { src: "/images/javascript.svg", label: "JavaScript", level: 90 },
  { src: "/images/react-js.svg", label: "React.js", level: 88 },
  { src: "/images/next-js.svg", label: "Next.js", level: 85 },
  { src: "/images/node-js.svg", label: "Node.js", level: 75 },
  { src: "/images/flutter.svg", label: "Flutter", level: 72 },
  { src: "/images/react-js.svg", label: "React Native", level: 76 },
  { src: "/images/wordpress.svg", label: "WordPress", level: 80 },
  { src: "/images/html5.svg", label: "HTML5", level: 95 },
  { src: "/images/css3.svg", label: "CSS3", level: 92 },
  { src: "/images/sass.svg", label: "SASS", level: 84 },
  { src: "/images/figma.svg", label: "Figma", level: 78 },
  { src: "/images/git.svg", label: "Git", level: 82 },
];

function SkillCard({
  src,
  label,
  level,
  index,
}: {
  src: string;
  label: string;
  level: number;
  index: number;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.88 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: (index % 6) * 0.07,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
        boxShadow: "0 0 28px rgba(26,165,193,0.22)",
        borderColor: "rgba(26,165,193,0.5)",
      }}
      className="group flex flex-col items-center gap-3 px-4 py-5 rounded-2xl w-[130px] sm:w-[140px] cursor-default transition-colors duration-300"
      style={{
        background: "rgba(26,165,193,0.04)",
        border: "1px solid rgba(26,165,193,0.14)",
      }}
    >
      {/* Icon with glow on hover */}
      <motion.div
        whileHover={{ rotate: [0, -8, 8, 0], scale: 1.12 }}
        transition={{ duration: 0.45 }}
        className="relative flex items-center justify-center w-14 h-14"
      >
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "radial-gradient(circle, rgba(26,165,193,0.25) 0%, transparent 70%)",
          }}
        />
        <Image src={src} alt={label} width={48} height={48} className="relative z-10" />
      </motion.div>

      {/* Label */}
      <span className="text-xs font-semibold text-white/65 group-hover:text-[#7dd6f6] transition-colors duration-300 text-center leading-tight">
        {label}
      </span>

      {/* Level bar */}
      <div className="w-full h-[3px] rounded-full bg-white/8 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #1aa5c1, #0054ff)",
            boxShadow: "0 0 6px rgba(26,165,193,0.7)",
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{
            delay: (index % 6) * 0.07 + 0.3,
            duration: 1.0,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>

      {/* Percentage */}
      <span className="text-[10px] text-[#1aa5c1]/70 group-hover:text-[#1aa5c1] transition-colors duration-300">
        {level}%
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [descRef, descInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div
      id="skills"
      className="min-h-screen flex flex-col justify-center items-center py-12 md:py-24 px-4"
    >
      {/* Title */}
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 36 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-[fantasy] bg-gradient-to-r from-[#1aa5c1] to-[#0054ff] bg-clip-text text-transparent mb-3">
          Skills & Experience
        </h2>
        <div className="w-16 h-[3px] rounded-full bg-gradient-to-r from-[#1aa5c1] to-[#0054ff]" />
      </motion.div>

      {/* Description */}
      <motion.div
        ref={descRef}
        initial={{ opacity: 0, y: 24 }}
        animate={descInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-2xl w-full mb-14 px-6 py-5 rounded-2xl text-center"
        style={{
          background: "rgba(26,165,193,0.04)",
          border: "1px solid rgba(26,165,193,0.15)",
        }}
      >
        <span className="absolute top-[5px] left-[5px] w-[5px] h-[5px] rounded-full bg-[#1aa5c1] opacity-50" />
        <span className="absolute top-[5px] right-[5px] w-[5px] h-[5px] rounded-full bg-[#0054ff] opacity-50" />
        <span className="absolute bottom-[5px] left-[5px] w-[5px] h-[5px] rounded-full bg-[#0054ff] opacity-50" />
        <span className="absolute bottom-[5px] right-[5px] w-[5px] h-[5px] rounded-full bg-[#1aa5c1] opacity-50" />
        <p className="text-white/70 text-sm md:text-base leading-7">
          Primarily focused on{" "}
          <span className="text-[#1aa5c1] font-medium">front-end development</span> with deep
          expertise in JavaScript ecosystems — React & Next.js for web, React Native & Flutter for
          mobile. Currently expanding into full-stack with the{" "}
          <span className="text-[#497fed] font-medium">MERN stack</span>.
        </p>
      </motion.div>

      {/* Skill cards grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4 w-full max-w-4xl mb-16">
        {skills.map((skill, i) => (
          <SkillCard key={skill.label} {...skill} index={i} />
        ))}
      </div>

      {/* Experience Section */}
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-4xl flex flex-col items-center mt-4"
      >
        {/* Subtitle / Divider header */}
        <div className="flex items-center gap-4 w-full mb-10">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#1aa5c1]/30 to-[#1aa5c1]/60" />
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1aa5c1]/10 border border-[#1aa5c1]/30">
            <span className="text-[#1aa5c1] text-xs">💼</span>
            <span className="text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#1aa5c1] to-[#7dd6f6] bg-clip-text text-transparent">
              Work Experience
            </span>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-[#1aa5c1]/60 via-[#1aa5c1]/30 to-transparent" />
        </div>

        {/* Experience Cards / Timeline */}
        <div className="w-full relative pl-6 md:pl-8">
          {/* Glowing vertical line */}
          <div className="absolute left-[11px] md:left-[15px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#1aa5c1] via-[#0054ff] to-[#1aa5c1]/20 rounded-full" />

          {/* Coddle Technologies Experience Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex gap-5 pb-4"
          >
            {/* Timeline Pulsing Node */}
            <div className="absolute left-[-23px] md:left-[-27px] top-5 z-10">
              <motion.div
                className="w-4 h-4 rounded-full bg-[#1aa5c1] flex items-center justify-center"
                style={{ boxShadow: "0 0 14px #1aa5c1" }}
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </motion.div>
            </div>

            {/* Main Experience Container */}
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 0 35px rgba(26,165,193,0.18)" }}
              className="relative w-full rounded-2xl p-6 md:p-7 overflow-hidden transition-all duration-300"
              style={{
                background: "rgba(26,165,193,0.04)",
                border: "1px solid rgba(26,165,193,0.22)",
              }}
            >
              {/* Corner Ambient Glows */}
              <span className="absolute top-[6px] left-[6px] w-[6px] h-[6px] rounded-full bg-[#1aa5c1] opacity-70" />
              <span className="absolute top-[6px] right-[6px] w-[6px] h-[6px] rounded-full bg-[#0054ff] opacity-70" />
              <span className="absolute bottom-[6px] left-[6px] w-[6px] h-[6px] rounded-full bg-[#0054ff] opacity-70" />
              <span className="absolute bottom-[6px] right-[6px] w-[6px] h-[6px] rounded-full bg-[#1aa5c1] opacity-70" />

              {/* Shimmer overlay effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  background: "radial-gradient(ellipse at top left, rgba(26,165,193,0.25) 0%, transparent 70%)",
                }}
              />

              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 relative z-10">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                      Software Engineer / Web Developer
                    </h3>
                    <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-[#1aa5c1]/20 text-[#7dd6f6] border border-[#1aa5c1]/40">
                      Present
                    </span>
                  </div>
                  <h4 className="text-base font-semibold bg-gradient-to-r from-[#1aa5c1] to-[#497fed] bg-clip-text text-transparent mt-0.5">
                    Coddle Technologies
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full text-[#7dd6f6] bg-[#1aa5c1]/10 border border-[#1aa5c1]/30">
                    🗓️ Nov 2023 – Present
                  </span>
                </div>
              </div>

              {/* Description & Impact Points */}
              <p className="text-white/70 text-sm leading-relaxed mb-4 relative z-10">
                Building scalable web and mobile applications using React, Next.js, and modern front-end technologies. Delivering seamless UI/UX, responsive interfaces, and interactive web solutions.
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 relative z-10">
                {["React.js", "Next.js", "JavaScript", "TypeScript", "Node.js", "Tailwind CSS", "UI/UX"].map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-md text-white/80 font-medium"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(26,165,193,0.2)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
