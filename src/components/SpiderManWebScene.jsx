import { useEffect, useRef, useState } from "react";
import "./SpiderManWebScene.css";

/**
 * ══════════════════════════════════════════════════════════════════
 * 🕷️ SPIDER-MAN WEB-SHOOTING SCENE SIMULATION (60Hz & 120Hz OPTIMIZED)
 * ══════════════════════════════════════════════════════════════════
 */
export default function SpiderManWebScene({ triggerWebShot }) {
  const canvasRef = useRef(null);
  const websRef = useRef([]);
  const spideyPosRef = useRef({ x: 40, y: 35, angle: 0 });
  const animationFrameRef = useRef(null);
  const [thwipText, setThwipText] = useState(null);

  // Shoot a web towards target (capped to max 4 concurrent strands to prevent memory leaks)
  const fireWebStrand = (startX, startY, targetX, targetY, color = "#38bdf8") => {
    if (websRef.current.length >= 4) {
      websRef.current.shift();
    }

    websRef.current.push({
      startX,
      startY,
      targetX,
      targetY,
      progress: 0,
      life: 1.0,
      decay: 0.025,
      color,
      segments: [
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      ],
    });

    setThwipText({
      x: startX + (Math.random() - 0.5) * 20,
      y: startY - 15,
    });
    setTimeout(() => setThwipText(null), 500);
  };

  useEffect(() => {
    if (triggerWebShot && canvasRef.current) {
      const canvas = canvasRef.current;
      const spidey = spideyPosRef.current;
      const targetX = triggerWebShot.x || Math.random() * canvas.width;
      const targetY = triggerWebShot.y || canvas.height - 40;
      fireWebStrand(spidey.x, spidey.y, targetX, targetY, "#1ed760");
    }
  }, [triggerWebShot]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });

    let isMounted = true;
    let lastTime = performance.now();
    let lastShotTime = performance.now();
    let swingAngle = 0;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const render = (currentTime) => {
      if (!isMounted) return;

      // Delta time normalization for seamless 60Hz / 120Hz ProMotion
      const dt = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;

      swingAngle += dt * 2.2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const spidey = spideyPosRef.current;
      spidey.x = canvas.width / 2 + Math.sin(swingAngle) * (canvas.width * 0.25);
      spidey.y = 30 + Math.abs(Math.cos(swingAngle)) * 12;

      // Draw Main Ceiling Web Tether
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(spidey.x, spidey.y);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      // Render Active Web Strands
      for (let i = websRef.current.length - 1; i >= 0; i--) {
        const web = websRef.current[i];
        web.progress = Math.min(1, web.progress + dt * 6);
        web.life -= web.decay;

        if (web.life <= 0) {
          websRef.current.splice(i, 1);
          continue;
        }

        const currentX = web.startX + (web.targetX - web.startX) * web.progress;
        const currentY = web.startY + (web.targetY - web.startY) * web.progress;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(web.startX, web.startY);

        const midX = (web.startX + currentX) / 2;
        const midY = (web.startY + currentY) / 2;
        ctx.quadraticCurveTo(midX + web.segments[0], midY + web.segments[1], currentX, currentY);

        ctx.strokeStyle = web.color;
        ctx.globalAlpha = Math.max(0, web.life * 0.8);
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Web Impact Ring
        if (web.progress >= 0.95) {
          ctx.beginPath();
          ctx.arc(web.targetX, web.targetY, 4, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Periodic ambient shot (every 5 seconds)
      if (currentTime - lastShotTime > 5000) {
        lastShotTime = currentTime;
        const randomTargetX = Math.random() > 0.5 ? canvas.width - 20 : 20;
        const randomTargetY = 50 + Math.random() * (canvas.height - 100);
        const color = Math.random() > 0.5 ? "#38bdf8" : "#ef4444";
        fireWebStrand(spidey.x, spidey.y, randomTargetX, randomTargetY, color);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      websRef.current = [];
    };
  }, []);

  return (
    <div className="spiderman-web-scene-container">
      <canvas ref={canvasRef} className="spiderman-web-canvas" />
      {thwipText && (
        <span 
          className="spidey-thwip-badge"
          style={{ left: thwipText.x, top: thwipText.y }}
        >
          THWIP! 🕸️
        </span>
      )}
    </div>
  );
}
