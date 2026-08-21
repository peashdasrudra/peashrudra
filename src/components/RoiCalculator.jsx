import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Zap, TrendingUp, Clock, DollarSign, ArrowRight, ShieldCheck } from "lucide-react";
import "./RoiCalculator.css";

export default function RoiCalculator() {
  const [teamSize, setTeamSize] = useState(5);
  const [hoursPerWeek, setHoursPerWeek] = useState(8);
  const [hourlyRate, setHourlyRate] = useState(45);

  // Math: 4.33 weeks per month, ~70% automation efficiency factor
  const totalMonthlyHours = Math.round(teamSize * hoursPerWeek * 4.33);
  const hoursSavedMonthly = Math.round(totalMonthlyHours * 0.72);
  const monthlyCostSavings = Math.round(hoursSavedMonthly * hourlyRate);
  const annualCostSavings = monthlyCostSavings * 12;

  return (
    <div className="roi-calculator-container" id="roi-calculator">
      <div className="roi-header">
        <div className="roi-kicker">
          <Calculator size={14} className="text-green" />
          <span>Interactive ROI Calculator</span>
        </div>
        <h3 className="roi-title">Estimate your CRM automation savings</h3>
        <p className="roi-desc">
          See how much engineering & ops bandwidth your team can reclaim by automating HubSpot, lead routing, and follow-ups.
        </p>
      </div>

      <div className="roi-grid">
        {/* Sliders Control Panel */}
        <div className="roi-controls">
          {/* Slider 1: Team Size */}
          <div className="roi-slider-group">
            <div className="roi-slider-header">
              <label>Sales & Ops Team Size</label>
              <span className="roi-val-badge">{teamSize} {teamSize === 1 ? 'person' : 'people'}</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="roi-slider"
            />
            <div className="roi-slider-ticks">
              <span>1</span>
              <span>25</span>
              <span>50+</span>
            </div>
          </div>

          {/* Slider 2: Hours/Week */}
          <div className="roi-slider-group">
            <div className="roi-slider-header">
              <label>Manual CRM Hours / Person / Week</label>
              <span className="roi-val-badge">{hoursPerWeek} hrs/wk</span>
            </div>
            <input
              type="range"
              min="2"
              max="30"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="roi-slider"
            />
            <div className="roi-slider-ticks">
              <span>2h</span>
              <span>15h</span>
              <span>30h</span>
            </div>
          </div>

          {/* Slider 3: Hourly Cost */}
          <div className="roi-slider-group">
            <div className="roi-slider-header">
              <label>Avg. Team Hourly Cost</label>
              <span className="roi-val-badge">${hourlyRate}/hr</span>
            </div>
            <input
              type="range"
              min="20"
              max="150"
              step="5"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="roi-slider"
            />
            <div className="roi-slider-ticks">
              <span>$20</span>
              <span>$85</span>
              <span>$150</span>
            </div>
          </div>
        </div>

        {/* Live Calculation Results Card */}
        <motion.div 
          className="roi-results-card"
          animate={{ scale: [1, 1.008, 1] }}
          transition={{ duration: 0.3 }}
        >
          <div className="roi-results-top">
            <div className="roi-stat-main">
              <span className="roi-stat-label">Estimated Monthly Savings</span>
              <span className="roi-stat-number">${monthlyCostSavings.toLocaleString()}</span>
              <span className="roi-stat-sub">~${annualCostSavings.toLocaleString()}/year in recovered labor</span>
            </div>
          </div>

          <div className="roi-metric-pills">
            <div className="roi-pill-box">
              <Clock size={16} className="text-green" />
              <div>
                <span className="roi-pill-val">{hoursSavedMonthly} hrs</span>
                <span className="roi-pill-lab">Reclaimed / mo</span>
              </div>
            </div>

            <div className="roi-pill-box">
              <Zap size={16} className="text-orange" />
              <div>
                <span className="roi-pill-val">72%</span>
                <span className="roi-pill-lab">Less Triage</span>
              </div>
            </div>
          </div>

          <a href="#contact" className="roi-cta-btn">
            <span>Unlock This Efficiency</span>
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
