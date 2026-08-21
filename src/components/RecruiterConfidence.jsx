import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, Zap, Award, CheckCircle2, Copy, Check, 
  ArrowRight, Sparkles, TrendingUp, Clock, Bot, FileText, Calendar 
} from "lucide-react";
import { PROFILE } from "../data/portfolio";
import "./RecruiterConfidence.css";

const CONFIDENCE_PILLARS = [
  {
    icon: Clock,
    title: "Day-1 Deployment Ready",
    subtitle: "Zero Ramp-up Time",
    desc: "Pre-built modular LangGraph agent harnesses, MCP tool-call architectures, and automated CRM triggers ready for instant production rollout.",
    badge: "Immediate Start",
    color: "#1ed760",
  },
  {
    icon: Award,
    title: "Triple-Certified RevOps Specialist",
    subtitle: "HubSpot Academy & Industry Credentials",
    desc: "Certified in Revenue Operations, Marketing Hub Software, and Reporting. Architect of 20+ live B2B CRM pipelines with clean data integrity.",
    badge: "HubSpot Verified",
    color: "#ff7a59",
  },
  {
    icon: TrendingUp,
    title: "45% Measured Operational ROI",
    subtitle: "Proven Business Impact",
    desc: "Eliminates repetitive manual CRM tasks, accelerates Speed-to-Lead from 4 hours to under 60 seconds, and scales sales pipeline velocity.",
    badge: "Verified Metrics",
    color: "#38bdf8",
  },
  {
    icon: Bot,
    title: "Agentic RAG & Full-Stack Mastery",
    subtitle: "Production AI Infrastructure",
    desc: "Architect of deterministic agentic systems using pgvector, Pinecone, LangGraph, Python FastAPI, and Flutter with human-in-the-loop safety.",
    badge: "Full-Stack AI",
    color: "#a855f7",
  },
];

export default function RecruiterConfidence() {
  const [copiedSummary, setCopiedSummary] = useState(false);

  const handleCopyRecruiterPitch = () => {
    const pitch = `Candidate: Peash Das Rudra
Role: RevOps & AI Automation Engineer
Key Strengths:
• Triple HubSpot Certified (RevOps, Marketing Hub, Reporting)
• Production Agentic RAG Systems (LangGraph, MCP Tool-Calling, pgvector)
• 20+ live B2B automations shipped | 45% manual overhead eliminated
• Availability: Open to Full-Time / Contract / Freelance Worldwide
• Portfolio & Resume: ${window.location.origin} | Email: ${PROFILE.email}`;

    navigator.clipboard?.writeText(pitch);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2200);
  };

  return (
    <section className="recruiter-section" id="recruiter-matrix">
      <div className="wrap">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="kicker">./recruiter-decision-matrix --verified-roi</div>
          <h2 className="section-title">Why hiring Peash is a zero-risk decision.</h2>
          <p className="section-desc">
            Direct answers to what engineering leaders and RevOps executives care about: speed, reliability, certifications, and measurable business ROI.
          </p>
        </motion.div>

        {/* 4-Pillar Decision Grid */}
        <div className="recruiter-grid">
          {CONFIDENCE_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                className="recruiter-card"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <div className="recruiter-card-beam" style={{ backgroundColor: pillar.color }} />

                <div className="recruiter-card-head">
                  <div 
                    className="recruiter-icon-box"
                    style={{ color: pillar.color, backgroundColor: `${pillar.color}15`, borderColor: `${pillar.color}35` }}
                  >
                    <Icon size={20} />
                  </div>
                  <span className="recruiter-pillar-badge" style={{ color: pillar.color, borderColor: `${pillar.color}30` }}>
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="recruiter-pillar-title">{pillar.title}</h3>
                <h4 className="recruiter-pillar-sub">{pillar.subtitle}</h4>
                <p className="recruiter-pillar-desc">{pillar.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* High-Converting Executive Action Bar */}
        <motion.div 
          className="recruiter-action-banner"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="recruiter-banner-text">
            <div className="recruiter-live-badge">
              <span className="live-beacon-green" />
              <span>Available for Full-Time & Contract Engagements</span>
            </div>
            <h3>Ready to automate your operations or deploy production AI agents?</h3>
          </div>

          <div className="recruiter-banner-btns">
            <a
              href={PROFILE.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary recruiter-primary-btn"
            >
              <Zap size={14} />
              <span>Book 30-Min Discovery Call</span>
              <ArrowRight size={13} />
            </a>

            <button
              onClick={handleCopyRecruiterPitch}
              className="btn btn-outline recruiter-copy-btn"
              title="Copy candidate summary for your hiring manager"
            >
              {copiedSummary ? (
                <>
                  <Check size={14} className="text-green" />
                  <span>Candidate Pitch Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Candidate Summary</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
