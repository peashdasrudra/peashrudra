import { useState, useEffect, useRef } from "react";
import { 
  Sparkles, X, Bot, Send, Compass, Zap, Award, Calendar, 
  ArrowRight, Play, Pause, SkipForward, Disc3, ExternalLink,
  HelpCircle, ArrowUpRight, Volume2, Square
} from "lucide-react";
import { PROFILE } from "../data/portfolio";
import { answerPeashQuestionAsync } from "../utils/peashAiEngine";
import { useMusic } from "../context/MusicContext";
import "./PeashCompanionGuide.css";

// 4 Primary Minimal Vibe Cards
const VIBE_HELP_CARDS = [
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
    title: "Triple HubSpot Certified",
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

// Speech Synthesis (On Demand only)
function playSpeechText(text, onEnd) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*•#]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    if (onEnd) utterance.onend = onEnd;
    window.speechSynthesis.speak(utterance);
  } catch (e) {}
}

function stopSpeechText() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
}

/* ─── Ultra-Minimal Clean Spider-Man Mascot ─── */
function SpiderManMinimalIcon() {
  return (
    <div className="spidey-vibe-icon">
      <svg viewBox="0 0 100 100" className="spidey-vibe-svg" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M50 10 C28 10, 16 28, 18 56 C20 76, 38 92, 50 94 C62 92, 80 76, 82 56 C84 28, 72 10, 50 10 Z"
          fill="#ef4444"
          stroke="#090a0f"
          strokeWidth="2.5"
        />
        {/* Subtle Web Lines */}
        <path d="M50 10 L50 94" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2" />
        <path d="M50 50 L18 56" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2" />
        <path d="M50 50 L82 56" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2" />
        <path d="M50 50 L26 26" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2" />
        <path d="M50 50 L74 26" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2" />
        <path d="M38 32 Q50 36 62 32" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2" />
        <path d="M30 48 Q50 56 70 48" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2" />
        {/* Glowing Eyes */}
        <path d="M44 42 Q24 44, 24 54 Q32 64, 44 60 Z" fill="#ffffff" stroke="#090a0f" strokeWidth="1.5" />
        <path d="M56 42 Q76 44, 76 54 Q68 64, 56 60 Z" fill="#ffffff" stroke="#090a0f" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MINIMAL VIBES SPIDER-MAN COPILOT
   ═══════════════════════════════════════════════════════════════ */
export default function PeashCompanionGuide() {
  const { 
    currentTrack, 
    isPlaying: isMusicPlaying, 
    startMusic,
    togglePlay: toggleMusic, 
    nextTrack: nextMusicTrack, 
  } = useMusic();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isBalloonVisible, setIsBalloonVisible] = useState(false);
  const [speakingMsgIndex, setSpeakingMsgIndex] = useState(null);
  
  const [inputQuery, setInputQuery] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const chatScrollRef = useRef(null);

  // 5-Second Greeting Balloon
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBalloonVisible(true);
      const closeTimer = setTimeout(() => {
        setIsBalloonVisible(false);
      }, 5000);
      return () => clearTimeout(closeTimer);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll chat body
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, isThinking]);

  // Clean speech synthesis on close
  useEffect(() => {
    if (!isOpen) {
      stopSpeechText();
      setSpeakingMsgIndex(null);
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsBalloonVisible(false);
    try {
      if (!isMusicPlaying) {
        startMusic();
      }
    } catch (e) {}
  };

  const handleClose = () => {
    setIsOpen(false);
    stopSpeechText();
    setSpeakingMsgIndex(null);
  };

  const handleAsk = async (queryText) => {
    if (!queryText.trim()) return;
    const text = queryText.trim();

    setChatMessages((prev) => [...prev, { sender: "user", text }]);
    setInputQuery("");
    setIsThinking(true);

    try {
      const response = await answerPeashQuestionAsync(text, chatMessages);
      setIsThinking(false);
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "copilot",
          text: response.text,
          section: response.section,
          sectionLabel: response.sectionLabel,
          actionUrl: response.actionUrl,
          actionText: response.actionText,
          suggestedQuestions: response.suggestedQuestions,
        },
      ]);
    } catch (e) {
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

  const handleScrollTo = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* ─── FLOATING SPIDER-MAN TRIGGER ICON ─── */}
      <div className="peash-vibe-trigger-root">
        {isBalloonVisible && !isOpen && (
          <div className="peash-vibe-balloon" onClick={handleOpen}>
            <div className="balloon-header">
              <span className="balloon-tag">✦ SPIDER COPILOT</span>
              <button 
                className="balloon-close"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsBalloonVisible(false);
                }}
              >
                <X size={12} />
              </button>
            </div>
            <p>Hey! Tap to explore Peash's case studies & play soundtrack 🎵</p>
          </div>
        )}

        <button 
          className={`peash-vibe-capsule ${isMusicPlaying ? "playing" : ""}`}
          onClick={handleOpen}
          aria-label="Open Peash AI Copilot"
        >
          <SpiderManMinimalIcon />
          <span className="vibe-beacon" />
        </button>
      </div>

      {/* ─── ULTRA-MINIMAL FEATHERWEIGHT COPILOT MODAL ─── */}
      {isOpen && (
        <div className="peash-vibe-backdrop" onClick={handleClose}>
          <div className="peash-vibe-modal" onClick={(e) => e.stopPropagation()}>
            
            {/* Top Drag Pill on Mobile */}
            <div className="vibe-drag-bar" onClick={handleClose} />

            {/* Header: Title + Mini Music Player + Close */}
            <div className="peash-vibe-header">
              <div className="header-left">
                <SpiderManMinimalIcon />
                <div>
                  <div className="header-title-flex">
                    <h4>Peash Copilot</h4>
                    <span className="spidey-vibe-tag">v3.5</span>
                  </div>
                  <span className="header-subtitle">RevOps & AI Architect</span>
                </div>
              </div>

              {/* Responsive Mini Music Strip */}
              {currentTrack && (
                <div className={`vibe-music-pill ${isMusicPlaying ? "active" : ""}`}>
                  <Disc3 size={13} className={isMusicPlaying ? "music-spin" : ""} />
                  <span className="music-track-name">{currentTrack.title}</span>
                  <button onClick={toggleMusic} className="vibe-player-btn">
                    {isMusicPlaying ? <Pause size={12} /> : <Play size={12} />}
                  </button>
                  <button onClick={nextMusicTrack} className="vibe-player-btn">
                    <SkipForward size={12} />
                  </button>
                </div>
              )}

              <button className="vibe-close-btn" onClick={handleClose} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="peash-vibe-body" ref={chatScrollRef}>
              {chatMessages.length === 0 ? (
                <div className="vibe-welcome-stack">
                  <div className="vibe-greeting-card">
                    <div className="greeting-badge">
                      <Sparkles size={12} />
                      <span>Ready to Evaluate</span>
                    </div>
                    <h3>Explore Architecture, Rates & Credentials</h3>
                    <p>Tap a topic below or ask any direct question about Peash's Day-1 capabilities.</p>
                  </div>

                  {/* 4 Clean Bento Cards */}
                  <div className="vibe-cards-grid">
                    {VIBE_HELP_CARDS.map((card, idx) => {
                      const Icon = card.icon;
                      return (
                        <button
                          key={idx}
                          className="vibe-card-btn"
                          onClick={() => handleAsk(card.query)}
                          style={{ "--accent": card.color }}
                        >
                          <div className="card-top-line">
                            <div className="card-icon-pill">
                              <Icon size={16} />
                            </div>
                            <span className="card-badge">{card.badge}</span>
                          </div>
                          <h5>{card.title}</h5>
                          <p>{card.desc}</p>
                          <div className="card-cue">
                            <span>Ask</span>
                            <ArrowRight size={13} />
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* FAQ Chips */}
                  <div className="vibe-faqs-wrap">
                    <span className="faqs-label">Quick Questions:</span>
                    <div className="faqs-list">
                      {POPULAR_FAQS.map((faq, fIdx) => (
                        <button
                          key={fIdx}
                          className="vibe-faq-chip"
                          onClick={() => handleAsk(faq)}
                        >
                          <span>🕸️ {faq}</span>
                          <ArrowRight size={12} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Chat Stream */
                <div className="vibe-chat-stack">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`vibe-chat-bubble ${msg.sender}`}>
                      {msg.sender === "copilot" && (
                        <div className="copilot-avatar-icon">
                          <Bot size={14} />
                        </div>
                      )}
                      <div className="bubble-card">
                        <p>{msg.text}</p>

                        {msg.sender === "copilot" && (
                          <div className="bubble-actions">
                            <button
                              className={`voice-listen-pill ${speakingMsgIndex === index ? "active" : ""}`}
                              onClick={() => handleToggleVoice(msg.text, index)}
                            >
                              {speakingMsgIndex === index ? (
                                <>
                                  <Square size={11} />
                                  <span>Stop</span>
                                </>
                              ) : (
                                <>
                                  <Volume2 size={12} />
                                  <span>Listen</span>
                                </>
                              )}
                            </button>

                            {msg.section && (
                              <button 
                                className="jump-section-pill"
                                onClick={() => handleScrollTo(msg.section)}
                              >
                                <ArrowRight size={12} />
                                <span>{msg.sectionLabel || "Jump to Section"}</span>
                              </button>
                            )}

                            {msg.actionUrl && (
                              <a
                                href={msg.actionUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ext-link-pill"
                              >
                                <ExternalLink size={12} />
                                <span>{msg.actionText || "View"}</span>
                              </a>
                            )}
                          </div>
                        )}

                        {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                          <div className="suggested-chips-wrap">
                            {msg.suggestedQuestions.map((sq, sIdx) => (
                              <button
                                key={sIdx}
                                onClick={() => handleAsk(sq)}
                                className="suggested-chip"
                              >
                                <span>✦ {sq}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isThinking && (
                    <div className="vibe-chat-bubble copilot thinking">
                      <div className="copilot-avatar-icon">
                        <Bot size={14} />
                      </div>
                      <div className="bubble-card thinking-card">
                        <span className="thinking-dot" />
                        <span>Searching Peash's Knowledge Base...</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="peash-vibe-input-bar">
              {chatMessages.length > 0 && (
                <button 
                  className="vibe-reset-btn"
                  onClick={() => setChatMessages([])}
                >
                  <HelpCircle size={14} />
                  <span>Menu</span>
                </button>
              )}
              
              <input
                type="text"
                placeholder="Ask about stack, rates, HubSpot, or case studies..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAsk(inputQuery);
                }}
                className="vibe-input"
              />
              
              <button
                className="vibe-send-btn"
                onClick={() => handleAsk(inputQuery)}
                disabled={!inputQuery.trim()}
              >
                <Send size={15} />
              </button>
            </div>

            {/* Footer */}
            <div className="peash-vibe-footer">
              <div className="footer-jumps">
                <button onClick={() => handleScrollTo("projects")}>🚀 Projects</button>
                <span>•</span>
                <button onClick={() => handleScrollTo("skills")}>⚡ Skills</button>
                <span>•</span>
                <button onClick={() => handleScrollTo("certifications")}>🏆 Certs</button>
              </div>
              <a
                href={PROFILE.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="vibe-calendly-btn"
              >
                <Calendar size={12} />
                <span>Book Call</span>
                <ArrowUpRight size={11} />
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
