"use client";
import dynamic from "next/dynamic";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Header from "./components/Header";
import Skills from "./pages/Skills";
import TechMarquee from "./pages/TechMarquee";
import Projects from "./pages/Projects";
// import Certifications from "./pages/Certifications";
import Contact from "./pages/Contact";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";

const ParticleBackground = dynamic(
  () => import("./components/ParticleBackground"),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="w-full max-w-full overflow-x-hidden relative">
      <ParticleBackground />
      <ScrollProgress />
      <Header />
      <Hero />
      <About />
      <TechMarquee />
      <Skills />
      <Projects />
      {/* <Certifications /> */}
      <Contact />
      <BackToTop />
    </div>
  );
}
