"use client";

import ParticleBackground from "../components/ParticleBackground";
import Header from "../components/Header";
import ProjectsDetail from "../pages/ProjectsDetail";

export default function ProjectsDetailPage() {
  return (
    <div>
      <ParticleBackground />
      <Header hideNav={true} />
      <ProjectsDetail />
    </div>
  );
}
