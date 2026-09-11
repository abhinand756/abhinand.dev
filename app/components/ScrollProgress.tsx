"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[1100] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #1aa5c1, #0054ff, #497fed, #1aa5c1)",
        backgroundSize: "200% 100%",
        boxShadow: "0 0 12px rgba(26,165,193,0.6), 0 0 4px rgba(0,84,255,0.8)",
      }}
    />
  );
}
