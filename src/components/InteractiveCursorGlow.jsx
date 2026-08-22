import { useEffect, useState, useRef } from "react";
import "./InteractiveCursorGlow.css";

export default function InteractiveCursorGlow() {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
  const [hoverLabel, setHoverLabel] = useState(null); // 'CLICK' | 'EXPLORE' | 'CHAT' | 'VIEW'
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const particlesRef = useRef([]);
  const shockwavesRef = useRef([]);
  const mouseVelocityRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, speed: 0 });
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse Movement & Target Detection
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      const vx = x - mouseVelocityRef.current.lastX;
      const vy = y - mouseVelocityRef.current.lastY;
      const speed = Math.sqrt(vx * vx + vy * vy);

      mouseVelocityRef.current = {
        x: vx,
        y: vy,
        lastX: x,
        lastY: y,
        speed,
      };

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      // Spawn glowing star-dust particles along movement path
      if (speed > 1.5) {
        const particleCount = Math.min(Math.floor(speed / 3) + 1, 4);
        for (let i = 0; i < particleCount; i++) {
          particlesRef.current.push({
            x: x + (Math.random() - 0.5) * 8,
            y: y + (Math.random() - 0.5) * 8,
            vx: -vx * 0.15 + (Math.random() - 0.5) * 1.5,
            vy: -vy * 0.15 + (Math.random() - 0.5) * 1.5,
            size: Math.random() * 2.8 + 1.2,
            alpha: 0.85,
            hue: Math.random() > 0.3 ? 142 : 198, // Emerald Green & Cyber Cyan
            life: 1.0,
            decay: Math.random() * 0.035 + 0.02,
          });
        }
      }

      // Detect Hover Targets & Dynamic HUD Badges
      const target = e.target;
      const projectCard = target.closest(".project-card");
      const button = target.closest("button, .btn, .btn-primary, .hero-main-cta");
      const link = target.closest("a");
      const badge = target.closest(".spider-badge-wrap");
      const companion = target.closest(".peash-avatar-capsule");

      if (projectCard) {
        setIsHovered(true);
        setHoverLabel("EXPLORE");
      } else if (companion) {
        setIsHovered(true);
        setHoverLabel("AI COPILOT");
      } else if (badge) {
        setIsHovered(true);
        setHoverLabel("DRAG");
      } else if (button || link) {
        setIsHovered(true);
        setHoverLabel(null);
      } else {
        setIsHovered(false);
        setHoverLabel(null);
      }
    };

    // Click Shockwave Pulse
    const handleMouseDown = (e) => {
      setIsClicking(true);
      shockwavesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: 65,
        alpha: 0.9,
        speed: 3.8,
      });
    };

    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    // Touch listeners removed to optimize mobile rendering and scrolling

    // ─── 60FPS High-Precision Render Loop ───
    const renderLoop = () => {
      // Early exit if nothing to render to save CPU
      if (particlesRef.current.length === 0 && shockwavesRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animationFrameRef.current = requestAnimationFrame(renderLoop);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Render & Update Stardust Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        p.alpha = Math.max(0, p.life);

        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 60%, ${p.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(${p.hue}, 90%, 65%, ${p.alpha * 0.8})`;
        ctx.fill();
        ctx.restore();
      }

      // 2. Render & Update Quantum Click Shockwaves
      for (let i = shockwavesRef.current.length - 1; i >= 0; i--) {
        const s = shockwavesRef.current[i];
        s.radius += s.speed;
        s.alpha *= 0.92;

        if (s.radius >= s.maxRadius || s.alpha < 0.02) {
          shockwavesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(30, 215, 96, ${s.alpha})`;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 14;
        ctx.shadowColor = "#1ed760";
        ctx.stroke();
        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animationFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <>
      {/* 60FPS Stardust Canvas Overlay */}
      <canvas ref={canvasRef} className="wow-cursor-canvas" />

      {/* Cyber HUD Magnetic Reticle Cursor (Desktop) */}
      <div
        ref={cursorRef}
        className={`wow-cursor-hud ${isHovered ? "hovered" : ""} ${isClicking ? "clicking" : ""}`}
        style={{
          transform: `translate3d(-100px, -100px, 0)`,
        }}
      >
        {/* Glowing Center Photon Core */}
        <div className="wow-cursor-core" />

        {/* HUD Corner Brackets */}
        <div className="hud-bracket top-left" />
        <div className="hud-bracket top-right" />
        <div className="hud-bracket bottom-left" />
        <div className="hud-bracket bottom-right" />

        {/* Dynamic Context Action Tag */}
        {hoverLabel && (
          <div className="wow-cursor-tag">
            <span>{hoverLabel}</span>
          </div>
        )}
      </div>
    </>
  );
}
