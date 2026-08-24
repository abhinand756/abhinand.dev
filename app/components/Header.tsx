"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  FolderKanban,
  Home,
  Mail,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import HireModal from "./HireModal";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const mobileLinks = [
  { label: "Home", href: "#hero", icon: Home },
  { label: "About", href: "#about", icon: UserRound },
  { label: "Skills", href: "#skills", icon: Code2 },
  { label: "Projects", href: "#projects", icon: FolderKanban },
  { label: "Contact", href: "#contact", icon: Mail },
];

interface HeaderProps {
  hideNav?: boolean;
}

export default function Header({ hideNav = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hireOpen, setHireOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const ids = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className={`max-w-[1440px] mx-auto fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-4 sm:px-6 transition-all duration-500 ${scrolled
          ? "h-[62px] md:h-[72px] bg-black/75 backdrop-blur-md border-b border-[#1aa5c1]/20 shadow-[0_4px_32px_rgba(0,0,0,0.45)]"
          : "h-[70px] md:h-[90px] bg-transparent border-b border-transparent"
          }`}
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link href="/" className="flex items-center flex-shrink-0 hover:opacity-80 transition-opacity duration-200">
          <Image
            src="/images/my-logo.png"
            alt="Logo"
            width={130}
            height={90}
            className="object-contain h-[56px] sm:h-[66px] w-auto"
          />
        </Link>

        <nav className={`hidden md:flex items-center gap-2`} aria-label="Primary navigation">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative flex flex-col items-center gap-[6px] px-3 py-2.5 group no-underline ${hideNav && 'md:hidden'}`}
              >
                <span
                  className={`text-[15px] font-medium tracking-wide transition-colors duration-200 ${isActive ? "text-white" : "text-white/60 group-hover:text-[#1aa5c1]"
                    }`}
                >
                  {link.label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-[2px] w-[80%] h-[3px] rounded-full bg-gradient-to-r from-[#1aa5c1] to-[#0054ff] shadow-[0_0_8px_rgba(26,165,193,0.7)]"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
              </a>
            );
          })}

          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              setHireOpen(true);
            }}
            className="m-1.5 px-5 py-2 rounded-[10px] text-sm text-[#c6fafa] font-medium transition-all duration-300 ease-in-out hover:scale-[1.04] no-underline"
            style={{
              fontFamily: "'LXGW WenKai TC', cursive",
              background: "rgba(26,165,193,0.07)",
              border: "1px solid rgba(26,165,193,0.45)",
              boxShadow: "0 0 10px rgba(26,165,193,0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = "1px solid rgba(0,84,255,0.7)";
              e.currentTarget.style.boxShadow = "0 0 16px rgba(0,84,255,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = "1px solid rgba(26,165,193,0.45)";
              e.currentTarget.style.boxShadow = "0 0 10px rgba(26,165,193,0.1)";
            }}
            whileTap={{ scale: 0.95 }}
          >
            Hire Me
          </motion.a>
        </nav>

        <motion.button
          className="flex md:hidden items-center justify-center text-white/80 hover:text-[#1aa5c1] hover:bg-[#1aa5c1]/10 p-2 rounded-md transition-colors duration-200"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={28} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={28} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[1100] bg-black/55 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              key="drawer"
              className="fixed top-0 right-0 bottom-0 z-[1200] w-[min(320px,85vw)] overflow-hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              aria-label="Mobile navigation"
            >
              {/* Animated gradient edge */}
              <div className="absolute top-0 bottom-0 left-0 w-[2px] overflow-hidden">
                <motion.div
                  className="w-full h-[200%]"
                  style={{ background: "linear-gradient(180deg, #1aa5c1, #0054ff, #1aa5c1)" }}
                  animate={{ y: ["-100%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Ambient glows */}
              <motion.div
                className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(26,165,193,0.15) 0%, transparent 70%)" }}
                animate={{ scale: [1, 1.25, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-28 -left-24 w-80 h-80 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(0,84,255,0.13) 0%, transparent 70%)" }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.85, 0.4] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              />

              {/* Dot grid overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(rgba(26,165,193,0.08) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                  maskImage: "linear-gradient(180deg, transparent, black 30%, black 70%, transparent)",
                  WebkitMaskImage: "linear-gradient(180deg, transparent, black 30%, black 70%, transparent)",
                }}
              />

              {/* Drifting scanline */}
              <motion.div
                className="absolute left-0 right-0 h-32 pointer-events-none"
                style={{ background: "linear-gradient(180deg, transparent, rgba(26,165,193,0.06), transparent)" }}
                animate={{ top: ["-30%", "115%"] }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 0.5 }}
              />

              {/* Corner accents */}
              <span className="absolute top-[5px] left-[5px] w-[5px] h-[5px] rounded-full bg-[#1aa5c1] opacity-60" />
              <span className="absolute top-[5px] right-[5px] w-[5px] h-[5px] rounded-full bg-[#0054ff] opacity-60" />
              <span className="absolute bottom-[5px] left-[5px] w-[5px] h-[5px] rounded-full bg-[#0054ff] opacity-60" />
              <span className="absolute bottom-[5px] right-[5px] w-[5px] h-[5px] rounded-full bg-[#1aa5c1] opacity-60" />

              {/* Content */}
              <div className="no-scrollbar relative z-10 flex flex-col h-full px-7 py-6 overflow-y-auto overflow-x-hidden bg-gradient-to-br from-[#0a1322] to-[#05080f]">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-between mb-8 pb-5 border-b border-[#075355]"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.6 }}
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(26,165,193,0.08)",
                        border: "1px solid rgba(26,165,193,0.25)",
                        boxShadow: "0 0 16px rgba(26,165,193,0.12)",
                      }}
                    >
                      <Image
                        src="/images/my-logo.png"
                        alt="Logo"
                        width={64}
                        height={44}
                        className="object-contain h-[30px] w-auto"
                      />
                    </motion.div>
                    <div>
                      <motion.p
                        className="text-[10px] font-bold tracking-[0.35em] text-[#1aa5c1]/80 uppercase"
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2.4, repeat: Infinity }}
                      >
                        Menu
                      </motion.p>
                      <p
                        className="text-[13px] text-white/50 mt-0.5"
                        style={{ fontFamily: "'LXGW WenKai TC', cursive" }}
                      >
                        {"Let's explore"}
                      </p>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                    whileTap={{ scale: 0.85, rotate: 90 }}
                    className="flex items-center justify-center w-9 h-9 rounded-lg text-white/70 hover:text-white hover:bg-[#1aa5c1]/10 border border-white/10 hover:border-[#1aa5c1]/40 transition-all duration-200"
                  >
                    <X size={18} />
                  </motion.button>
                </motion.div>

                {/* Nav */}
                <ul className="relative flex flex-col gap-2 mb-auto list-none p-0 m-0">
                  {mobileLinks.map((link, i) => {
                    const id = link.href.replace("#", "");
                    const isActive = activeSection === id;
                    const Icon = link.icon;
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 44 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.16 + i * 0.09, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                      >
                        {isActive && (
                          <motion.span
                            layoutId="mobile-active-pill"
                            className="absolute inset-0 rounded-xl border border-[#1aa5c1]/40"
                            style={{
                              background:
                                "linear-gradient(90deg, rgba(26,165,193,0.16), rgba(0,84,255,0.12))",
                              boxShadow:
                                "0 0 26px rgba(26,165,193,0.16), inset 0 0 20px rgba(26,165,193,0.05)",
                            }}
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                        <a
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="relative flex items-center gap-3.5 px-3.5 py-3 rounded-xl overflow-hidden group no-underline"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-[#1aa5c1]/12 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          <motion.span
                            className="relative flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                            style={{
                              background: isActive
                                ? "linear-gradient(135deg, rgba(26,165,193,0.28), rgba(0,84,255,0.16))"
                                : "rgba(26,165,193,0.07)",
                              border: `1px solid ${isActive ? "rgba(26,165,193,0.55)" : "rgba(26,165,193,0.18)"}`,
                              boxShadow: isActive ? "0 0 16px rgba(26,165,193,0.3)" : "none",
                            }}
                            animate={isActive ? { y: [0, -2, 0] } : {}}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <Icon
                              size={18}
                              strokeWidth={1.8}
                              color={isActive ? "#1aa5c1" : "rgba(255,255,255,0.55)"}
                            />
                            {isActive && (
                              <motion.span
                                className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#1aa5c1]"
                                animate={{ opacity: [1, 0.35, 1], scale: [1, 1.35, 1] }}
                                transition={{ duration: 1.8, repeat: Infinity }}
                                style={{ boxShadow: "0 0 8px rgba(26,165,193,0.9)" }}
                              />
                            )}
                          </motion.span>

                          <span className="relative flex-1 flex items-baseline justify-between gap-2">
                            <span className="overflow-hidden">
                              <motion.span
                                initial={{ y: "120%" }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.2 + i * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className={`block text-[15px] font-medium tracking-wide transition-colors duration-200 ${isActive
                                  ? "text-white"
                                  : "text-white/65 group-hover:text-white"
                                  }`}
                              >
                                {link.label}
                              </motion.span>
                            </span>
                            <span
                              className={`text-[10px] font-bold tracking-widest transition-colors duration-200 ${isActive
                                ? "text-[#1aa5c1]"
                                : "text-white/25 group-hover:text-[#1aa5c1]/70"
                                }`}
                            >
                              0{i + 1}
                            </span>
                          </span>

                          <span
                            className={`relative flex-shrink-0 transition-all duration-300 ${isActive
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                              }`}
                          >
                            <ArrowUpRight size={15} color="#1aa5c1" />
                          </span>
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8"
                >
                  <motion.a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileOpen(false);
                      setHireOpen(true);
                    }}
                    className="relative block text-center py-3.5 rounded-xl text-[#c6fafa] font-bold tracking-[0.2em] text-[15px] overflow-hidden no-underline"
                    style={{
                      fontFamily: "'LXGW WenKai TC', cursive",
                      background: "rgba(26,165,193,0.07)",
                      border: "1px solid rgba(26,165,193,0.45)",
                      boxShadow: "0 0 14px rgba(26,165,193,0.12)",
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.border = "1px solid rgba(0,84,255,0.7)";
                      e.currentTarget.style.boxShadow = "0 0 20px rgba(0,84,255,0.28)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.border = "1px solid rgba(26,165,193,0.45)";
                      e.currentTarget.style.boxShadow = "0 0 14px rgba(26,165,193,0.12)";
                    }}
                  >
                    <motion.span
                      className="absolute inset-y-0 left-0 w-16 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={{ x: ["-120%", "620%"] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "linear", repeatDelay: 1.4 }}
                    />
                    <span className="relative">Hire Me</span>
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <HireModal open={hireOpen} onClose={() => setHireOpen(false)} />
    </>
  );
}