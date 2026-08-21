import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Volume2, VolumeX, Sparkles, X, MessageSquare, Bot, 
  Send, Compass, Zap, Award, Calendar, CheckCircle2, 
  ChevronRight, CornerDownLeft, ArrowRight, Play, Pause, SkipForward, Disc3, ExternalLink,
  Calculator, FileText, Copy, Check, Sliders, Cpu, Music, User, Flame, Info, HelpCircle
} from "lucide-react";
import { PROFILE } from "../data/portfolio";
import { useIsMobile } from "../hooks/useIsMobile";
import { answerPeashQuestion } from "../utils/peashAiEngine";
import { useMusic } from "../context/MusicContext";
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

// Categorized Easily Clickable FAQs for Recruiter & Client Exploration
const FAQ_CATEGORIES = [
  {
    id: "ai",
    label: "⚡ AI & Agents",
    questions: [
      "What autonomous agent frameworks do you use?",
      "Tell me about your LangGraph & MCP architectures",
      "Can you ship Day-1 with zero ramp-up?",
    ],
  },
  {
    id: "creds",
    label: "🏆 Credentials",
    questions: [
      "What certifications does Peash hold?",
      "Show me his HubSpot & IBM credentials",
      "What is his track record in RevOps?",
    ],
  },
  {
    id: "rates",
    label: "💼 Rates & Hiring",
    questions: [
      "What are his hourly/contract rates?",
      "Is he available for freelance or full-time?",
      "How to book a discovery call?",
    ],
  },
  {
    id: "cases",
    label: "🚀 Case Studies",
    questions: [
      "Explain the 3-in-1 production case studies",
      "How did you save 45% operational bandwidth?",
      "What CRM systems have you integrated?",
    ],
  },
];

// Web Audio API Sound Generator for gentle futuristic micro-blips
function playTechBlip(isMuted, freq = 580) {
  if (isMuted || typeof window === "undefined") return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.08);

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

// Browser Speech Synthesis for reading answers aloud
function speakText(text, isMuted) {
  if (isMuted || typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*•#]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    // Speech synthesis blocked
  }
}

/* ═══════════════════════════════════════════════════════════════
   PREMIUM SPIDER-MAN CYBER ICON
   - Signature Spider-Man mask with web pattern
   - Angular glowing white eyes with specular glint
   - Cyber emerald halo & speaking/singing pulse
   ═══════════════════════════════════════════════════════════════ */
function SpiderManCyberIcon({ isSpeaking, isSinging }) {
  return (
    <div className={`spiderman-icon-wrap ${isSpeaking ? "speaking" : ""} ${isSinging ? "singing" : ""}`}>
      {/* Outer Orbit Rings */}
      <div className="agent-orbit-ring ring-1 spiderman-ring" />
      <div className="agent-orbit-ring ring-2 spiderman-ring-2" />
      
      {/* Spider-Man Stylized Mask Vector */}
      <div className="spiderman-mask-core">
        <svg viewBox="0 0 100 100" className="spiderman-mask-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="spideyMaskGrad" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="65%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </radialGradient>
            <linearGradient id="spideyEyeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e0f2fe" />
            </linearGradient>
            <filter id="spideyEyeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#38bdf8" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* Mask Base Head Contour */}
          <path
            d="M50 8 C26 8, 12 28, 14 56 C16 76, 36 94, 50 96 C64 94, 84 76, 86 56 C88 28, 74 8, 50 8 Z"
            fill="url(#spideyMaskGrad)"
            stroke="#0a0a0e"
            strokeWidth="2.5"
          />

          {/* Web Lines - Vertical Radiating */}
          <path d="M50 8 L50 96" stroke="rgba(10, 10, 14, 0.65)" strokeWidth="1.2" />
          <path d="M50 48 L14 56" stroke="rgba(10, 10, 14, 0.65)" strokeWidth="1.2" />
          <path d="M50 48 L86 56" stroke="rgba(10, 10, 14, 0.65)" strokeWidth="1.2" />
          <path d="M50 48 L22 24" stroke="rgba(10, 10, 14, 0.65)" strokeWidth="1.2" />
          <path d="M50 48 L78 24" stroke="rgba(10, 10, 14, 0.65)" strokeWidth="1.2" />
          <path d="M50 48 L28 84" stroke="rgba(10, 10, 14, 0.65)" strokeWidth="1.2" />
          <path d="M50 48 L72 84" stroke="rgba(10, 10, 14, 0.65)" strokeWidth="1.2" />

          {/* Web Lines - Concentric Arcs */}
          <path d="M36 28 Q50 34 64 28" fill="none" stroke="rgba(10, 10, 14, 0.65)" strokeWidth="1.2" />
          <path d="M26 44 Q50 54 74 44" fill="none" stroke="rgba(10, 10, 14, 0.65)" strokeWidth="1.2" />
          <path d="M28 66 Q50 78 72 66" fill="none" stroke="rgba(10, 10, 14, 0.65)" strokeWidth="1.2" />

          {/* Left Eye Black Outer Border */}
          <path
            d="M44 40 Q22 42, 22 56 Q30 68, 44 64 Q46 52, 44 40 Z"
            fill="#09090b"
          />
          {/* Left Eye White Lens */}
          <path
            d="M42 43 Q25 45, 25 55 Q32 65, 42 62 Q44 52, 42 43 Z"
            fill="url(#spideyEyeGrad)"
            filter="url(#spideyEyeGlow)"
          />

          {/* Right Eye Black Outer Border */}
          <path
            d="M56 40 Q78 42, 78 56 Q70 68, 56 64 Q54 52, 56 40 Z"
            fill="#09090b"
          />
          {/* Right Eye White Lens */}
          <path
            d="M58 43 Q75 45, 75 55 Q68 65, 58 62 Q56 52, 58 43 Z"
            fill="url(#spideyEyeGrad)"
            filter="url(#spideyEyeGlow)"
          />
        </svg>

        <span className="spidey-core-glow" />

        {/* Floating Musical Notes when singing */}
        {isSinging && (
          <div className="spidey-singing-notes">
            <span className="note-1">♪</span>
            <span className="note-2">♫</span>
            <span className="note-3">♩</span>
          </div>
        )}
      </div>

      {/* Cyber Corner Reticles */}
      <div className="agent-corner tl" />
      <div className="agent-corner tr" />
      <div className="agent-corner bl" />
      <div className="agent-corner br" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PEASH COMPANION & FULL INTELLIGENT AI COPILOT
   ═══════════════════════════════════════════════════════════════ */
export default function PeashCompanionGuide() {
  const isMobile = useIsMobile();
  const { 
    currentTrack, 
    isPlaying: isMusicPlaying, 
    togglePlay: toggleMusic, 
    nextTrack: nextMusicTrack, 
    volume: musicVolume,
    setVolume: setMusicVolume,
    isMuted: isMusicMuted, 
    setIsMuted: toggleMusicMute 
  } = useMusic();
  const [activeSection, setActiveSection] = useState("hero");
  const [isMuted, setIsMuted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isNeonHighlighted, setIsNeonHighlighted] = useState(false);
  const [activeTab, setActiveTab] = useState("chat"); // 'chat' | 'roi' | 'pitch'
  const [selectedFaqCat, setSelectedFaqCat] = useState("ai");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [customPrompt, setCustomPrompt] = useState(null);
  
  // Interactive Chat State
  const [inputQuery, setInputQuery] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "copilot",
      text: "Hi! I'm Peash's intelligent AI Copilot. Ask me anything about his LangGraph multi-agent systems, Triple HubSpot certifications, production ROI, or freelance/full-time availability!",
      timestamp: "Now",
    }
  ]);
  const chatScrollRef = useRef(null);

  // ROI Calculator State
  const [teamSize, setTeamSize] = useState(5);
  const [hoursPerDay, setHoursPerDay] = useState(3);
  const [copiedPitch, setCopiedPitch] = useState(false);

  // ─── Immediate Pop-Up with Volume Bar & Pause when Music Starts ───
  useEffect(() => {
    if (isMusicPlaying) {
      setIsOpen(true);
      playTechBlip(isMuted);

      // Auto close after 7 seconds if not interacted
      const autoCloseTimer = setTimeout(() => {
        setIsOpen(false);
        setIsNeonHighlighted(true);
      }, 7000);

      return () => clearTimeout(autoCloseTimer);
    }
  }, [isMusicPlaying, isMuted]);

  // Section Observer for live guide speech bubbles
  useEffect(() => {
    const sections = Object.keys(SECTION_MESSAGES);
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (SECTION_MESSAGES[sectionId]) {
            setActiveSection(sectionId);
            setCustomPrompt(null);
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

  // Auto-scroll chat body on new messages
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, activeTab]);

  const [isThinking, setIsThinking] = useState(false);
  const [thinkingStep, setThinkingStep] = useState("");

  const handleAskQuestion = (userQuery) => {
    if (!userQuery.trim()) return;
    const qText = userQuery.trim();

    // 1. Add User Message
    const userMsg = { sender: "user", text: qText };
    setChatMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsThinking(true);
    setThinkingStep("Analyzing RevOps Knowledge Base...");
    playTechBlip(isMuted, 620);

    setTimeout(() => {
      setThinkingStep("Synthesizing Architecture & Verification...");
    }, 350);

    // 2. Intelligent AI Answer via reasoning engine
    setTimeout(() => {
      const response = answerPeashQuestion(qText);
      const copilotMsg = {
        sender: "copilot",
        text: response.text,
        section: response.section,
        sectionLabel: response.sectionLabel,
        actionUrl: response.actionUrl,
        actionText: response.actionText,
        suggestedQuestions: response.suggestedQuestions,
      };

      setIsThinking(false);
      setChatMessages((prev) => [...prev, copilotMsg]);
      setIsSpeaking(true);
      playTechBlip(isMuted, 880);
      speakText(response.text, isMuted);
      setTimeout(() => setIsSpeaking(false), 2200);
    }, 700);
  };

  const handleTourScroll = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsCopilotOpen(false);
    }
  };

  // ROI Calculator Math: (Team Size * Hours Saved * $55/hr * 250 work days)
  const annualSavingsHours = teamSize * hoursPerDay * 5 * 50;
  const annualSavingsDollars = annualSavingsHours * 50;

  const handleCopyPitch = () => {
    const pitch = `Candidate Overview: Peash Das Rudra
Specialization: AI Automation & RevOps Engineer
Certifications: Triple HubSpot Certified (RevOps, Marketing Hub, Reporting), IBM, Microsoft
Key Capabilities:
• Production LangGraph multi-agent architectures & MCP Tool-Calling
• 20+ live B2B automations shipped | 45% operational bandwidth savings
• Day-1 deployment capability with pre-built modular harnesses
Portfolio & Calendly: ${PROFILE.calendlyUrl}
Direct Email: ${PROFILE.email}`;

    navigator.clipboard?.writeText(pitch);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2200);
  };

  const currentMsg = customPrompt || SECTION_MESSAGES[activeSection] || SECTION_MESSAGES.hero;
  const activeFaqCategory = FAQ_CATEGORIES.find((c) => c.id === selectedFaqCat) || FAQ_CATEGORIES[0];

  return (
    <>
      <div className={`peash-companion-root ${isMobile ? "mobile-mode" : "desktop-dock"}`}>
        <AnimatePresence>
          {isOpen && !isCopilotOpen && (
            <motion.div
              className="peash-speech-balloon"
              initial={{ opacity: 0, y: 15, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.92 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                setIsCopilotOpen(true);
                setIsNeonHighlighted(false);
              }}
            >
              {/* Balloon Header */}
              <div className="speech-balloon-header">
                <div className="speech-tag">
                  <Sparkles size={11} className="text-green" />
                  <span>{isMusicPlaying ? "SOUNDTRACK ACTIVE" : currentMsg.tag}</span>
                </div>
                <div className="speech-actions" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="speech-icon-btn"
                    onClick={() => setIsMuted(!isMuted)}
                    title={isMuted ? "Unmute Sounds" : "Mute Sounds"}
                  >
                    {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                  </button>
                  <button
                    className="speech-icon-btn"
                    onClick={() => {
                      setIsOpen(false);
                      setIsNeonHighlighted(true);
                    }}
                    title="Minimize Guide"
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>

              {/* Balloon Message or Live Music Quick Bar */}
              {isMusicPlaying && currentTrack ? (
                <div className="balloon-music-panel" onClick={(e) => e.stopPropagation()}>
                  <div className="balloon-music-track">
                    <span className="balloon-track-name">🎵 {currentTrack.title}</span>
                    <span className="balloon-artist-name">{currentTrack.artist}</span>
                  </div>

                  {/* Volume Slider & Controls */}
                  <div className="balloon-music-controls">
                    <button
                      className="balloon-music-btn play-pause"
                      onClick={toggleMusic}
                      title={isMusicPlaying ? "Pause Music" : "Play Music"}
                    >
                      {isMusicPlaying ? <Pause size={13} /> : <Play size={13} />}
                      <span>{isMusicPlaying ? "Pause" : "Play"}</span>
                    </button>

                    <button
                      className="balloon-music-btn skip"
                      onClick={nextMusicTrack}
                      title="Next Track"
                    >
                      <SkipForward size={13} />
                    </button>

                    {/* Quick Volume Slider Bar */}
                    <div className="balloon-volume-slider-wrap">
                      <Volume2 size={12} className="balloon-vol-icon" />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={musicVolume}
                        onChange={(e) => setMusicVolume(Number(e.target.value))}
                        className="balloon-volume-slider"
                        title={`Volume: ${musicVolume}%`}
                      />
                      <span className="balloon-vol-pct">{musicVolume}%</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="speech-balloon-text">{currentMsg.text}</p>
              )}

              {/* Tap to Chat Cue */}
              <div className="speech-balloon-footer">
                <span>✦ Click to Open Copilot (Who, What, FAQs & Music)</span>
              </div>

              {/* Speech Tail */}
              <div className="speech-balloon-tail" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Spider-Man Cyber Agent Icon Capsule */}
        <motion.div
          className={`peash-avatar-capsule ${isSpeaking ? "speaking" : ""} ${isNeonHighlighted ? "neon-active" : ""} ${isMusicPlaying ? "singing-active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsCopilotOpen(true);
            setIsNeonHighlighted(false);
            playTechBlip(isMuted, 650);
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            setIsCopilotOpen(true);
            setIsNeonHighlighted(false);
            playTechBlip(isMuted, 650);
          }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          role="button"
          tabIndex={0}
          style={{ cursor: "pointer", pointerEvents: "auto" }}
          title={isMusicPlaying ? "Spider-Man AI Copilot — Singing to Soundtrack! (Click to Chat)" : "Peash AI Copilot — Click to Ask Anything"}
        >
          <div className="peash-avatar-inner" style={{ pointerEvents: "none" }}>
            <SpiderManCyberIcon isSpeaking={isSpeaking} isSinging={isMusicPlaying} />
          </div>

          {/* Neon Highlight Pulse Waves */}
          {(isNeonHighlighted || isMusicPlaying) && (
            <span className="peash-neon-ripple" style={{ pointerEvents: "none" }} />
          )}

          <span className="peash-guide-beacon" />
        </motion.div>
      </div>

      {/* ─── EXPANDABLE FULL INTELLIGENT AI COPILOT MODAL (REDESIGNED LUXURY HUD) ─── */}
      <AnimatePresence>
        {isCopilotOpen && (
          <motion.div 
            className="copilot-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCopilotOpen(false)}
          >
            <motion.div 
              className="copilot-panel redesigned-hud"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ─── COPILOT TOP COMMAND BAR ─── */}
              <div className="copilot-header-redesign">
                <div className="copilot-brand-lockup">
                  <div className="copilot-avatar-mini">
                    <SpiderManCyberIcon isSpeaking={isSpeaking} isSinging={isMusicPlaying} />
                  </div>
                  <div className="copilot-title-group">
                    <div className="copilot-title-row">
                      <h3>Peash AI Copilot</h3>
                      <span className="copilot-online-status">
                        <span className="status-live-dot" /> LIVE NEURAL v3.2
                      </span>
                    </div>
                    <p className="copilot-subtitle">RevOps Intelligence & Autonomous Agent Architect</p>
                  </div>
                </div>

                {/* Compact Soundtrack HUD Controller in Header */}
                {currentTrack && (
                  <div className="copilot-header-music-hud">
                    <div className={`header-disc ${isMusicPlaying ? "spinning" : ""}`}>
                      <Disc3 size={14} />
                    </div>
                    <div className="header-track-info">
                      <span className="header-track-title">{currentTrack.title}</span>
                      <span className="header-track-artist">{currentTrack.artist}</span>
                    </div>
                    <button 
                      className="header-music-toggle"
                      onClick={toggleMusic}
                      title={isMusicPlaying ? "Pause Soundtrack" : "Play Soundtrack"}
                    >
                      {isMusicPlaying ? <Pause size={12} /> : <Play size={12} />}
                    </button>
                    <button 
                      className="header-music-skip"
                      onClick={nextMusicTrack}
                      title="Next Track"
                    >
                      <SkipForward size={12} />
                    </button>
                  </div>
                )}

                <div className="copilot-header-actions">
                  <button
                    className="copilot-mute-btn"
                    onClick={() => {
                      setIsMuted(!isMuted);
                      if (typeof window !== "undefined" && "speechSynthesis" in window) {
                        window.speechSynthesis.cancel();
                      }
                    }}
                    title={isMuted ? "Unmute Voice" : "Mute Voice"}
                  >
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                  <button 
                    className="copilot-close-btn"
                    onClick={() => setIsCopilotOpen(false)}
                    title="Close Copilot (Esc)"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* ─── SLIM CANDIDATE KEY STATS STRIP ─── */}
              <div className="copilot-stats-strip">
                <div className="stat-pill">
                  <span className="pill-dot green" />
                  <span><strong>Peash Das Rudra</strong></span>
                </div>
                <div className="stat-pill">
                  <span className="pill-dot blue" />
                  <span>Triple HubSpot Certified</span>
                </div>
                <div className="stat-pill">
                  <span className="pill-dot ruby" />
                  <span>LangGraph & MCP Architect</span>
                </div>
                <div className="stat-pill">
                  <span className="pill-dot gold" />
                  <span>20+ Shipped Automations</span>
                </div>
              </div>

              {/* ─── NAVIGATION & MODE TABS ─── */}
              <div className="copilot-mode-tabs-redesign">
                <button
                  className={`tab-btn-modern ${activeTab === "chat" ? "active" : ""}`}
                  onClick={() => setActiveTab("chat")}
                >
                  <MessageSquare size={13} />
                  <span>AI Copilot & FAQs</span>
                </button>
                <button
                  className={`tab-btn-modern ${activeTab === "roi" ? "active" : ""}`}
                  onClick={() => setActiveTab("roi")}
                >
                  <Calculator size={13} />
                  <span>ROI Calculator</span>
                </button>
                <button
                  className={`tab-btn-modern ${activeTab === "pitch" ? "active" : ""}`}
                  onClick={() => setActiveTab("pitch")}
                >
                  <FileText size={13} />
                  <span>Recruiter Pitch</span>
                </button>
              </div>

              {/* ─── TAB 1: INTERACTIVE CHAT & INTERACTIVE FAQ HUB ─── */}
              {activeTab === "chat" && (
                <div className="copilot-main-body">
                  {/* ─── INTERACTIVE CLICKABLE FAQS SECTION ─── */}
                  <div className="copilot-faq-dock">
                    <div className="faq-dock-header">
                      <div className="faq-dock-title">
                        <HelpCircle size={13} className="text-green" />
                        <span>Instant Recruiter & Client FAQs (Click to Ask):</span>
                      </div>
                      {/* FAQ Category Switcher */}
                      <div className="faq-cat-selector">
                        {FAQ_CATEGORIES.map((cat) => (
                          <button
                            key={cat.id}
                            className={`faq-cat-btn ${selectedFaqCat === cat.id ? "active" : ""}`}
                            onClick={() => setSelectedFaqCat(cat.id)}
                          >
                            <span>{cat.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* FAQ Clickable Chips Grid */}
                    <div className="faq-chips-grid">
                      {activeFaqCategory.questions.map((question, qIdx) => (
                        <button
                          key={qIdx}
                          className="faq-interactive-chip"
                          onClick={() => handleAskQuestion(question)}
                        >
                          <span className="faq-chip-prefix">✦</span>
                          <span className="faq-chip-text">{question}</span>
                          <ArrowRight size={11} className="faq-chip-arrow" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ─── CHAT MESSAGES STREAM ─── */}
                  <div className="copilot-chat-body modern-scroll" ref={chatScrollRef}>
                    {chatMessages.map((msg, index) => (
                      <div key={index} className={`copilot-msg-bubble ${msg.sender}`}>
                        {msg.sender === "copilot" && (
                          <div className="copilot-msg-icon">
                            <Bot size={13} />
                          </div>
                        )}
                        <div className="copilot-msg-content">
                          <p>{msg.text}</p>

                          {/* Interactive Section Deep Link */}
                          {msg.section && (
                            <button 
                              className="copilot-jump-btn"
                              onClick={() => handleTourScroll(msg.section)}
                            >
                              <ArrowRight size={12} />
                              <span>{msg.sectionLabel || "Jump to Section"}</span>
                            </button>
                          )}

                          {/* External Action Button */}
                          {msg.actionUrl && (
                            <a
                              href={msg.actionUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="copilot-action-btn"
                            >
                              <ExternalLink size={12} />
                              <span>{msg.actionText || "View Link"}</span>
                            </a>
                          )}

                          {/* Dynamic Next Suggested Questions */}
                          {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                            <div className="copilot-suggested-chips">
                              {msg.suggestedQuestions.map((sq, sIdx) => (
                                <button
                                  key={sIdx}
                                  onClick={() => handleAskQuestion(sq)}
                                  className="suggested-chip"
                                >
                                  <span>{sq}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Live Neural Reasoning Stream Bubble */}
                    {isThinking && (
                      <motion.div 
                        className="copilot-msg-bubble copilot thinking"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="copilot-msg-icon thinking-icon">
                          <Bot size={13} className="spin-slow" />
                        </div>
                        <div className="copilot-msg-content thinking-content">
                          <div className="thinking-row">
                            <span className="thinking-pulse-dot" />
                            <span className="thinking-text">{thinkingStep}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* ─── INPUT BAR & SUBMIT ─── */}
                  <div className="copilot-input-bar-redesign">
                    <input
                      type="text"
                      placeholder="Ask anything about architecture, rates, certifications, or Day-1 readiness..."
                      value={inputQuery}
                      onChange={(e) => setInputQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleAskQuestion(inputQuery);
                      }}
                      className="copilot-input-modern"
                    />
                    <button
                      className="copilot-send-btn-modern"
                      onClick={() => handleAskQuestion(inputQuery)}
                      disabled={!inputQuery.trim()}
                      title="Send Query (Enter)"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* ─── TAB 2: INTERACTIVE ROI CALCULATOR ─── */}
              {activeTab === "roi" && (
                <div className="copilot-roi-panel">
                  <h4>⚡ Estimate Your Team's Automation Savings</h4>
                  <p className="copilot-roi-sub">
                    See how much time & money Peash's autonomous pipelines recover for your team annually.
                  </p>

                  <div className="roi-slider-group">
                    <div className="roi-slider-label">
                      <span>Team Size (Reps / Ops):</span>
                      <strong>{teamSize} people</strong>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={teamSize}
                      onChange={(e) => setTeamSize(Number(e.target.value))}
                      className="roi-slider"
                    />
                  </div>

                  <div className="roi-slider-group">
                    <div className="roi-slider-label">
                      <span>Manual CRM/Triage Hours / Person / Day:</span>
                      <strong>{hoursPerDay} hrs/day</strong>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="6"
                      value={hoursPerDay}
                      onChange={(e) => setHoursPerDay(Number(e.target.value))}
                      className="roi-slider"
                    />
                  </div>

                  <div className="roi-results-card">
                    <div className="roi-result-stat">
                      <span className="roi-stat-val text-green">{annualSavingsHours.toLocaleString()} hrs</span>
                      <span className="roi-stat-label">Hours Saved / Year</span>
                    </div>
                    <div className="roi-result-stat">
                      <span className="roi-stat-val">${annualSavingsDollars.toLocaleString()}</span>
                      <span className="roi-stat-label">Estimated Annual Value</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── TAB 3: EXECUTIVE RECRUITER PITCH ─── */}
              {activeTab === "pitch" && (
                <div className="copilot-pitch-panel">
                  <h4>📄 Executive Candidate Brief</h4>
                  <p className="copilot-roi-sub">
                    1-Click copy-pasteable summary formatted for Engineering Directors and Hiring Managers.
                  </p>

                  <div className="pitch-card-box">
                    <pre className="pitch-code-block">
{`Candidate: Peash Das Rudra
Role: RevOps & AI Automation Engineer
Certifications: Triple HubSpot Certified (RevOps, Marketing, Reporting), IBM, Google Cloud
Core Strengths:
• Shipped 20+ live production automations for UK B2B accounts
• Production LangGraph RAG architectures & MCP tool-calling
• Day-1 deployment readiness with 45% measured operational savings
Direct Booking: ${PROFILE.calendlyUrl}`}
                    </pre>
                  </div>

                  <button className="btn btn-outline pitch-copy-btn" onClick={handleCopyPitch}>
                    {copiedPitch ? (
                      <>
                        <Check size={14} className="text-green" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy Candidate Summary</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* ─── COPILOT FOOTER ACTIONS ─── */}
              <div className="copilot-footer-redesign">
                <div className="footer-quick-jumps">
                  <span className="quick-jump-label">Jump:</span>
                  <button onClick={() => handleTourScroll("projects")}>🚀 Case Studies</button>
                  <button onClick={() => handleTourScroll("skills")}>⚡ Skills</button>
                  <button onClick={() => handleTourScroll("certifications")}>🏆 Certs</button>
                </div>
                <a
                  href={PROFILE.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary copilot-call-btn-compact"
                >
                  <Calendar size={13} />
                  <span>Book Strategy Call</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
