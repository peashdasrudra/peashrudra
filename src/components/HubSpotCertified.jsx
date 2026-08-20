import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, ShieldCheck, Award } from "lucide-react";
import { HUBSPOT_BADGES, CERTIFICATIONS } from "../data/portfolio";
import "./HubSpotCertified.css";

function HubSpotSprocket({ size = 32, className = "" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="HubSpot Logo"
    >
      <path
        d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z"
        fill="currentColor"
      />
    </svg>
  );
}

const hubspotCerts = CERTIFICATIONS.filter((c) => c.type === "crm");

function CertCard3D({ cert, index }) {
  const cardRef = useRef(null);
  
  // 3D Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  // Card tilts opposite to mouse position
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
    
    // Spotlight effect
    e.currentTarget.style.setProperty("--mx", mouseX + "px");
    e.currentTarget.style.setProperty("--my", mouseY + "px");
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="hs-card-3d-wrapper spot"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="hs-card-glow" aria-hidden="true" />

      {/* Badge image with Z-translation for parallax */}
      <motion.div 
        className="hs-badge-wrap"
        style={{ translateZ: "40px" }}
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: index * 0.5 }}
      >
        {cert.badgeImageUrl ? (
          <a
            href={cert.verifyUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            title={`Verify ${cert.title}`}
            className="hs-badge-link"
          >
            <img
              src={cert.badgeImageUrl}
              alt={cert.title}
              className="hs-badge-img"
              loading="lazy"
            />
          </a>
        ) : (
          <div className="hs-badge-placeholder">
            <Award size={36} />
          </div>
        )}
      </motion.div>

      {/* Info */}
      <div className="hs-card-info" style={{ transform: "translateZ(20px)" }}>
        <h3 className="hs-card-title">{cert.title}</h3>
        <p className="hs-card-issuer">
          <HubSpotSprocket size={14} className="hs-mini-sprocket" />
          {cert.issuer}
        </p>
        <div className="hs-card-meta">
          <span className="hs-card-date">{cert.date}</span>
          {cert.expiry && (
            <span className="hs-card-expiry">
              Valid until {cert.expiry}
            </span>
          )}
        </div>

        <div className="hs-card-skills">
          {cert.skills.map((skill, j) => (
            <span key={j} className="hs-skill-pill">
              {skill}
            </span>
          ))}
        </div>

        {cert.verifyUrl && (
          <a
            href={cert.verifyUrl}
            className="hs-verify-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ShieldCheck size={13} /> Verify Credential
            <ExternalLink size={11} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function HubSpotCertified() {
  return (
    <section id="hubspot-certified" className="hs-section">
      {/* 3D Background Orbital Rings */}
      <div className="hs-orbital-ring hs-ring-1" aria-hidden="true" />
      <div className="hs-orbital-ring hs-ring-2" aria-hidden="true" />

      <div className="wrap hs-wrap-relative">
        {/* Header */}
        <motion.div
          className="hs-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hs-logo-row">
            <div className="hs-logo-glow">
              <HubSpotSprocket size={40} className="hs-sprocket" />
            </div>
            <div className="hs-label-group">
              <span className="hs-label">HubSpot Academy</span>
              <span className="hs-verified-tag">
                <ShieldCheck size={12} /> verified
              </span>
            </div>
          </div>

          <h2 className="hs-title">
            <span className="hs-count">{hubspotCerts.length}×</span> HubSpot
            Certified
          </h2>
          <p className="hs-subtitle">
            Revenue Operations, Marketing Hub & Reporting — certified expertise
            that separates talk from proof. Every credential is
            recruiter-verifiable.
          </p>
        </motion.div>

        {/* 3D Podium Grid */}
        <div className="hs-3d-grid">
          {hubspotCerts.map((cert, i) => (
            <CertCard3D key={i} cert={cert} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="hs-bottom-note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p>
            All certifications issued by <strong>HubSpot Academy</strong> — the
            industry standard for CRM & RevOps credentialing.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
