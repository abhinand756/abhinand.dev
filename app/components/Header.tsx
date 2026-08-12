"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

interface HeaderProps {
  hideNav?: boolean;
}

export default function Header({ hideNav = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

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

  return (
    <>
      <motion.header
        className={`max-w-[1440px] mx-auto fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between max-sm:pr-2 sm:px-4 transition-all duration-500 ${scrolled
            ? "h-[72px] bg-black/75 backdrop-blur-md border-b border-[#1aa5c1]/20 shadow-[0_4px_32px_rgba(0,0,0,0.45)]"
            : "h-[90px] bg-transparent border-b border-transparent"
          }`}
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="/" className="flex items-center flex-shrink-0 hover:opacity-80 transition-opacity duration-200">
          <Image
            src="/images/my-logo.png"
            alt="Logo"
            width={130}
            height={90}
            className="object-contain h-[72px] w-auto"
          />
        </a>

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

            <motion.nav
              key="drawer"
              className="fixed top-0 right-0 bottom-0 z-[1200] w-[min(300px,85vw)] bg-gradient-to-br from-[#080e1a] to-[#060b14] border-l border-[#1aa5c1]/18 shadow-[-8px_0_48px_rgba(0,0,0,0.6)] flex flex-col px-7 py-6 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              aria-label="Mobile navigation"
            >
              <div className="flex items-center mb-10 pb-6 border-b border-white/7">
                <Image
                  src="/images/my-logo.png"
                  alt="Logo"
                  width={70}
                  height={48}
                  className="object-contain h-[44px] w-auto"
                />
              </div>

              <ul className="list-none p-0 m-0 flex flex-col gap-1 mb-auto">
                {navLinks.map((link, i) => {
                  const id = link.href.replace("#", "");
                  const isActive = activeSection === id;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.07, duration: 0.3, ease: "easeOut" }}
                    >
                      <a
                        href={link.href}
                        className={`flex items-center gap-3 px-3 py-3 rounded-[10px] text-base font-medium no-underline transition-all duration-200 ${isActive
                            ? "bg-[#1aa5c1]/13 text-[#1aa5c1]"
                            : "text-white/60 hover:bg-[#1aa5c1]/10 hover:text-white"
                          }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="text-[11px] font-bold text-[#1aa5c1] tracking-widest opacity-80 min-w-[22px]">
                          0{i + 1}
                        </span>
                        {link.label}
                        {isActive && (
                          <span className="ml-auto w-[6px] h-[6px] rounded-full bg-[#1aa5c1] shadow-[0_0_6px_rgba(26,165,193,0.8)]" />
                        )}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.a
                href="#contact"
                className="mt-8 block text-center py-3 rounded-[10px] border border-[#1aa5c1] text-[#1aa5c1] text-base font-bold tracking-wide no-underline hover:bg-[#1aa5c1]/25 hover:shadow-[0_0_22px_rgba(26,165,193,0.4)] transition-all duration-200"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.4 }}
                whileTap={{ scale: 0.96 }}
              >
                Hire Me
              </motion.a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
