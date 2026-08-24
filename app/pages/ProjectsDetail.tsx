"use client";

/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { ExternalLink, Layers, ArrowLeft, Sparkles, Code2, CheckCircle2 } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  category: "personal" | "company";
  company?: string;
  role?: string;
  src: string;
  desc: string;
  longDesc: string;
  tags: string[];
  features: string[];
  accent: string;
  link?: string;
}

const allProjects: ProjectItem[] = [
  // ── Personal Projects ──
  {
    id: "pers-1",
    title: "E-Commerce Platform - HappyMart",
    category: "personal",
    src: "/images/services1.jpg",
    desc: "A full-featured e-commerce platform inspired by Flipkart with authentication, product management, shopping cart, wishlist, order management, and secure checkout.",
    longDesc:
      "A modern full-stack e-commerce application built to replicate the experience of leading online marketplaces. The platform includes user authentication, product browsing, category filtering, shopping cart, wishlist, checkout flow, order tracking, admin product management, and responsive UI optimized for desktop and mobile devices.",
    tags: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Redux Toolkit",
      "Tailwind CSS"
    ],
    features: [
      "JWT authentication with secure login & registration",
      "Dynamic product search, filtering, sorting & pagination",
      "Shopping cart, wishlist & seamless checkout experience",
      "Order history and user profile management",
      "Admin dashboard for products, categories & orders",
      "Responsive UI inspired by Flipkart with optimized performance"
    ],
    accent: "#2874F0",
  },
  {
    id: "pers-2",
    title: "Real-Time Chat Application",
    category: "personal",
    src: "/images/services2.jpg",
    desc: "A Telegram-inspired real-time messaging application supporting instant chat, online presence, media sharing, and responsive conversations.",
    longDesc:
      "A modern real-time chat platform developed to deliver a smooth messaging experience similar to Telegram. The application features live messaging, user authentication, online/offline status indicators, media sharing, conversation management, and a responsive interface designed for desktop and mobile users.",
    tags: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "JWT",
      "Tailwind CSS"
    ],
    features: [
      "Real-time messaging powered by Socket.io",
      "Private one-to-one conversations",
      "User authentication with secure JWT sessions",
      "Online/offline presence indicators",
      "Image and file sharing support",
      "Responsive Telegram-inspired user interface"
    ],
    accent: "#229ED9",
  },
  {
    id: "pers-3",
    title: "Movie & Music Discovery Platform",
    category: "personal",
    src: "/images/services3.jpg",
    desc: "A modern entertainment platform for exploring trending movies, TV shows, and music with powerful search, filtering, and responsive browsing experience.",
    longDesc:
      "An entertainment discovery platform that allows users to browse popular movies, TV series, albums, artists, and trending content through a clean and intuitive interface. The application integrates external APIs to deliver real-time content, advanced filtering, detailed information pages, and an engaging browsing experience.",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "TMDB API",
      "Spotify API",
      "REST API"
    ],
    features: [
      "Browse trending movies, TV shows & music",
      "Advanced search with genre and category filtering",
      "Detailed information pages with ratings & metadata",
      "Responsive UI optimized for desktop, tablet & mobile",
      "API integration for real-time entertainment content",
      "Modern card-based interface with smooth animations"
    ],
    accent: "#E50914",
  },

  // ── Company / Featured Projects ──
  {
    id: "comp-1",
    title: "Enterprise Web Portal",
    category: "company",
    company: "Featured Project",
    role: "Front-End Developer",
    src: "/images/services2.jpg",
    desc: "Architected modern web platform with dynamic dashboard UI, real-time analytics, and smooth role-based controls using Next.js & React.",
    longDesc: "Designed and engineered an enterprise-grade administrative web portal for real-time tracking, complex data visualization, and seamless user permission management. Improved page load speeds by 40% using SSR and optimized state management.",
    tags: ["Next.js", "React.js", "Tailwind CSS", "TypeScript", "REST API", "Chart.js"],
    features: [
      "Dynamic data analytics dashboards with responsive charts",
      "Role-based access control and secure JWT authentication",
      "Dark mode aesthetic UI with glassmorphism micro-interactions",
      "Server-side rendering for lightning-fast page transitions"
    ],
    accent: "#1aa5c1",
  },
  {
    id: "comp-2",
    title: "Mobile E-Commerce App",
    category: "company",
    company: "Featured Project",
    role: "Cross-Platform Developer",
    src: "/images/services3.jpg",
    desc: "Built high-performance mobile checkout and shopping experience featuring push notifications, offline cache, and fluid micro-animations.",
    longDesc: "Developed a cross-platform mobile shopping application with high responsiveness and native performance. Built seamless checkout flows, real-time order tracking, and push notification integrations.",
    tags: ["React Native", "Redux Toolkit", "Framer Motion", "Node.js", "Firebase"],
    features: [
      "Seamless 1-tap checkout flow with secure payment gateway integration",
      "Real-time push notifications for order updates and offer alerts",
      "Offline caching for fast product catalog browsing",
      "Fluid 60fps micro-animations and gesture support"
    ],
    accent: "#497fed",
  },
  {
    id: "comp-3",
    title: "Client SaaS Application",
    category: "company",
    company: "Featured Project",
    role: "Full Stack Contributor",
    src: "/images/services1.jpg",
    desc: "Developed responsive web interface and backend API modules, boosting user onboarding speeds and application responsiveness by 35%.",
    longDesc: "Contributed to both front-end user experience and back-end RESTful services for a high-traffic SaaS productivity suite. Automated onboarding workflows and created highly responsive dashboard modules.",
    tags: ["React.js", "Node.js", "Express", "MongoDB", "CSS3", "Redux"],
    features: [
      "Automated user onboarding & step-by-step wizard flow",
      "Scalable REST API endpoints built with Express & MongoDB",
      "Interactive data grid tables with sorting, filtering, and export",
      "Real-time state synchronization across tabs"
    ],
    accent: "#0054ff",
  },
];

export default function ProjectsDetail() {
  const [activeTab, setActiveTab] = useState<"all" | "company" | "personal">("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem>(allProjects[0]);

  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const filteredProjects = allProjects.filter((p) => {
    if (activeTab === "all") return true;
    return p.category === activeTab;
  });

  return (
    <div className="min-h-screen max-md:pt-20 py-16 md:py-24 px-4 max-w-6xl mx-auto flex flex-col items-center">
      {/* ── Top Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex items-center justify-between mb-8"
      >
        <Link href="/#projects">
          <motion.div
            whileHover={{ x: -4 }}
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-[#1aa5c1]/10 text-[#7dd6f6] border border-[#1aa5c1]/30 cursor-pointer"
          >
            <ArrowLeft size={14} />
            Back to Home
          </motion.div>
        </Link>

        <span className="text-xs font-medium text-white/40 tracking-wider uppercase">
          Project Showcase
        </span>
      </motion.div>

      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center mb-12"
      >
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1aa5c1]/70 mb-3 flex items-center gap-1.5">
          <Sparkles size={14} /> Explore All Projects & Work
        </span>
        <h1 className="text-4xl md:text-5xl font-[fantasy] bg-gradient-to-r from-[#1aa5c1] via-[#497fed] to-[#0054ff] bg-clip-text text-transparent mb-4">
          Detailed Project Showcase
        </h1>
      </motion.div>

      {/* ── Category Switcher Tabs ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center gap-2 p-1.5 rounded-full bg-[#0a101c] border border-[#1aa5c1]/25 mb-14 shadow-lg"
      >
        {[
          { id: "all", label: "All Projects", icon: "✦" },
          { id: "personal", label: "Personal Projects", icon: "💻" },
          { id: "company", label: "Featured Projects", icon: "🏢" },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                // auto select first of filtered
                const first = allProjects.find((p) => tab.id === "all" || p.category === tab.id);
                if (first) setSelectedProject(first);
              }}
              className="relative px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-colors duration-300 cursor-pointer flex items-center gap-2"
              style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.5)" }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, rgba(26,165,193,0.3), rgba(0,84,255,0.3))",
                    border: "1px solid rgba(26,165,193,0.6)",
                    boxShadow: "0 0 20px rgba(26,165,193,0.25)",
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <span className="relative z-10">{tab.icon}</span>
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </motion.div>

      {/* ── Main Detail Showcase Grid ── */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Project Selector List */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 flex flex-col gap-4"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-white/40 px-1 flex items-center gap-2">
            <Layers size={14} /> Select a project to view details
          </span>

          <div className="flex flex-col gap-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p, idx) => {
                const isSelected = selectedProject.id === p.id;
                return (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.45, delay: idx * 0.06 }}
                    onClick={() => setSelectedProject(p)}
                    whileHover={{ x: 6 }}
                    className="relative flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden"
                    style={{
                      background: isSelected ? "rgba(26,165,193,0.12)" : "rgba(10,16,28,0.7)",
                      border: isSelected
                        ? `1px solid ${p.accent}77`
                        : "1px solid rgba(26,165,193,0.14)",
                      boxShadow: isSelected ? `0 0 25px ${p.accent}20` : "none",
                    }}
                  >
                    {/* Active side indicator */}
                    {isSelected && (
                      <motion.div
                        layoutId="activeSideBar"
                        className="absolute left-0 top-0 bottom-0 w-[4px] rounded-r-full"
                        style={{ background: p.accent }}
                      />
                    )}

                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={p.src} alt={p.title} fill className="object-cover" />
                    </div>

                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                          style={{
                            background: `${p.accent}20`,
                            color: p.accent,
                            border: `1px solid ${p.accent}44`,
                          }}
                        >
                          {p.category === "company" ? p.company : "Personal"}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white truncate mt-1">{p.title}</h4>
                      <p className="text-white/45 text-xs truncate mt-0.5">{p.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Column: Active Project Details Panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col rounded-3xl p-6 md:p-8 overflow-hidden"
              style={{
                background: "rgba(10,16,28,0.92)",
                border: `1px solid ${selectedProject.accent}44`,
                boxShadow: `0 0 50px ${selectedProject.accent}15`,
              }}
            >
              {/* Corner accents */}
              <span className="absolute top-[8px] left-[8px] w-[6px] h-[6px] rounded-full bg-[#1aa5c1] opacity-70" />
              <span className="absolute top-[8px] right-[8px] w-[6px] h-[6px] rounded-full bg-[#0054ff] opacity-70" />
              <span className="absolute bottom-[8px] left-[8px] w-[6px] h-[6px] rounded-full bg-[#0054ff] opacity-70" />
              <span className="absolute bottom-[8px] right-[8px] w-[6px] h-[6px] rounded-full bg-[#1aa5c1] opacity-70" />

              {/* Large Image Preview Banner */}
              <div className="relative w-full h-[220px] md:h-[260px] rounded-2xl overflow-hidden mb-6">
                <Image
                  src={selectedProject.src}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a101c] via-transparent to-transparent" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md"
                    style={{
                      background: "rgba(6, 11, 20, 0.8)",
                      color: selectedProject.accent,
                      border: `1px solid ${selectedProject.accent}55`,
                    }}
                  >
                    {selectedProject.category === "company" ? selectedProject.company : "Personal Portfolio"}
                  </span>
                  {selectedProject.role && (
                    <span className="text-xs text-white/80 font-medium px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
                      {selectedProject.role}
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Accent */}
              <div className="flex flex-col gap-2 mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {selectedProject.title}
                </h2>
                <div className="h-[2px] w-16 rounded-full" style={{ background: selectedProject.accent }} />
              </div>

              {/* Description */}
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                {selectedProject.longDesc}
              </p>

              {/* Key Features List */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3 flex items-center gap-2">
                  <CheckCircle2 size={14} color={selectedProject.accent} /> Key Highlights & Deliverables
                </h4>
                <ul className="flex flex-col gap-2">
                  {selectedProject.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-white/80 leading-snug">
                      <span className="text-[#1aa5c1] mt-0.5">✦</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Tags */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-2.5 flex items-center gap-2">
                  <Code2 size={14} /> Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg text-xs font-medium text-white/80"
                      style={{
                        background: "rgba(26,165,193,0.08)",
                        border: "1px solid rgba(26,165,193,0.25)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link Button */}
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: `0 0 25px ${selectedProject.accent}44` }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs md:text-sm font-semibold text-white cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${selectedProject.accent}33, #0054ff33)`,
                    border: `1px solid ${selectedProject.accent}66`,
                  }}
                >
                  <ExternalLink size={15} />
                  <span>Explore Live Project</span>
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
