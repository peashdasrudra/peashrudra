import { TICKER_ITEMS } from "../data/portfolio";
import "./StatusBar.css";

export default function StatusBar() {
  // Duplicate items for seamless looping
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="statusbar">
      <div className="statusbar-inner">
        <div className="status-live">
          <span className="pulse" />
          now automating
        </div>
        <div className="ticker-mask" aria-hidden="true">
          <div className="ticker-track">
            {items.map((item, i) => (
              <span key={i}>
                {item.highlight && <b>{item.highlight}</b>} {item.text}
              </span>
            ))}
          </div>
        </div>
        <a href="#contact" className="status-cta">
          hire me
        </a>
      </div>
    </div>
  );
}
