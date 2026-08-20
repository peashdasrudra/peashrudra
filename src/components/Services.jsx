import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Brain, BarChart3, Zap, MessageSquare, Code2, Smartphone, CheckCircle2 } from "lucide-react";
import { SERVICES } from "../data/portfolio";
import "./Services.css";

const ICONS = { Brain, BarChart3, Zap, MessageSquare, Code2, Smartphone };

function ServiceRow({ service, index, isActive, onHover }) {
  const Icon = ICONS[service.icon] || Brain;
  
  return (
    <motion.div 
      className={`service-row ${isActive ? 'active' : ''}`}
      onMouseEnter={onHover}
      onClick={onHover}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="service-row-header">
        <div className="service-row-left">
          <div className="service-row-icon">
            <Icon size={24} />
          </div>
          <h3 className="service-row-title">{service.title}</h3>
        </div>
        <div className="service-row-right">
          <p className="service-row-desc">{service.description}</p>
        </div>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div 
            className="service-row-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="service-deliverables-grid">
              {service.deliverables.map((item, i) => (
                <motion.div 
                  key={i} 
                  className="deliverable-item"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05) }}
                >
                  <CheckCircle2 size={16} className="deliverable-check" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

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
          <div className="kicker">./services --offerings</div>
          <h2 className="section-title">What I bring to the table.</h2>
          <p className="section-desc">
            End-to-end architecture and engineering across AI, RevOps, and Full-Stack platforms.
          </p>
        </motion.div>

        <div className="services-list-container">
          {SERVICES.map((service, i) => (
            <ServiceRow 
              key={i} 
              service={service} 
              index={i} 
              isActive={activeIndex === i}
              onHover={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
