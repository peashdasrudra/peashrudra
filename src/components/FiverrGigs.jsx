import { motion } from "framer-motion";
import { ExternalLink, DollarSign, ArrowRight } from "lucide-react";
import { FIVERR_GIGS } from "../data/portfolio";
import "./FiverrGigs.css";

export default function FiverrGigs() {
  return (
    <section id="fiverr">
      <div className="wrap">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="kicker">./freelance --gigs</div>
          <h2 className="section-title">Hire me on Fiverr.</h2>
          <p className="section-desc">
            Production-ready automation services available now. Real results, fixed pricing, fast delivery.
          </p>
        </motion.div>

        <div className="gigs-grid">
          {FIVERR_GIGS.map((gig, i) => (
            <motion.a
              key={i}
              href={gig.url}
              target="_blank"
              rel="noopener noreferrer"
              className="gig-card spot"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px");
                e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px");
              }}
            >
              <div className="gig-header">
                <div className="gig-fiverr-badge">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M13 13V5H5v-.5C5 3.12 5.12 3 5.5 3H8V0H5.5A3.5 3.5 0 002 3.5V5H0v3h2v5h3V8h3v5h3V8h2V5h-2v8h2z"/>
                  </svg>
                  Fiverr Pro
                </div>
                <ExternalLink size={14} className="gig-external" />
              </div>

              <h3 className="gig-title">{gig.title}</h3>
              <p className="gig-desc">{gig.description}</p>

              <div className="gig-pricing">
                <div className="gig-price">
                  <span className="price-label">Basic</span>
                  <span className="price-value">{gig.pricing.basic}</span>
                </div>
                <div className="gig-price">
                  <span className="price-label">Standard</span>
                  <span className="price-value">{gig.pricing.standard}</span>
                </div>
                <div className="gig-price gig-price-premium">
                  <span className="price-label">Premium</span>
                  <span className="price-value">{gig.pricing.premium}</span>
                </div>
              </div>

              <div className="gig-tools">
                <span className="gig-tools-label">Tools:</span>
                <div className="pill-row">
                  {gig.tools.slice(0, 5).map((tool, j) => (
                    <span key={j} className="pill">{tool}</span>
                  ))}
                  {gig.tools.length > 5 && (
                    <span className="pill">+{gig.tools.length - 5} more</span>
                  )}
                </div>
              </div>

              <div className="gig-cta">
                View on Fiverr <ArrowRight size={13} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
