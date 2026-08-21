import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Calendar, ExternalLink, Award, Sparkles, CheckCircle2, BadgeCheck } from "lucide-react";
import { CERTIFICATIONS } from "../data/portfolio";
import "./Certifications.css";

const ISSUER_THEMES = {
  "IBM": { color: "#38bdf8", bg: "rgba(56, 189, 248, 0.12)", border: "rgba(56, 189, 248, 0.35)", iconColor: "#38bdf8" },
  "Simplilearn (Microsoft)": { color: "#00a4ef", bg: "rgba(0, 164, 239, 0.12)", border: "rgba(0, 164, 239, 0.35)", iconColor: "#00a4ef" },
  "Simplilearn (Google Cloud)": { color: "#ea4335", bg: "rgba(234, 67, 53, 0.12)", border: "rgba(234, 67, 53, 0.35)", iconColor: "#ea4335" },
  "Bangladesh Computer Council × Khulna University": { color: "#1ed760", bg: "rgba(30, 215, 96, 0.12)", border: "rgba(30, 215, 96, 0.35)", iconColor: "#1ed760" },
  "HubSpot Academy": { color: "#ff7a59", bg: "rgba(255, 122, 89, 0.12)", border: "rgba(255, 122, 89, 0.35)", iconColor: "#ff7a59" },
};

function CredentialCard({ cert }) {
  const issuerTheme = ISSUER_THEMES[cert.issuer] || { 
    color: "#1ed760", 
    bg: "rgba(30, 215, 96, 0.12)", 
    border: "rgba(30, 215, 96, 0.35)", 
    iconColor: "#1ed760" 
  };

  return (
    <div
      className="cert-glass-card spot"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px");
        e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px");
      }}
    >
      {/* Holographic Laser Beam on Top */}
      <div className="cert-glass-beam" />

      <div className="cert-glass-inner">
        {/* Header */}
        <div className="cert-header">
          <div 
            className="cert-icon-badge"
            style={{ 
              color: issuerTheme.iconColor, 
              backgroundColor: issuerTheme.bg, 
              borderColor: issuerTheme.border 
            }}
          >
            <ShieldCheck size={20} />
          </div>

          <div className="cert-header-meta">
            <div className="cert-date-badge">
              <Calendar size={11} />
              <span>{cert.date}</span>
            </div>
            <div className="cert-verified-pill">
              <BadgeCheck size={12} className="text-green" />
              <span>Verified</span>
            </div>
          </div>
        </div>

        {/* Title & Issuer */}
        <h3 className="cert-title">{cert.title}</h3>
        
        <div className="cert-issuer-row">
          <CheckCircle2 size={13} style={{ color: issuerTheme.color }} />
          <span className="cert-issuer">{cert.issuer}</span>
        </div>

        {/* Credential ID */}
        {cert.credentialId && (
          <div className="cert-credential">
            <span>ID:</span> <code>{cert.credentialId}</code>
          </div>
        )}

        {/* Skills Tag Pills */}
        <div className="cert-skills">
          {cert.skills.map((skill, j) => (
            <span key={j} className="cert-pill">
              {skill}
            </span>
          ))}
        </div>

        {/* Action Button */}
        {cert.verifyUrl ? (
          <a
            href={cert.verifyUrl}
            className="cert-verify-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ShieldCheck size={13} />
            <span>Verify Credential</span>
            <ExternalLink size={11} />
          </a>
        ) : (
          <div className="cert-verified-stamp">
            <Sparkles size={12} className="text-green" />
            <span>Authenticated Completion</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Certifications() {
  // Single continuous moving stream containing all verified credentials
  const allCerts = CERTIFICATIONS;
  const marqueeItems = [...allCerts, ...allCerts, ...allCerts];

  return (
    <section id="certifications" className="certs-section">
      {/* Ambient Multi-Spectrum Background Light Flares */}
      <div className="certs-bg-glow" aria-hidden="true" />

      <div className="wrap">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="kicker">./credentials --verified-archive</div>
          <h2 className="section-title">Certified & credential-backed.</h2>
          <p className="section-desc">
            Continuous stream of industry-recognized certifications across AI Foundations, Prompt Engineering, Cloud Infrastructure, and CRM Automation.
          </p>
        </motion.div>
      </div>

      {/* Single Continuous Moving Marquee Stream */}
      <div className="certs-streams-container single-stream">
        <div className="certs-marquee-stream">
          <div className="certs-track track-left">
            {marqueeItems.map((cert, index) => (
              <CredentialCard key={`cert-${index}`} cert={cert} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
