import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ExternalLink, ChevronDown, ChevronUp, AlertTriangle, Cpu, Zap, 
  CheckCircle2, GitBranch, FileText, Eye, Sparkles, ArrowUpRight, 
  Layers, Workflow, Terminal 
} from "lucide-react";
import { PROJECTS } from "../data/portfolio";
import { useIsMobile } from "../hooks/useIsMobile";
import "./Projects.css";

function ProjectCard({ project, index, isMobile }) {
  const [expanded, setExpanded] = useState(false);
  const [activeCaseTab, setActiveCaseTab] = useState("problem"); // 'problem' | 'solution' | 'impact'

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
      {/* Left Timeline Indicator */}
      <div className="proj-timeline-left">
        <div className="proj-year-badge">
          <span className="proj-year-dot" />
          <span className="proj-year-text">{displayYear}</span>
        </div>
        <div className="proj-year-line" />
      </div>

      <motion.div
        className={`proj-card spot ${project.featured ? "proj-featured" : ""}`}
        initial={{ opacity: 0, y: isMobile ? 0 : 35, scale: isMobile ? 1 : 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: isMobile ? 0.2 : 0.55,
          delay: isMobile ? 0 : index * 0.08,
          ease: [0.16, 1, 0.3, 1],
        }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px");
          e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px");
        }}
      >
        {/* Holographic Top Laser Accent */}
        <div className="proj-card-beam" />

        {/* Featured Ribbon */}
        {project.featured && (
          <div className="proj-featured-ribbon">
            <Sparkles size={11} />
            <span>FEATURED AGENTIC SYSTEM</span>
          </div>
        )}

        {/* Header */}
        <div className="proj-header">
          <div className="proj-top-row">
            <div className="proj-icon-wrapper">
              <span className="proj-icon">{project.icon}</span>
            </div>

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
                  title="View Live Production System"
                  whileHover={{ scale: 1.12, rotate: 4 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <Eye size={15} />
                  <span className="eye-btn-text">Live Demo</span>
                  <ArrowUpRight size={12} />
                </motion.a>
              )}
            </div>
          </div>

          <h3 className="proj-title">{project.title}</h3>
          <p className="proj-subtitle">{project.subtitle}</p>
        </div>

        {/* Live Architecture Micro-HUD */}
        <div className="proj-arch-flow">
          <div className="arch-flow-node">
            <Workflow size={12} className="text-green" />
            <span>Trigger / Ingest</span>
          </div>
          <span className="arch-flow-arrow">──▶</span>
          <div className="arch-flow-node active">
            <Cpu size={12} className="text-cyan" />
            <span>{project.tags[0] || "AI Core"}</span>
          </div>
          <span className="arch-flow-arrow">──▶</span>
          <div className="arch-flow-node">
            <Zap size={12} className="text-orange" />
            <span>{project.metrics[0]?.label || "Live Output"}</span>
          </div>
        </div>

        {/* Key Metrics Row */}
        <div className="proj-metrics">
          {project.metrics.map((m, i) => (
            <motion.div 
              key={i} 
              className="proj-metric"
              whileHover={{ y: -3, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 350, damping: 15 }}
            >
              <div className="metric-glow-ring" />
              <span className="metric-value">{m.value}</span>
              <span className="metric-label">{m.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Description */}
        <p className="proj-desc">{project.description}</p>

        {/* Interactive Case Study Toggle */}
        <motion.button
          className={`proj-expand-btn ${expanded ? "proj-expand-active" : ""}`}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          whileTap={{ scale: 0.96 }}
        >
          {expanded ? (
            <>
              Hide Architecture Details <ChevronUp size={14} />
            </>
          ) : (
            <>
              Explore Interactive Case Study <ChevronDown size={14} />
            </>
          )}
        </motion.button>

        {/* Expandable Tabbed Case Study Drawer */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              className="proj-case-study"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="case-study-interactive-wrap">
                {/* Case Study Phase Tabs */}
                <div className="case-study-nav-tabs">
                  <button
                    className={`case-tab-btn ${activeCaseTab === "problem" ? "active" : ""}`}
                    onClick={() => setActiveCaseTab("problem")}
                  >
                    <AlertTriangle size={13} />
                    <span>01. The Problem</span>
                  </button>
                  <button
                    className={`case-tab-btn ${activeCaseTab === "solution" ? "active" : ""}`}
                    onClick={() => setActiveCaseTab("solution")}
                  >
                    <Cpu size={13} />
                    <span>02. Architecture & Solution</span>
                  </button>
                  <button
                    className={`case-tab-btn ${activeCaseTab === "impact" ? "active" : ""}`}
                    onClick={() => setActiveCaseTab("impact")}
                  >
                    <Zap size={13} />
                    <span>03. Impact & Results</span>
                  </button>
                </div>

                {/* Tab Contents */}
                <div className="case-tab-content">
                  {activeCaseTab === "problem" && (
                    <motion.div
                      className="case-pane problem-pane"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="case-pane-header">
                        <div className="case-icon-wrap problem">
                          <AlertTriangle size={18} />
                        </div>
                        <div>
                          <h4>Operational Bottlenecks & Challenges</h4>
                          <span className="case-pane-sub">Identified core business friction points</span>
                        </div>
                      </div>
                      <p className="case-card-body">{project.problem}</p>
                    </motion.div>
                  )}

                  {activeCaseTab === "solution" && (
                    <motion.div
                      className="case-pane solution-pane"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="case-pane-header">
                        <div className="case-icon-wrap solution">
                          <Cpu size={18} />
                        </div>
                        <div>
                          <h4>Engineered Solution & Autonomous Logic</h4>
                          <span className="case-pane-sub">Tech stack, agentic workflows, and integrations</span>
                        </div>
                      </div>
                      <p className="case-card-body">{project.solution}</p>
                    </motion.div>
                  )}

                  {activeCaseTab === "impact" && (
                    <motion.div
                      className="case-pane impact-pane"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="case-pane-header">
                        <div className="case-icon-wrap impact">
                          <Zap size={18} />
                        </div>
                        <div>
                          <h4>Measurable Production Outcomes</h4>
                          <span className="case-pane-sub">Verified efficiency and revenue scaling metrics</span>
                        </div>
                      </div>
                      <ul className="impact-list-v2">
                        {project.impact.map((item, j) => (
                          <li key={j}>
                            <CheckCircle2 size={15} className="impact-check" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tech Stack Pills */}
        <div className="pill-row" style={{ marginTop: 22, position: "relative", zIndex: 2 }}>
          {project.tags.map((tag) => (
            <motion.span 
              key={tag} 
              className="pill proj-tag"
              whileHover={{ y: -2, scale: 1.05, borderColor: "var(--green-border)" }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* External Links */}
        {(project.caseStudyUrl || project.githubUrl) && (
          <div className="proj-links">
            {project.caseStudyUrl && (
              <motion.a
                href={project.caseStudyUrl}
                className="proj-link-btn proj-link-case"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
              >
                <FileText size={13} />
                <span>Deep Case Study</span>
                <ArrowUpRight size={11} />
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                className="proj-link-btn proj-link-gh"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
              >
                <GitBranch size={13} />
                <span>Source Code</span>
                <ExternalLink size={11} />
              </motion.a>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState("all");

  const filterTabs = [
    { id: "all", label: "All Projects" },
    { id: "ai", label: "AI & Agents" },
    { id: "crm", label: "CRM & RevOps" },
    { id: "mobile", label: "Mobile / Flutter" },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === "all") return true;
    if (filter === "ai") {
      const titleLower = p.title.toLowerCase();
      const typeLower = p.type.toLowerCase();
      const tagsStr = p.tags.join(" ").toLowerCase();
      return (
        typeLower.includes("agent") ||
        typeLower.includes("ai") ||
        typeLower.includes("rag") ||
        tagsStr.includes("langgraph") ||
        tagsStr.includes("openai") ||
        tagsStr.includes("pgvector") ||
        tagsStr.includes("mcp") ||
        tagsStr.includes("gemini") ||
        titleLower.includes("agent") ||
        titleLower.includes("voice")
      );
    }
    if (filter === "crm") {
      const typeLower = p.type.toLowerCase();
      const tagsStr = p.tags.join(" ").toLowerCase();
      return (
        typeLower.includes("crm") ||
        typeLower.includes("revops") ||
        tagsStr.includes("hubspot") ||
        tagsStr.includes("n8n") ||
        tagsStr.includes("make") ||
        tagsStr.includes("twilio") ||
        tagsStr.includes("real estate")
      );
    }
    if (filter === "mobile") {
      const tagsStr = p.tags.join(" ").toLowerCase();
      const typeLower = p.type.toLowerCase();
      return (
        tagsStr.includes("flutter") ||
        tagsStr.includes("bloc") ||
        tagsStr.includes("mobile") ||
        typeLower.includes("mobile") ||
        typeLower.includes("flutter")
      );
    }
    return true;
  });

  return (
    <section id="projects" className="proj-section">
      <div className="wrap">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="kicker">./projects --production-systems</div>
          <h2 className="section-title">Engineered to scale revenue.</h2>
          <p className="section-desc">
            Production-grade Agentic RAG architectures, automated CRM pipelines, and scalable enterprise systems built for real-world reliability.
          </p>

          {/* Filter Bar with Animated Pill */}
          <div className="proj-filter-bar">
            {filterTabs.map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  className={`proj-filter-tab ${isActive ? "active" : ""}`}
                  onClick={() => setFilter(tab.id)}
                >
                  {isActive && (
                    <motion.div
                      className="proj-filter-pill-bg"
                      layoutId="activeFilterPill"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="proj-filter-label">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Project Cards Stack */}
        <div className="proj-stack">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
