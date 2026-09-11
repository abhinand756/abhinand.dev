"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.15, boxShadow: "0 0 28px rgba(26,165,193,0.5)" }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-[999] w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
          style={{
            background: "linear-gradient(135deg, rgba(26,165,193,0.2), rgba(0,84,255,0.2))",
            border: "1px solid rgba(26,165,193,0.4)",
            boxShadow: "0 0 16px rgba(26,165,193,0.2)",
            backdropFilter: "blur(8px)",
          }}
          aria-label="Back to top"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowUp size={20} className="text-[#1aa5c1]" />
          </motion.div>

          {/* Animated ring */}
          <motion.div
            className="absolute inset-[-3px] rounded-full pointer-events-none"
            style={{
              border: "1px solid rgba(26,165,193,0.2)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
