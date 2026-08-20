import { motion } from "framer-motion";
import { Bot, BarChart3, Code2, Smartphone, Zap, MessageSquare, Brain } from "lucide-react";
import { SERVICES } from "../data/portfolio";
import "./Services.css";

const ICONS = { Bot, BarChart3, Code2, Smartphone, Zap, MessageSquare, Brain };

export default function Services() {
  return (
    <section id="services">
      <div className="wrap">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="kicker">./services --offer</div>
          <h2 className="section-title">What I can build for you.</h2>
          <p className="section-desc">
            End-to-end engineering — from Agentic RAG copilots to real estate lead automation. Every engagement is production-grade, battle-tested work.
          </p>
        </motion.div>

        <div className="services-grid">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <motion.div
                key={i}
                className="service-card spot"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px");
                  e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px");
                }}
              >
                <div className="service-icon-wrap">
                  {Icon && <Icon size={22} />}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>
                <div className="service-deliverables">
                  <span className="deliverables-label">Key Deliverables</span>
                  <ul>
                    {service.deliverables.map((d, j) => (
                      <li key={j}>{d}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
