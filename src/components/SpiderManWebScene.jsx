import { useEffect, useState } from "react";
import "./SpiderManWebScene.css";

/**
 * ══════════════════════════════════════════════════════════════════
 * 🕷️ LIGHTWEIGHT CRASH-PROOF VECTOR SPIDER-MAN WEB SCENE
 * ══════════════════════════════════════════════════════════════════
 * 
 * High-performance, GPU-safe SVG web strands with zero canvas
 * memory churn. 100% crash-proof on mobile phones & tablets.
 */
export default function SpiderManWebScene({ triggerWebShot }) {
  const [activeWebs, setActiveWebs] = useState([
    { id: 1, x1: 50, y1: 0, x2: 15, y2: 45, color: "#38bdf8" },
    { id: 2, x1: 50, y1: 0, x2: 85, y2: 55, color: "#ef4444" },
  ]);
  const [thwipBadge, setThwipBadge] = useState(null);

  // Trigger brief web shot upon user interaction
  useEffect(() => {
    if (triggerWebShot) {
      const newWeb = {
        id: Date.now(),
        x1: 50,
        y1: 0,
        x2: Math.min(92, Math.max(8, (triggerWebShot.x / (window.innerWidth || 360)) * 100)),
        y2: Math.min(85, Math.max(30, (triggerWebShot.y / 600) * 100)),
        color: "#1ed760",
      };

      setActiveWebs((prev) => [...prev.slice(-3), newWeb]);
      setThwipBadge({ x: newWeb.x2, y: newWeb.y2 });

      const timer = setTimeout(() => {
        setThwipBadge(null);
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [triggerWebShot]);

  return (
    <div className="spiderman-vector-scene">
      {/* Spider-Man Ceiling Anchor & Web Geometry */}
      <svg className="spider-web-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="webLineGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="webLineGradRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="webLineGradGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1ed760" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#1ed760" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Corner Web Lattice */}
        <path d="M0 0 L25 0 L0 25 Z" fill="rgba(239, 68, 68, 0.04)" />
        <path d="M0 0 L18 0 Q10 10 0 18 Z" fill="none" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="0.5" />
        <path d="M0 0 L28 0 Q16 16 0 28 Z" fill="none" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="0.5" />

        <path d="M100 0 L75 0 L100 25 Z" fill="rgba(56, 189, 248, 0.04)" />
        <path d="M100 0 L82 0 Q90 10 100 18 Z" fill="none" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="0.5" />
        <path d="M100 0 L72 0 Q84 16 100 28 Z" fill="none" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="0.5" />

        {/* Dynamic Web Shoots */}
        {activeWebs.map((w) => (
          <g key={w.id} className="active-web-group">
            <line
              x1={`${w.x1}%`}
              y1={`${w.y1}%`}
              x2={`${w.x2}%`}
              y2={`${w.y2}%`}
              stroke={w.color === "#1ed760" ? "url(#webLineGradGreen)" : w.color === "#ef4444" ? "url(#webLineGradRed)" : "url(#webLineGradCyan)"}
              strokeWidth="0.8"
              strokeDasharray="2 1"
              className="web-laser-line"
            />
            {/* Impact Anchor Dot */}
            <circle cx={`${w.x2}%`} cy={`${w.y2}%`} r="1.2" fill={w.color} className="web-impact-dot" />
            <circle cx={`${w.x2}%`} cy={`${w.y2}%`} r="3" fill="none" stroke={w.color} strokeWidth="0.4" opacity="0.6" />
          </g>
        ))}
      </svg>

      {/* Spider-Man Hanging Mask Mascot */}
      <div className="spider-hanging-mascot">
        <div className="mascot-web-rope" />
        <div className="mascot-mask-wrap">
          <svg viewBox="0 0 100 100" className="mini-spidey-svg">
            <path
              d="M50 10 C30 10, 18 28, 20 54 C22 74, 38 90, 50 92 C62 90, 78 74, 80 54 C82 28, 70 10, 50 10 Z"
              fill="#ef4444"
              stroke="#0a0a0e"
              strokeWidth="2.5"
            />
            <path d="M50 10 L50 92" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2" />
            <path d="M50 50 L20 54" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2" />
            <path d="M50 50 L80 54" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2" />
            <path d="M44 42 Q25 44, 25 54 Q32 64, 44 60 Z" fill="#ffffff" stroke="#09090b" strokeWidth="1.2" />
            <path d="M56 42 Q75 44, 75 54 Q68 64, 56 60 Z" fill="#ffffff" stroke="#09090b" strokeWidth="1.2" />
          </svg>
        </div>
      </div>

      {/* THWIP! Pop badge */}
      {thwipBadge && (
        <span 
          className="vector-thwip-badge"
          style={{ left: `${thwipBadge.x}%`, top: `${thwipBadge.y}%` }}
        >
          THWIP! 🕸️
        </span>
      )}
    </div>
  );
}
