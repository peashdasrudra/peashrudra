import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Cpu, Layers, Radio, Globe, Terminal, RefreshCw } from "lucide-react";
import { SKILLS } from "../data/portfolio";
import { useIsMobile } from "../hooks/useIsMobile";
import "./Skills.css";

// Category color palettes for Spider-Man web lasers & badges
const CATEGORY_THEMES = {
  "AI & Agentic Systems": { color: "#1ed760", glow: "rgba(30, 215, 96, 0.4)", icon: Cpu },
  "Vector DBs & AI Platforms": { color: "#38bdf8", glow: "rgba(56, 189, 248, 0.4)", icon: Layers },
  "CRM & RevOps": { color: "#ff7a59", glow: "rgba(255, 122, 89, 0.4)", icon: Zap },
  "Real Estate Automation": { color: "#f59e0b", glow: "rgba(245, 158, 11, 0.4)", icon: Globe },
  "Frontend & Backend": { color: "#a855f7", glow: "rgba(168, 85, 247, 0.4)", icon: Terminal },
  "Mobile & Cloud": { color: "#06b6d4", glow: "rgba(6, 182, 212, 0.4)", icon: Radio },
};

/* ═══════════════════════════════════════════════════════════════
   SPIDER-MAN NEURAL WEB & WAVE CANVAS
   Interactive harmonic sinusoidal wave + elastic spiderweb strands
   ═══════════════════════════════════════════════════════════════ */
function SpiderWebCanvas({ activeCategory, shockwaves, setShockwaves }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const isMobile = useIsMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Node Count & Spiderweb density
    const nodeCount = isMobile ? 24 : 45;
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        baseX: (width / nodeCount) * i + (Math.random() * 40 - 20),
        baseY: (height * 0.15) + (Math.random() * height * 0.7),
        x: 0,
        y: 0,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 1.5,
        phase: Math.random() * Math.PI * 2,
        frequency: Math.random() * 0.002 + 0.001,
        amplitude: Math.random() * 25 + 15,
        energyPulse: Math.random(),
      });
    }

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Theme detection
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      const webColor = isLight ? "rgba(34, 197, 94, " : "rgba(30, 215, 96, ";
      const webAccentColor = isLight ? "rgba(99, 102, 241, " : "rgba(56, 189, 248, ";

      // Update node positions with harmonic sine waves + spring physics
      nodes.forEach((node, idx) => {
        // Base sine wave motion
        node.baseX += node.vx;
        node.baseY += node.vy;

        // Bounce boundaries
        if (node.baseX < 0 || node.baseX > width) node.vx *= -1;
        if (node.baseY < 0 || node.baseY > height) node.vy *= -1;

        // Wave oscillation
        const waveY = Math.sin(time * node.frequency * 2 + node.phase) * node.amplitude;
        const waveX = Math.cos(time * node.frequency + node.phase) * (node.amplitude * 0.5);

        let targetX = node.baseX + waveX;
        let targetY = node.baseY + waveY;

        // Spiderweb elastic mouse pull
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - targetX;
          const dy = mouseRef.current.y - targetY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxPullDist = isMobile ? 120 : 200;

          if (dist < maxPullDist && dist > 0) {
            const force = (1 - dist / maxPullDist) * 35;
            targetX += (dx / dist) * force;
            targetY += (dy / dist) * force;
          }
        }

        // Apply shockwave ripples
        shockwaves.forEach((sw) => {
          const dx = targetX - sw.x;
          const dy = targetY - sw.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const waveDist = Math.abs(dist - sw.radius);
          if (waveDist < 50) {
            const push = (1 - waveDist / 50) * 15 * (1 - sw.radius / sw.maxRadius);
            targetX += (dx / dist) * push;
            targetY += (dy / dist) * push;
          }
        });

        node.x = targetX;
        node.y = targetY;
      });

      // Draw Spider-Web connecting laser filaments
      const maxConnectDist = isMobile ? 100 : 150;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * (isLight ? 0.35 : 0.28);
            
            // Web Strand Gradient
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            
            // Spider-Man elastic sag curve
            const midX = (nodes[i].x + nodes[j].x) / 2;
            const midY = (nodes[i].y + nodes[j].y) / 2 + Math.sin(time * 0.03 + i) * 3;
            
            ctx.quadraticCurveTo(midX, midY, nodes[j].x, nodes[j].y);
            ctx.strokeStyle = i % 3 === 0 ? `${webAccentColor}${alpha})` : `${webColor}${alpha})`;
            ctx.lineWidth = alpha * 1.5;
            ctx.stroke();

            // Energy pulse dot traveling on web filament
            nodes[i].energyPulse = (nodes[i].energyPulse + 0.004) % 1;
            const pulseX = nodes[i].x + (nodes[j].x - nodes[i].x) * nodes[i].energyPulse;
            const pulseY = nodes[i].y + (nodes[j].y - nodes[i].y) * nodes[i].energyPulse;
            
            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = isLight ? "rgba(22, 163, 74, 0.8)" : "rgba(30, 215, 96, 0.9)";
            ctx.fill();
          }
        }
      }

      // Draw Web Nodes (Glowing Spider Spindles)
      nodes.forEach((node, i) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = i % 4 === 0 
          ? (isLight ? "#6366f1" : "#38bdf8") 
          : (isLight ? "#16a34a" : "#1ed760");
        ctx.shadowBlur = isLight ? 4 : 10;
        ctx.shadowColor = isLight ? "#16a34a" : "#1ed760";
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      });

      // Draw active Shockwaves
      shockwaves.forEach((sw, index) => {
        sw.radius += 4;
        const progress = sw.radius / sw.maxRadius;
        const alpha = (1 - progress) * 0.6;

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(30, 215, 96, ${alpha})`;
        ctx.lineWidth = 2 * (1 - progress);
        ctx.stroke();

        if (sw.radius >= sw.maxRadius) {
          shockwaves.splice(index, 1);
        }
      });

      // Draw elastic laser tether from mouse to closest nodes
      if (mouseRef.current.active) {
        nodes.forEach((node) => {
          const dx = mouseRef.current.x - node.x;
          const dy = mouseRef.current.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.7;
            ctx.beginPath();
            ctx.moveTo(mouseRef.current.x, mouseRef.current.y);
            ctx.lineTo(node.x, node.y);
            ctx.strokeStyle = `rgba(30, 215, 96, ${alpha})`;
            ctx.lineWidth = alpha * 2;
            ctx.stroke();
          }
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [shockwaves, isMobile]);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  const handleClick = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setShockwaves((prev) => [...prev, { x, y, radius: 10, maxRadius: 180 }]);
  };

  return (
    <canvas
      ref={canvasRef}
      className="spiderweb-canvas"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      aria-hidden="true"
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAGNETIC SPIDER-MAN SKILL PILL
   ═══════════════════════════════════════════════════════════════ */
function SpiderSkillPill({ skillName, category, theme, onSpawnShockwave }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 18, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Magnetic pull strength (35%)
    const pullX = (e.clientX - centerX) * 0.35;
    const pullY = (e.clientY - centerY) * 0.35;

    x.set(pullX);
    y.set(pullY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleClick = (e) => {
    if (onSpawnShockwave && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      onSpawnShockwave(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  };

  const themeConfig = CATEGORY_THEMES[category] || { color: "#1ed760", glow: "rgba(30, 215, 96, 0.3)" };

  return (
    <motion.div
      ref={ref}
      className={`spider-pill-wrap ${isHovered ? "active" : ""}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
    >
      <div 
        className="spider-pill"
        style={{
          "--pill-accent": themeConfig.color,
          "--pill-glow": themeConfig.glow,
        }}
      >
        <span className="spider-pill-dot" />
        <span className="spider-pill-text">{skillName}</span>
        {isHovered && <span className="spider-pill-ray" />}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN SKILLS SECTION COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [shockwaves, setShockwaves] = useState([]);
  const containerRef = useRef(null);

  const categories = ["ALL", ...SKILLS.map((s) => s.category)];

  const filteredGroups = selectedCategory === "ALL" 
    ? SKILLS 
    : SKILLS.filter((s) => s.category === selectedCategory);

  const totalSkillsCount = SKILLS.reduce((acc, g) => acc + g.items.length, 0);

  const handleSpawnShockwave = useCallback((clientX, clientY) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setShockwaves((prev) => [...prev, { x, y, radius: 10, maxRadius: 200 }]);
  }, []);

  return (
    <section id="skills" className="spider-skills-section" ref={containerRef}>
      {/* Spider-Man Web Canvas Simulation */}
      <SpiderWebCanvas 
        activeCategory={selectedCategory} 
        shockwaves={shockwaves}
        setShockwaves={setShockwaves}
      />

      <div className="wrap spider-skills-wrap">
        {/* Section Header */}
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="kicker">./skills --spider-matrix</div>
          <h2 className="section-title">Interactive Neural Tech Stack.</h2>
          <p className="section-desc">
            An interconnected spider-web of frameworks, models, and platforms powering end-to-end production systems. Click or hover any node to trigger dynamic web waves.
          </p>

          {/* Interactive Web Status & HUD */}
          <div className="spider-hud-bar">
            <div className="spider-hud-status">
              <span className="spider-hud-pulse" />
              <span>Spider-Web Wave Engine Active</span>
            </div>
            <div className="spider-hud-meta">
              <span>{totalSkillsCount}+ Production Nodes</span>
              <span className="spider-hud-sep">•</span>
              <span>Elastic Force Field ON</span>
            </div>
          </div>

          {/* Category Filter Matrix Tabs */}
          <div className="spider-cat-tabs">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  className={`spider-cat-tab ${isActive ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {isActive && (
                    <motion.div
                      className="spider-cat-pill-bg"
                      layoutId="activeSpiderCatPill"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="spider-cat-label">
                    {cat === "ALL" ? `⚡ All Stack (${totalSkillsCount})` : cat}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Skills Groups & Magnetic Clouds */}
        <motion.div 
          className="spider-groups-container"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredGroups.map((group, i) => {
              const theme = CATEGORY_THEMES[group.category] || { color: "#1ed760" };
              const Icon = theme.icon || Sparkles;

              return (
                <motion.div
                  key={group.category}
                  className="spider-group-card"
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -20 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  layout
                >
                  <div className="spider-group-header">
                    <div 
                      className="spider-group-icon-wrap"
                      style={{ color: theme.color, borderColor: `${theme.color}40` }}
                    >
                      <Icon size={18} />
                    </div>
                    <h3 className="spider-group-title">{group.category}</h3>
                    <span className="spider-group-count">{group.items.length} nodes</span>
                  </div>

                  <div className="spider-group-cluster">
                    {group.items.map((item) => (
                      <SpiderSkillPill
                        key={item}
                        skillName={item}
                        category={group.category}
                        onSpawnShockwave={handleSpawnShockwave}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
