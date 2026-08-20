import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Calendar, Building2, CheckCircle2 } from "lucide-react";
import { EXPERIENCE } from "../data/portfolio";
import "./Experience.css";

function ExperienceCard({ exp, index }) {
  // Custom brand colors based on company for the gradient reveal
  let brandColor = "rgba(30, 215, 96, 0.4)"; // default green
  let brandGlow = "rgba(30, 215, 96, 0.1)";
  if (exp.company.toLowerCase().includes("clickless")) {
    brandColor = "rgba(249, 115, 22, 0.5)"; // orange
    brandGlow = "rgba(249, 115, 22, 0.1)";
  }
  if (exp.company.toLowerCase().includes("appstick")) {
    brandColor = "rgba(59, 130, 246, 0.5)"; // blue
    brandGlow = "rgba(59, 130, 246, 0.1)";
  }

  return (
    <div className="exp-timeline-item">
      {/* Timeline Node */}
      <div className="exp-timeline-node">
        <motion.div 
          className="exp-node-inner"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 300, delay: index * 0.2 }}
          style={{ borderColor: brandColor }}
        />
      </div>

      {/* Glass Card */}
      <motion.div
        className="exp-glass-card spot"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px");
          e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px");
        }}
        style={{ "--brand-glow": brandGlow, "--brand-color": brandColor }}
      >
        <div className="exp-card-header">
          <div className="exp-header-main">
            <div className="exp-company-logo">
              <Building2 size={24} />
            </div>
            <div className="exp-titles">
              <h3 className="exp-role-title">{exp.role}</h3>
              <span className="exp-company-name">{exp.company}</span>
            </div>
          </div>
          
          <div className="exp-meta">
            <div className="exp-meta-pill">
              <Calendar size={12} />
              <span>{exp.period}</span>
            </div>
            <div className="exp-meta-pill">
              <MapPin size={12} />
              <span>{exp.location}</span>
            </div>
          </div>
        </div>

        <div className="exp-card-body">
          <ul className="exp-bullet-list">
            {exp.bullets.map((bullet, j) => (
              <li key={j}>
                <CheckCircle2 size={16} className="exp-check-icon" style={{ color: brandColor }} />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="exp-card-footer">
          <div className="pill-row">
            {exp.tags.map((tag) => (
              <span key={tag} className="pill exp-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 85%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="work">
      <div className="wrap">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="kicker">./experience --live</div>
          <h2 className="section-title">Real systems, live clients.</h2>
          <p className="section-desc">
            Not tutorials — production automation and engineering work shipped
            for real teams.
          </p>
        </motion.div>

        <div className="exp-timeline-container" ref={containerRef}>
          {/* The glowing vertical line */}
          <div className="exp-timeline-track">
            <motion.div 
              className="exp-timeline-progress" 
              style={{ height: lineHeight }}
            />
          </div>

          <div className="exp-timeline-items">
            {EXPERIENCE.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
