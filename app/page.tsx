"use client";
import ParticleBackground from "./components/ParticleBackground";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Header from "./components/Header";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

export default function Home() {
  return (
    <div className="w-full max-w-full overflow-x-hidden relative">
      <ParticleBackground />
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}
