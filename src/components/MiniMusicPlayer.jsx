import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, Volume2, VolumeX, Volume1, Disc3, Sparkles, X } from "lucide-react";
import { useMusic } from "../context/MusicContext";
import "./MiniMusicPlayer.css";

export default function MiniMusicPlayer() {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlay, 
    nextTrack, 
    isMuted, 
    setIsMuted,
    showVolumePopup,
    setShowVolumePopup,
    handleVolumeDown
  } = useMusic();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mini-music-player-root">
      {/* ─── 3-SECOND LIVE MUSIC ACTION POPUP ─── */}
      <AnimatePresence>
        {showVolumePopup && isPlaying && (
          <motion.div
            className="music-quick-popup"
            initial={{ opacity: 0, y: 15, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="quick-popup-header">
              <div className="quick-popup-tag">
                <Sparkles size={11} className="text-green" />
                <span>SOUNDTRACK ACTIVE</span>
              </div>
              <button 
                className="quick-popup-close"
                onClick={() => setShowVolumePopup(false)}
                title="Dismiss"
              >
                <X size={12} />
              </button>
            </div>

            <p className="quick-popup-text">
              Playing <strong>{currentTrack.title}</strong> — want to adjust or pause?
            </p>

            <div className="quick-popup-actions">
              <button 
                className="quick-btn volume-down"
                onClick={handleVolumeDown}
                title="Lower Volume to 25%"
              >
                <Volume1 size={13} />
                <span>Volume Down</span>
              </button>

              <button 
                className="quick-btn pause-music"
                onClick={() => {
                  togglePlay();
                  setShowVolumePopup(false);
                }}
                title="Pause Soundtrack"
              >
                <Pause size={13} />
                <span>Pause</span>
              </button>
            </div>

            <div className="quick-popup-tail" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Track Information Card */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="music-expanded-card"
            initial={{ opacity: 0, y: 15, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.94 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="music-card-header">
              <div className="music-tag">
                <Sparkles size={11} className="text-green" />
                <span>{currentTrack.tag}</span>
              </div>
              <span className="live-audio-pill">
                <span className="live-audio-dot" /> LIVE
              </span>
            </div>

            <div className="music-track-meta">
              <h5 className="music-track-title">{currentTrack.title}</h5>
              <p className="music-track-artist">{currentTrack.artist}</p>
            </div>

            <div className="music-card-controls">
              <button
                className="music-action-btn"
                onClick={() => setIsMuted(!isMuted)}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>

              <button
                className="music-play-btn"
                onClick={togglePlay}
                title={isPlaying ? "Pause Music" : "Play Music"}
              >
                {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
              </button>

              <button
                className="music-action-btn"
                onClick={nextTrack}
                title="Next Random Track"
              >
                <SkipForward size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Mini Player Pill */}
      <motion.div
        className={`mini-music-pill ${isPlaying ? "playing" : ""}`}
        onClick={() => {
          setIsExpanded(!isExpanded);
          setShowVolumePopup(false);
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        title="Live Background Soundtrack — Click to Control"
      >
        {/* Spinning Vinyl Disc Icon */}
        <div className={`music-disc-icon ${isPlaying ? "spinning" : ""}`}>
          <Disc3 size={18} />
        </div>

        {/* Live Audio Equalizer Waveform */}
        <div className="music-pill-waveform">
          <span className={`pill-eq-bar ${isPlaying ? "active" : ""}`} />
          <span className={`pill-eq-bar ${isPlaying ? "active" : ""}`} />
          <span className={`pill-eq-bar ${isPlaying ? "active" : ""}`} />
          <span className={`pill-eq-bar ${isPlaying ? "active" : ""}`} />
        </div>

        {/* Short Title & Artist */}
        <div className="music-pill-label">
          <span className="pill-title">{currentTrack.title}</span>
          <span className="pill-artist">{currentTrack.artist.split("&")[0].trim()}</span>
        </div>

        {/* Direct Play/Pause Quick Click */}
        <button
          className="music-pill-toggle"
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={12} /> : <Play size={12} />}
        </button>
      </motion.div>
    </div>
  );
}
