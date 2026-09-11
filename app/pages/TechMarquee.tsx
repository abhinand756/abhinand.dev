"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const techStack = [
  { src: "/images/javascript.svg", label: "JavaScript" },
  { src: "/images/react-js.svg", label: "React" },
  { src: "/images/next-js.svg", label: "Next.js" },
  { src: "/images/node-js.svg", label: "Node.js" },
  { src: "/images/flutter.svg", label: "Flutter" },
  { src: "/images/html5.svg", label: "HTML5" },
  { src: "/images/css3.svg", label: "CSS3" },
  { src: "/images/sass.svg", label: "SASS" },
  { src: "/images/figma.svg", label: "Figma" },
  { src: "/images/git.svg", label: "Git" },
  { src: "/images/wordpress.svg", label: "WordPress" },
];

const duplicated = [...techStack, ...techStack, ...techStack];

export default function TechMarquee() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div ref={ref} className="w-full py-10 overflow-hidden">
      {/* Fade edges */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-black to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-black to-transparent" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="flex"
        >
          <motion.div
            className="flex gap-12 items-center"
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {duplicated.map((tech, i) => (
              <motion.div
                key={`${tech.label}-${i}`}
                className="flex items-center gap-3 px-5 py-3 rounded-xl flex-shrink-0 group"
                style={{
                  background: "rgba(26,165,193,0.04)",
                  border: "1px solid rgba(26,165,193,0.12)",
                }}
                whileHover={{
                  borderColor: "rgba(26,165,193,0.4)",
                  boxShadow: "0 0 20px rgba(26,165,193,0.15)",
                  scale: 1.05,
                }}
              >
                <Image
                  src={tech.src}
                  alt={tech.label}
                  width={32}
                  height={32}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                <span className="text-sm font-medium text-white/60 group-hover:text-[#7dd6f6] transition-colors duration-300 whitespace-nowrap">
                  {tech.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
