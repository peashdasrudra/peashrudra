import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Volume2, VolumeX, Sparkles, X, MessageSquare, Bot, 
  Send, Compass, Zap, Award, Calendar, CheckCircle2, 
  ChevronRight, ArrowRight, Play, Pause, SkipForward, Disc3, ExternalLink,
  Copy, Check, HelpCircle, ArrowUpRight, ShieldCheck, Clock, Flame, Terminal, Cpu
} from "lucide-react";
import { PROFILE } from "../data/portfolio";
import { useIsMobile } from "../hooks/useIsMobile";
import { answerPeashQuestion } from "../utils/peashAiEngine";
import { useMusic } from "../context/MusicContext";
import "./PeashCompanionGuide.css";

// Section-specific guide messages
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

// 4 Luxury Quick Help Bento Cards
const LUXURY_HELP_CARDS = [
  {
    icon: Compass,
    title: "Production Case Studies",
    badge: "3-in-1 ARCHITECTURE",
    desc: "Autonomous LangGraph agents, CRM data pipelines & 45% operational bandwidth savings.",
    query: "Explain the 3-in-1 production case studies and LangGraph multi-agent architecture.",
    color: "#38bdf8",
  },
  {
    icon: Award,
    title: "Certified Credentials",
    badge: "TRIPLE HUBSPOT",
    desc: "HubSpot RevOps, Marketing Hub, IBM AI & Microsoft authenticated certifications.",
    query: "What certifications does Peash hold and what is his track record in RevOps?",
    color: "#1ed760",
  },
  {
    icon: Calendar,
    title: "Rates & Hiring",
    badge: "$45–$65 / HR",
    desc: "Contract & freelance availability with direct 30-minute discovery call booking.",
    query: "What are his hourly/contract rates and freelance availability?",
    color: "#f59e0b",
  },
  {
    icon: Zap,
    title: "Day-1 Production Fit",
    badge: "ZERO RAMP-UP",
    desc: "Pre-built modular automation harnesses ready to deploy into live environments on day 1.",
    query: "Can you ship Day-1 with zero ramp-up and pre-built modular harnesses?",
    color: "#ec4899",
  },
];

// Popular Instant FAQ Chips
const POPULAR_FAQS = [
  "What is Peash's core specialization?",
  "Tell me about his LangGraph & MCP tools",
  "What are his hourly/contract rates?",
  "Show me his HubSpot credentials",
  "How to book a discovery call?",
];

// Web Audio API Sound Generator
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

    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.09);
  } catch (e) {}
}

// Browser Speech Synthesis
function speakText(text, isMuted) {
  if (isMuted || typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*•#]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  } catch (e) {}
}

/* ═══════════════════════════════════════════════════════════════
   PREMIUM SPIDER-MAN CYBER ICON
   ═══════════════════════════════════════════════════════════════ */
function SpiderManCyberIcon({ isSpeaking, isSinging }) {
  return (
    <div className={`spiderman-icon-wrap ${isSpeaking ? "speaking" : ""} ${isSinging ? "singing" : ""}`}>
      <div className="agent-orbit-ring ring-1 spiderman-ring" />
      <div className="agent-orbit-ring ring-2 spiderman-ring-2" />
      
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

          <path
            d="M50 8 C26 8, 12 28, 14 56 C16 76, 36 94, 50 96 C64 94, 84 76, 86 56 C88 28, 74 8, 50 8 Z"
            fill="url(#spideyMaskGrad)"
            stroke="#0a0a0e"
            strokeWidth="2.5"
          />

          <path d="M50 8 L50 96" stroke="rgba(10, 10, 14, 0.65)" strokeWidth="1.2" />
          <path d="M50 48 L14 56" stroke="rgba(10, 10, 14, 0.65)" strokeWidth="1.2" />
          <path d="M50 48 L86 56" stroke="rgba(10, 10, 14, 0.65)" strokeWidth="1.2" />
          <path d="M50 48 L22 24" stroke="rgba(10, 10, 14, 0.65)" strokeWidth="1.2" />
          <path d="M50 48 L78 24" stroke="rgba(10, 10, 14, 0.65)" strokeWidth="1.2" />
          <path d="M50 48 L28 84" stroke="rgba(10, 10, 14, 0.65)" strokeWidth="1.2" />
          <path d="M50 48 L72 84" stroke="rgba(10, 10, 14, 0.65)" strokeWidth="1.2" />

          <path d="M36 28 Q50 34 64 28" fill="none" stroke="rgba(10, 10, 14, 0.65)" strokeWidth="1.2" />
          <path d="M26 44 Q50 54 74 44" fill="none" stroke="rgba(10, 10, 14, 0.65)" strokeWidth="1.2" />
          <path d="M28 66 Q50 78 72 66" fill="none" stroke="rgba(10, 10, 14, 0.65)" strokeWidth="1.2" />

          <path d="M44 40 Q22 42, 22 56 Q30 68, 44 64 Q46 52, 44 40 Z" fill="#09090b" />
          <path d="M42 43 Q25 45, 25 55 Q32 65, 42 62 Q44 52, 42 43 Z" fill="url(#spideyEyeGrad)" filter="url(#spideyEyeGlow)" />
          <path d="M56 40 Q78 42, 78 56 Q70 68, 56 64 Q54 52, 56 40 Z" fill="#09090b" />
          <path d="M58 43 Q75 45, 75 55 Q68 65, 58 62 Q56 52, 58 43 Z" fill="url(#spideyEyeGrad)" filter="url(#spideyEyeGlow)" />
        </svg>

        <span className="spidey-core-glow" />

        {isSinging && (
          <div className="spidey-singing-notes">
            <span className="note-1">♪</span>
            <span className="note-2">♫</span>
            <span className="note-3">♩</span>
          </div>
        )}
      </div>

      <div className="agent-corner tl" />
      <div className="agent-corner tr" />
      <div className="agent-corner bl" />
      <div className="agent-corner br" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN JAW-DROPPING PEASH AI COPILOT
   ═══════════════════════════════════════════════════════════════ */
export default function PeashCompanionGuide() {
  const isMobile = useIsMobile();
  const { 
    currentTrack, 
    isPlaying: isMusicPlaying, 
    startMusic,
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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [customPrompt, setCustomPrompt] = useState(null);
  
  // Interactive Chat State
  const [inputQuery, setInputQuery] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingStep, setThinkingStep] = useState("");
  const chatScrollRef = useRef(null);

  // ─── 5-Second Introduction Balloon ───
  useEffect(() => {
    const introTimer = setTimeout(() => {
      setCustomPrompt({
        tag: "AI ASSISTANT",
        text: "Hey! I'm Peash's AI Copilot. Click me to explore architecture, credentials & play soundtrack!",
      });
      setIsOpen(true);
      playTechBlip(isMuted);

      // Auto close after 5 seconds and keep neon blinking
      const autoClose = setTimeout(() => {
        setIsOpen(false);
        setIsNeonHighlighted(true);
      }, 5000);

      return () => clearTimeout(autoClose);
    }, 5000);

    return () => clearTimeout(introTimer);
  }, [isMuted]);

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
  }, [chatMessages, isThinking]);

  // Handle Opening Copilot & Starting Song (Bulletproof on Mobile & Desktop)
  const handleOpenCopilot = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setIsCopilotOpen(true);
    setIsNeonHighlighted(false);
    setIsOpen(false);

    // Safely trigger audio in isolated try-catch so it NEVER blocks modal opening
    try {
      playTechBlip(isMuted, 650);
    } catch (err) {}

    try {
      if (!isMusicPlaying) {
        startMusic();
      }
    } catch (err) {}
  };

  const handleAskQuestion = (userQuery) => {
    if (!userQuery.trim()) return;
    const qText = userQuery.trim();

    // 1. Add User Message
    const userMsg = { sender: "user", text: qText };
    setChatMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsThinking(true);
    setThinkingStep("Accessing Peash's RevOps & AI Knowledge Base...");
    playTechBlip(isMuted, 620);

    setTimeout(() => {
      setThinkingStep("Synthesizing Architecture & Production Credentials...");
    }, 300);

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
    }, 600);
  };

  const handleTourScroll = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsCopilotOpen(false);
    }
  };

  const currentMsg = customPrompt || SECTION_MESSAGES[activeSection] || SECTION_MESSAGES.hero;

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
              onClick={handleOpenCopilot}
              onTouchEnd={handleOpenCopilot}
              onPointerUp={handleOpenCopilot}
              style={{ cursor: "pointer", pointerEvents: "auto", touchAction: "manipulation" }}
            >
              {/* Balloon Header */}
              <div className="speech-balloon-header">
                <div className="speech-tag">
                  <Sparkles size={11} className="text-green" />
                  <span>{currentMsg.tag}</span>
                </div>
                <div className="speech-actions" onClick={(e) => e.stopPropagation()} onTouchEnd={(e) => e.stopPropagation()}>
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

              {/* Balloon Message */}
              <p className="speech-balloon-text">{currentMsg.text}</p>

              {/* Tap to Chat Cue */}
              <div className="speech-balloon-footer">
                <span>✦ Click to Open Copilot & Play Soundtrack</span>
              </div>

              <div className="speech-balloon-tail" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Spider-Man Cyber Agent Icon Capsule */}
        <motion.div
          className={`peash-avatar-capsule ${isSpeaking ? "speaking" : ""} ${isNeonHighlighted ? "neon-active" : ""} ${isMusicPlaying ? "singing-active" : ""}`}
          onClick={handleOpenCopilot}
          onTouchEnd={handleOpenCopilot}
          onPointerUp={handleOpenCopilot}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          role="button"
          tabIndex={0}
          style={{ cursor: "pointer", pointerEvents: "auto", touchAction: "manipulation" }}
          title={isMusicPlaying ? "Spider-Man AI Copilot — Singing to Soundtrack! (Click to Chat)" : "Peash AI Copilot — Click to Explore & Play Music"}
        >
          <div className="peash-avatar-inner" style={{ pointerEvents: "none" }}>
            <SpiderManCyberIcon isSpeaking={isSpeaking} isSinging={isMusicPlaying} />
          </div>

          {(isNeonHighlighted || isMusicPlaying) && (
            <span className="peash-neon-ripple" style={{ pointerEvents: "none" }} />
          )}

          <span className="peash-guide-beacon" />
        </motion.div>
      </div>

      {/* ─── ABSOLUTE TOP-CLASS CYBER COMMAND COPILOT MODAL ─── */}
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
              className="copilot-modal-luxury"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ─── 1. CYBER COMMAND HEADER ─── */}
              <div className="copilot-luxury-header">
                <div className="header-brand-wrap">
                  <div className="header-avatar-box">
                    <SpiderManCyberIcon isSpeaking={isSpeaking} isSinging={isMusicPlaying} />
                  </div>
                  <div className="header-brand-text">
                    <div className="header-name-row">
                      <h4>Peash AI Copilot</h4>
                      <span className="header-status-badge">
                        <span className="status-live-dot" /> ACTIVE NEURAL v3.5
                      </span>
                    </div>
                    <span className="header-sub">RevOps & Autonomous Agent Architecture Console</span>
                  </div>
                </div>

                {/* Holographic Music Visualizer Pill */}
                {currentTrack && (
                  <div className={`header-hologram-music ${isMusicPlaying ? "active-sound" : ""}`}>
                    <div className={`holo-disc ${isMusicPlaying ? "spinning" : ""}`}>
                      <Disc3 size={13} />
                    </div>
                    <div className="holo-track-info">
                      <span className="holo-title">{currentTrack.title}</span>
                      <div className="holo-eq-bars">
                        <span className={`bar ${isMusicPlaying ? "pulse" : ""}`} />
                        <span className={`bar ${isMusicPlaying ? "pulse" : ""}`} />
                        <span className={`bar ${isMusicPlaying ? "pulse" : ""}`} />
                      </div>
                    </div>
                    <button 
                      className="holo-btn play-toggle"
                      onClick={toggleMusic}
                      title={isMusicPlaying ? "Pause Track" : "Play Track"}
                    >
                      {isMusicPlaying ? <Pause size={11} /> : <Play size={11} />}
                    </button>
                    <button 
                      className="holo-btn skip"
                      onClick={nextMusicTrack}
                      title="Next Track"
                    >
                      <SkipForward size={11} />
                    </button>
                  </div>
                )}

                <div className="header-controls">
                  <button
                    className="header-ctrl-btn"
                    onClick={() => {
                      setIsMuted(!isMuted);
                      if (typeof window !== "undefined" && "speechSynthesis" in window) {
                        window.speechSynthesis.cancel();
                      }
                    }}
                    title={isMuted ? "Unmute Voice Audio" : "Mute Voice Audio"}
                  >
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                  <button 
                    className="header-ctrl-btn close-btn"
                    onClick={() => setIsCopilotOpen(false)}
                    title="Close Console (Esc)"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* ─── 2. LIVE CREDENTIAL TELEMETRY HUD ─── */}
              <div className="copilot-telemetry-hud">
                <div className="telemetry-item">
                  <span className="telemetry-dot green" />
                  <span><strong>Peash Das Rudra</strong></span>
                </div>
                <div className="telemetry-item">
                  <span className="telemetry-dot blue" />
                  <span>Triple HubSpot Certified</span>
                </div>
                <div className="telemetry-item">
                  <span className="telemetry-dot ruby" />
                  <span>LangGraph Agent Architect</span>
                </div>
                <div className="telemetry-item">
                  <span className="telemetry-dot gold" />
                  <span>20+ Shipped B2B Systems</span>
                </div>
              </div>

              {/* ─── 3. SCROLLABLE MAIN CONTENT AREA ─── */}
              <div className="copilot-luxury-body" ref={chatScrollRef}>
                {chatMessages.length === 0 ? (
                  <div className="luxury-welcome-view">
                    {/* Welcome Hero Statement */}
                    <div className="luxury-welcome-hero">
                      <div className="welcome-tag">
                        <Sparkles size={12} className="text-green" />
                        <span>Autonomous RevOps Knowledge Base</span>
                      </div>
                      <h3>How can I accelerate your evaluation today?</h3>
                      <p>
                        Select a category below or ask anything about Peash's Day-1 production readiness, custom LangGraph agents, or booking availability.
                      </p>
                    </div>

                    {/* 4 Luxury Bento Action Cards */}
                    <div className="luxury-bento-grid">
                      {LUXURY_HELP_CARDS.map((card, idx) => {
                        const CardIcon = card.icon;
                        return (
                          <button
                            key={idx}
                            className="luxury-bento-card"
                            onClick={() => handleAskQuestion(card.query)}
                            style={{ "--accent-color": card.color }}
                          >
                            <div className="bento-card-top">
                              <div className="bento-icon-box">
                                <CardIcon size={16} />
                              </div>
                              <span className="bento-badge">{card.badge}</span>
                            </div>
                            <h5 className="bento-title">{card.title}</h5>
                            <p className="bento-desc">{card.desc}</p>
                            <div className="bento-footer">
                              <span>Ask Copilot</span>
                              <ArrowRight size={12} className="bento-arrow" />
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Instant Clickable FAQ Chips */}
                    <div className="luxury-faqs-row">
                      <div className="faqs-header-row">
                        <HelpCircle size={12} className="text-green" />
                        <span>Instant Quick Questions:</span>
                      </div>
                      <div className="faqs-chips-container">
                        {POPULAR_FAQS.map((faq, fIdx) => (
                          <button
                            key={fIdx}
                            className="luxury-faq-chip"
                            onClick={() => handleAskQuestion(faq)}
                          >
                            <span className="chip-symbol">✦</span>
                            <span>{faq}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ─── LIVE CHAT STREAM VIEW ─── */
                  <div className="luxury-chat-stream">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className={`luxury-chat-bubble ${msg.sender}`}>
                        {msg.sender === "copilot" && (
                          <div className="chat-avatar-icon">
                            <Bot size={13} />
                          </div>
                        )}
                        <div className="chat-bubble-card">
                          <p>{msg.text}</p>

                          {/* Interactive Section Jump */}
                          {msg.section && (
                            <button 
                              className="chat-jump-btn"
                              onClick={() => handleTourScroll(msg.section)}
                            >
                              <ArrowRight size={12} />
                              <span>{msg.sectionLabel || "Jump to Section"}</span>
                            </button>
                          )}

                          {/* External Resource Link */}
                          {msg.actionUrl && (
                            <a
                              href={msg.actionUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="chat-ext-btn"
                            >
                              <ExternalLink size={12} />
                              <span>{msg.actionText || "View Source"}</span>
                            </a>
                          )}

                          {/* Suggested Next Questions */}
                          {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                            <div className="chat-suggested-row">
                              {msg.suggestedQuestions.map((sq, sIdx) => (
                                <button
                                  key={sIdx}
                                  onClick={() => handleAskQuestion(sq)}
                                  className="chat-suggested-btn"
                                >
                                  <span>{sq}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Live Neural Reasoning Telemetry */}
                    {isThinking && (
                      <motion.div 
                        className="luxury-chat-bubble copilot thinking"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="chat-avatar-icon thinking">
                          <Bot size={13} className="spin-slow" />
                        </div>
                        <div className="chat-bubble-card thinking-card">
                          <span className="thinking-pulse-dot" />
                          <span className="thinking-status-text">{thinkingStep}</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              {/* ─── 4. ULTRA-CLEAN INPUT CONSOLE ─── */}
              <div className="copilot-luxury-input-bar">
                {chatMessages.length > 0 && (
                  <button 
                    className="menu-reset-btn"
                    onClick={() => setChatMessages([])}
                    title="Return to Main Menu"
                  >
                    <HelpCircle size={13} />
                    <span>Menu</span>
                  </button>
                )}
                
                <input
                  type="text"
                  placeholder="Ask anything about architecture, rates, HubSpot, or Day-1 readiness..."
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAskQuestion(inputQuery);
                  }}
                  className="luxury-input-field"
                />
                
                <button
                  className="luxury-send-btn"
                  onClick={() => handleAskQuestion(inputQuery)}
                  disabled={!inputQuery.trim()}
                  title="Send Query (Enter)"
                >
                  <Send size={14} />
                </button>
              </div>

              {/* ─── 5. LUXURY COMPACT FOOTER ─── */}
              <div className="copilot-luxury-footer">
                <div className="footer-quick-links">
                  <span className="footer-label">Jump:</span>
                  <button onClick={() => handleTourScroll("projects")}>🚀 Case Studies</button>
                  <button onClick={() => handleTourScroll("skills")}>⚡ Skills</button>
                  <button onClick={() => handleTourScroll("certifications")}>🏆 Certs</button>
                </div>
                <a
                  href={PROFILE.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="luxury-calendly-btn"
                >
                  <Calendar size={12} />
                  <span>Book Strategy Call</span>
                  <ArrowUpRight size={11} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
