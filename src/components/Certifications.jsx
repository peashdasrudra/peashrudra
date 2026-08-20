import { motion } from "framer-motion";
import { ShieldCheck, Calendar, ExternalLink } from "lucide-react";
import { CERTIFICATIONS } from "../data/portfolio";
import "./Certifications.css";

export default function Certifications() {
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

        <div className="certs-grid">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={i}
              className={`cert-card cert-type-${cert.type}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
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

              {cert.expiry && (
                <div className="cert-expiry">Valid until {cert.expiry}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
