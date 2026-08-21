import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Volume2, VolumeX, Sparkles, X, MessageSquare, Bot, 
  Send, Compass, Zap, Award, Calendar, CheckCircle2, 
  ChevronRight, ArrowRight, Play, Pause, SkipForward, Disc3, ExternalLink,
  Copy, Check, HelpCircle, ArrowUpRight, ShieldCheck, Clock
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

// 4 Primary Quick Help Action Cards
const QUICK_HELP_CARDS = [
  {
    icon: Compass,
    title: "Case Studies",
    desc: "3-in-1 production LangGraph workflows & 45% bandwidth savings",
    query: "Explain the 3-in-1 production case studies",
    tag: "Projects",
  },
  {
    icon: Award,
    title: "Certifications",
    desc: "Triple HubSpot, IBM & Microsoft authenticated credentials",
    query: "What certifications does Peash hold?",
    tag: "Credentials",
  },
  {
    icon: Calendar,
    title: "Rates & Hiring",
    desc: "Contract rates, freelance availability & direct discovery booking",
    query: "What are his hourly/contract rates and availability?",
    tag: "Hiring",
  },
  {
    icon: Zap,
    title: "Day-1 Fit",
    desc: "Pre-built modular harnesses with zero ramp-up time",
    query: "Can you ship Day-1 with zero ramp-up?",
    tag: "Readiness",
  },
];

// Curated FAQ quick chips
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
   MAIN MINIMAL AESTHETIC PEASH AI COPILOT
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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [customPrompt, setCustomPrompt] = useState(null);
  
  // Interactive Chat State
  const [inputQuery, setInputQuery] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingStep, setThinkingStep] = useState("");
  const chatScrollRef = useRef(null);

  // Immediate Pop-Up with Volume Bar & Pause when Music Starts
  useEffect(() => {
    if (isMusicPlaying) {
      setIsOpen(true);
      playTechBlip(isMuted);

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
  }, [chatMessages, isThinking]);

  const handleAskQuestion = (userQuery) => {
    if (!userQuery.trim()) return;
    const qText = userQuery.trim();

    // 1. Add User Message
    const userMsg = { sender: "user", text: qText };
    setChatMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsThinking(true);
    setThinkingStep("Analyzing Peash's RevOps Knowledge Base...");
    playTechBlip(isMuted, 620);

    setTimeout(() => {
      setThinkingStep("Synthesizing Architecture & Verification...");
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

          {(isNeonHighlighted || isMusicPlaying) && (
            <span className="peash-neon-ripple" style={{ pointerEvents: "none" }} />
          )}

          <span className="peash-guide-beacon" />
        </motion.div>
      </div>

      {/* ─── MINIMAL, AESTHETIC & HELP-FOCUSED COPILOT MODAL ─── */}
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
              className="copilot-modal-minimal"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ─── 1. MINIMAL HEADER ─── */}
              <div className="copilot-min-header">
                <div className="header-left">
                  <div className="header-avatar">
                    <SpiderManCyberIcon isSpeaking={isSpeaking} isSinging={isMusicPlaying} />
                  </div>
                  <div className="header-meta">
                    <div className="header-title-wrap">
                      <h4>Peash AI Copilot</h4>
                      <span className="header-live-badge">
                        <span className="badge-pulse-dot" /> Online
                      </span>
                    </div>
                    <span className="header-tagline">RevOps & AI Architecture Guide</span>
                  </div>
                </div>

                {/* Minimal Soundtrack Strip in Header */}
                {currentTrack && (
                  <div className="header-music-pill">
                    <button 
                      className="music-pill-btn" 
                      onClick={toggleMusic}
                      title={isMusicPlaying ? "Pause Track" : "Play Track"}
                    >
                      {isMusicPlaying ? <Pause size={11} /> : <Play size={11} />}
                    </button>
                    <span className="music-pill-title">{currentTrack.title}</span>
                    <button 
                      className="music-pill-btn skip" 
                      onClick={nextMusicTrack}
                      title="Next Track"
                    >
                      <SkipForward size={11} />
                    </button>
                  </div>
                )}

                <div className="header-actions">
                  <button
                    className="action-icon-btn"
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
                    className="action-icon-btn close"
                    onClick={() => setIsCopilotOpen(false)}
                    title="Close (Esc)"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* ─── 2. SCROLLABLE MAIN HELP HUB ─── */}
              <div className="copilot-scroll-area" ref={chatScrollRef}>
                {chatMessages.length === 0 ? (
                  <div className="help-hub-welcome">
                    {/* Welcome Hero Greeting */}
                    <div className="welcome-hero">
                      <div className="hero-badge">
                        <Sparkles size={12} className="text-green" />
                        <span>Instant Candidate & Client Assistant</span>
                      </div>
                      <h3>How can I help you today?</h3>
                      <p>
                        Get instant verified answers about <strong>Peash Das Rudra</strong>, his 3-in-1 production case studies, triple HubSpot credentials, or contract availability.
                      </p>
                    </div>

                    {/* 4 Clean Action Cards */}
                    <div className="help-cards-grid">
                      {QUICK_HELP_CARDS.map((card, cIdx) => {
                        const CardIcon = card.icon;
                        return (
                          <button
                            key={cIdx}
                            className="help-action-card"
                            onClick={() => handleAskQuestion(card.query)}
                          >
                            <div className="card-top">
                              <div className="card-icon-box">
                                <CardIcon size={16} />
                              </div>
                              <span className="card-tag">{card.tag}</span>
                            </div>
                            <h5 className="card-title">{card.title}</h5>
                            <p className="card-desc">{card.desc}</p>
                            <div className="card-footer">
                              <span>Ask Copilot</span>
                              <ArrowRight size={12} className="card-arrow" />
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Popular Quick FAQs */}
                    <div className="popular-faqs-section">
                      <span className="faqs-label">Frequently Asked Questions:</span>
                      <div className="faqs-pill-wrap">
                        {POPULAR_FAQS.map((faq, fIdx) => (
                          <button
                            key={fIdx}
                            className="faq-pill-btn"
                            onClick={() => handleAskQuestion(faq)}
                          >
                            <span>✦ {faq}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ─── CHAT CONVERSATION VIEW ─── */
                  <div className="chat-stream-wrap">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className={`chat-message ${msg.sender}`}>
                        {msg.sender === "copilot" && (
                          <div className="msg-avatar">
                            <Bot size={13} />
                          </div>
                        )}
                        <div className="msg-content">
                          <p>{msg.text}</p>

                          {/* Deep Link Jump Button */}
                          {msg.section && (
                            <button 
                              className="msg-jump-btn"
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
                              className="msg-ext-btn"
                            >
                              <ExternalLink size={12} />
                              <span>{msg.actionText || "View Link"}</span>
                            </a>
                          )}

                          {/* Dynamic Suggested Follow-up Questions */}
                          {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                            <div className="suggested-chips-row">
                              {msg.suggestedQuestions.map((sq, sIdx) => (
                                <button
                                  key={sIdx}
                                  onClick={() => handleAskQuestion(sq)}
                                  className="suggested-chip-btn"
                                >
                                  <span>{sq}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Neural Thinking State */}
                    {isThinking && (
                      <motion.div 
                        className="chat-message copilot thinking"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="msg-avatar thinking">
                          <Bot size={13} className="spin-slow" />
                        </div>
                        <div className="msg-content thinking-box">
                          <span className="thinking-dot" />
                          <span className="thinking-label">{thinkingStep}</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              {/* ─── 3. MINIMAL MODERN INPUT BAR ─── */}
              <div className="copilot-min-input-bar">
                {chatMessages.length > 0 && (
                  <button 
                    className="reset-hub-btn"
                    onClick={() => setChatMessages([])}
                    title="Return to Help Menu"
                  >
                    <HelpCircle size={13} />
                    <span>Help Menu</span>
                  </button>
                )}
                
                <input
                  type="text"
                  placeholder="Ask anything about Peash's skills, rates, or case studies..."
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAskQuestion(inputQuery);
                  }}
                  className="min-input-field"
                />
                
                <button
                  className="min-send-btn"
                  onClick={() => handleAskQuestion(inputQuery)}
                  disabled={!inputQuery.trim()}
                  title="Send Question"
                >
                  <Send size={14} />
                </button>
              </div>

              {/* ─── 4. MINIMAL COMPACT FOOTER ─── */}
              <div className="copilot-min-footer">
                <div className="footer-links">
                  <button onClick={() => handleTourScroll("projects")}>Case Studies</button>
                  <span>•</span>
                  <button onClick={() => handleTourScroll("skills")}>Skills Playground</button>
                  <span>•</span>
                  <button onClick={() => handleTourScroll("certifications")}>HubSpot Certs</button>
                </div>
                <a
                  href={PROFILE.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-book-btn"
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
