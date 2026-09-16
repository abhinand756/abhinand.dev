"use client";

/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Layers, ArrowLeft, Sparkles, Code2, CheckCircle2, Images, ZoomIn } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface ProjectItem {
  id: string;
  title: string;
  category: "personal" | "company";
  company?: string;
  src: string;
  images: string[];
  coverImage: string;
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
    src: "/images/projects/happymart-1.png",
    coverImage: "/images/projects/happymart-1.png",
    images: ["/images/projects/happymart-1.png", "/images/projects/happymart-2.png", "/images/projects/happymart-3.png", "/images/projects/happymart-4.png"],
    desc: "A full-featured e-commerce platform with authentication, product management, shopping cart, wishlist, order management, and secure checkout.",
    longDesc:
      "A modern full-stack e-commerce application built to replicate the experience of leading online marketplaces. The platform includes user authentication, product browsing, category filtering, shopping cart, wishlist, checkout flow, order tracking, admin product management, and responsive UI optimized for desktop and mobile devices.",
    tags: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Tailwind CSS"
    ],
    features: [
      "JWT authentication with secure login & registration",
      "Dynamic product search, filtering, sorting & pagination",
      "Shopping cart, wishlist & seamless checkout experience",
      "Return Order, Order history and user profile management",
      "Product return & review integration.",
      "Admin dashboard for products, categories & orders",
      "Responsive UI inspired by Flipkart with optimized performance"
    ],
    accent: "#2874F0",
    link: "https://happymartstore.vercel.app/",
  },
  {
    id: "pers-2",
    title: "Real-Time Chat Application",
    category: "personal",
    src: "/images/services2.jpg",
    coverImage: "/images/services2.jpg",
    images: ["/images/services2.jpg", "/images/website-dev.webp", "/images/services1.jpg", "/images/mobile-app.webp"],
    desc: "A real-time messaging application supporting instant chat, online presence, media sharing, and responsive conversations.",
    longDesc:
      "A modern real-time chat platform developed to deliver a smooth messaging experience. The application features live messaging, user authentication, online/offline status indicators, media sharing, conversation management, and a responsive interface designed for desktop and mobile users.",
    tags: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "Tailwind CSS"
    ],
    features: [
      "Real-time messaging powered by Socket.io",
      "Private one-to-one conversations",
      "User authentication with secure JWT sessions",
      "Online/offline presence indicators",
      "Image and file sharing support",
      "Responsive user interface"
    ],
    accent: "#229ED9",
    link: "https://github.com/abhinand-ct205",
  },
  {
    id: "pers-3",
    title: "Cineholic - Movie Discovery Platform",
    category: "personal",
    src: "/images/projects/cineholic-1.png",
    coverImage: "/images/projects/cineholic-1.png",
    images: ["/images/projects/cineholic-1.png", "/images/projects/cineholic-2.png", "/images/projects/cineholic-3.png", "/images/projects/cineholic-4.png"],
    desc: "A modern entertainment platform for exploring trending movies, TV shows, and music with powerful search, filtering, and responsive browsing experience.",
    longDesc:
      "An entertainment discovery platform that allows users to browse popular movies, TV series, albums, artists, and trending content through a clean and intuitive interface. The application integrates external APIs to deliver real-time content, advanced filtering, detailed information pages, and an engaging browsing experience.",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "TMDB API",
      "MongoDB",
      "REST API"
    ],
    features: [
      "Browse trending movies, cast and artists.",
      "Advanced search with genre and category filtering",
      "Detailed information pages with ratings & metadata",
      "Responsive UI optimized for desktop, tablet & mobile",
      "API integration for real-time entertainment content",
      "Modern card-based interface with smooth animations"
    ],
    accent: "#2874F0",
    link: "https://cineholic.vercel.app/",
  },

  // ── Company / Featured Projects ──
  {
    id: "comp-1",
    title: "Mathrubhumi - Leading News Channel",
    category: "company",
    company: "Featured Project",
    src: "/images/services2.jpg",
    coverImage: "/images/services2.jpg",
    images: ["/images/services2.jpg", "/images/website-dev.webp", "/images/services1.jpg", "/images/mobile-app.webp"],
    desc: "Developed a modern, responsive news platform for Mathrubhumi with dynamic content sections, intuitive navigation, and a seamless reading experience across devices.",
    longDesc: "Designed and developed a high-performance news web experience focused on delivering breaking news, articles, videos, and multimedia content through a clean and engaging interface. Implemented responsive layouts, reusable React components, optimized content rendering, and smooth interactions to provide a fast and accessible experience across desktop and mobile devices.",
    tags: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "REST API",
      "Responsive Design"
    ],
    features: [
      "Dynamic news and article sections with API-driven content",
      "Responsive layouts optimized for desktop, tablet, and mobile",
      "Category-based news navigation and content discovery",
      "Modern UI with smooth transitions and interactive elements",
      "Optimized rendering and image loading for faster page performance"
    ],
    accent: "#1aa5c1",
    link: "https://www.mathrubhumi.com/",
  },
  {
    id: "comp-2",
    title: "Grihalakshmi - Weekly Magazine",
    category: "company",
    company: "Featured Project",
    src: "/images/services2.jpg",
    coverImage: "/images/services2.jpg",
    images: ["/images/services2.jpg", "/images/services3.jpg", "/images/mobile-app.webp", "/images/website-dev.webp"],
    desc: "Developed a modern digital magazine experience for Grihalakshmi, featuring engaging editorial content, intuitive navigation, rich media, and a responsive reading experience across devices.",
    longDesc: "Designed and developed a visually engaging digital platform for Grihalakshmi Weekly Magazine, focused on delivering articles, stories, lifestyle content, and multimedia in an elegant and accessible interface. Built reusable components and responsive layouts to ensure a consistent reading experience across desktop, tablet, and mobile devices while optimizing content presentation and performance.",
    tags: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "REST API",
      "Responsive Design"
    ],
    features: [
      "Dynamic magazine articles and editorial content",
      "Category-based navigation for easy content discovery",
      "Responsive reading experience across all screen sizes",
      "Rich media integration for images and multimedia content",
      "Reusable and scalable React component architecture",
      "Optimized page rendering and image loading for better performance"
    ],
    accent: "#1aa5c1",
    link: "https://grihalakshmi.mathrubhumi.com/",
  },
  {
    id: "comp-3",
    title: "EdgeProp - Malaysia Property Platform",
    category: "company",
    company: "Featured Project",
    src: "/images/services2.jpg",
    coverImage: "/images/services2.jpg",
    images: ["/images/services2.jpg", "/images/mobile-app.webp", "/images/website-dev.webp", "/images/services1.jpg"],
    desc: "Worked as a Frontend developer in EdgeProp.my, a property platform for real-estate content.",
    longDesc: "Contributed to the development of EdgeProp.my, a comprehensive property and real-estate platform serving buyers, renters, investors, and property professionals across Malaysia. Built responsive and reusable interfaces for property discovery, listing experiences, project information, search and filtering, and data-driven content while maintaining a seamless experience across desktop and mobile devices.",
    tags: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Responsive Design"
    ],
    features: [
      "Dynamic property listings with advanced search and filtering",
      "Responsive property discovery experience across desktop and mobile",
      "Interactive property details with pricing, location, and market information",
      "New launch and project discovery interfaces",
      "Data-driven property insights and transaction information",
      "Reusable React components for scalable real-estate experiences",
      "Optimized UI and content rendering for large-scale property data"
    ],
    accent: "#2874F0",
    link: "https://www.edgeprop.my/"
  },
];

export default function ProjectsDetail() {
  const [activeTab, setActiveTab] = useState<"all" | "company" | "personal">("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem>(allProjects[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredProjects = allProjects.filter((p) => {
    if (activeTab === "all") return true;
    return p.category === activeTab;
  });

  const openLightbox = (project: ProjectItem, index: number) => {
    setSelectedProject(project);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const lightboxSlides = selectedProject.images.map((src) => ({
    src,
    alt: selectedProject.title,
  }));

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
              <div
                className="relative w-full h-[220px] md:h-[260px] rounded-2xl overflow-hidden mb-4 group cursor-pointer"
                onClick={() => openLightbox(selectedProject, 0)}
              >
                <Image
                  src={selectedProject.coverImage}
                  alt={selectedProject.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                </div>

                <div
                  className="absolute bottom-4 right-4 flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl text-white backdrop-blur-md transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: "rgba(6, 11, 20, 0.8)",
                    border: `1px solid ${selectedProject.accent}55`,
                    color: selectedProject.accent,
                  }}
                >
                  <Images size={14} />
                  View Gallery ({selectedProject.images.length})
                </div>
              </div>

              {/* Image Gallery Grid */}
              <div className="grid grid-cols-4 gap-2.5 mb-6">
                {selectedProject.images.map((img, idx) => {
                  const isCover = img === selectedProject.coverImage;
                  return (
                    <motion.button
                      key={idx}
                      onClick={() => openLightbox(selectedProject, idx)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                      style={{
                        border: isCover ? `2px solid ${selectedProject.accent}88` : "2px solid rgba(255,255,255,0.08)",
                      }}
                      title={isCover ? "Cover image" : `Image ${idx + 1}`}
                    >
                      <Image
                        src={img}
                        alt={`${selectedProject.title} - image ${idx + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <ZoomIn size={18} className="text-white" />
                      </div>
                      {isCover && (
                        <span
                          className="absolute top-1.5 left-1.5 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md"
                          style={{
                            background: selectedProject.accent,
                            color: "#fff",
                          }}
                        >
                          Cover
                        </span>
                      )}
                    </motion.button>
                  );
                })}
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
                {selectedProject.link ? (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
                  </a>
                ) : (
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
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
        animation={{ fade: 300, swipe: 300 }}
        carousel={{ finite: true }}
        styles={{ container: { backgroundColor: "rgba(6, 11, 20, 0.96)" } }}
      />
    </div>
  );
}
