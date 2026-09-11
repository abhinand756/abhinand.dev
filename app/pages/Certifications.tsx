"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, ExternalLink, Calendar } from "lucide-react";

const certifications = [
  {
    title: "Meta Front-End Developer",
    issuer: "Meta (Coursera)",
    date: "2024",
    skills: ["React", "HTML/CSS", "JavaScript", "UI/UX"],
    color: "#1aa5c1",
    credentialUrl: "#",
  },
  {
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    date: "2023",
    skills: ["JavaScript", "ES6+", "Algorithms", "Data Structures"],
    color: "#0054ff",
    credentialUrl: "#",
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    skills: ["AWS", "Cloud Architecture", "Security"],
    color: "#497fed",
    credentialUrl: "#",
  },
  {
    title: "Google UX Design Professional",
    issuer: "Google (Coursera)",
    date: "2023",
    skills: ["Figma", "Wireframing", "Prototyping", "User Research"],
    color: "#1aa5c1",
    credentialUrl: "#",
  },
  {
    title: "Node.js Application Developer",
    issuer: "OpenJS Foundation",
    date: "2024",
    skills: ["Node.js", "Express", "REST APIs", "npm"],
    color: "#0054ff",
    credentialUrl: "#",
  },
  {
    title: "Flutter Developer Certification",
    issuer: "Udemy",
    date: "2023",
    skills: ["Flutter", "Dart", "Firebase", "Mobile UI"],
    color: "#497fed",
    credentialUrl: "#",
  },
];

const achievements = [
  { label: "Open Source Contributions", value: "50+", icon: "🌐" },
  { label: "GitHub Stars Earned", value: "200+", icon: "⭐" },
  { label: "Client Satisfaction", value: "100%", icon: "💯" },
  { label: "Awards & Recognition", value: "5+", icon: "🏆" },
];

export default function Certifications() {
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [achRef, achInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="py-12 md:py-24 px-4">
      {/* Section title */}
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 36 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-[fantasy] bg-gradient-to-r from-[#1aa5c1] to-[#0054ff] bg-clip-text text-transparent mb-3">
          Certifications & Achievements
        </h2>
        <div className="w-16 h-[3px] rounded-full bg-gradient-to-r from-[#1aa5c1] to-[#0054ff]" />
      </motion.div>

      {/* Achievement Cards */}
      <motion.div
        ref={achRef}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-14"
      >
        {achievements.map((a, i) => (
          <motion.div
            key={a.label}
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={achInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, boxShadow: "0 0 24px rgba(26,165,193,0.15)" }}
            className="flex flex-col items-center gap-2 py-5 px-3 rounded-xl text-center"
            style={{
              background: "rgba(26,165,193,0.04)",
              border: "1px solid rgba(26,165,193,0.15)",
            }}
          >
            <span className="text-2xl">{a.icon}</span>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#1aa5c1] to-[#0054ff] bg-clip-text text-transparent">
              {a.value}
            </span>
            <span className="text-xs text-white/50 leading-tight">{a.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
              y: -6,
              boxShadow: `0 0 30px ${cert.color}15`,
              borderColor: `${cert.color}55`,
            }}
            className="relative group rounded-2xl p-5 overflow-hidden cursor-default"
            style={{
              background: "rgba(10,16,28,0.85)",
              border: "1px solid rgba(26,165,193,0.15)",
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
            />

            {/* Corner accents */}
            <span className="absolute top-[5px] left-[5px] w-[4px] h-[4px] rounded-full opacity-50" style={{ background: cert.color }} />
            <span className="absolute top-[5px] right-[5px] w-[4px] h-[4px] rounded-full bg-[#0054ff] opacity-50" />

            {/* Icon & Title */}
            <div className="flex items-start gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: `${cert.color}15`,
                  border: `1px solid ${cert.color}35`,
                }}
              >
                <Award size={18} style={{ color: cert.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-white/90 leading-tight mb-1">{cert.title}</h3>
                <p className="text-xs text-white/45">{cert.issuer}</p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-1.5 mb-3">
              <Calendar size={12} className="text-white/30" />
              <span className="text-[11px] text-white/35">{cert.date}</span>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {cert.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: `${cert.color}10`,
                    color: `${cert.color}cc`,
                    border: `1px solid ${cert.color}25`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Credential link */}
            <a
              href={cert.credentialUrl}
              className="flex items-center gap-1.5 text-xs font-medium transition-colors duration-200 no-underline"
              style={{ color: `${cert.color}aa` }}
              onMouseEnter={(e) => (e.currentTarget.style.color = cert.color)}
              onMouseLeave={(e) => (e.currentTarget.style.color = `${cert.color}aa`)}
            >
              <ExternalLink size={12} />
              View Credential
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
