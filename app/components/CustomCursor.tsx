"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

interface TrailDot {
  x: number;
  y: number;
  opacity: number;
}

const CLICK_COLORS = [
  "#00f5ff",
  "#ff00e0",
  "#ffe600",
  "#00ff88",
  "#ff4d00",
  "#a855f7",
];

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posRef = useRef({ x: -200, y: -200 });
  const ringPosRef = useRef({ x: -200, y: -200 });
  const particlesRef = useRef<Particle[]>([]);
  const trailRef = useRef<TrailDot[]>([]);
  const animFrameRef = useRef<number>(0);
  const clickColorIdxRef = useRef(0);
  const isClickingRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  // Resize canvas to full screen
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  const spawnClickParticles = useCallback((x: number, y: number) => {
    const color = CLICK_COLORS[clickColorIdxRef.current % CLICK_COLORS.length];
    clickColorIdxRef.current++;
    const count = 18;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const speed = 3 + Math.random() * 5;
      particlesRef.current.push({
        id: Date.now() + i,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 1,
        size: 2 + Math.random() * 4,
        color,
      });
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Add trail dot
      trailRef.current.push({ x: e.clientX, y: e.clientY, opacity: 1 });
      if (trailRef.current.length > 20) trailRef.current.shift();
    };

    const handleMouseDown = (e: MouseEvent) => {
      isClickingRef.current = true;
      spawnClickParticles(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      isClickingRef.current = false;
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, spawnClickParticles]);

  // Animation loop
  useEffect(() => {
    let hue = 180;

    const animate = () => {
      const cursor = cursorRef.current;
      const ring = ringRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      // Move main cursor dot instantly
      if (cursor) {
        cursor.style.transform = `translate(${posRef.current.x - 6}px, ${posRef.current.y - 6}px) ${isClickingRef.current ? "scale(1.8)" : "scale(1)"}`;
      }

      // Smoothly lag the ring behind
      ringPosRef.current.x +=
        (posRef.current.x - ringPosRef.current.x) * 0.12;
      ringPosRef.current.y +=
        (posRef.current.y - ringPosRef.current.y) * 0.12;

      if (ring) {
        hue = (hue + 1) % 360;
        ring.style.transform = `translate(${ringPosRef.current.x - 22}px, ${ringPosRef.current.y - 22}px) ${isClickingRef.current ? "scale(1.5)" : "scale(1)"}`;
        ring.style.borderColor = `hsl(${hue}, 100%, 65%)`;
        ring.style.boxShadow = `0 0 12px 3px hsl(${hue}, 100%, 65%), inset 0 0 8px hsl(${hue}, 100%, 55%)`;
      }

      // Draw canvas: particles + trail
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw trail
        for (let i = 0; i < trailRef.current.length; i++) {
          const dot = trailRef.current[i];
          const progress = i / trailRef.current.length;
          const trailHue = (hue + i * 8) % 360;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, progress * 4, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${trailHue}, 100%, 70%, ${progress * 0.5})`;
          ctx.fill();
        }

        // Draw & update particles
        particlesRef.current = particlesRef.current.filter((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.12; // gravity
          p.vx *= 0.97; // friction
          p.life -= 0.025;

          if (p.life <= 0) return false;

          const alpha = p.life;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fillStyle =
            p.color +
            Math.floor(alpha * 255)
              .toString(16)
              .padStart(2, "0");
          ctx.fill();

          // glow
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life * 2.5, 0, Math.PI * 2);
          ctx.fillStyle =
            p.color +
            Math.floor(alpha * 60)
              .toString(16)
              .padStart(2, "0");
          ctx.fill();

          return true;
        });
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  return (
    <>
      {/* Full-screen canvas for trail & particles */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99998,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />

      {/* Glowing dot */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "white",
          boxShadow: "0 0 10px 4px rgba(255,255,255,0.8)",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          transition: "transform 0.04s linear, opacity 0.3s, box-shadow 0.1s",
          willChange: "transform",
        }}
      />

      {/* Lagging color-cycling ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 24,
          height: 24,
          borderRadius: "50%",
          border: "2px solid #00f5ff",
          boxShadow: "0 0 12px 3px #00f5ff",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          transition:
            "transform 0.05s linear, opacity 0.3s, border-color 0.1s, box-shadow 0.1s, scale 0.15s",
          willChange: "transform",
        }}
      />

      {/* Hide native cursor globally */}
      <style>{`
        *, *::before, *::after {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
