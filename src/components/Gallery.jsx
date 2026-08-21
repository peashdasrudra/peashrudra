import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Sparkles, Maximize2, X, Camera, Compass, Layers } from "lucide-react";
import { GALLERY } from "../data/portfolio";
import "./Gallery.css";

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedImage, setSelectedImage] = useState(null);

  // Split gallery into 2 rows for dual-direction parallax marquee
  const row1 = [...GALLERY.slice(0, 3), ...GALLERY.slice(0, 3), ...GALLERY.slice(0, 3)];
  const row2 = [...GALLERY.slice(3), ...GALLERY.slice(3), ...GALLERY.slice(3)];

  return (
    <section id="gallery" className="gallery-section" ref={ref}>
      {/* Ambient Background Light Flares */}
      <div className="gallery-bg-glow" aria-hidden="true" />

      <div className="wrap">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="kicker">./gallery --bts-archive</div>
          <h2 className="section-title">Behind the screens & builds.</h2>
          <p className="section-desc">
            Deep focus, system architecture sessions, late-night debugging, and shipping in production.
          </p>
        </motion.div>
      </div>

      {/* Dual Direction Cinematic Marquee Stream */}
      <motion.div
        className="gallery-streams-container"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {/* Row 1: Left Stream */}
        <div className="gallery-marquee-stream stream-left">
          <div className="gallery-track track-left">
            {row1.map((item, index) => (
              <div
                key={`r1-${index}`}
                className="gallery-card"
                onClick={() => setSelectedImage(item)}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px");
                  e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px");
                }}
              >
                <div className="gallery-card-inner">
                  <img src={item.src} alt={item.caption} loading="lazy" />
                  <div className="gallery-holo-beam" />
                  <div className="gallery-card-overlay">
                    <div className="gallery-tag">
                      <Camera size={12} className="text-green" />
                      <span>{item.caption}</span>
                    </div>
                    <div className="gallery-expand-btn">
                      <Maximize2 size={13} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right Reverse Stream */}
        <div className="gallery-marquee-stream stream-right">
          <div className="gallery-track track-right">
            {row2.map((item, index) => (
              <div
                key={`r2-${index}`}
                className="gallery-card"
                onClick={() => setSelectedImage(item)}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px");
                  e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px");
                }}
              >
                <div className="gallery-card-inner">
                  <img src={item.src} alt={item.caption} loading="lazy" />
                  <div className="gallery-holo-beam" />
                  <div className="gallery-card-overlay">
                    <div className="gallery-tag">
                      <Layers size={12} className="text-orange" />
                      <span>{item.caption}</span>
                    </div>
                    <div className="gallery-expand-btn">
                      <Maximize2 size={13} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Interactive Lightbox Zoom Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="gallery-lightbox-backdrop" onClick={() => setSelectedImage(null)}>
            <motion.div
              className="gallery-lightbox-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="gallery-lightbox-close"
                onClick={() => setSelectedImage(null)}
                aria-label="Close image preview"
              >
                <X size={18} />
              </button>
              <div className="gallery-lightbox-img-wrap">
                <img src={selectedImage.src} alt={selectedImage.caption} />
              </div>
              <div className="gallery-lightbox-footer">
                <div className="gallery-lightbox-caption">
                  <Sparkles size={14} className="text-green" />
                  <span>{selectedImage.caption}</span>
                </div>
                <span className="gallery-lightbox-sub">Deep Engineering Archive</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
