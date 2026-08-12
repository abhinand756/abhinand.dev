"use client";

import ParticleBackground from "../components/ParticleBackground";
import Header from "../components/Header";
import Personal from "../pages/Personal";

export default function AboutMePage() {
  return (
    <div>
      <ParticleBackground />
      <Header hideNav={true} />
      <Personal />
    </div>
  );
}
