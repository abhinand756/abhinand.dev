"use client";

import dynamic from "next/dynamic";
import Header from "../components/Header";
import Personal from "../pages/Personal";

const ParticleBackground = dynamic(
  () => import("../components/ParticleBackground"),
  { ssr: false }
);

export default function AboutMePage() {
  return (
    <div>
      <ParticleBackground />
      <Header hideNav={true} />
      <Personal />
    </div>
  );
}
