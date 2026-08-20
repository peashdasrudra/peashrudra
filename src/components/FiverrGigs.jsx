import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
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
          <div className="kicker">./freelance --fiverr</div>
          <h2 className="section-title">Need a custom AI or CRM system?</h2>
          <p className="section-desc">
            Top Rated Pro on Fiverr. I build production-grade, automated RevOps engines and Agentic AI systems for global clients.
          </p>
        </motion.div>

        <div className="fiverr-premium-grid">
          {FIVERR_GIGS.map((gig, idx) => (
            <motion.a
              key={idx}
              href={gig.url}
              target="_blank"
              rel="noopener noreferrer"
              className="fiverr-premium-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="fiverr-card-glow" aria-hidden="true" />
              
              <div className="fiverr-card-inner">
                <div className="fiverr-card-header">
                  <div className="fiverr-badge">
                    <Star size={14} fill="currentColor" /> Pro Seller
                  </div>
                  <ExternalLink size={20} className="fiverr-link-icon" />
                </div>
                
                <h3 className="fiverr-gig-title">{gig.title}</h3>
                <p className="fiverr-gig-desc">{gig.description}</p>
                
                <div className="fiverr-pricing-row">
                  <div className="fiverr-price-block">
                    <span>Basic</span>
                    <strong>{gig.pricing.basic}</strong>
                  </div>
                  <div className="fiverr-price-block">
                    <span>Standard</span>
                    <strong>{gig.pricing.standard}</strong>
                  </div>
                  <div className="fiverr-price-block highlight">
                    <span>Premium</span>
                    <strong>{gig.pricing.premium}</strong>
                  </div>
                </div>
                
                <div className="pill-row fiverr-tools">
                  {gig.tools.map((tool, i) => (
                    <span key={i} className="pill">{tool}</span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
