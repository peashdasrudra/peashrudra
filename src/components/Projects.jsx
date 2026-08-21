import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown, ChevronUp, AlertTriangle, Cpu, Zap, CheckCircle2, GitBranch, FileText, Eye } from "lucide-react";
import { PROJECTS } from "../data/portfolio";
import { useIsMobile } from "../hooks/useIsMobile";
import "./Projects.css";

function ProjectCard({ project, index, isMobile }) {
  const [expanded, setExpanded] = useState(false);

  // Extract clean year label from project period
  const displayYear = project.period.includes("2026")
    ? "2026"
    : project.period.includes("2025")
    ? "2025"
    : project.period.includes("2024")
    ? "2024"
    : project.period.includes("2023")
    ? "2023"
    : project.period;

  return (
    <div className="proj-wrapper" style={{ "--stack-index": index }}>
      {/* Left Vertical Year Timeline Indicator */}
      <div className="proj-timeline-left">
        <div className="proj-year-badge">
          <span className="proj-year-dot" />
          <span className="proj-year-text">{displayYear}</span>
        </div>
        <div className="proj-year-line" />
      </div>

      <motion.div
        className={`proj-card spot ${project.featured ? "proj-featured" : ""}`}
        initial={{ opacity: 0, y: isMobile ? 0 : 40, scale: isMobile ? 1 : 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: isMobile ? 0.2 : 0.6,
          delay: isMobile ? 0 : index * 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px");
          e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px");
        }}
      >
        {!isMobile && <div className="proj-card-beam" />}

        {/* Header */}
        <div className="proj-header">
          <div className="proj-top-row">
            <div className="proj-icon">{project.icon}</div>
            <div className="proj-badges">
              <span className="proj-type-badge">
                <span className="proj-pulse-dot" />
                {project.type}
              </span>
              <span className="proj-period">{project.period}</span>
              {project.url && (
                <motion.a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="proj-eye-btn" 
                  title="View Live Project"
                  whileHover={!isMobile ? { scale: 1.15, rotate: 5 } : undefined}
                  whileTap={{ scale: 0.9 }}
                >
                  <Eye size={16} />
                </motion.a>
              )}
            </div>
          </div>
          <h3 className="proj-title">{project.title}</h3>
          <p className="proj-subtitle">{project.subtitle}</p>
        </div>

        {/* Metrics Row */}
        <div className="proj-metrics">
          {project.metrics.map((m, i) => (
            <motion.div 
              key={i} 
              className="proj-metric"
              whileHover={!isMobile ? { y: -3, scale: 1.04 } : undefined}
              transition={{ type: "spring", stiffness: 350, damping: 15 }}
            >
              <span className="metric-value">{m.value}</span>
              <span className="metric-label">{m.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Description */}
        <p className="proj-desc">{project.description}</p>

        {/* Expandable Case Study */}
        <motion.button
          className={`proj-expand-btn ${expanded ? 'proj-expand-active' : ''}`}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          whileTap={{ scale: 0.95 }}
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
        </motion.button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              className="proj-case-study"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: isMobile ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="case-study-inner"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: isMobile ? 0 : 0.05, delayChildren: isMobile ? 0 : 0.05 } },
                }}
              >
                {/* ─── Problem ─── */}
                <motion.div
                  className="case-card case-problem"
                  variants={{ hidden: { opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 15 }, show: { opacity: 1, y: 0, transition: { duration: isMobile ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] } } }}
                >
                  <div className="case-card-accent problem" />
                  <div className="case-card-header">
                    <div className="case-icon-wrap problem">
                      <AlertTriangle size={18} />
                    </div>
                    <div className="case-header-text">
                      <span className="case-step-num">01</span>
                      <h4>The Problem</h4>
                    </div>
                  </div>
                  <p className="case-card-body">{project.problem}</p>
                </motion.div>

                {/* ─── Connector ─── */}
                <motion.div className="case-connector" variants={{ hidden: { scaleY: isMobile ? 1 : 0 }, show: { scaleY: 1, transition: { duration: isMobile ? 0 : 0.15 } } }} />

                {/* ─── Solution ─── */}
                <motion.div
                  className="case-card case-solution"
                  variants={{ hidden: { opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 15 }, show: { opacity: 1, y: 0, transition: { duration: isMobile ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] } } }}
                >
                  <div className="case-card-accent solution" />
                  <div className="case-card-header">
                    <div className="case-icon-wrap solution">
                      <Cpu size={18} />
                    </div>
                    <div className="case-header-text">
                      <span className="case-step-num">02</span>
                      <h4>The Solution</h4>
                    </div>
                  </div>
                  <p className="case-card-body">{project.solution}</p>
                </motion.div>

                {/* ─── Connector ─── */}
                <motion.div className="case-connector" variants={{ hidden: { scaleY: isMobile ? 1 : 0 }, show: { scaleY: 1, transition: { duration: isMobile ? 0 : 0.15 } } }} />

                {/* ─── Impact ─── */}
                <motion.div
                  className="case-card case-impact"
                  variants={{ hidden: { opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 15 }, show: { opacity: 1, y: 0, transition: { duration: isMobile ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] } } }}
                >
                  <div className="case-card-accent impact" />
                  <div className="case-card-header">
                    <div className="case-icon-wrap impact">
                      <Zap size={18} />
                    </div>
                    <div className="case-header-text">
                      <span className="case-step-num">03</span>
                      <h4>Impact & Results</h4>
                    </div>
                  </div>
                  <motion.ul
                    className="impact-list-v2"
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: { opacity: 0 },
                      show: { opacity: 1, transition: { staggerChildren: isMobile ? 0 : 0.05, delayChildren: isMobile ? 0 : 0.1 } },
                    }}
                  >
                    {project.impact.map((item, j) => (
                      <motion.li
                        key={j}
                        variants={{
                          hidden: { opacity: isMobile ? 1 : 0, x: isMobile ? 0 : -10 },
                          show: { opacity: 1, x: 0, transition: { duration: isMobile ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] } },
                        }}
                      >
                        <CheckCircle2 size={14} className="impact-check" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tags */}
        <div className="pill-row" style={{ marginTop: 20, position: "relative", zIndex: 2 }}>
          {project.tags.map((tag) => (
            <motion.span 
              key={tag} 
              className="pill proj-tag"
              whileHover={!isMobile ? { y: -2, scale: 1.05, borderColor: "var(--green-border)" } : undefined}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* External Links — only render when URL is non-empty */}
        {(project.caseStudyUrl || project.githubUrl) && (
          <div className="proj-links">
            {project.caseStudyUrl && (
              <motion.a
                href={project.caseStudyUrl}
                className="proj-link-btn proj-link-case"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={!isMobile ? { y: -2, scale: 1.03 } : undefined}
                whileTap={{ scale: 0.96 }}
              >
                <FileText size={13} /> Case Study
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                className="proj-link-btn proj-link-github"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={!isMobile ? { y: -2, scale: 1.03 } : undefined}
                whileTap={{ scale: 0.96 }}
              >
                <GitBranch size={13} /> Source Code
              </motion.a>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

const FILTER_CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "ai", label: "AI & Agents" },
  { id: "crm", label: "CRM & RevOps" },
  { id: "mobile", label: "Mobile / Flutter" },
];

export default function Projects() {
  const isMobile = useIsMobile();
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "ai") return p.tags.some(t => ["AI Agent", "LLM", "RAG", "LangGraph"].includes(t));
    if (activeFilter === "crm") return p.tags.some(t => ["CRM Automation", "RevOps", "HubSpot", "Lead Automation"].includes(t));
    if (activeFilter === "mobile") return p.tags.some(t => ["Flutter", "Cross-platform", "Firebase"].includes(t));
    return true;
  });

  return (
    <section id="projects">
      <div className="wrap" style={{ position: "relative" }}>
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

          {/* Interactive Filter Tabs */}
          <div className="proj-filter-bar">
            {FILTER_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`proj-filter-tab ${activeFilter === cat.id ? "active" : ""}`}
                onClick={() => setActiveFilter(cat.id)}
              >
                {activeFilter === cat.id && (
                  <motion.div
                    className="proj-filter-pill-bg"
                    layoutId="activeFilterPill"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="proj-filter-label">{cat.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project List */}
        <div className="proj-list-container">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} isMobile={isMobile} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
