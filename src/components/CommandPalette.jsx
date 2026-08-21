import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Moon, Sun, Copy, Check, Download, Mail, ExternalLink, ArrowRight, Sparkles, FolderGit2, Briefcase, Award, GraduationCap, Calculator } from "lucide-react";
import { PROFILE } from "../data/portfolio";
import "./CommandPalette.css";

export default function CommandPalette({ isOpen, setIsOpen, theme, toggleTheme }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  const ACTIONS = [
    {
      id: "theme",
      title: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
      category: "Preferences",
      icon: theme === "dark" ? <Sun size={16} /> : <Moon size={16} />,
      action: () => toggleTheme(),
    },
    {
      id: "copy-email",
      title: `Copy Email (${PROFILE.email})`,
      category: "Contact",
      icon: copied ? <Check size={16} className="text-green" /> : <Copy size={16} />,
      action: () => {
        navigator.clipboard.writeText(PROFILE.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
    },
    {
      id: "resume",
      title: "Download Resume",
      category: "Actions",
      icon: <Download size={16} />,
      action: () => {
        const link = document.createElement("a");
        link.href = PROFILE.resumeUrl;
        link.download = "Peash_Das_Rudra_Resume.pdf";
        link.click();
      },
    },
    {
      id: "calc-roi",
      title: "Calculate CRM Automation ROI",
      category: "Interactive Tools",
      icon: <Calculator size={16} />,
      action: () => {
        window.location.hash = "services";
        const calcEl = document.getElementById("roi-calculator");
        if (calcEl) calcEl.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "sec-projects",
      title: "Go to Projects & Case Studies",
      category: "Navigation",
      icon: <FolderGit2 size={16} />,
      action: () => { window.location.hash = "projects"; },
    },
    {
      id: "sec-hubspot",
      title: "Go to HubSpot Certifications",
      category: "Navigation",
      icon: <Award size={16} />,
      action: () => { window.location.hash = "hubspot-certified"; },
    },
    {
      id: "sec-work",
      title: "Go to Experience & Work History",
      category: "Navigation",
      icon: <Briefcase size={16} />,
      action: () => { window.location.hash = "work"; },
    },
    {
      id: "sec-skills",
      title: "Go to Skills & Technologies",
      category: "Navigation",
      icon: <Sparkles size={16} />,
      action: () => { window.location.hash = "skills"; },
    },
    {
      id: "sec-education",
      title: "Go to Education & AI Research",
      category: "Navigation",
      icon: <GraduationCap size={16} />,
      action: () => { window.location.hash = "education"; },
    },
    {
      id: "sec-contact",
      title: "Get in Touch / Book Call",
      category: "Contact",
      icon: <Mail size={16} />,
      action: () => { window.location.hash = "contact"; },
    },
  ];

  const filtered = ACTIONS.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  // Global keydown for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
        setIsOpen(false);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="cmd-backdrop" onClick={() => setIsOpen(false)}>
          <motion.div
            className="cmd-modal"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            {/* Search Input Bar */}
            <div className="cmd-input-row">
              <Search size={18} className="cmd-search-icon" />
              <input
                ref={inputRef}
                type="text"
                className="cmd-input"
                placeholder="Type a command or jump to section..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
              />
              <kbd className="cmd-esc-badge">ESC</kbd>
            </div>

            {/* Results List */}
            <div className="cmd-list">
              {filtered.length > 0 ? (
                filtered.map((item, i) => (
                  <button
                    key={item.id}
                    className={`cmd-item ${i === selectedIndex ? "active" : ""}`}
                    onClick={() => {
                      item.action();
                      setIsOpen(false);
                    }}
                    onMouseEnter={() => setSelectedIndex(i)}
                  >
                    <div className="cmd-item-left">
                      <span className="cmd-item-icon">{item.icon}</span>
                      <span className="cmd-item-title">{item.title}</span>
                    </div>
                    <span className="cmd-item-category">{item.category}</span>
                  </button>
                ))
              ) : (
                <div className="cmd-empty">No matching commands found.</div>
              )}
            </div>

            {/* Footer Navigation Hints */}
            <div className="cmd-footer">
              <div className="cmd-hint">
                <kbd>↑</kbd><kbd>↓</kbd> <span>Navigate</span>
              </div>
              <div className="cmd-hint">
                <kbd>↵</kbd> <span>Select</span>
              </div>
              <div className="cmd-hint">
                <kbd>ESC</kbd> <span>Close</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
