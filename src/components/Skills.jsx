import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Cpu, Layers, Radio, Globe, Terminal, Compass, Grid, Shuffle, Play, RefreshCw, Crosshair } from "lucide-react";
import { SKILLS } from "../data/portfolio";
import { useIsMobile } from "../hooks/useIsMobile";
import "./Skills.css";

// 6 Dedicated Spider-Web Categories with curated high-contrast cyber colors
const CATEGORIES = [
  { id: "ai", title: "AI & Agentic Systems", color: "#1ed760", icon: Cpu, glyph: "🧠" },
  { id: "crm", title: "CRM & RevOps", color: "#ff7a59", icon: Zap, glyph: "⚡" },
  { id: "vector", title: "Vector DBs & AI Platforms", color: "#38bdf8", icon: Layers, glyph: "📊" },
  { id: "re", title: "Real Estate Automation", color: "#f59e0b", icon: Globe, glyph: "🏘️" },
  { id: "web", title: "Frontend & Backend", color: "#a855f7", icon: Terminal, glyph: "💻" },
  { id: "mobile", title: "Mobile & Cloud", color: "#06b6d4", icon: Radio, glyph: "📱" },
];

/* ═══════════════════════════════════════════════════════════════
   CUSTOM SPIDER-MAN AVATAR COMPONENT (Follows mouse & shoots webs)
   ═══════════════════════════════════════════════════════════════ */
function SpiderManHeroAvatar({ mousePos, isHoveringNode }) {
  const isMobile = useIsMobile();
  if (isMobile || !mousePos.active) return null;

  return (
    <motion.div
      className="spiderman-cursor-avatar"
      style={{
        left: mousePos.x,
        top: mousePos.y,
      }}
      animate={{
        scale: isHoveringNode ? 1.25 : 1,
      }}
      transition={{ duration: 0.15 }}
    >
      {/* Spider-Man Mask SVG */}
      <div className={`spiderman-mask-container ${isHoveringNode ? "sense-active" : ""}`}>
        <svg viewBox="0 0 48 56" className="spiderman-mask-svg">
          <defs>
            <radialGradient id="spiderHeadGrad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#e11d48" />
              <stop offset="65%" stopColor="#9f1239" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>
            <filter id="spiderGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Mask Base */}
          <path
            d="M 24,2 C 38,2 46,14 46,28 C 46,42 32,54 24,54 C 16,54 2,42 2,28 C 2,14 10,2 24,2 Z"
            fill="url(#spiderHeadGrad)"
            stroke="#1ed760"
            strokeWidth="1.6"
            filter="url(#spiderGlow)"
          />

          {/* Web Silk Grid on Mask */}
          <path
            d="M 24,2 L 24,54 M 2,28 L 46,28 M 7,12 L 41,44 M 7,44 L 41,12"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="0.8"
            fill="none"
          />

          {/* Left Eye (White Glowing Cyber Eye) */}
          <path
            d="M 10,22 C 14,20 20,24 22,30 C 18,32 12,30 10,22 Z"
            fill="#ffffff"
            stroke="#111827"
            strokeWidth="1.8"
            className="spider-eye-left"
          />

          {/* Right Eye */}
          <path
            d="M 38,22 C 34,20 28,24 26,30 C 30,32 36,30 38,22 Z"
            fill="#ffffff"
            stroke="#111827"
            strokeWidth="1.8"
            className="spider-eye-right"
          />
        </svg>

        {/* Dynamic Spider-Sense Lightning Waves */}
        {isHoveringNode && (
          <div className="spider-sense-waves">
            <span className="sense-wave wave-1" />
            <span className="sense-wave wave-2" />
            <span className="sense-wave wave-3" />
          </div>
        )}

        {/* THWIP! Comic Badge */}
        {isHoveringNode && (
          <motion.div
            className="spider-thwip-badge"
            initial={{ scale: 0, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: -24, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <span>THWIP!</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ULTRA-PREMIUM SPIDER PLAYGROUND CANVAS (4K DPI • Celestial Drift)
   ═══════════════════════════════════════════════════════════════ */
function SpiderPlaygroundCanvas({ activeCategory, hoveredSkill, setHoveredSkill, mousePos, setMousePos, shockwaves, setShockwaves, gameActiveTrigger, onGameOver }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isMobile = useIsMobile();
  const draggedNodeRef = useRef(null);

  // Game Engine State
  const gameState = useRef({
    mode: 'idle', // idle, playing, won, over
    score: 0,
    timeLeft: 60,
    caughtNodes: new Set(),
    currentWave: 0,
    totalWaves: 6,
    lastTick: 0,
    combo: 1,
    lastCatchTime: 0,
    floatingTexts: [],
    screenShake: 0,
    reportedGameOver: false
  });


  // Initialize playground nodes with organic celestial velocities
  const playgroundNodes = useMemo(() => {
    const nodes = [];
    let idx = 0;

    SKILLS.forEach((group, catIdx) => {
      const catInfo = CATEGORIES.find((c) => c.title === group.category) || CATEGORIES[catIdx % 6];

      group.items.forEach((item) => {
        // High-precision badge measurement
        const textLen = item.length;
        const width = Math.max(105, textLen * 8.2 + 38);
        const height = 36;

        // Gentle orbital drift velocity
        const speed = 0.35 + Math.random() * 0.45;
        const angle = Math.random() * Math.PI * 2;

        nodes.push({
          id: `${group.category}-${item}`,
          name: item,
          category: group.category,
          color: catInfo.color,
          glyph: catInfo.glyph || "⚡",
          catIdx,
          x: 200 + (idx % 6) * 160 + (Math.random() * 60 - 30),
          y: 120 + Math.floor(idx / 6) * 85 + (Math.random() * 40 - 20),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          width,
          height,
          floatPhase: Math.random() * Math.PI * 2,
        });
        idx++;
      });
    });

    return nodes;
  }, []);

  // Start game when trigger changes
  useEffect(() => {
    if (gameActiveTrigger > 0) {
      gameState.current = {
        mode: 'playing',
        score: 0,
        timeLeft: 60,
        caughtNodes: new Set(),
        currentWave: 0,
        totalWaves: CATEGORIES.length,
        lastTick: performance.now(),
        combo: 1,
        lastCatchTime: 0,
        floatingTexts: [],
        screenShake: 0,
        reportedGameOver: false
      };
      
      // Give all nodes a chaotic rogue boost, but only for the first wave initially
      playgroundNodes.forEach(node => {
        const speedBoost = 4 + Math.random() * 4;
        const angle = Math.random() * Math.PI * 2;
        node.vx = Math.cos(angle) * speedBoost;
        node.vy = Math.sin(angle) * speedBoost;
      });
    }
  }, [gameActiveTrigger, playgroundNodes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const dpr = window.devicePixelRatio || 1;
    let width = canvas.parentElement.offsetWidth;
    let height = canvas.parentElement.offsetHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.offsetWidth;
      height = canvas.parentElement.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", handleResize);

    // Initial balanced placement across canvas
    const cols = isMobile ? 3 : 7;
    const cellW = width / cols;
    const cellH = height / Math.ceil(playgroundNodes.length / cols);

    playgroundNodes.forEach((node, i) => {
      const c = i % cols;
      const r = Math.floor(i / cols);
      node.x = c * cellW + cellW / 2 + (Math.random() * 30 - 15);
      node.y = r * cellH + cellH / 2 + (Math.random() * 30 - 15);
    });

    let time = 0;

    const render = () => {
      time += 0.018;
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      const centerX = width / 2;
      const centerY = height / 2;
      const maxR = Math.max(width, height) * 0.52;
      const now = performance.now();

      // ─── GAME LOOP LOGIC ───
      if (gameState.current.mode === 'playing') {
        const dt = (now - gameState.current.lastTick) / 1000;
        if (dt >= 1) {
          gameState.current.timeLeft = Math.max(0, gameState.current.timeLeft - 1);
          gameState.current.lastTick = now;

          if (gameState.current.timeLeft === 0) {
            gameState.current.mode = 'over';
          }
        }
        
        // Reset Combo if taking too long (2.5 seconds)
        if (now - gameState.current.lastCatchTime > 2500) {
          gameState.current.combo = 1;
        }
        
        // Decay Screen Shake
        if (gameState.current.screenShake > 0) {
          gameState.current.screenShake *= 0.85; // Decay
          if (gameState.current.screenShake < 0.5) gameState.current.screenShake = 0;
        }

        // Wave Progression / Win Condition
        const currentCategoryTitle = CATEGORIES[gameState.current.currentWave]?.title;
        const currentWaveNodes = playgroundNodes.filter(n => n.category === currentCategoryTitle);
        const currentWaveCaught = currentWaveNodes.filter(n => gameState.current.caughtNodes.has(n.id));

        if (currentWaveCaught.length === currentWaveNodes.length && currentWaveNodes.length > 0) {
          if (gameState.current.currentWave < gameState.current.totalWaves - 1) {
            gameState.current.currentWave++; // Advance wave
            // Boost new nodes
            playgroundNodes.filter(n => n.category === CATEGORIES[gameState.current.currentWave]?.title).forEach(node => {
              const speedBoost = 4 + Math.random() * 4 + (gameState.current.currentWave * 0.5); // Gets faster!
              const angle = Math.random() * Math.PI * 2;
              node.vx = Math.cos(angle) * speedBoost;
              node.vy = Math.sin(angle) * speedBoost;
            });
          } else if (gameState.current.mode !== 'won') {
            gameState.current.mode = 'won';
            const timeBonus = gameState.current.timeLeft * 1000;
            gameState.current.score += timeBonus;
          }
        }

        // Report Game Over
        if ((gameState.current.mode === 'won' || gameState.current.mode === 'over') && !gameState.current.reportedGameOver) {
          gameState.current.reportedGameOver = true;
          if (onGameOver) {
             const timeBonus = gameState.current.mode === 'won' ? gameState.current.timeLeft * 1000 : 0;
             const baseScore = gameState.current.score - timeBonus;
             onGameOver({
                status: gameState.current.mode,
                baseScore,
                timeBonus,
                totalScore: gameState.current.score,
                timeRemaining: gameState.current.timeLeft
             });
          }
        }
      }

      ctx.save(); // Save master context for Screen Shake
      if (gameState.current.screenShake > 0) {
        const sx = (Math.random() - 0.5) * gameState.current.screenShake;
        const sy = (Math.random() - 0.5) * gameState.current.screenShake;
        ctx.translate(sx, sy);
      }

      // ─── 1. Draw High-Tech Spider Web Constellation Rings ───
      ctx.save();
      const webBaseColor = isLight ? "34, 197, 94" : "30, 215, 96";
      const spiderRed = isLight ? "225, 29, 72" : "255, 51, 102";

      // Concentric Rings with Sagging Web Bezier Curves
      for (let r = 0.18; r <= 1.0; r += 0.18) {
        ctx.beginPath();
        for (let a = 0; a <= 16; a++) {
          const ang = (a * (360 / 16) - 90) * (Math.PI / 180);
          const nextAng = ((a + 1) * (360 / 16) - 90) * (Math.PI / 180);

          const wave = Math.sin(time * 1.5 + r * 3 + a) * 2.5;
          const p1x = centerX + Math.cos(ang) * (maxR * r + wave);
          const p1y = centerY + Math.sin(ang) * (maxR * r + wave);
          const p2x = centerX + Math.cos(nextAng) * (maxR * r + wave);
          const p2y = centerY + Math.sin(nextAng) * (maxR * r + wave);
          
          const midAng = (ang + nextAng) / 2;
          const sagX = centerX + Math.cos(midAng) * ((maxR * r + wave) * 0.94);
          const sagY = centerY + Math.sin(midAng) * ((maxR * r + wave) * 0.94);

          if (a === 0) ctx.moveTo(p1x, p1y);
          ctx.quadraticCurveTo(sagX, sagY, p2x, p2y);
        }
        ctx.strokeStyle = `rgba(${webBaseColor}, ${isLight ? 0.08 : 0.06})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Radial Silk Spokes
      for (let a = 0; a < 16; a++) {
        const ang = (a * (360 / 16) - 90) * (Math.PI / 180);
        const endX = centerX + Math.cos(ang) * maxR;
        const endY = centerY + Math.sin(ang) * maxR;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = a % 2 === 0 ? `rgba(${webBaseColor}, ${isLight ? 0.10 : 0.07})` : `rgba(${spiderRed}, ${isLight ? 0.06 : 0.04})`;
        ctx.lineWidth = a % 2 === 0 ? 1.2 : 0.8;
        ctx.stroke();

        // Traveling Photon Pulses along spokes
        if (a % 2 === 0) {
          const pulseProgress = (time * 0.4 + a * 0.15) % 1;
          const px = centerX + (endX - centerX) * pulseProgress;
          const py = centerY + (endY - centerY) * pulseProgress;
          ctx.beginPath();
          ctx.arc(px, py, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = isLight ? "#16a34a" : "#1ed760";
          ctx.shadowBlur = 6;
          ctx.shadowColor = "#1ed760";
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Center Spider-Reactor Hub
      ctx.beginPath();
      ctx.arc(centerX, centerY, 32, 0, Math.PI * 2);
      ctx.fillStyle = isLight ? "rgba(255, 255, 255, 0.9)" : "rgba(14, 14, 18, 0.9)";
      ctx.strokeStyle = isLight ? "rgba(22, 163, 74, 0.4)" : "rgba(30, 215, 96, 0.4)";
      ctx.lineWidth = 2;
      ctx.shadowBlur = isLight ? 10 : 18;
      ctx.shadowColor = "#1ed760";
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.font = "800 10px monospace";
      ctx.fillStyle = isLight ? "#e11d48" : "#ff3366";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("🕷️ SPIDER", centerX, centerY - 6);
      ctx.font = "700 9px monospace";
      ctx.fillStyle = isLight ? "#16a34a" : "#1ed760";
      ctx.fillText("CORE", centerX, centerY + 8);

        ctx.restore(); // Restore master context

      // ─── 2. Physics & Fluid Celestial Orbital Update ───
      let filtered = [];
      if (gameState.current.mode === 'playing') {
        const currentCategoryTitle = CATEGORIES[gameState.current.currentWave]?.title;
        filtered = playgroundNodes.filter(n => n.category === currentCategoryTitle && !gameState.current.caughtNodes.has(n.id));
      } else {
        filtered = playgroundNodes.filter(
          (n) => activeCategory === "ALL" || n.category === activeCategory
        );
      }

      for (let i = 0; i < filtered.length; i++) {
        const n1 = filtered[i];

        if (draggedNodeRef.current === n1) {
          n1.x = mousePos.x;
          n1.y = mousePos.y;
          continue;
        }

        // Active drifting velocity
        n1.x += n1.vx;
        n1.y += n1.vy;

        // Subtle gravitational center tethering (Prevents edge bunching!)
        const cdx = centerX - n1.x;
        const cdy = centerY - n1.y;
        const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
        
        if (gameState.current.mode === 'playing') {
          // Rogue mode: Weaker gravity, faster nodes
          if (cdist > 350) {
            const pull = (cdist - 350) * 0.0001;
            n1.vx += (cdx / cdist) * pull;
            n1.vy += (cdy / cdist) * pull;
          }
          // Maintain high speed
          const currentSpeed = Math.sqrt(n1.vx * n1.vx + n1.vy * n1.vy);
          if (currentSpeed < 2) {
             n1.vx *= 1.05;
             n1.vy *= 1.05;
          }
        } else {
          // Normal mode gravity
          if (cdist > 250) {
            const pull = (cdist - 250) * 0.00018;
            n1.vx += (cdx / cdist) * pull;
            n1.vy += (cdy / cdist) * pull;
          }
        }

        // Wave flutter
        n1.y += Math.sin(time + n1.floatPhase) * 0.25;
        n1.x += Math.cos(time * 0.9 + n1.floatPhase) * 0.2;

        // Soft elastic boundary padding
        const padX = n1.width / 2 + 25;
        const padY = 40;

        if (n1.x < padX) {
          n1.x = padX;
          n1.vx = Math.abs(n1.vx) * 0.9;
        }
        if (n1.x > width - padX) {
          n1.x = width - padX;
          n1.vx = -Math.abs(n1.vx) * 0.9;
        }
        if (n1.y < padY) {
          n1.y = padY;
          n1.vy = Math.abs(n1.vy) * 0.9;
        }
        if (n1.y > height - padY) {
          n1.y = height - padY;
          n1.vy = -Math.abs(n1.vy) * 0.9;
        }

        // Anti-Collision Soft Springs
        for (let j = i + 1; j < filtered.length; j++) {
          const n2 = filtered[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = (n1.width + n2.width) / 2 * 0.76 + 18;

          if (dist < minDist && dist > 0) {
            const overlap = (minDist - dist) * 0.5;
            const nx = dx / dist;
            const ny = dy / dist;
            
            n1.x -= nx * overlap * 0.4;
            n1.y -= ny * overlap * 0.4;
            n2.x += nx * overlap * 0.4;
            n2.y += ny * overlap * 0.4;

            n1.vx -= nx * 0.04;
            n1.vy -= ny * 0.04;
            n2.vx += nx * 0.04;
            n2.vy += ny * 0.04;
          }
        }

        // Mouse Gravitational Push / Pull
        if (mousePos.active) {
          const mdx = n1.x - mousePos.x;
          const mdy = n1.y - mousePos.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 170 && mdist > 0) {
            const force = (1 - mdist / 170) * 14;
            n1.x += (mdx / mdist) * force;
            n1.y += (mdy / mdist) * force;
          }
        }
      }

      // ─── 3. Draw Dynamic Spider Silk Web Connectors Between Neighboring Skills ───
      for (let i = 0; i < filtered.length; i++) {
        for (let j = i + 1; j < filtered.length; j++) {
          const dx = filtered[i].x - filtered[j].x;
          const dy = filtered[i].y - filtered[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < (isMobile ? 120 : 180)) {
            const alpha = (1 - dist / (isMobile ? 120 : 180)) * (isLight ? 0.35 : 0.26);
            ctx.beginPath();
            ctx.moveTo(filtered[i].x, filtered[i].y);
            
            const midX = (filtered[i].x + filtered[j].x) / 2;
            const midY = (filtered[i].y + filtered[j].y) / 2 + Math.sin(time * 2 + i) * 3;
            ctx.quadraticCurveTo(midX, midY, filtered[j].x, filtered[j].y);
            
            ctx.strokeStyle = `rgba(${webBaseColor}, ${alpha})`;
            ctx.lineWidth = alpha * 1.8;
            ctx.stroke();
          }
        }
      }

      // ─── 4. SPIDER-MAN REAL WEB SHOOTING (To 3 Closest Skills) ───
      if (mousePos.active) {
        const sorted = [...filtered]
          .map((n) => {
            const dx = mousePos.x - n.x;
            const dy = mousePos.y - n.y;
            return { node: n, dist: Math.sqrt(dx * dx + dy * dy) };
          })
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 3);

        sorted.forEach(({ node, dist }, idx) => {
          if (dist < 260) {
            const alpha = (1 - dist / 260) * 0.95;
            ctx.beginPath();
            ctx.moveTo(mousePos.x, mousePos.y);

            const midX = (mousePos.x + node.x) / 2 + Math.sin(time * 16 + idx) * 4;
            const midY = (mousePos.y + node.y) / 2 + Math.cos(time * 16 + idx) * 4;
            ctx.quadraticCurveTo(midX, midY, node.x, node.y);

            ctx.strokeStyle = idx === 0
              ? (isLight ? "rgba(22, 163, 74, 0.9)" : "rgba(30, 215, 96, 0.95)")
              : "rgba(225, 29, 72, 0.75)";
            ctx.lineWidth = alpha * (idx === 0 ? 2.8 : 1.6);
            ctx.shadowBlur = 12;
            ctx.shadowColor = idx === 0 ? "#1ed760" : "#e11d48";
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Traveling Photon Pulse
            const pulse = (time * 2.5 + idx * 0.4) % 1;
            const px = mousePos.x + (node.x - mousePos.x) * pulse;
            const py = mousePos.y + (node.y - mousePos.y) * pulse;

            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.shadowBlur = 8;
            ctx.shadowColor = "#ffffff";
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });
      }

      // ─── 5. Draw Ultra-Premium Frosted Glass Moving Badges (Linear / Apple Pro Tier) ───
      filtered.forEach((node) => {
        const isHovered = hoveredSkill === node.name;
        const px = node.x - node.width / 2;
        const py = node.y - node.height / 2;
        const radius = 18;

        ctx.save();

        // 1. Ambient Glow Drop Shadow (Skipped on mobile for 120fps native performance)
        if (!isMobile) {
          if (isHovered) {
            ctx.shadowBlur = isLight ? 18 : 28;
            ctx.shadowColor = node.color;
          } else {
            ctx.shadowBlur = isLight ? 8 : 14;
            ctx.shadowColor = isLight ? "rgba(15, 23, 42, 0.08)" : "rgba(0, 0, 0, 0.6)";
          }
        }

        // 2. High-End Glass Pill Body Fill
        ctx.beginPath();
        ctx.roundRect(px, py, node.width, node.height, radius);

        const grad = ctx.createLinearGradient(px, py, px, py + node.height);
        if (isLight) {
          grad.addColorStop(0, isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.98)");
          grad.addColorStop(1, isHovered ? "#f8fafc" : "rgba(241, 245, 249, 0.94)");
        } else {
          grad.addColorStop(0, isHovered ? "rgba(26, 26, 36, 0.95)" : "rgba(16, 16, 24, 0.88)");
          grad.addColorStop(1, isHovered ? "rgba(18, 18, 26, 0.95)" : "rgba(10, 10, 16, 0.88)");
        }
        ctx.fillStyle = grad;
        ctx.fill();

        // 3. Subtle Glass Reflection Bevel (Top rim highlight)
        ctx.beginPath();
        ctx.roundRect(px + 1, py + 1, node.width - 2, (node.height / 2) - 1, [radius - 1, radius - 1, 0, 0]);
        ctx.fillStyle = isLight ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 255, 255, 0.06)";
        ctx.fill();

        // 4. Border Stroke
        ctx.beginPath();
        ctx.roundRect(px, py, node.width, node.height, radius);
        ctx.lineWidth = isHovered ? 2 : 1.2;
        ctx.strokeStyle = isHovered 
          ? node.color 
          : (isLight ? "rgba(203, 213, 225, 0.95)" : "rgba(255, 255, 255, 0.12)");
        ctx.stroke();
        ctx.shadowBlur = 0;

        // 5. Category Indicator Dot
        ctx.beginPath();
        ctx.arc(px + 16, node.y, isHovered ? 4.5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        if (!isMobile && isHovered) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = node.color;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // 6. Pro Typography (High-contrast, crystal crisp)
        ctx.font = `600 ${isMobile ? "12px" : "13px"} 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`;
        ctx.fillStyle = isHovered 
          ? (isLight ? "#0f172a" : "#ffffff") 
          : (isLight ? "#1e293b" : "#e2e8f0");
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(node.name, px + 28, node.y);

        ctx.restore();
      });

      // ─── 6. Shockwaves ───
      shockwaves.forEach((bomb, index) => {
        bomb.radius += 6;
        const progress = bomb.radius / bomb.maxRadius;
        const alpha = (1 - progress) * 0.75;

        ctx.beginPath();
        ctx.arc(bomb.x, bomb.y, bomb.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(30, 215, 96, ${alpha})`;
        ctx.lineWidth = 2.5 * (1 - progress);
        ctx.stroke();

        for (let a = 0; a < 8; a++) {
          const ang = a * (Math.PI / 4);
          ctx.beginPath();
          ctx.moveTo(bomb.x, bomb.y);
          ctx.lineTo(bomb.x + Math.cos(ang) * bomb.radius, bomb.y + Math.sin(ang) * bomb.radius);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        if (bomb.radius >= bomb.maxRadius) {
          shockwaves.splice(index, 1);
        }
      });

      // ─── 7. Floating Combat Texts ───
      ctx.save();
      for (let i = gameState.current.floatingTexts.length - 1; i >= 0; i--) {
        const ft = gameState.current.floatingTexts[i];
        ft.y -= 1.5; // Float upwards
        ft.life -= 0.02; // Fade out
        
        if (ft.life <= 0) {
          gameState.current.floatingTexts.splice(i, 1);
          continue;
        }
        
        ctx.font = "900 18px monospace";
        ctx.fillStyle = `rgba(${ft.isCombo ? '255, 215, 0' : '30, 215, 96'}, ${ft.life})`;
        ctx.textAlign = "center";
        
        if (ft.isCombo) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = `rgba(255, 215, 0, ${ft.life})`;
        }
        
        ctx.fillText(ft.text, ft.x, ft.y);
      }
      ctx.restore();

      // ─── 8. Game HUD & Overlay ───
      if (gameState.current.mode !== 'idle') {
        ctx.save();
        
        // Wave Banner (Top Center)
        if (gameState.current.mode === 'playing') {
          ctx.beginPath();
          ctx.roundRect(width / 2 - 150, 20, 300, 40, 20);
          ctx.fillStyle = "rgba(10, 10, 16, 0.85)";
          ctx.strokeStyle = "rgba(30, 215, 96, 0.6)";
          ctx.lineWidth = 2;
          ctx.fill();
          ctx.stroke();

          ctx.font = "800 14px monospace";
          ctx.fillStyle = "#1ed760";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const waveTitle = CATEGORIES[gameState.current.currentWave]?.title || "UNKNOWN";
          ctx.fillText(`WAVE ${gameState.current.currentWave + 1}/6: ${waveTitle.toUpperCase()}`, width / 2, 40);
        }

        // HUD Background (Top Right)
        ctx.beginPath();
        ctx.roundRect(width - 160, 20, 140, 60, 12);
        ctx.fillStyle = "rgba(10, 10, 16, 0.85)";
        ctx.strokeStyle = "rgba(225, 29, 72, 0.4)";
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
        
        // HUD Text
        ctx.font = "800 12px monospace";
        ctx.fillStyle = "#ff3366";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(`SCORE: ${gameState.current.score}`, width - 145, 40);
        ctx.fillStyle = "#1ed760";
        ctx.fillText(`TIME:  ${gameState.current.timeLeft}s`, width - 145, 60);

        // Combo HUD
        if (gameState.current.combo > 1) {
          const comboScale = 1 + (gameState.current.combo * 0.1);
          ctx.save();
          ctx.translate(width - 90, 105);
          ctx.scale(comboScale, comboScale);
          ctx.font = "900 18px monospace";
          ctx.fillStyle = "#FFD700";
          ctx.textAlign = "center";
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#FFD700";
          ctx.fillText(`${gameState.current.combo}x COMBO!`, 0, 0);
          ctx.restore();
        }
        
        // Overlays handled by React component now.
        
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [playgroundNodes, activeCategory, hoveredSkill, mousePos, shockwaves, isMobile]);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y, active: true });

    let found = null;
    playgroundNodes.forEach((node) => {
      if (gameState.current.mode === 'playing') {
        if (node.category !== CATEGORIES[gameState.current.currentWave]?.title || gameState.current.caughtNodes.has(node.id)) return;
      } else if (activeCategory !== "ALL" && node.category !== activeCategory) {
        return;
      }

      if (
        x >= node.x - node.width / 2 &&
        x <= node.x + node.width / 2 &&
        y >= node.y - node.height / 2 &&
        y <= node.y + node.height / 2
      ) {
        found = node.name;
      }
    });
    setHoveredSkill(found);
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let clickedNode = null;
    playgroundNodes.forEach((node) => {
      if (gameState.current.mode === 'playing') {
        if (node.category !== CATEGORIES[gameState.current.currentWave]?.title || gameState.current.caughtNodes.has(node.id)) return;
      } else if (activeCategory !== "ALL" && node.category !== activeCategory) {
        return;
      }

      if (
        x >= node.x - node.width / 2 &&
        x <= node.x + node.width / 2 &&
        y >= node.y - node.height / 2 &&
        y <= node.y + node.height / 2
      ) {
        clickedNode = node;
      }
    });

    if (clickedNode) {
      if (gameState.current.mode === 'playing') {
        // Make sure node is from current wave and uncaught
        const isCurrentWave = clickedNode.category === CATEGORIES[gameState.current.currentWave]?.title;
        if (isCurrentWave && !gameState.current.caughtNodes.has(clickedNode.id)) {
          // Calculate Combo
          const now = performance.now();
          if (now - gameState.current.lastCatchTime <= 2500 && gameState.current.lastCatchTime > 0) {
            gameState.current.combo += 1;
          } else {
            gameState.current.combo = 1;
          }
          gameState.current.lastCatchTime = now;

          // Screen Shake & Points
          gameState.current.screenShake = 12 + (gameState.current.combo * 2); // Max shake
          const points = 100 * gameState.current.combo;
          gameState.current.score += points;
          gameState.current.caughtNodes.add(clickedNode.id);
          
          // Spawn Floating Text
          gameState.current.floatingTexts.push({
            text: `+${points}`,
            x: clickedNode.x,
            y: clickedNode.y,
            life: 1.0,
            isCombo: gameState.current.combo > 1
          });

          setShockwaves((prev) => [...prev, { x: clickedNode.x, y: clickedNode.y, radius: 10, maxRadius: 150 }]);
        }
      } else {
        draggedNodeRef.current = clickedNode;
      }
    }
  };

  const handleMouseUp = () => {
    if (draggedNodeRef.current) {
      draggedNodeRef.current.vx = (Math.random() - 0.5) * 1.5;
      draggedNodeRef.current.vy = (Math.random() - 0.5) * 1.5;
      draggedNodeRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, active: false }));
    setHoveredSkill(null);
    draggedNodeRef.current = null;
  };

  const handleClick = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setShockwaves((prev) => [...prev, { x, y, radius: 10, maxRadius: 240 }]);

    playgroundNodes.forEach((node) => {
      const dx = node.x - x;
      const dy = node.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200 && dist > 0) {
        const force = (1 - dist / 200) * 3;
        node.vx += (dx / dist) * force;
        node.vy += (dy / dist) * force;
      }
    });
  };

  return (
    <div className="spider-playground-wrapper" ref={containerRef}>
      {/* Spider-Man Avatar Following Cursor */}
      <SpiderManHeroAvatar mousePos={mousePos} isHoveringNode={Boolean(hoveredSkill)} />

      <canvas
        ref={canvasRef}
        className="spider-playground-canvas"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GAME LEADERBOARD OVERLAY
   ═══════════════════════════════════════════════════════════════ */
function LeaderboardOverlay({ gameData, onPlayAgain }) {
  const mockLeaderboard = useMemo(() => [
    { name: "SpiderDev_99", score: 18400 },
    { name: "WebSlingerX", score: 14200 },
    { name: "DocOck_Hack", score: 11100 },
    { name: "GwenStacy", score: 8500 },
    { name: "MilesM_Code", score: 4200 }
  ], []);

  const [leaderboard, setLeaderboard] = useState([]);
  const [percentile, setPercentile] = useState(0);

  useEffect(() => {
    const combined = [...mockLeaderboard, { name: "YOU", score: gameData.totalScore, isUser: true }];
    combined.sort((a, b) => b.score - a.score);
    setLeaderboard(combined);
    
    // Percentile logic: Top X% = (Rank / Total Players) * 100
    // We assume there are 50,000 global players. We estimate percentile.
    const rank = combined.findIndex(p => p.isUser) + 1;
    // Simple mock logic:
    if (gameData.totalScore > 15000) setPercentile(1);
    else if (gameData.totalScore > 10000) setPercentile(12);
    else if (gameData.totalScore > 5000) setPercentile(34);
    else setPercentile(68);
  }, [gameData, mockLeaderboard]);

  return (
    <motion.div 
      className="game-leaderboard-overlay"
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
      style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(10, 10, 16, 0.75)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        zIndex: 100,
        borderRadius: '24px'
      }}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        style={{
          background: 'rgba(20, 20, 25, 0.9)',
          border: `1px solid ${gameData.status === 'won' ? '#1ed760' : '#ff3366'}`,
          borderRadius: '16px',
          padding: '2rem',
          width: '90%', maxWidth: '500px',
          boxShadow: `0 0 40px ${gameData.status === 'won' ? 'rgba(30,215,96,0.2)' : 'rgba(255,51,102,0.2)'}`
        }}
      >
        <h2 style={{ color: gameData.status === 'won' ? '#1ed760' : '#ff3366', textAlign: 'center', fontSize: '2rem', margin: '0 0 1rem 0' }}>
          {gameData.status === 'won' ? "MATRIX SECURED" : "TIME EXPIRED"}
        </h2>
        
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', marginBottom: '0.5rem' }}>
            <span>Base Score (Nodes Caught):</span>
            <span style={{ color: '#fff' }}>{gameData.baseScore}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', marginBottom: '0.5rem' }}>
            <span>Time Bonus ({gameData.timeRemaining}s left x 1000):</span>
            <span style={{ color: '#1ed760' }}>+{gameData.timeBonus}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <span>FINAL SCORE:</span>
            <span>{gameData.totalScore}</span>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span style={{ background: 'linear-gradient(90deg, #FFD700, #FFA500)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '900', fontSize: '1.5rem' }}>
            TOP {percentile}% GLOBAL RANK
          </span>
        </div>

        <h3 style={{ color: '#fff', fontSize: '1rem', margin: '0 0 1rem 0' }}>GLOBAL LEADERBOARD</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
          {leaderboard.map((player, idx) => (
            <div key={idx} style={{ 
              display: 'flex', justifyContent: 'space-between', 
              padding: '0.5rem 1rem', 
              background: player.isUser ? 'rgba(225, 29, 72, 0.2)' : 'transparent',
              border: player.isUser ? '1px solid rgba(225, 29, 72, 0.5)' : '1px solid rgba(255,255,255,0.05)',
              borderRadius: '6px',
              color: player.isUser ? '#ff3366' : '#aaa',
              fontWeight: player.isUser ? 'bold' : 'normal'
            }}>
              <span>{idx + 1}. {player.name}</span>
              <span>{player.score}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={onPlayAgain}
          style={{
            width: '100%', padding: '1rem',
            background: 'rgba(255,255,255,0.1)', color: '#fff',
            border: 'none', borderRadius: '8px', cursor: 'pointer',
            fontWeight: 'bold', transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.2)'}
          onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
        >
          PLAY AGAIN
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CARD GRID SKILL PILL (For Card Matrix Tab)
   ═══════════════════════════════════════════════════════════════ */
function SpiderGridPill({ skillName, color }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className={`spider-badge-wrap ${isHovered ? "active" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
    >
      <div 
        className="spider-badge-pill"
        style={{
          "--badge-accent": color,
        }}
      >
        <span className="spider-badge-dot" style={{ backgroundColor: color }} />
        <span className="spider-badge-name">{skillName}</span>
        {isHovered && <span className="spider-badge-shimmer" />}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN SKILLS SECTION COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function Skills() {
  const isMobile = useIsMobile();
  // Default to ALL categories on both desktop and mobile as requested
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // 'playground' | 'grid'
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000, active: false });
  const [shockwaves, setShockwaves] = useState([]);
  const [gameActiveTrigger, setGameActiveTrigger] = useState(0); // Increments to start game
  const [gameEndData, setGameEndData] = useState(null); // Holds final score data when game over
  const sectionRef = useRef(null);

  const totalSkillsCount = useMemo(() => {
    return SKILLS.reduce((acc, g) => acc + g.items.length, 0);
  }, []);

  const categories = ["ALL", ...SKILLS.map((s) => s.category)];

  const filteredSkills = useMemo(() => {
    if (activeCategory === "ALL") return SKILLS;
    return SKILLS.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="skills" className="spider-skills-section" ref={sectionRef}>
      {/* Ambient Multi-Spectrum Background Light Flares */}
      <div className="spider-bg-nebula" aria-hidden="true" />

      <div className="wrap spider-skills-wrap">
        {/* Section Head */}
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="kicker">./skills --spider-playground-v2.4</div>
          <h2 className="section-title">Spider-Man Web Tech Matrix.</h2>
          <p className="section-desc">
            An open interactive web playground — skills continuously glide and drift through the spider-web space. Hover or click to shoot elastic cyber-webs and fling nodes across the canvas.
          </p>

          {/* Interactive Top Control HUD with Mode Tabs */}
          <div className="spider-top-hud">
            <div className="spider-hud-status">
              <span className="spider-hud-pulse" />
              <span>🕷️ SPIDER-SENSE ENGAGED • THWIP WEBSHOOTER ACTIVE</span>
            </div>

            {/* View Mode Tabs */}
            <div className="spider-view-toggle">
              <button
                className={`spider-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                title="Structured Category Cards"
              >
                <Grid size={13} />
                <span>⚡ Card Matrix</span>
              </button>
              <button
                className={`spider-toggle-btn spider-playground-btn-highlight ${viewMode === "playground" ? "active" : ""}`}
                onClick={() => {
                  setViewMode("playground");
                  setGameActiveTrigger(prev => prev + 1);
                }}
                title="Play Spider Playground!"
              >
                <Crosshair size={13} />
                <span>🎯 SPIDER PLAYGROUND</span>
              </button>
            </div>
          </div>

          {/* Category Filter Matrix Tabs (Only shown in Card Matrix mode) */}
          {viewMode === "grid" && (
            <div className="spider-fluid-legend" style={{ marginTop: '20px', marginBottom: '28px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div 
                className={`spider-legend-pill ${activeCategory === "ALL" ? "active" : "dimmed"}`}
                onClick={() => setActiveCategory("ALL")}
              >
                <span className="spider-legend-dot" style={{ backgroundColor: "#ffffff" }} />
                <span>⚡ All Skills ({totalSkillsCount})</span>
              </div>
              {CATEGORIES.map((cat) => (
                <div 
                  key={cat.id} 
                  className={`spider-legend-pill ${activeCategory === cat.title ? "active" : (activeCategory === "ALL" ? "active" : "dimmed")}`}
                  onClick={() => setActiveCategory(cat.title)}
                >
                  <span className="spider-legend-dot" style={{ backgroundColor: cat.color }} />
                  <span>{cat.title}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* ─── TAB 1: Big Borderless Moving Web Playground ─── */}
        {viewMode === "playground" && (
          <motion.div 
            className="spider-playground-view-container"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ position: 'relative' }}
          >
            <SpiderPlaygroundCanvas
              activeCategory={activeCategory}
              hoveredSkill={hoveredSkill}
              setHoveredSkill={setHoveredSkill}
              mousePos={mousePos}
              setMousePos={setMousePos}
              shockwaves={shockwaves}
              setShockwaves={setShockwaves}
              gameActiveTrigger={gameActiveTrigger}
              onGameOver={(data) => setGameEndData(data)}
            />

            {gameEndData && (
              <LeaderboardOverlay 
                gameData={gameEndData} 
                onPlayAgain={() => {
                  setGameEndData(null);
                  setGameActiveTrigger(prev => prev + 1);
                }} 
              />
            )}


          </motion.div>
        )}

        {/* ─── TAB 2: Structured Card Matrix Design ─── */}
        {viewMode === "grid" && (
          <motion.div 
            className="spider-web-cards-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {filteredSkills.map((group, groupIdx) => {
              const catInfo = CATEGORIES.find((c) => c.title === group.category) || CATEGORIES[groupIdx % 6];
              const Icon = catInfo.icon || Cpu;

              return (
                <motion.div
                  key={group.category}
                  className="spider-web-card"
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -20 }}
                  transition={{ duration: 0.35, delay: groupIdx * 0.05 }}
                  layout
                >
                  {/* Card Web Arc Background */}
                  <div className="spider-card-web-bg" aria-hidden="true">
                    <svg viewBox="0 0 100 100" className="spider-card-web-svg">
                      <path d="M 0,0 Q 50,20 100,0 M 0,30 Q 50,50 100,30 M 0,60 Q 50,80 100,60 M 0,0 L 50,100 L 100,0" stroke={catInfo.color} strokeWidth="0.5" fill="none" opacity="0.15" />
                    </svg>
                  </div>

                  <div className="spider-card-header">
                    <div 
                      className="spider-card-icon-box"
                      style={{ color: catInfo.color, borderColor: `${catInfo.color}40` }}
                    >
                      <Icon size={18} />
                    </div>
                    <div className="spider-card-title-group">
                      <h3 className="spider-card-title">{group.category}</h3>
                      <span className="spider-card-count">{group.items.length} web anchors</span>
                    </div>
                  </div>

                  {/* Badges Cluster */}
                  <div className="spider-card-badges-wrap">
                    {group.items.map((item) => (
                      <SpiderGridPill
                        key={item}
                        skillName={item}
                        color={catInfo.color}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Live Latch Feedback */}
        {hoveredSkill && (
          <motion.div 
            className="spider-active-latch-bar"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="spider-latch-icon">🕷️</span>
            <span>Spider-Silk Latched: <strong>{hoveredSkill}</strong> • Connected via High-Frequency Web Fiber</span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
