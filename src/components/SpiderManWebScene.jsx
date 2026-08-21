import { useEffect, useRef, useState } from "react";
import "./SpiderManWebScene.css";

/**
 * ══════════════════════════════════════════════════════════════════
 * 🕷️ SPIDER-MAN WEB-SHOOTING SCENE SIMULATION
 * ══════════════════════════════════════════════════════════════════
 * 
 * Simulates a cyber Spider-Man swinging and shooting interactive
 * glowing web strands at modal boundaries, user clicks, and query events.
 */
export default function SpiderManWebScene({ triggerWebShot }) {
  const canvasRef = useRef(null);
  const websRef = useRef([]);
  const spideyPosRef = useRef({ x: 40, y: 35, targetX: 40, targetY: 35, angle: 0, swinging: true });
  const animationFrameRef = useRef(null);
  const [thwipText, setThwipText] = useState(null);

  // Shoot a web towards a specific coordinate (x, y) or random boundary
  const fireWebStrand = (startX, startY, targetX, targetY, color = "#38bdf8") => {
    websRef.current.push({
      startX,
      startY,
      targetX,
      targetY,
      progress: 0,
      life: 1.0,
      decay: 0.018,
      color,
      segments: Array.from({ length: 6 }, () => (Math.random() - 0.5) * 4),
      anchorSize: 1,
    });

    // Display brief THWIP! sound effect cue
    setThwipText({
      x: startX + (Math.random() - 0.5) * 20,
      y: startY - 15,
      id: Date.now() + Math.random(),
    });
    setTimeout(() => setThwipText(null), 700);
  };

  // External trigger (e.g. user submitted a question or clicked a card)
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
    const ctx = canvas.getContext("2d");

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Initial ambient corner webs
    setTimeout(() => {
      if (canvas) {
        fireWebStrand(canvas.width - 50, 40, canvas.width - 10, 10, "#38bdf8");
        fireWebStrand(40, 35, 10, canvas.height - 30, "#ef4444");
      }
    }, 400);

    let lastTime = 0;
    let swingAngle = 0;

    const render = (time) => {
      swingAngle += 0.035;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const spidey = spideyPosRef.current;
      // Gentle pendulum swing oscillation
      spidey.x = canvas.width / 2 + Math.sin(swingAngle) * (canvas.width * 0.28);
      spidey.y = 32 + Math.abs(Math.cos(swingAngle)) * 14;

      // Draw Main Ceiling Web Tether holding Spider-Man
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(spidey.x, spidey.y);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 1.2;
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 6;
      ctx.stroke();
      ctx.restore();

      // Render Active Web Strands
      for (let i = websRef.current.length - 1; i >= 0; i--) {
        const web = websRef.current[i];
        web.progress = Math.min(1, web.progress + 0.12);
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

        // Spline / Elastic Zig-zag web physics
        const midX = (web.startX + currentX) / 2;
        const midY = (web.startY + currentY) / 2;
        ctx.quadraticCurveTo(midX + web.segments[0], midY + web.segments[1], currentX, currentY);

        ctx.strokeStyle = web.color;
        ctx.globalAlpha = Math.max(0, web.life * 0.85);
        ctx.lineWidth = 1.5;
        ctx.shadowColor = web.color;
        ctx.shadowBlur = 8;
        ctx.stroke();

        // Web Impact / Anchor Ring
        if (web.progress >= 0.95) {
          ctx.beginPath();
          ctx.arc(web.targetX, web.targetY, 4 * (1 - web.life * 0.5), 0, Math.PI * 2);
          ctx.strokeStyle = web.color;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Mini Web Splatter radiating lines
          for (let a = 0; a < 4; a++) {
            const rad = (a * Math.PI) / 2 + 0.4;
            ctx.beginPath();
            ctx.moveTo(web.targetX, web.targetY);
            ctx.lineTo(web.targetX + Math.cos(rad) * 9, web.targetY + Math.sin(rad) * 9);
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      // Periodic random ambient web shot (every ~4.5 seconds)
      if (time - lastTime > 4500) {
        lastTime = time;
        const randomTargetX = Math.random() > 0.5 ? canvas.width - 15 : 15;
        const randomTargetY = 40 + Math.random() * (canvas.height - 80);
        const color = Math.random() > 0.5 ? "#38bdf8" : "#ef4444";
        fireWebStrand(spidey.x, spidey.y, randomTargetX, randomTargetY, color);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Handle user clicks inside the modal to shoot webs to touch position
  const handleContainerClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const spidey = spideyPosRef.current;
    fireWebStrand(spidey.x, spidey.y, clickX, clickY, "#1ed760");
  };

  return (
    <div className="spiderman-web-scene-container" onClick={handleContainerClick}>
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
