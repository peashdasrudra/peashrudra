import { useState, useEffect, useRef } from "react";
import { 
  Sparkles, X, Bot, Send, Compass, Zap, Award, Calendar, 
  ArrowRight, Play, Pause, SkipForward, Disc3, ExternalLink,
  HelpCircle, ArrowUpRight, Volume2, Square, Menu, ChevronRight, 
  Radio, MessageCircle, Mail, FileText, Key, Check, ShieldCheck
} from "lucide-react";
import { PROFILE } from "../data/portfolio";
import { LINKS } from "../data/links";
import { answerPeashQuestionAsync } from "../utils/peashAiEngine";
import { useMusic } from "../context/MusicContext";
import "./PeashCompanionGuide.css";

// 3 Curated Ultra-Clean FAQs
const PRIMARY_FAQS = [
  {
    title: "What does Peash build?",
    desc: "Autonomous AI agents, HubSpot RevOps pipelines & CRM automations.",
    query: "What is Peash's core specialization in AI agents and RevOps?",
  },
  {
    title: "Case Studies & ROI",
    desc: "3-in-1 production case studies with 45% operational bandwidth savings.",
    query: "Explain the 3-in-1 production case studies and LangGraph multi-agent architecture.",
  },
  {
    title: "Rates & Hiring Availability",
    desc: "$45–$65/hr contract availability with zero ramp-up time.",
    query: "What are his hourly/contract rates and freelance availability?",
  },
];

// Expanded Menu Items (Accessible via Menu Button)
const MENU_TOPICS = [
  {
    title: "HubSpot & AI Credentials",
    badge: "IBM • MICROSOFT • HUBSPOT",
    query: "What certifications does Peash hold and what is his track record in RevOps?",
  },
  {
    title: "LangGraph & MCP Architecture",
    badge: "MULTI-AGENT HARNESS",
    query: "Tell me about his LangGraph & MCP tools and day-1 deployment harnesses.",
  },
  {
    title: "Fiverr Top-Rated Client Work",
    badge: "GLOBAL B2B",
    query: "Tell me about his real estate automation and Fiverr client portfolio.",
  },
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

/* ─── Ultra-Sleek Spider-Man Mascot ─── */
function SpiderManSleekMascot({ isSinging }) {
  return (
    <div className={`spidey-sleek-icon ${isSinging ? "singing" : ""}`}>
      {/* Floating Singing Notes */}
      {isSinging && (
        <div className="sleek-singing-notes">
          <span className="s-note n1">♪</span>
          <span className="s-note n2">♫</span>
        </div>
      )}

      {/* High-Resolution Mask SVG */}
      <div className="sleek-mask-holder">
        <svg viewBox="0 0 100 100" className="sleek-mask-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="spideyMaskShade" cx="40%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="60%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#881337" />
            </radialGradient>
          </defs>
          <path
            d="M50 10 C28 10, 16 28, 18 56 C20 76, 38 92, 50 94 C62 92, 80 76, 82 56 C84 28, 72 10, 50 10 Z"
            fill="url(#spideyMaskShade)"
            stroke="#0a0a0e"
            strokeWidth="2.5"
          />
          {/* Web Strands */}
          <path d="M50 10 L50 94" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2" />
          <path d="M50 50 L18 56" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2" />
          <path d="M50 50 L82 56" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2" />
          <path d="M50 50 L26 26" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2" />
          <path d="M50 50 L74 26" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2" />
          <path d="M38 32 Q50 36 62 32" fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2" />
          <path d="M30 48 Q50 56 70 48" fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2" />
          {/* Illuminated Glowing Spider Eyes */}
          <path d="M44 42 Q24 44, 24 54 Q32 64, 44 60 Z" fill="#ffffff" stroke="#09090b" strokeWidth="1.4" />
          <path d="M56 42 Q76 44, 76 54 Q68 64, 56 60 Z" fill="#ffffff" stroke="#09090b" strokeWidth="1.4" />
        </svg>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HIGH-CONVERTING INBOUND SPIDER-MAN COPILOT
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
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [speakingMsgIndex, setSpeakingMsgIndex] = useState(null);
  
  const [inputQuery, setInputQuery] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const chatScrollRef = useRef(null);

  // OpenAI API Key Management State
  const [hasApiKey, setHasApiKey] = useState(false);
  const [customApiKeyInput, setCustomApiKeyInput] = useState("");
  const [showKeyForm, setShowKeyForm] = useState(false);
  const [keySaveSuccess, setKeySaveSuccess] = useState(false);

  useEffect(() => {
    const envKey = import.meta.env.VITE_OPENAI_API_KEY;
    const localKey = typeof window !== "undefined" ? localStorage.getItem("peash_openai_api_key") : null;
    const active = (envKey && envKey.startsWith("sk-")) || (localKey && localKey.startsWith("sk-"));
    setHasApiKey(Boolean(active));
  }, []);

  const handleSaveApiKey = () => {
    if (!customApiKeyInput.trim()) return;
    const key = customApiKeyInput.trim();
    if (typeof window !== "undefined") {
      localStorage.setItem("peash_openai_api_key", key);
      window.__PEASH_OPENAI_KEY__ = key;
    }
    setHasApiKey(true);
    setKeySaveSuccess(true);
    setTimeout(() => {
      setKeySaveSuccess(false);
      setShowKeyForm(false);
      setCustomApiKeyInput("");
    }, 1600);
  };

  const handleClearApiKey = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("peash_openai_api_key");
      delete window.__PEASH_OPENAI_KEY__;
    }
    const envKey = import.meta.env.VITE_OPENAI_API_KEY;
    setHasApiKey(Boolean(envKey && envKey.startsWith("sk-")));
  };

  // 5-Second Initial Greeting Balloon
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
      setIsMenuDrawerOpen(false);
      setShowKeyForm(false);
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
    setIsMenuDrawerOpen(false);
    setShowKeyForm(false);
  };

  const handleAsk = async (queryText) => {
    if (!queryText.trim()) return;
    const text = queryText.trim();

    setChatMessages((prev) => [...prev, { sender: "user", text }]);
    setInputQuery("");
    setIsThinking(true);
    setIsMenuDrawerOpen(false);

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
      {/* ─── SLEEK, MINIMAL FLOATING SPIDER-MAN BOT TRIGGER ─── */}
      <div className="peash-clean-trigger-dock">
        {isBalloonVisible && !isOpen && (
          <div className="clean-guide-balloon" onClick={handleOpen}>
            <div className="balloon-top-row">
              <span className="balloon-pill">✦ AI COPILOT</span>
              <button 
                className="balloon-x"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsBalloonVisible(false);
                }}
              >
                <X size={13} />
              </button>
            </div>
            <p>Tap to explore case studies & play soundtrack 🎵</p>
          </div>
        )}

        <button 
          className={`sleek-bot-capsule ${isMusicPlaying ? "singing-active" : ""}`}
          onClick={handleOpen}
          aria-label="Open AI Copilot"
        >
          <SpiderManSleekMascot isSinging={isMusicPlaying} />
          
          {/* Subtle Cyber Status Dot */}
          <span className={`sleek-status-dot ${isMusicPlaying ? "live-green" : "active-red"}`} />
        </button>
      </div>

      {/* ─── FAST, ZERO-BLINK COPILOT MODAL ─── */}
      {isOpen && (
        <div className="clean-modal-backdrop" onClick={handleClose}>
          <div className="clean-copilot-container" onClick={(e) => e.stopPropagation()}>
            
            {/* Top Sheet Drag Line on Mobile */}
            <div className="clean-drag-indicator" onClick={handleClose} />

            {/* ─── 1. TOP HEADER (BRAND + MENU + CLOSE) ─── */}
            <div className="clean-modal-header">
              <div className="header-brand-box">
                <SpiderManSleekMascot isSinging={isMusicPlaying} />
                <div className="brand-meta">
                  <div className="brand-title-line">
                    <h4>Peash Copilot</h4>
                    <span className="badge-spider">AI ASSISTANT</span>
                  </div>
                  <span className="brand-subtitle">RevOps & Autonomous Systems</span>
                </div>
              </div>

              <div className="header-controls-row">
                <button 
                  className={`btn-menu-drawer ${isMenuDrawerOpen ? "active" : ""}`}
                  onClick={() => setIsMenuDrawerOpen(!isMenuDrawerOpen)}
                  title="Menu"
                >
                  <Menu size={17} />
                  <span>Menu</span>
                </button>

                <button 
                  className="btn-modal-close" 
                  onClick={handleClose} 
                  title="Close"
                >
                  <X size={19} />
                </button>
              </div>
            </div>

            {/* ─── 2. SLEEK SPIDER-VERSE SOUNDTRACK HUD ─── */}
            {currentTrack && (
              <div className={`cyber-soundtrack-hud ${isMusicPlaying ? "active-groove" : ""}`}>
                <div className="hud-left-track">
                  <div className="cyber-disc-container">
                    <Disc3 size={19} className={`cyber-vinyl ${isMusicPlaying ? "spinning" : ""}`} />
                  </div>
                  <div className="hud-track-meta">
                    <div className="hud-live-tag">
                      <Radio size={10} className={isMusicPlaying ? "pulse-radio text-green" : ""} />
                      <span>{isMusicPlaying ? "SOUNDTRACK PLAYING" : "PAUSED"}</span>
                    </div>
                    <span className="hud-song-name">{currentTrack.title}</span>
                  </div>
                </div>

                <div className="hud-controls-group">
                  <button 
                    onClick={toggleMusic} 
                    className="btn-cyber-play"
                    title={isMusicPlaying ? "Pause Soundtrack" : "Play Soundtrack"}
                  >
                    {isMusicPlaying ? <Pause size={14} /> : <Play size={14} />}
                    <span>{isMusicPlaying ? "PAUSE" : "PLAY"}</span>
                  </button>

                  <button 
                    onClick={nextMusicTrack} 
                    className="btn-cyber-skip"
                    title="Next Song"
                  >
                    <SkipForward size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* ─── 3. COLLAPSIBLE TOPICS & API KEY MENU DRAWER ─── */}
            {isMenuDrawerOpen && (
              <div className="clean-menu-drawer">
                <div className="drawer-header">
                  <span>Explore More Topics:</span>
                  <button onClick={() => setIsMenuDrawerOpen(false)}><X size={14} /></button>
                </div>

                {/* 🔑 OpenAI API Key Quick Connector */}
                <div className="api-key-manager-card">
                  <div className="api-key-header-row">
                    <div className="api-status-info">
                      <span className={`api-status-dot ${hasApiKey ? "online" : "offline"}`} />
                      <span className="api-status-text">
                        {hasApiKey ? "OpenAI GPT-4o-mini Neural Engine Active" : "Deterministic Engine (Paste key to unlock GPT-4o)"}
                      </span>
                    </div>

                    <button
                      className="btn-toggle-key-input"
                      onClick={() => setShowKeyForm(!showKeyForm)}
                    >
                      <Key size={13} />
                      <span>{hasApiKey ? "Change Key" : "Paste Key"}</span>
                    </button>
                  </div>

                  {showKeyForm && (
                    <div className="api-key-input-block">
                      <div className="api-input-wrap">
                        <input
                          type="password"
                          placeholder="Paste OpenAI API Key (sk-...)"
                          value={customApiKeyInput}
                          onChange={(e) => setCustomApiKeyInput(e.target.value)}
                          className="api-key-text-input"
                        />
                        <button
                          onClick={handleSaveApiKey}
                          className="btn-save-key-action"
                          disabled={!customApiKeyInput.trim()}
                        >
                          {keySaveSuccess ? <Check size={14} /> : "Save & Connect"}
                        </button>
                      </div>
                      {hasApiKey && (
                        <button onClick={handleClearApiKey} className="btn-clear-key">
                          Disconnect Custom Key
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="drawer-items-list">
                  {MENU_TOPICS.map((item, mIdx) => (
                    <button
                      key={mIdx}
                      className="drawer-topic-card"
                      onClick={() => handleAsk(item.query)}
                    >
                      <div className="drawer-topic-text">
                        <span className="drawer-badge">{item.badge}</span>
                        <h5>{item.title}</h5>
                      </div>
                      <ChevronRight size={16} className="drawer-arrow" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ─── 4. MINIMAL CLEAN BODY WITH INBOUND ACTION HUB ─── */}
            <div className="clean-modal-body" ref={chatScrollRef}>
              {chatMessages.length === 0 ? (
                <div className="clean-welcome-layout">
                  {/* Clean Greeting Headline */}
                  <div className="clean-headline-card">
                    <div className="headline-badge">
                      <Sparkles size={13} />
                      <span>Instant Recruiter & Client Guide</span>
                    </div>
                    <h3>How can I help you evaluate Peash?</h3>
                    <p>Select any question below or book a direct strategy call.</p>
                  </div>

                  {/* ⚡ High-Conversion Inbound Quick Links Hub */}
                  <div className="inbound-quick-hub">
                    <span className="inbound-hub-label">⚡ Direct Hiring & Inbound Paths:</span>
                    <div className="inbound-pills-row">
                      <a
                        href={LINKS.calendly}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inbound-pill-btn primary"
                      >
                        <Calendar size={13} />
                        <span>Book Zoom Call</span>
                        <ArrowUpRight size={12} />
                      </a>

                      <a
                        href={LINKS.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inbound-pill-btn whatsapp"
                      >
                        <MessageCircle size={13} />
                        <span>WhatsApp Direct</span>
                        <ArrowUpRight size={12} />
                      </a>

                      <a
                        href={`mailto:${LINKS.email}`}
                        className="inbound-pill-btn email"
                      >
                        <Mail size={13} />
                        <span>Email Inbound</span>
                        <ArrowUpRight size={12} />
                      </a>

                      <a
                        href={LINKS.resumePdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inbound-pill-btn resume"
                      >
                        <FileText size={13} />
                        <span>Resume (PDF)</span>
                        <ArrowUpRight size={12} />
                      </a>
                    </div>
                  </div>

                  {/* 3 Prominent Minimal Clean FAQ Cards */}
                  <div className="clean-faq-cards-stack">
                    {PRIMARY_FAQS.map((faq, fIdx) => (
                      <button
                        key={fIdx}
                        className="clean-faq-action-card"
                        onClick={() => handleAsk(faq.query)}
                      >
                        <div className="faq-card-content">
                          <h5>🕸️ {faq.title}</h5>
                          <p>{faq.desc}</p>
                        </div>
                        <div className="faq-card-action">
                          <span>Ask</span>
                          <ArrowRight size={14} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Chat Conversation Stream */
                <div className="clean-chat-messages">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`clean-msg-row ${msg.sender}`}>
                      {msg.sender === "copilot" && (
                        <div className="bot-avatar-pill">
                          <Bot size={15} />
                        </div>
                      )}
                      <div className="msg-bubble-box">
                        <p>{msg.text}</p>

                        {msg.sender === "copilot" && (
                          <div className="msg-tools-row">
                            <button
                              className={`btn-voice-listen ${speakingMsgIndex === index ? "active" : ""}`}
                              onClick={() => handleToggleVoice(msg.text, index)}
                            >
                              {speakingMsgIndex === index ? (
                                <>
                                  <Square size={13} />
                                  <span>Stop Voice</span>
                                </>
                              ) : (
                                <>
                                  <Volume2 size={14} />
                                  <span>Listen</span>
                                </>
                              )}
                            </button>

                            {msg.section && (
                              <button 
                                className="btn-jump-section"
                                onClick={() => handleScrollTo(msg.section)}
                              >
                                <ArrowRight size={13} />
                                <span>{msg.sectionLabel || "Jump to Section"}</span>
                              </button>
                            )}

                            {msg.actionUrl && (
                              <a
                                href={msg.actionUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-ext-resource"
                              >
                                <ExternalLink size={13} />
                                <span>{msg.actionText || "View Source"}</span>
                              </a>
                            )}
                          </div>
                        )}

                        {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                          <div className="msg-suggestions-grid">
                            {msg.suggestedQuestions.map((sq, sIdx) => (
                              <button
                                key={sIdx}
                                onClick={() => handleAsk(sq)}
                                className="btn-suggestion-chip"
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
                    <div className="clean-msg-row copilot thinking">
                      <div className="bot-avatar-pill">
                        <Bot size={15} />
                      </div>
                      <div className="msg-bubble-box thinking-box">
                        <span className="thinking-pulse" />
                        <span>Searching Peash's Knowledge Base...</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ─── 5. SPACIOUS INPUT BAR ─── */}
            <div className="clean-input-bar">
              {chatMessages.length > 0 && (
                <button 
                  className="btn-chat-reset"
                  onClick={() => setChatMessages([])}
                  title="Main Menu"
                >
                  <HelpCircle size={15} />
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
                className="clean-input-box"
              />
              
              <button
                className="btn-send-message"
                onClick={() => handleAsk(inputQuery)}
                disabled={!inputQuery.trim()}
                title="Send"
              >
                <Send size={16} />
              </button>
            </div>

            {/* ─── 6. HIGH-CONVERSION INBOUND CTA FOOTER ─── */}
            <div className="clean-cta-footer">
              <div className="cta-live-status-pill">
                <span className="live-status-green-dot" />
                <span className="status-copy">AVAILABLE FOR CONTRACT & FULL-TIME</span>
              </div>

              {/* Dual Inbound Actions */}
              <div className="cta-buttons-cluster">
                <a
                  href={LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-inbound-whatsapp"
                  title="Direct WhatsApp Inbound"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={LINKS.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-large-strategy-call"
                  title="Schedule 30-Minute Discovery Strategy Call"
                >
                  <Calendar size={15} />
                  <span>Book 30-Min Call</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
