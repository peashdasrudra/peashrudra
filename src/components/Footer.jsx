import { Heart } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-content">
          <p>
            © {new Date().getFullYear()} peash das rudra · khulna, bangladesh ·
            open to remote worldwide
          </p>
          <p className="footer-sub">
            Designed & built with <Heart size={12} className="footer-heart" /> and lots of caffeine
          </p>
        </div>
      </div>
    </footer>
  );
}
