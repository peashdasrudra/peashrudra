import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Calendar, ShieldCheck, Crown, BadgeCheck, Zap } from "lucide-react";
import { useTypingEffect } from "../hooks/useTypingEffect";
import { PROFILE, TERMINAL_LINES, HUBSPOT_BADGES } from "../data/portfolio";
import "./Hero.css";

function CountUp({ end, suffix = "", prefix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);
  return <>{prefix}{count}{suffix}</>;
}

function Terminal() {
  const bodyRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1); // 1x or 2x
  const [copied, setCopied] = useState(false);
  const [activeHoverLine, setActiveHoverLine] = useState(null);
  const lineIndex = useRef(0);
  const charIndex = useRef(0);
  const timeoutRef = useRef(null);

  // 3D Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const typeLine = useCallback(() => {
    if (isPaused) return;

    if (lineIndex.current >= TERMINAL_LINES.length) {
      timeoutRef.current = setTimeout(() => {
        setLines([]);
        lineIndex.current = 0;
        charIndex.current = 0;
        typeLine();
      }, 2200 / speed);
      return;
    }

    const current = TERMINAL_LINES[lineIndex.current];

    if (charIndex.current === 0) {
      setLines((prev) => [
        ...prev,
        { 
          prompt: current.prompt, 
          text: "", 
          type: current.type,
          timestamp: new Date().toTimeString().slice(0, 8),
        },
      ]);
    }

    if (charIndex.current <= current.text.length) {
      setLines((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          text: current.text.slice(0, charIndex.current),
        };
        return updated;
      });
      charIndex.current++;
      timeoutRef.current = setTimeout(typeLine, 16 / speed);
    } else {
      charIndex.current = 0;
      lineIndex.current++;
      timeoutRef.current = setTimeout(typeLine, 400 / speed);
    }
  }, [isPaused, speed]);

  useEffect(() => {
    if (!isPaused) {
      typeLine();
    }
    return () => clearTimeout(timeoutRef.current);
  }, [typeLine, isPaused]);

  const handleRestart = (e) => {
    e.stopPropagation();
    clearTimeout(timeoutRef.current);
    setLines([]);
    lineIndex.current = 0;
    charIndex.current = 0;
    setIsPaused(false);
    setTimeout(typeLine, 100);
  };

  const handleTogglePause = (e) => {
    e.stopPropagation();
    setIsPaused((prev) => !prev);
  };

  const handleToggleSpeed = (e) => {
    e.stopPropagation();
    setSpeed((prev) => (prev === 1 ? 2 : 1));
  };

  const handleCopy = (e) => {
    e.stopPropagation();
    const fullLog = lines.map((l) => `${l.prompt} ${l.text}`).join("\n");
    navigator.clipboard?.writeText(fullLog);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="terminal-3d-wrapper"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="terminal">
        {/* Terminal Header Bar */}
        <div className="term-bar">
          <div className="term-traffic-lights">
            <span className="tl r" onClick={handleRestart} title="Restart Stream" />
            <span className="tl y" onClick={handleTogglePause} title={isPaused ? "Resume" : "Pause"} />
            <span className="tl g" onClick={handleToggleSpeed} title={`Speed: ${speed}x`} />
          </div>

          <div className="term-title-wrap">
            <span className={`term-live-beacon ${isPaused ? "paused" : ""}`} />
            <span className="term-title">automation.log — {isPaused ? "PAUSED" : "LIVE"}</span>
          </div>

          {/* Interactive Controls */}
          <div className="term-controls">
            <button 
              className={`term-btn ${speed === 2 ? "active" : ""}`} 
              onClick={handleToggleSpeed} 
              title="Toggle 2x Execution Speed"
            >
              {speed}x
            </button>
            <button 
              className="term-btn" 
              onClick={handleTogglePause} 
              title={isPaused ? "Resume Stream" : "Pause Stream"}
            >
              {isPaused ? "▶" : "⏸"}
            </button>
            <button 
              className="term-btn" 
              onClick={handleRestart} 
              title="Rerun Log Stream"
            >
              ↺
            </button>
            <button 
              className={`term-btn ${copied ? "copied" : ""}`} 
              onClick={handleCopy} 
              title="Copy Output"
            >
              {copied ? "✓ Copied" : "Copy"}
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="term-body" ref={bodyRef}>
          {/* Animated Laser Scanline */}
          <div className="term-scanline" aria-hidden="true" />

          {/* Ghost layer: renders all lines invisibly to pre-allocate exact height without CLS */}
          <div className="term-ghost" aria-hidden="true">
            {TERMINAL_LINES.map((line, i) => (
              <div key={i} className="term-line">
                <span className="prompt">{line.prompt}</span>
                <span className={line.type === "ok" ? "ok" : "meta"}>
                  {line.text}
                </span>
              </div>
            ))}
          </div>

          {/* Active typing layer */}
          <div className="term-active">
            {lines.map((line, i) => (
              <div 
                key={i} 
                className={`term-line interactive-row ${activeHoverLine === i ? "hovered" : ""}`}
                onMouseEnter={() => setActiveHoverLine(i)}
                onMouseLeave={() => setActiveHoverLine(null)}
              >
                <span className="term-row-time">{line.timestamp || "00:00:00"}</span>
                <span className="prompt">{line.prompt}</span>
                <span className={line.type === "ok" ? "ok" : "meta"}>
                  {line.text}
                </span>
                {i === lines.length - 1 && !isPaused && <span className="cursor-blink" />}
              </div>
            ))}
          </div>
        </div>

        {/* Live Telemetry Footer Bar */}
        <div className="term-footer">
          <div className="term-stat">
            <span className="stat-dot green" />
            <span>RTT: <strong>11ms</strong></span>
          </div>
          <div className="term-stat">
            <span>MEM: <strong>42MB</strong></span>
          </div>
          <div className="term-stat">
            <span>PIPELINE: <strong className="text-green">HEALTHY</strong></span>
          </div>
        </div>
      </div>
      <div className="terminal-glow" />
    </motion.div>
  );
}

export default function Hero() {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  const typedRole = useTypingEffect(PROFILE.roles, {
    typeSpeed: 70,
    deleteSpeed: 35,
    pauseTime: 2200,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { 
        staggerChildren: isMobile ? 0.04 : 0.12, 
        delayChildren: isMobile ? 0.05 : 0.1 
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: isMobile ? 10 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: isMobile ? 0.3 : 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="hero">
      <motion.div
        className="hero-top-row"
        initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: isMobile ? 0.3 : 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <a href="#hubspot-certified" className="hero-top-badge badge-highlight">
          <svg className="hero-top-sprocket" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z" />
          </svg>
          <span>HubSpot Certified</span>
          <BadgeCheck size={16} fill="#28c840" color="#0a0a0a" className="verify-tick" />
        </a>

        <div className="eyebrow">
          <span className="pulse" />
          {PROFILE.availability}
        </div>
      </motion.div>

      <div className="hero-grid">
        <motion.div
          className="hero-content"
          variants={container}
          initial="hidden"
          animate="show"
        >

          <motion.h1 className="hero-title" variants={item}>
            I build AI systems that{" "}
            <span className="accent">run your CRM</span> so your team doesn't
            have to.
          </motion.h1>

          <motion.div className="hero-typed" variants={item}>
            <span className="typed-prefix">{'>'} </span>
            <span className="typed-text">{typedRole}</span>
            <span className="typed-cursor">|</span>
          </motion.div>

          <motion.p className="hero-desc" variants={item}>
            I architect <span className="neon-text">Agentic AI systems</span> and <span className="neon-text">automated CRM workflows</span> that eliminate manual tasks and scale revenue. As a <span className="neon-text">HubSpot RevOps Certified</span> specialist, I've shipped <span className="neon-text">20+ production automations</span> for live B2B accounts—turning operational bottlenecks into <span className="neon-text">automated growth engines</span>.
          </motion.p>

          <motion.div className="hero-ctas" variants={item}>
            <motion.a
              href={PROFILE.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary hero-main-cta"
              whileTap={{ scale: 0.95 }}
            >
              <Zap size={15} />
              <span>Book Strategy Call</span>
              <ArrowRight size={14} />
            </motion.a>
            <motion.a
              href="#projects"
              className="btn-outline hero-sec-cta"
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRight size={14} /> <span>See Live Case Studies</span>
            </motion.a>
          </motion.div>

          {/* Live High-End Telemetry HUD Bar */}
          <motion.div className="hero-live-telemetry-hud" variants={item}>
            <div className="telemetry-live-pill">
              <span className="live-radar-dot" />
              <span className="live-radar-text">LIVE REVOPS ENGINE</span>
            </div>
            <div className="telemetry-stat-item">
              <span className="telemetry-val">99.2%</span>
              <span className="telemetry-lbl">Pipeline Uptime</span>
            </div>
            <div className="telemetry-divider" />
            <div className="telemetry-stat-item">
              <span className="telemetry-val">&lt;60s</span>
              <span className="telemetry-lbl">Speed-to-Lead</span>
            </div>
            <div className="telemetry-divider" />
            <div className="telemetry-equalizer">
              <span className="eq-bar bar-1" />
              <span className="eq-bar bar-2" />
              <span className="eq-bar bar-3" />
              <span className="eq-bar bar-4" />
            </div>
          </motion.div>

        </motion.div>

        <div className="hero-right">
          {/* HubSpot Badges moved to the right column */}
          <motion.div className="hero-badges" variants={item}>
            {HUBSPOT_BADGES.map((badge, i) => {
              const isMiddle = i === 1;
              return (
                <motion.a 
                  key={badge.title || `hs-badge-${i}`}
                  href={badge.badgeUrl || LINKS.hubspot.revOps}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Verify ${badge.title} on HubSpot Academy`}
                  className={`hero-custom-badge ${isMiddle ? 'badge-featured' : ''}`}
                  variants={item}
                >
                  <div className="hero-cb-border-glow" />
                  <div className="hero-cb-inner">
                    <div className="hero-cb-top">
                      {isMiddle && <Crown className="badge-crown" size={24} />}
                      <svg className="hero-cb-sprocket" width={isMiddle ? "32" : "24"} height={isMiddle ? "32" : "24"} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z" />
                      </svg>
                    </div>
                    <div className="hero-cb-bottom">
                      <div className="hero-cb-org">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.576 12.28" preserveAspectRatio="xMidYMid" style={{ width: '100%', maxWidth: '108px', height: 'auto', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
                          <path className="hubspot-text-path" d="M.744 4.04h.805v1.79h1.698V4.04h.806v4.4h-.806V6.605H1.55V8.43H.744zM6.604 7a.67.67 0 0 1-.667.667.67.67 0 0 1-.667-.667v-1.9h-.763V7a1.43 1.43 0 0 0 2.86 0v-1.9h-.763V7m2.895-1.868a1.17 1.17 0 0 0-.898.36V4.04h-.766v2.692c0 1.008.73 1.698 1.547 1.698.9 0 1.707-.703 1.707-1.65 0-.935-.735-1.65-1.6-1.65zm.02 2.6c-.52 0-.916-.433-.916-.94s.397-.94.916-.94c.44 0 .837.434.837.94s-.397.94-.837.94zm2.858-2.397c0-.385.257-.507.537-.507.226 0 .525.17.72.38l.5-.586c-.25-.336-.757-.568-1.172-.568-.83 0-1.43.483-1.43 1.283 0 1.484 1.826 1.014 1.826 1.845 0 .256-.25.482-.537.482-.452 0-.6-.22-.806-.452l-.556.574c.354.434.794.654 1.32.654.788 0 1.423-.49 1.423-1.252 0-1.65-1.826-1.136-1.826-1.85m3.843-.236c-.82 0-1.547.7-1.547 1.698v2.7h.766v-1.46c.255.25.52.36.898.36.855 0 1.6-.715 1.6-1.65 0-.947-.798-1.65-1.708-1.65zm.136 2.6c-.52 0-.916-.434-.916-.94s.397-.94.916-.94c.44 0 .837.434.837.94s-.397.94-.837.94zm7.21.043c-.452 0-.58-.195-.58-.495V5.903h.702V5.23h-.702v-.886l-.775.348v2.7c0 .7.476 1.038 1.13 1.038a1.57 1.57 0 0 0 .306-.024l.19-.696-.27.012" />
                          <path fill="var(--hubspot)" d="M21.543 5.942c-.147-.253-.353-.455-.612-.608a1.64 1.64 0 0 0-.619-.214v-.803a.59.59 0 0 0 .365-.555c0-.337-.27-.6-.607-.6a.61.61 0 0 0-.612.61c0 .247.132.46.357.555v.803c-.18.026-.367.082-.538.17l-2.162-1.642c.016-.057.028-.116.028-.178 0-.373-.302-.676-.676-.676s-.675.303-.675.676.302.676.676.676a.67.67 0 0 0 .347-.098l.14.107 1.94 1.398c-.103.094-.198.2-.275.322a1.5 1.5 0 0 0-.25.809v.06c0 .206.04.4.106.585.06.16.145.305.25.437l-.644.646a.52.52 0 0 0-.701.49.52.52 0 0 0 .522.522.52.52 0 0 0 .522-.522c0-.054-.008-.107-.024-.157l.666-.666a1.71 1.71 0 0 0 .296.162 1.73 1.73 0 0 0 .692.145h.046a1.63 1.63 0 0 0 .79-.2c.26-.142.465-.336.62-.583a1.53 1.53 0 0 0 .24-.824v-.015c0-.297-.07-.57-.213-.82zM20.73 7.34c-.18.2-.388.325-.623.325h-.04c-.134 0-.265-.037-.394-.104a.91.91 0 0 1-.345-.314c-.093-.132-.144-.275-.144-.428V6.77c0-.15.03-.292.1-.426a.92.92 0 0 1 .321-.351c.137-.1.282-.134.445-.134h.015a.9.9 0 0 1 .418.096c.134.072.244.17.33.3a.95.95 0 0 1 .147.42l.004.095a.83.83 0 0 1-.236.569z" />
                        </svg>
                      </div>
                      <div className="hero-cb-title">
                        {badge.title.replace("HubSpot ", "")}
                      </div>
                      <div className="hero-cb-name">PEASH DAS RUDRA</div>
                    </div>
                  </div>
                </motion.a>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* Terminal goes below, full width */}
      <div className="hero-bottom-full">
        <Terminal />
      </div>


    </section>
  );
}
