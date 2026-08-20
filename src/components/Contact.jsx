import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ExternalLink, Copy, Check, ArrowRight, Calendar } from "lucide-react";
import { PROFILE } from "../data/portfolio";
import "./Contact.css";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  function handleCopyEmail() {
    navigator.clipboard.writeText(PROFILE.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {});
  }

  return (
    <section id="contact">
      <div className="wrap">
        <motion.div
          className="contact-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="contact-badge">
            <span className="pulse" />
            Available for new opportunities
          </div>

          <h2>
            Let's build something{" "}
            <span className="accent">extraordinary</span> together.
          </h2>

          <p>
            Open to freelance automation projects, CRM consulting, and full-time
            remote or Bangladesh-based engineering roles. Let's talk about what
            you need built.
          </p>

          <div className="contact-actions">
            <a
              href={PROFILE.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary contact-btn"
            >
              <Calendar size={15} />
              Book a meeting
              <ArrowRight size={14} />
            </a>

            <a
              href={`mailto:${PROFILE.email}`}
              className="btn-outline contact-btn"
            >
              <Mail size={15} />
              Send me an email
            </a>

            <button
              className="btn-outline contact-btn"
              onClick={handleCopyEmail}
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? "Email copied!" : "Copy email"}
            </button>
          </div>

          <div className="contact-links">
            <a
              href={PROFILE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-chip"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <a
              href={PROFILE.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-chip"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
            <a
              href={PROFILE.social.fiverr}
              target="_blank"
              rel="noopener noreferrer"
              className="link-chip"
            >
              <ExternalLink size={15} />
              Fiverr
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="link-chip"
            >
              <Mail size={15} />
              {PROFILE.email}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
