import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown, ChevronUp, Target, Lightbulb, TrendingUp } from "lucide-react";
import { PROJECTS } from "../data/portfolio";
import "./Projects.css";

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className={`proj-card spot ${project.featured ? "proj-featured" : ""}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px");
        e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px");
      }}
    >
      {/* Header */}
      <div className="proj-header">
        <div className="proj-top-row">
          <div className="proj-icon">{project.icon}</div>
          <div className="proj-badges">
            <span className="proj-type-badge">{project.type}</span>
            <span className="proj-period">{project.period}</span>
          </div>
        </div>
        <h3 className="proj-title">{project.title}</h3>
        <p className="proj-subtitle">{project.subtitle}</p>
      </div>

      {/* Metrics Row */}
      <div className="proj-metrics">
        {project.metrics.map((m, i) => (
          <div key={i} className="proj-metric">
            <span className="metric-value">{m.value}</span>
            <span className="metric-label">{m.label}</span>
          </div>
        ))}
      </div>

      {/* Description */}
      <p className="proj-desc">{project.description}</p>

      {/* Expandable Case Study */}
      <button
        className="proj-expand-btn"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        {expanded ? (
          <>
            Hide Details <ChevronUp size={14} />
          </>
        ) : (
          <>
            View Case Study <ChevronDown size={14} />
          </>
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="proj-case-study"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="case-study-inner">
              <div className="case-block">
                <div className="case-icon">
                  <Target size={16} />
                </div>
                <div>
                  <h4>The Problem</h4>
                  <p>{project.problem}</p>
                </div>
              </div>
              <div className="case-block">
                <div className="case-icon solution">
                  <Lightbulb size={16} />
                </div>
                <div>
                  <h4>The Solution</h4>
                  <p>{project.solution}</p>
                </div>
              </div>
              <div className="case-block">
                <div className="case-icon impact">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <h4>Impact</h4>
                  <ul className="impact-list">
                    {project.impact.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tags */}
      <div className="pill-row" style={{ marginTop: 20, position: "relative", zIndex: 2 }}>
        {project.tags.map((tag) => (
          <span key={tag} className="pill">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects">
      <div className="wrap">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="kicker">./projects --shipped</div>
          <h2 className="section-title">Built end-to-end, proven in production.</h2>
          <p className="section-desc">
            Case studies and projects showcasing range across AI automation, mobile, and SaaS product development.
          </p>
        </motion.div>

        <div className="proj-grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
