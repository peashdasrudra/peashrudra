import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Calendar, ExternalLink } from "lucide-react";
import { CERTIFICATIONS } from "../data/portfolio";
import "./Certifications.css";

export default function Certifications() {
  const scrollRef = useRef(null);
  const animRef = useRef(null);

  // We only want non-CRM certs for this marquee
  const certs = CERTIFICATIONS.filter((cert) => cert.type !== "crm");
  // Double them up for infinite scroll illusion
  const marqueeItems = [...certs, ...certs, ...certs];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let speed = 0.8;
    let paused = false;

    const step = () => {
      if (!paused && el) {
        el.scrollLeft += speed;
        // Loop back when reaching roughly the middle
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);

    const pause = () => { paused = true; };
    const resume = () => { paused = false; };
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume);

    return () => {
      cancelAnimationFrame(animRef.current);
      if(el) {
        el.removeEventListener("mouseenter", pause);
        el.removeEventListener("mouseleave", resume);
        el.removeEventListener("touchstart", pause);
        el.removeEventListener("touchend", resume);
      }
    };
  }, []);

  return (
    <section id="certifications">
      <div className="wrap">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="kicker">./certifications --verified</div>
          <h2 className="section-title">Certified & credential-backed.</h2>
          <p className="section-desc">
            Industry-recognized certifications from IBM, HubSpot, Google Cloud, Microsoft, and Bangladesh Computer Council.
          </p>
        </motion.div>
      </div>

      <div className="certs-marquee-wrapper">
        <div className="certs-track" ref={scrollRef}>
          {marqueeItems.map((cert, i) => (
            <div
              key={i}
              className={`cert-parallax-card cert-type-${cert.type}`}
            >
              <div className="cert-parallax-inner">
                <div className="cert-header">
                  <div className={`cert-icon-badge cert-type-${cert.type}`}>
                    <ShieldCheck size={18} />
                  </div>
                  <div className="cert-date">
                    <Calendar size={10} />
                    {cert.date}
                  </div>
                </div>

                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>

                {cert.credentialId && (
                  <div className="cert-credential">
                    ID: {cert.credentialId.slice(0, 12)}...
                  </div>
                )}

                <div className="cert-skills">
                  {cert.skills.map((skill, j) => (
                    <span key={j} className="pill">
                      {skill}
                    </span>
                  ))}
                </div>

                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    className="cert-verify-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ShieldCheck size={12} /> Verify
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Fade edges */}
        <div className="certs-fade certs-fade-left" />
        <div className="certs-fade certs-fade-right" />
      </div>
    </section>
  );
}
