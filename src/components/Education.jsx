import { motion } from "framer-motion";
import { GraduationCap, FlaskConical, Calendar, MapPin, Star, School, Beaker, TrendingUp } from "lucide-react";
import { EDUCATION, RESEARCH } from "../data/portfolio";
import "./Education.css";

const ICONS = { GraduationCap, FlaskConical, School };

export default function Education() {
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

        {/* ─── Research Highlight Card ─── */}
        <motion.div
          className="research-card spot"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px");
            e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px");
          }}
        >
          <div className="research-top">
            <div className="research-badge">
              <FlaskConical size={14} />
              {RESEARCH.status}
            </div>
            <div className="research-tools">
              {RESEARCH.tools.map((t, i) => (
                <span key={i} className="pill">{t}</span>
              ))}
            </div>
          </div>

          <h3 className="research-title">{RESEARCH.title}</h3>
          <p className="research-inst">{RESEARCH.institution} · {RESEARCH.period}</p>
          <p className="research-desc">{RESEARCH.description}</p>

          {/* Research Metrics */}
          <div className="research-metrics">
            {RESEARCH.metrics.map((m, i) => (
              <div key={i} className="research-metric">
                <span className="research-metric-value">{m.value}</span>
                <span className="research-metric-label">{m.label}</span>
              </div>
            ))}
          </div>

          <ul className="edu-highlights">
            {RESEARCH.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </motion.div>

        {/* ─── Education Grid ─── */}
        <div className="edu-timeline">
          {EDUCATION.map((edu, i) => {
            const Icon = ICONS[edu.icon] || GraduationCap;
            return (
              <motion.div
                key={i}
                className={`edu-card spot ${i === 0 ? "edu-featured" : ""}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px");
                  e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px");
                }}
              >
                <div className="edu-header">
                  <div className="edu-icon-wrap">
                    <Icon size={20} />
                  </div>
                  <div className="edu-meta-pills">
                    <span className="edu-period">
                      <Calendar size={11} /> {edu.period}
                    </span>
                    <span className="edu-location">
                      <MapPin size={11} /> {edu.location}
                    </span>
                  </div>
                </div>

                <h3 className="edu-degree">{edu.degree}</h3>
                <p className="edu-institution">{edu.institution}</p>

                {edu.gpa && (
                  <div className="edu-gpa">
                    <Star size={14} />
                    <span>GPA: <strong>{edu.gpa}</strong></span>
                  </div>
                )}

                <ul className="edu-highlights">
                  {edu.highlights.map((h, j) => (
                    <li key={j}>{h}</li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
