import { createContext, useContext, useState, useEffect, useRef } from "react";
import { PLAYLIST } from "../data/playlist";

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(() => Math.floor(Math.random() * PLAYLIST.length));
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(65);
  const playerRef = useRef(null);

  // Load YouTube IFrame API script once
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    const initYT = () => {
      if (window.YT && window.YT.Player) {
        const initialTrack = PLAYLIST[currentTrackIndex];
        playerRef.current = new window.YT.Player("yt-music-player-container", {
          height: "1",
          width: "1",
          videoId: initialTrack.youtubeId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event) => {
              setIsReady(true);
              event.target.setVolume(volume);
            },
            onStateChange: (event) => {
              // YT.PlayerState.PLAYING === 1, PAUSED === 2, ENDED === 0
              if (event.data === 1) {
                setIsPlaying(true);
              } else if (event.data === 2) {
                setIsPlaying(false);
              } else if (event.data === 0) {
                // Auto switch to next track on track end
                setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
              }
            },
            onError: (e) => {
              console.warn("YouTube Player error, trying next track", e);
              setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
            }
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initYT();
    } else {
      window.onYouTubeIframeAPIReady = initYT;
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, []);

  // Update track when index changes
  useEffect(() => {
    if (playerRef.current && isReady && playerRef.current.loadVideoById) {
      const track = PLAYLIST[currentTrackIndex];
      playerRef.current.loadVideoById(track.youtubeId);
      if (isPlaying) {
        playerRef.current.playVideo();
      }
    }
  }, [currentTrackIndex, isReady]);

  // Start Playing safely (Crash-proof on mobile phones & tablets)
  const startMusic = () => {
    try {
      if (playerRef.current && isReady && typeof playerRef.current.playVideo === "function") {
        const res = playerRef.current.playVideo();
        if (res && typeof res.catch === "function") {
          res.catch(() => {});
        }
      }
      setIsPlaying(true);
    } catch (e) {
      setIsPlaying(true);
    }
  };

  // Play / Pause Toggle (Crash-Proof)
  const togglePlay = () => {
    try {
      if (!playerRef.current || !isReady) {
        setIsPlaying(!isPlaying);
        return;
      }
      if (isPlaying) {
        if (typeof playerRef.current.pauseVideo === "function") {
          playerRef.current.pauseVideo();
        }
        setIsPlaying(false);
      } else {
        if (typeof playerRef.current.playVideo === "function") {
          const res = playerRef.current.playVideo();
          if (res && typeof res.catch === "function") {
            res.catch(() => {});
          }
        }
        setIsPlaying(true);
      }
    } catch (e) {
      setIsPlaying(!isPlaying);
    }
  };

  // Next Track (Crash-Proof)
  const nextTrack = () => {
    try {
      const nextIdx = (currentTrackIndex + 1) % PLAYLIST.length;
      setCurrentTrackIndex(nextIdx);
      setIsPlaying(true);
    } catch (e) {}
  };

  // Previous Track (Crash-Proof)
  const prevTrack = () => {
    try {
      const prevIdx = (currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
      setCurrentTrackIndex(prevIdx);
      setIsPlaying(true);
    } catch (e) {}
  };

  // Set Volume
  const setVolume = (val) => {
    setVolumeState(val);
    if (playerRef.current && isReady && playerRef.current.setVolume) {
      playerRef.current.setVolume(val);
    }
  };

  // Mute / Unmute
  const toggleMute = () => {
    if (!playerRef.current || !isReady) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const currentTrack = PLAYLIST[currentTrackIndex];

  return (
    <MusicContext.Provider
      value={{
        currentTrack,
        currentTrackIndex,
        isPlaying,
        isReady,
        startMusic,
        togglePlay,
        nextTrack,
        prevTrack,
        volume,
        setVolume,
        isMuted,
        setIsMuted: toggleMute,
        playlist: PLAYLIST,
      }}
    >
      {/* Hidden YouTube IFrame Container */}
      <div 
        id="yt-music-player-container" 
        style={{ 
          position: "fixed", 
          bottom: "-9999px", 
          left: "-9999px", 
          width: "1px", 
          height: "1px", 
          opacity: 0, 
          pointerEvents: "none" 
        }} 
      />
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}
