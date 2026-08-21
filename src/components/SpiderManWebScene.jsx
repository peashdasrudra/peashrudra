import { useEffect, useState, useRef } from "react";
import "./SpiderManWebScene.css";

/**
 * ══════════════════════════════════════════════════════════════════
 * 🕷️ REALISTIC ACROBATIC JUMPING SPIDER-MAN & SILK WEBS
 * ══════════════════════════════════════════════════════════════════
 * 
 * Ultra-lightweight, 120fps GPU hardware-accelerated animation.
 * Features:
 *  - Full-body acrobatic Spider-Man avatar (jumping, perching, shooting)
 *  - Realistic branched silk webs with elastic filaments & impact splatters
 *  - Interactive leaps on question clicks & card interactions
 */
export default function SpiderManWebScene({ triggerWebShot }) {
  // Spider-Man Pose State: 'perched-left' | 'jumping' | 'perched-right' | 'shooting'
  const [spideyState, setSpideyState] = useState("perched-left");
  const [spideyPos, setSpideyPos] = useState({ x: 12, y: 8, targetX: 85, targetY: 45 });
  const [webs, setWebs] = useState([
    {
      id: 1,
      startX: 14,
      startY: 12,
      targetX: 88,
      targetY: 20,
      type: "wall-anchor",
    },
    {
      id: 2,
      startX: 14,
      startY: 12,
      targetX: 50,
      targetY: 85,
      type: "silk-tether",
    },
  ]);
  const [splatters, setSplatters] = useState([]);
  const [thwipCue, setThwipCue] = useState(null);
  const timeoutRef = useRef(null);

  // Trigger acrobatic leap and realistic web shoot on user action
  useEffect(() => {
    if (triggerWebShot) {
      const clickX = Math.min(88, Math.max(12, (triggerWebShot.x / (window.innerWidth || 360)) * 100));
      const clickY = Math.min(85, Math.max(25, (triggerWebShot.y / 600) * 100));

      // 1. Enter Jumping Pose
      setSpideyState("jumping");
      const jumpToRight = clickX > 50;

      // 2. Mid-air jump coordinates
      setSpideyPos({
        x: jumpToRight ? 82 : 14,
        y: 10,
        targetX: clickX,
        targetY: clickY,
      });

      // 3. Shoot realistic silk web at apex of leap
      timeoutRef.current = setTimeout(() => {
        setSpideyState("shooting");

        const webId = Date.now();
        const startX = jumpToRight ? 80 : 16;
        const startY = 14;

        setWebs((prev) => [
          ...prev.slice(-2),
          {
            id: webId,
            startX,
            startY,
            targetX: clickX,
            targetY: clickY,
            type: "shot-web",
          },
        ]);

        // Impact web splatter
        setSplatters((prev) => [
          ...prev.slice(-2),
          { id: webId, x: clickX, y: clickY },
        ]);

        // THWIP! visual cue
        setThwipCue({ x: startX, y: startY });

        // 4. Settle into perch
        setTimeout(() => {
          setSpideyState(jumpToRight ? "perched-right" : "perched-left");
          setThwipCue(null);
        }, 600);
      }, 350);

      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
  }, [triggerWebShot]);

  return (
    <div className="realistic-spiderman-scene" aria-hidden="true">
      {/* ─── 1. REALISTIC BRANCHED SILK WEBS LAYER (SVG) ─── */}
      <svg className="silk-webs-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          {/* Silky White/Silver Elastic Gradient */}
          <linearGradient id="silkWebGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#e2e8f0" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.3" />
          </linearGradient>

          {/* Electric Blue Web Filament Glow */}
          <filter id="webGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="0.4" floodColor="#38bdf8" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Ambient Corner Web Geometry */}
        <g className="corner-webs" opacity="0.35">
          <path d="M0 0 L15 0 Q8 8 0 15 Z" fill="none" stroke="#f8fafc" strokeWidth="0.3" />
          <path d="M0 0 L25 0 Q14 14 0 25 Z" fill="none" stroke="#f8fafc" strokeWidth="0.3" />
          <path d="M0 0 L35 0 Q20 20 0 35 Z" fill="none" stroke="#f8fafc" strokeWidth="0.2" />
          <line x1="0" y1="0" x2="35" y2="35" stroke="#f8fafc" strokeWidth="0.3" />

          <path d="M100 0 L85 0 Q92 8 100 15 Z" fill="none" stroke="#f8fafc" strokeWidth="0.3" />
          <path d="M100 0 L75 0 Q86 14 100 25 Z" fill="none" stroke="#f8fafc" strokeWidth="0.3" />
          <path d="M100 0 L65 0 Q80 20 100 35 Z" fill="none" stroke="#f8fafc" strokeWidth="0.2" />
          <line x1="100" y1="0" x2="65" y2="35" stroke="#f8fafc" strokeWidth="0.3" />
        </g>

        {/* Active Dynamic Silk Webs with Realistic Branching */}
        {webs.map((w) => {
          const midX = (w.startX + w.targetX) / 2;
          const midY = (w.startY + w.targetY) / 2;
          // Sag curve for realistic elasticity
          const sagY = midY + 1.8;

          return (
            <g key={w.id} className="web-strand-group">
              {/* Main Tension Cord */}
              <path
                d={`M${w.startX} ${w.startY} Q${midX} ${sagY} ${w.targetX} ${w.targetY}`}
                fill="none"
                stroke="url(#silkWebGrad)"
                strokeWidth="0.45"
                filter="url(#webGlow)"
                className="main-silk-cord"
              />

              {/* Realistic Branching Filaments near Anchor */}
              <path
                d={`M${midX + (w.targetX - midX) * 0.5} ${midY + (w.targetY - midY) * 0.5} Q${w.targetX - 2} ${w.targetY - 3} ${w.targetX - 4} ${w.targetY - 1}`}
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.25"
                opacity="0.8"
              />
              <path
                d={`M${midX + (w.targetX - midX) * 0.6} ${midY + (w.targetY - midY) * 0.6} Q${w.targetX + 3} ${w.targetY - 2} ${w.targetX + 4} ${w.targetY + 2}`}
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.25"
                opacity="0.8"
              />

              {/* Web Anchor Spiral */}
              <circle cx={w.targetX} cy={w.targetY} r="0.8" fill="#ffffff" />
            </g>
          );
        })}

        {/* Impact Web Splatters */}
        {splatters.map((s) => (
          <g key={s.id} className="web-splatter-burst">
            <circle cx={s.x} cy={s.y} r="1.4" fill="#ffffff" opacity="0.9" />
            <circle cx={s.x} cy={s.y} r="3.2" fill="none" stroke="#38bdf8" strokeWidth="0.3" opacity="0.7" />
            <line x1={s.x - 3} y1={s.y - 1} x2={s.x + 3} y2={s.y + 1} stroke="#ffffff" strokeWidth="0.25" />
            <line x1={s.x - 1} y1={s.y - 3} x2={s.x + 1} y2={s.y + 3} stroke="#ffffff" strokeWidth="0.25" />
          </g>
        ))}
      </svg>

      {/* ─── 2. DETAILED ACROBATIC JUMPING SPIDER-MAN AVATAR ─── */}
      <div 
        className={`spiderman-acrobat-avatar ${spideyState}`}
        style={{
          left: `${spideyPos.x}%`,
          top: `${spideyPos.y}%`,
        }}
      >
        {/* Hanging Silk Tether from Ceiling */}
        <div className="avatar-tether-rope" />

        {/* Detailed Vector Spider-Man Character */}
        <div className="spiderman-character-body">
          <svg viewBox="0 0 120 140" className="spiderman-full-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="spideySuitRed" cx="40%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="65%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#991b1b" />
              </radialGradient>
              <radialGradient id="spideySuitBlue" cx="40%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="70%" stopColor="#0369a1" />
                <stop offset="100%" stopColor="#0c4a6e" />
              </radialGradient>
              <linearGradient id="spideyEyeWhite" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#e0f2fe" />
              </linearGradient>
            </defs>

            {/* Left Leg in Crouch / Leap */}
            <path
              d="M38 75 Q20 85 18 108 Q24 116 35 110 Q38 95 48 80 Z"
              fill="url(#spideySuitBlue)"
              stroke="#0f172a"
              strokeWidth="1.5"
            />
            {/* Left Boot */}
            <path d="M18 108 Q14 122 26 126 Q35 124 35 110 Z" fill="url(#spideySuitRed)" stroke="#0f172a" strokeWidth="1.2" />

            {/* Right Leg in Dynamic Jump */}
            <path
              d="M72 75 Q94 85 96 108 Q90 116 78 110 Q74 95 62 80 Z"
              fill="url(#spideySuitBlue)"
              stroke="#0f172a"
              strokeWidth="1.5"
            />
            {/* Right Boot */}
            <path d="M96 108 Q100 122 88 126 Q78 124 78 110 Z" fill="url(#spideySuitRed)" stroke="#0f172a" strokeWidth="1.2" />

            {/* Torso & Spider Emblem */}
            <path
              d="M40 45 Q32 60 38 80 Q55 88 72 80 Q78 60 70 45 Z"
              fill="url(#spideySuitRed)"
              stroke="#0f172a"
              strokeWidth="1.5"
            />
            {/* Blue Side Panels */}
            <path d="M38 52 Q34 65 38 80 Q46 76 44 55 Z" fill="url(#spideySuitBlue)" />
            <path d="M72 52 Q76 65 72 80 Q64 76 66 55 Z" fill="url(#spideySuitBlue)" />

            {/* Chest Spider Emblem */}
            <path
              d="M55 58 Q52 54 48 53 M55 59 Q50 59 46 62 M55 60 Q51 65 47 68 M55 61 Q52 70 49 74"
              stroke="#090a0f"
              strokeWidth="1.3"
              fill="none"
            />
            <path
              d="M55 58 Q58 54 62 53 M55 59 Q60 59 64 62 M55 60 Q59 65 63 68 M55 61 Q58 70 61 74"
              stroke="#090a0f"
              strokeWidth="1.3"
              fill="none"
            />
            <circle cx="55" cy="59" r="2.2" fill="#090a0f" />

            {/* Left Arm (Web Shooter Wrist Extended) */}
            <path
              d="M40 48 Q20 40 10 32 Q8 36 14 42 Q26 48 38 56 Z"
              fill="url(#spideySuitRed)"
              stroke="#0f172a"
              strokeWidth="1.4"
            />
            {/* Left Glove Web Shooter */}
            <path d="M10 32 Q4 28 8 22 Q14 26 14 36 Z" fill="url(#spideySuitRed)" stroke="#0f172a" strokeWidth="1.2" />
            <circle cx="8" cy="26" r="1.4" fill="#38bdf8" className="shooter-spark" />

            {/* Right Arm (Wall Grip / Leap Pose) */}
            <path
              d="M70 48 Q88 40 98 32 Q100 36 94 42 Q82 48 72 56 Z"
              fill="url(#spideySuitRed)"
              stroke="#0f172a"
              strokeWidth="1.4"
            />
            <path d="M98 32 Q104 28 100 22 Q94 26 94 36 Z" fill="url(#spideySuitRed)" stroke="#0f172a" strokeWidth="1.2" />

            {/* Mask / Head */}
            <path
              d="M55 12 C40 12, 32 24, 34 40 C36 52, 48 62, 55 63 C62 62, 74 52, 76 40 C78 24, 70 12, 55 12 Z"
              fill="url(#spideySuitRed)"
              stroke="#0f172a"
              strokeWidth="1.6"
            />

            {/* Mask Web Grid */}
            <path d="M55 12 L55 63" stroke="rgba(0,0,0,0.5)" strokeWidth="0.8" />
            <path d="M55 36 L34 38" stroke="rgba(0,0,0,0.5)" strokeWidth="0.8" />
            <path d="M55 36 L76 38" stroke="rgba(0,0,0,0.5)" strokeWidth="0.8" />
            <path d="M44 24 Q55 28 66 24" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="0.8" />
            <path d="M38 46 Q55 52 72 46" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="0.8" />

            {/* Expressive Glowing Spider Eyes */}
            <path d="M50 30 Q34 32 34 40 Q40 48 50 45 Q52 38 50 30 Z" fill="#090a0f" />
            <path d="M49 32 Q37 34 37 40 Q42 46 49 43 Q50 38 49 32 Z" fill="url(#spideyEyeWhite)" />

            <path d="M60 30 Q76 32 76 40 Q70 48 60 45 Q58 38 60 30 Z" fill="#090a0f" />
            <path d="M61 32 Q73 34 73 40 Q68 46 61 43 Q60 38 61 32 Z" fill="url(#spideyEyeWhite)" />
          </svg>
        </div>
      </div>

      {/* ─── 3. THWIP! POP BURST ─── */}
      {thwipCue && (
        <span 
          className="realistic-thwip-badge"
          style={{ left: `${thwipCue.x}%`, top: `${thwipCue.y}%` }}
        >
          THWIP! 🕸️
        </span>
      )}
    </div>
  );
}
