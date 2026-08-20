import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, FlaskConical, Calendar, MapPin, Star, School, CheckCircle2, FileText, GitBranch } from "lucide-react";
import { EDUCATION, RESEARCH } from "../data/portfolio";
import "./Education.css";

const ICONS = { GraduationCap, FlaskConical, School };

function ResearchCard() {
  return (
    <div className="edu-row" style={{ marginBottom: 120 }}>
      <div className="edu-left">
        <div className="edu-sticky">
          <div 
            className="edu-timeline-icon"
            style={{ borderColor: "rgba(30, 215, 96, 1)", color: "rgba(30, 215, 96, 1)" }}
          >
            <FlaskConical size={24} />
          </div>
          <div className="edu-year">2026</div>
        </div>
      </div>
      <div className="edu-right">
        <motion.div
          className="editorial-research spot"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px");
            e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px");
          }}
        >
          <div className="research-glow-layer" aria-hidden="true" />
          
          <div className="research-content-wrapper">
            <div className="research-left">
              <div className="research-badge"><FlaskConical size={14} /> {RESEARCH.status}</div>
              <h3 className="research-title">{RESEARCH.title}</h3>
              <p className="research-inst">{RESEARCH.institution} · {RESEARCH.period}</p>
              <p className="research-desc">{RESEARCH.description}</p>
              <div className="research-tools">
                {RESEARCH.tools.map((t, i) => <span key={i} className="pill">{t}</span>)}
              </div>
              <div className="proj-links" style={{ marginTop: 32 }}>
                <a href="#" className="proj-link-btn proj-link-case">
                  <FileText size={13} /> View Case Study
                </a>
                <a href="#" className="proj-link-btn proj-link-github">
                  <GitBranch size={13} /> GitHub Repository
                </a>
              </div>
            </div>
            
            <div className="research-right">
              <div className="research-metrics-grid">
                {RESEARCH.metrics.map((m, i) => (
                  <div key={i} className="metric-box">
                    <span className="metric-val">{m.value}</span>
                    <span className="metric-lab">{m.label}</span>
                  </div>
                ))}
              </div>
              <ul className="research-highlights">
                {RESEARCH.highlights.map((h, i) => (
                  <li key={i}><CheckCircle2 size={14} className="highlight-check" /> <span>{h}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function TimelineRow({ edu, index }) {
  const Icon = ICONS[edu.icon] || GraduationCap;
  const ref = useRef(null);
  
  // Create a scroll-linked effect for the active state
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const iconScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const iconColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["rgba(255, 255, 255, 0.2)", "rgba(30, 215, 96, 1)", "rgba(255, 255, 255, 0.2)"]
  );

  return (
    <div ref={ref} className="edu-row">
      <div className="edu-left">
        <div className="edu-sticky">
          <motion.div 
            className="edu-timeline-icon"
            style={{ scale: iconScale, borderColor: iconColor, color: iconColor }}
          >
            <Icon size={24} />
          </motion.div>
          <div className="edu-year">{edu.period.split(" ")[1] || edu.period}</div>
        </div>
      </div>
      
      <div className="edu-right">
        <motion.div
          className="edu-content-card"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="edu-meta-pills">
            <span className="edu-period"><Calendar size={11} /> {edu.period}</span>
            <span className="edu-location"><MapPin size={11} /> {edu.location}</span>
          </div>

          <h3 className="edu-degree">{edu.degree}</h3>
          <p className="edu-institution">{edu.institution}</p>

          {edu.gpa && (
            <div className="edu-gpa">
              <Star size={14} />
              <span>GPA: <strong>{edu.gpa}</strong></span>
            </div>
          )}

          <ul className="edu-highlights-editorial">
            {edu.highlights.map((h, j) => (
              <li key={j}>
                <CheckCircle2 size={14} className="highlight-check" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default function Education() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="education">
      <div className="wrap">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="kicker">./education --journey</div>
          <h2 className="section-title">Academic foundation & research.</h2>
          <p className="section-desc">
            Perfect GPAs across all pre-university exams, near-perfect university CGPA, active AI research with published-grade results, and student leadership.
          </p>
        </motion.div>

        {/* ─── Sticky Scroll Timeline ─── */}
        <div className="edu-timeline-container" ref={containerRef}>
          <div className="edu-timeline-track">
            <motion.div className="edu-timeline-progress" style={{ height: lineHeight }} />
          </div>
          
          {/* ─── Clean Research Card ─── */}
          <ResearchCard />

          {EDUCATION.map((edu, i) => (
            <TimelineRow key={i} edu={edu} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
