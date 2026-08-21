import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Volume2, VolumeX, Sparkles, X, MessageSquare, Bot, 
  Send, Compass, Zap, Award, Calendar, CheckCircle2, 
  ChevronRight, ArrowRight, Play, Pause, SkipForward, Disc3, ExternalLink,
  Copy, Check, HelpCircle, ArrowUpRight, ShieldCheck, Clock, Flame, Terminal, Cpu, Square, Eye, EyeOff
} from "lucide-react";
import { PROFILE } from "../data/portfolio";
import { useIsMobile } from "../hooks/useIsMobile";
import { answerPeashQuestionAsync } from "../utils/peashAiEngine";
import { useMusic } from "../context/MusicContext";
import SpiderManWebScene from "./SpiderManWebScene";
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

// 4 Primary Mobile-Friendly Help Cards
const NATIVE_HELP_CARDS = [
  {
    icon: Compass,
    title: "Production Case Studies",
    badge: "LANGGRAPH AGENTS",
    desc: "3-in-1 real case studies, pgvector RAG & 45% bandwidth savings",
    query: "Explain the 3-in-1 production case studies and LangGraph multi-agent architecture.",
    color: "#38bdf8",
  },
  {
    icon: Award,
    title: "Triple HubSpot Certifications",
    badge: "VERIFIED REVOPS",
    desc: "HubSpot RevOps, Marketing Hub, IBM AI & Microsoft certified",
    query: "What certifications does Peash hold and what is his track record in RevOps?",
    color: "#1ed760",
  },
  {
    icon: Calendar,
    title: "Rates & Hiring Info",
    badge: "$45–$65 / HR",
    desc: "Contract & freelance availability with 30-minute discovery booking",
    query: "What are his hourly/contract rates and freelance availability?",
    color: "#f59e0b",
  },
  {
    icon: Zap,
    title: "Day-1 Production Readiness",
    badge: "ZERO RAMP-UP",
    desc: "Pre-built modular harnesses ready for immediate live deployment",
    query: "Can you ship Day-1 with zero ramp-up and pre-built modular harnesses?",
    color: "#ef4444",
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

// Browser Speech Synthesis (On Demand only)
function playSpeechText(text, onEnd) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*•#]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    if (onEnd) utterance.onend = onEnd;
    window.speechSynthesis.speak(utterance);
  } catch (e) {}
}

function stopSpeechText() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

/* ═══════════════════════════════════════════════════════════════
   AUTHENTIC SPIDER-MAN CYBER ICON
   ═══════════════════════════════════════════════════════════════ */
function SpiderManCyberIcon({ isSpeaking, isSinging }) {
  return (
    <div className={`spiderman-icon-wrap ${isSpeaking ? "speaking" : ""} ${isSinging ? "singing" : ""}`}>
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

          {/* Mask Base */}
          <path
            d="M50 8 C26 8, 12 28, 14 56 C16 76, 36 94, 50 96 C64 94, 84 76, 86 56 C88 28, 74 8, 50 8 Z"
            fill="url(#spideyMaskGrad)"
            stroke="#0a0a0e"
            strokeWidth="2.5"
          />

          {/* Web Strands across Face */}
          <path d="M50 8 L50 96" stroke="rgba(10, 10, 14, 0.7)" strokeWidth="1.3" />
          <path d="M50 48 L14 56" stroke="rgba(10, 10, 14, 0.7)" strokeWidth="1.3" />
          <path d="M50 48 L86 56" stroke="rgba(10, 10, 14, 0.7)" strokeWidth="1.3" />
          <path d="M50 48 L22 24" stroke="rgba(10, 10, 14, 0.7)" strokeWidth="1.3" />
          <path d="M50 48 L78 24" stroke="rgba(10, 10, 14, 0.7)" strokeWidth="1.3" />
          <path d="M50 48 L28 84" stroke="rgba(10, 10, 14, 0.7)" strokeWidth="1.3" />
          <path d="M50 48 L72 84" stroke="rgba(10, 10, 14, 0.7)" strokeWidth="1.3" />

          {/* Concentric Web Rings */}
          <path d="M36 28 Q50 34 64 28" fill="none" stroke="rgba(10, 10, 14, 0.7)" strokeWidth="1.3" />
          <path d="M26 44 Q50 54 74 44" fill="none" stroke="rgba(10, 10, 14, 0.7)" strokeWidth="1.3" />
          <path d="M28 66 Q50 78 72 66" fill="none" stroke="rgba(10, 10, 14, 0.7)" strokeWidth="1.3" />

          {/* Eyes with Cyber Blue Glow */}
          <path d="M44 40 Q22 42, 22 56 Q30 68, 44 64 Q46 52, 44 40 Z" fill="#09090b" />
          <path d="M42 43 Q25 45, 25 55 Q32 65, 42 62 Q44 52, 42 43 Z" fill="url(#spideyEyeGrad)" filter="url(#spideyEyeGlow)" />
          <path d="M56 40 Q78 42, 78 56 Q70 68, 56 64 Q54 52, 56 40 Z" fill="#09090b" />
          <path d="M58 43 Q75 45, 75 55 Q68 65, 58 62 Q56 52, 58 43 Z" fill="url(#spideyEyeGrad)" filter="url(#spideyEyeGlow)" />
        </svg>

        {isSinging && (
          <div className="spidey-singing-notes">
            <span className="note-1">♪</span>
            <span className="note-2">♫</span>
            <span className="note-3">♩</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN MOBILE-NATIVE SPIDER-MAN COPILOT
   ═══════════════════════════════════════════════════════════════ */
export default function PeashCompanionGuide() {
  const isMobile = useIsMobile();
  const { 
    currentTrack, 
    isPlaying: isMusicPlaying, 
    startMusic,
    togglePlay: toggleMusic, 
    nextTrack: nextMusicTrack, 
  } = useMusic();
  
  const [activeSection, setActiveSection] = useState("hero");
  const [isMuted, setIsMuted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isNeonHighlighted, setIsNeonHighlighted] = useState(false);
  const [customPrompt, setCustomPrompt] = useState(null);
  
  // Spider-Man Web Shooters Toggle (Can be turned ON/OFF anytime by user)
  const [isWebShooterEnabled, setIsWebShooterEnabled] = useState(true);
  const [triggerWebShot, setTriggerWebShot] = useState(null);

  // Voice Listening State (Disabled by Default, 1-Click to Play)
  const [speakingMsgIndex, setSpeakingMsgIndex] = useState(null);

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
        tag: "AI COPILOT",
        text: "Hey! I'm Peash's Spider-Man AI Copilot. Tap to explore architecture & play soundtrack!",
      });
      setIsOpen(true);
      playTechBlip(isMuted);

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
            playTechBlip(isMuted);
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

  // Clean up speech synthesis when modal closes
  useEffect(() => {
    if (!isCopilotOpen) {
      stopSpeechText();
      setSpeakingMsgIndex(null);
    }
  }, [isCopilotOpen]);

  // Handle Opening Copilot & Starting Song (Native Instant Tap)
  const handleOpenCopilot = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setIsCopilotOpen(true);
    setIsNeonHighlighted(false);
    setIsOpen(false);

    try {
      playTechBlip(isMuted, 650);
    } catch (err) {}

    try {
      if (!isMusicPlaying) {
        startMusic();
      }
    } catch (err) {}

    if (isWebShooterEnabled) {
      setTriggerWebShot({ x: 200, y: 150, ts: Date.now() });
    }
  };

  const handleAskQuestion = async (userQuery) => {
    if (!userQuery.trim()) return;
    const qText = userQuery.trim();

    const userMsg = { sender: "user", text: qText };
    setChatMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsThinking(true);
    setThinkingStep("Accessing Peash's RevOps & AI Knowledge Base...");
    playTechBlip(isMuted, 620);

    if (isWebShooterEnabled) {
      setTriggerWebShot({ x: 180 + Math.random() * 150, y: 320, ts: Date.now() });
    }

    setTimeout(() => {
      setThinkingStep("Synthesizing Architecture & Production Credentials...");
    }, 300);

    try {
      const response = await answerPeashQuestionAsync(qText, chatMessages);
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
      playTechBlip(isMuted, 880);
    } catch (err) {
      setIsThinking(false);
    }
  };

  const handleToggleVoice = (text, index) => {
    if (speakingMsgIndex === index) {
      stopSpeechText();
      setSpeakingMsgIndex(null);
    } else {
      setSpeakingMsgIndex(index);
      playSpeechText(text, () => setSpeakingMsgIndex(null));
    }
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
      {/* ─── FLOATING SPIDER-MAN BOT TRIGGER (HIGH TOUCH TARGET ON MOBILE) ─── */}
      <div className={`peash-companion-root ${isMobile ? "mobile-native-dock" : "desktop-dock"}`}>
        <AnimatePresence>
          {isOpen && !isCopilotOpen && (
            <motion.div
              className="peash-speech-balloon"
              initial={{ opacity: 0, y: 15, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.92 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={handleOpenCopilot}
              onTouchEnd={handleOpenCopilot}
              style={{ cursor: "pointer", pointerEvents: "auto", touchAction: "manipulation" }}
            >
              {/* Balloon Header */}
              <div className="speech-balloon-header">
                <div className="speech-tag">
                  <Sparkles size={12} className="text-green" />
                  <span>{currentMsg.tag}</span>
                </div>
                <div className="speech-actions" onClick={(e) => e.stopPropagation()} onTouchEnd={(e) => e.stopPropagation()}>
                  <button
                    className="speech-icon-btn"
                    onClick={() => {
                      setIsOpen(false);
                      setIsNeonHighlighted(true);
                    }}
                    title="Close"
                  >
                    <X size={13} />
                  </button>
                </div>
              </div>

              {/* Balloon Message */}
              <p className="speech-balloon-text">{currentMsg.text}</p>

              {/* Tap to Chat Cue */}
              <div className="speech-balloon-footer">
                <span>✦ Tap to Open Copilot & Play Music</span>
              </div>

              <div className="speech-balloon-tail" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spider-Man Cyber Agent Floating Capsule */}
        <motion.div
          className={`peash-avatar-capsule ${isNeonHighlighted ? "neon-active" : ""} ${isMusicPlaying ? "singing-active" : ""}`}
          onClick={handleOpenCopilot}
          onTouchEnd={handleOpenCopilot}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          role="button"
          tabIndex={0}
          style={{ cursor: "pointer", pointerEvents: "auto", touchAction: "manipulation" }}
          title={isMusicPlaying ? "Spider-Man AI Copilot — Singing to Soundtrack! (Tap to Chat)" : "Peash AI Copilot — Tap to Explore & Play Music"}
        >
          <div className="peash-avatar-inner" style={{ pointerEvents: "none" }}>
            <SpiderManCyberIcon isSpeaking={speakingMsgIndex !== null} isSinging={isMusicPlaying} />
          </div>

          {(isNeonHighlighted || isMusicPlaying) && (
            <span className="peash-neon-ripple" style={{ pointerEvents: "none" }} />
          )}

          <span className="peash-guide-beacon" />
        </motion.div>
      </div>

      {/* ─── NATIVE MOBILE-FIRST SPIDER-MAN COPILOT MODAL ─── */}
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
              className="copilot-modal-spiderman"
              initial={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95, y: 16 }}
              animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
              exit={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Optional Spider-Man Web Scene Simulation */}
              {isWebShooterEnabled && <SpiderManWebScene triggerWebShot={triggerWebShot} />}

              {/* Native Mobile Sheet Drag Handle */}
              {isMobile && <div className="mobile-sheet-drag-handle" />}

              {/* ─── 1. TOP HEADER (BRAND, SOUNDTRACK, WEB TOGGLE & CLOSE) ─── */}
              <div className="copilot-spider-header">
                <div className="header-brand-wrap">
                  <div className="spiderman-badge-icon">
                    <SpiderManCyberIcon isSpeaking={speakingMsgIndex !== null} isSinging={isMusicPlaying} />
                  </div>
                  <div className="header-title-meta">
                    <div className="title-row">
                      <h4>Peash AI Copilot</h4>
                      <span className="spider-badge">SPIDER-BOT</span>
                    </div>
                    <span className="subtitle">RevOps & AI Agent Architect</span>
                  </div>
                </div>

                {/* Mobile & Desktop Mini Music Player */}
                {currentTrack && (
                  <div className={`spider-mini-music ${isMusicPlaying ? "playing" : ""}`}>
                    <div className={`music-disc ${isMusicPlaying ? "spin" : ""}`}>
                      <Disc3 size={13} />
                    </div>
                    <span className="music-name">{currentTrack.title}</span>
                    <button 
                      className="music-ctrl-btn"
                      onClick={toggleMusic}
                      title={isMusicPlaying ? "Pause" : "Play"}
                    >
                      {isMusicPlaying ? <Pause size={12} /> : <Play size={12} />}
                    </button>
                    <button 
                      className="music-ctrl-btn"
                      onClick={nextMusicTrack}
                      title="Next Song"
                    >
                      <SkipForward size={12} />
                    </button>
                  </div>
                )}

                <div className="header-action-btns">
                  {/* Web Shooters Toggle Button */}
                  <button
                    className={`spider-web-toggle-btn ${isWebShooterEnabled ? "active" : ""}`}
                    onClick={() => setIsWebShooterEnabled(!isWebShooterEnabled)}
                    title={isWebShooterEnabled ? "Web Shooters: ON (Click to turn OFF)" : "Web Shooters: OFF (Click to turn ON)"}
                  >
                    <span>🕸️</span>
                    <span className="web-toggle-label">{isWebShooterEnabled ? "Webs: ON" : "Webs: OFF"}</span>
                  </button>

                  <button 
                    className="spider-close-btn"
                    onClick={() => setIsCopilotOpen(false)}
                    title="Close"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* ─── 2. LIVE CREDENTIAL STATUS BAR ─── */}
              <div className="spider-telemetry-bar">
                <div className="status-item">
                  <span className="status-dot red" />
                  <span><strong>Peash Das Rudra</strong></span>
                </div>
                <div className="status-item">
                  <span className="status-dot green" />
                  <span>Triple HubSpot Certified</span>
                </div>
                <div className="status-item">
                  <span className="status-dot cyan" />
                  <span>LangGraph & MCP</span>
                </div>
                <div className="status-item">
                  <span className="status-dot yellow" />
                  <span>$45–$65/hr</span>
                </div>
              </div>

              {/* ─── 3. SCROLLABLE MAIN CONTENT (SPACIOUS & NATIVE) ─── */}
              <div className="copilot-scrollable-body" ref={chatScrollRef}>
                {chatMessages.length === 0 ? (
                  <div className="spider-welcome-container">
                    {/* Welcome Hero Statement */}
                    <div className="spider-hero-card">
                      <div className="hero-top-badge">
                        <Sparkles size={13} className="text-green" />
                        <span>Interactive AI Recruiter & Client Guide</span>
                      </div>
                      <h3>How can I help you evaluate Peash today?</h3>
                      <p>
                        Tap any category below for instant answers on <strong>3-in-1 case studies</strong>, <strong>HubSpot credentials</strong>, or <strong>freelance hiring</strong>.
                      </p>
                    </div>

                    {/* 4 Spacious Native Action Cards */}
                    <div className="spider-cards-grid">
                      {NATIVE_HELP_CARDS.map((card, idx) => {
                        const CardIcon = card.icon;
                        return (
                          <button
                            key={idx}
                            className="spider-action-card"
                            onClick={() => handleAskQuestion(card.query)}
                            style={{ "--card-accent": card.color }}
                          >
                            <div className="card-header-line">
                              <div className="card-icon-wrapper">
                                <CardIcon size={18} />
                              </div>
                              <span className="card-badge-pill">{card.badge}</span>
                            </div>
                            <h5 className="card-heading">{card.title}</h5>
                            <p className="card-description">{card.desc}</p>
                            <div className="card-action-cue">
                              <span>Ask Question</span>
                              <ArrowRight size={14} className="card-arrow-icon" />
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Popular Clickable FAQs */}
                    <div className="spider-faqs-box">
                      <div className="faqs-title-row">
                        <HelpCircle size={14} className="text-green" />
                        <span>Frequently Asked Questions:</span>
                      </div>
                      <div className="faqs-list">
                        {POPULAR_FAQS.map((faq, fIdx) => (
                          <button
                            key={fIdx}
                            className="spider-faq-item"
                            onClick={() => handleAskQuestion(faq)}
                          >
                            <span className="faq-spider-icon">🕸️</span>
                            <span className="faq-text">{faq}</span>
                            <ArrowRight size={13} className="faq-arrow" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ─── LIVE CHAT STREAM VIEW ─── */
                  <div className="spider-chat-stream">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className={`spider-chat-row ${msg.sender}`}>
                        {msg.sender === "copilot" && (
                          <div className="spider-chat-avatar">
                            <Bot size={15} />
                          </div>
                        )}
                        <div className="spider-message-card">
                          <p>{msg.text}</p>

                          {/* Copilot Action Toolbar (1-Click Voice Listen & Jumps) */}
                          {msg.sender === "copilot" && (
                            <div className="spider-message-toolbar">
                              {/* 1-Click Listen Audio Response Button */}
                              <button
                                className={`spider-listen-btn ${speakingMsgIndex === index ? "active" : ""}`}
                                onClick={() => handleToggleVoice(msg.text, index)}
                                title={speakingMsgIndex === index ? "Stop Voice" : "Listen to Voice Response"}
                              >
                                {speakingMsgIndex === index ? (
                                  <>
                                    <Square size={12} />
                                    <span>Stop Voice</span>
                                  </>
                                ) : (
                                  <>
                                    <Volume2 size={13} />
                                    <span>Listen</span>
                                  </>
                                )}
                              </button>

                              {/* Interactive Section Jump */}
                              {msg.section && (
                                <button 
                                  className="spider-jump-btn"
                                  onClick={() => handleTourScroll(msg.section)}
                                >
                                  <ArrowRight size={13} />
                                  <span>{msg.sectionLabel || "Jump to Section"}</span>
                                </button>
                              )}

                              {/* External Resource Link */}
                              {msg.actionUrl && (
                                <a
                                  href={msg.actionUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="spider-ext-link"
                                >
                                  <ExternalLink size={13} />
                                  <span>{msg.actionText || "Open Link"}</span>
                                </a>
                              )}
                            </div>
                          )}

                          {/* Suggested Next Questions */}
                          {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                            <div className="spider-suggested-wrap">
                              {msg.suggestedQuestions.map((sq, sIdx) => (
                                <button
                                  key={sIdx}
                                  onClick={() => handleAskQuestion(sq)}
                                  className="spider-suggested-chip"
                                >
                                  <span>✦ {sq}</span>
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
                        className="spider-chat-row copilot thinking"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="spider-chat-avatar thinking">
                          <Bot size={15} className="spin-slow" />
                        </div>
                        <div className="spider-message-card thinking-box">
                          <span className="thinking-neon-dot" />
                          <span className="thinking-text">{thinkingStep}</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              {/* ─── 4. NATIVE INPUT CONSOLE (HIGH-CONTRAST & SPACIOUS) ─── */}
              <div className="spider-input-console">
                {chatMessages.length > 0 && (
                  <button 
                    className="spider-reset-btn"
                    onClick={() => setChatMessages([])}
                    title="Return to Menu"
                  >
                    <HelpCircle size={15} />
                    <span>Menu</span>
                  </button>
                )}
                
                <input
                  type="text"
                  placeholder="Ask anything about Peash's stack, rates, or case studies..."
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAskQuestion(inputQuery);
                  }}
                  className="spider-input-box"
                />
                
                <button
                  className="spider-send-button"
                  onClick={() => handleAskQuestion(inputQuery)}
                  disabled={!inputQuery.trim()}
                  title="Send (Enter)"
                >
                  <Send size={16} />
                </button>
              </div>

              {/* ─── 5. NATIVE FOOTER WITH DISCOVERY BOOKING ─── */}
              <div className="spider-footer-bar">
                <div className="footer-links-group">
                  <button onClick={() => handleTourScroll("projects")}>🚀 Projects</button>
                  <span>•</span>
                  <button onClick={() => handleTourScroll("skills")}>⚡ Skills</button>
                  <span>•</span>
                  <button onClick={() => handleTourScroll("certifications")}>🏆 Certs</button>
                </div>
                <a
                  href={PROFILE.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spider-calendly-action"
                >
                  <Calendar size={13} />
                  <span>Book Strategy Call</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
