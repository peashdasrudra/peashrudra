import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Sparkles, X, MessageSquare } from "lucide-react";
import { useIsMobile } from "../hooks/useIsMobile";
import "./PeashCompanionGuide.css";

// Section-specific one-liners crafted for maximum recruiter impression
const SECTION_MESSAGES = {
  hero: {
    tag: "AI Architect",
    text: "Hey! I build autonomous AI agents that run CRM operations on autopilot. Let's explore!",
  },
  stats: {
    tag: "Track Record",
    text: "20+ live B2B automations shipped with 99.2% uptime and verified revenue ROI.",
  },
  "recruiter-matrix": {
    tag: "Recruiter Decision",
    text: "Zero ramp-up time, verified HubSpot credentials, and day-1 production capability.",
  },
  experience: {
    tag: "Experience",
    text: "3+ years scaling RevOps pipelines & autonomous agentic systems in production.",
  },
  "hubspot-certified": {
    tag: "Certified RevOps",
    text: "HubSpot RevOps & Marketing Certified specialist with Day-1 deployment capability.",
  },
  projects: {
    tag: "Case Studies",
    text: "Explore my 3-in-1 production case studies below — real architecture, verified impact!",
  },
  skills: {
    tag: "Tech Matrix",
    text: "Interactive spider-web playground — go ahead, drag and fling some tech nodes!",
  },
  "fiverr-gigs": {
    tag: "Client Work",
    text: "Top-rated real estate automation & B2B CRM workflows for global clients.",
  },
  certifications: {
    tag: "Credentials",
    text: "100% authenticated credentials from IBM, Microsoft, Google Cloud & HubSpot.",
  },
  achievements: {
    tag: "Milestones",
    text: "Excellence awards in xAI research, automation pipelines, and hackathons.",
  },
  gallery: {
    tag: "BTS Archive",
    text: "Late-night architecture sessions, deep focus, and shipping in production.",
  },
  contact: {
    tag: "Ready to Scale?",
    text: "Need high-velocity AI automation or RevOps scaling? Let's book a 30-min discovery!",
  },
};

// Web Audio API Sound Generator for gentle futuristic micro-blips
function playTechBlip(isMuted) {
  if (isMuted || typeof window === "undefined") return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(580, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.035, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.09);
  } catch (e) {
    // AudioContext policy
  }
}

/* ═══════════════════════════════════════════════════════════════
   CUSTOM CARTOON PEASH AVATAR SVG (Centered & Scaled)
   Modelled directly on the user's photo:
   - Stylish dark voluminous quiff hair
   - Defined goatee & mustache
   - Sharp dark suit blazer with crisp white collared shirt
   - Expressive animated eyes & confident smile
   ═══════════════════════════════════════════════════════════════ */
function PeashCartoonAvatarSVG({ isSpeaking, isBlinking }) {
  return (
    <svg viewBox="0 0 100 100" className="peash-cartoon-svg" aria-label="Peash Cartoon Guide">
      <defs>
        {/* Skin Tone Gradient */}
        <linearGradient id="peashSkin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e4b084" />
          <stop offset="60%" stopColor="#cf9768" />
          <stop offset="100%" stopColor="#b87f51" />
        </linearGradient>

        {/* Voluminous Dark Hair Gradient */}
        <linearGradient id="peashHair" x1="0%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#242832" />
          <stop offset="50%" stopColor="#111318" />
          <stop offset="100%" stopColor="#08090b" />
        </linearGradient>

        {/* Suit Blazer Gradient */}
        <linearGradient id="peashSuit" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        {/* Glowing Cyber Emerald Aura */}
        <filter id="avatarGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Cyber Halo Ring */}
      <circle cx="50" cy="50" r="47" fill="none" stroke="#1ed760" strokeWidth="1.5" opacity="0.4" />

      {/* ─── Suit Blazer & Collar ─── */}
      <path d="M 18,88 L 34,70 L 50,78 L 66,70 L 82,88 C 86,94 88,98 88,100 L 12,100 C 12,98 14,94 18,88 Z" fill="url(#peashSuit)" />
      
      {/* White Shirt Collar */}
      <polygon points="40,71 50,85 34,79" fill="#ffffff" />
      <polygon points="60,71 50,85 66,79" fill="#ffffff" />
      <polygon points="50,79 47,94 53,94" fill="#cbd5e1" />

      {/* ─── Neck ─── */}
      <path d="M 43,56 L 57,56 L 57,72 L 43,72 Z" fill="url(#peashSkin)" />

      {/* ─── Head Base Shape ─── */}
      <path
        d="M 32,38 C 32,26 40,24 50,24 C 60,24 68,26 68,38 C 68,52 64,62 50,66 C 36,62 32,52 32,38 Z"
        fill="url(#peashSkin)"
      />

      {/* Ears */}
      <path d="M 30,40 C 28,40 28,48 31,48 Z" fill="url(#peashSkin)" />
      <path d="M 70,40 C 72,40 72,48 69,48 Z" fill="url(#peashSkin)" />

      {/* ─── Dark Voluminous Quiff Hairstyle ─── */}
      <path
        d="M 26,36 C 24,24 26,12 34,7 C 41,3 48,2 54,4 C 63,6 70,8 74,16 C 78,23 75,32 71,38 C 69,32 64,22 51,22 C 38,22 32,29 26,36 Z"
        fill="url(#peashHair)"
      />
      {/* Hair Highlights */}
      <path d="M 36,11 Q 46,5 55,8 Q 65,11 67,19" stroke="#334155" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M 42,9 Q 50,6 58,10" stroke="#475569" strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* Eyebrows */}
      <path d="M 37,34 Q 42,31 46,34" stroke="#111827" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 54,34 Q 58,31 63,34" stroke="#111827" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Eyes */}
      {isBlinking ? (
        <>
          <line x1="38" y1="39" x2="45" y2="39" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
          <line x1="55" y1="39" x2="62" y2="39" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          {/* Left Eye */}
          <circle cx="42" cy="39" r="3.5" fill="#ffffff" />
          <circle cx="42.5" cy="39" r="2.2" fill="#111827" />
          <circle cx="43.2" cy="38.2" r="0.9" fill="#ffffff" />
          
          {/* Right Eye */}
          <circle cx="58" cy="39" r="3.5" fill="#ffffff" />
          <circle cx="57.5" cy="39" r="2.2" fill="#111827" />
          <circle cx="58.2" cy="38.2" r="0.9" fill="#ffffff" />
        </>
      )}

      {/* Nose */}
      <path d="M 49,39 L 51,47 L 48,48" stroke="#9a603a" strokeWidth="1.4" strokeLinecap="round" fill="none" />

      {/* ─── Mustache & Goatee ─── */}
      {/* Mustache */}
      <path d="M 43,52 Q 50,50 57,52 Q 50,54 43,52 Z" fill="#1e2229" />

      {/* Mouth */}
      {isSpeaking ? (
        <path d="M 45,55 Q 50,60 55,55 Z" fill="#881337" stroke="#111827" strokeWidth="0.8" />
      ) : (
        <path d="M 45,55 Q 50,57 55,55" stroke="#713f12" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      )}

      {/* Goatee / Chin Patch */}
      <path d="M 48,59 C 47,63 53,63 52,59 Z" fill="#1e2229" />
      <path d="M 45,64 C 48,66 52,66 55,64 C 53,62 47,62 45,64 Z" fill="#1e2229" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PEASH COMPANION GUIDE COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function PeashCompanionGuide() {
  const isMobile = useIsMobile();
  const [activeSection, setActiveSection] = useState("hero");
  const [isMuted, setIsMuted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Periodic Eye Blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 4200);
    return () => clearInterval(blinkInterval);
  }, []);

  // Section Observer to trigger dynamic commentary
  useEffect(() => {
    const sections = Object.keys(SECTION_MESSAGES);
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (SECTION_MESSAGES[sectionId]) {
            setActiveSection(sectionId);
            setIsSpeaking(true);
            playTechBlip(isMuted);
            setTimeout(() => setIsSpeaking(false), 1500);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.25,
      rootMargin: "-10% 0px -30% 0px",
    });

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isMuted]);

  const currentMsg = SECTION_MESSAGES[activeSection] || SECTION_MESSAGES.hero;

  const handleCompanionClick = () => {
    setIsSpeaking(true);
    playTechBlip(isMuted);
    setTimeout(() => setIsSpeaking(false), 1200);
  };

  return (
    <div className={`peash-companion-root ${isMobile ? "mobile-mode" : "desktop-dock"}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="peash-speech-balloon"
            initial={{ opacity: 0, y: 15, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Balloon Header */}
            <div className="speech-balloon-header">
              <div className="speech-tag">
                <Sparkles size={11} className="text-green" />
                <span>{currentMsg.tag}</span>
              </div>
              <div className="speech-actions">
                <button
                  className="speech-icon-btn"
                  onClick={() => setIsMuted(!isMuted)}
                  title={isMuted ? "Unmute Sounds" : "Mute Sounds"}
                >
                  {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                </button>
                <button
                  className="speech-icon-btn"
                  onClick={() => setIsOpen(false)}
                  title="Minimize Guide"
                >
                  <X size={12} />
                </button>
              </div>
            </div>

            {/* Balloon Message */}
            <p className="speech-balloon-text">{currentMsg.text}</p>

            {/* Speech Tail */}
            <div className="speech-balloon-tail" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Cartoon Avatar Capsule */}
      <motion.div
        className={`peash-avatar-capsule ${isSpeaking ? "speaking" : ""}`}
        onClick={() => {
          if (!isOpen) setIsOpen(true);
          handleCompanionClick();
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        title="Peash Das Rudra — Interactive Guide"
      >
        <div className="peash-avatar-inner">
          <PeashCartoonAvatarSVG isSpeaking={isSpeaking} isBlinking={isBlinking} />
        </div>

        {/* Status indicator beacon */}
        <span className="peash-guide-beacon" />
      </motion.div>
    </div>
  );
}
