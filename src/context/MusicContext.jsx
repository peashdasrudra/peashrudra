import { createContext, useContext, useState, useEffect, useRef } from "react";

export const PLAYLIST = [
  {
    id: "sunflower",
    title: "Sunflower",
    artist: "Post Malone & Swae Lee",
    tag: "Spider-Verse OST",
    youtubeId: "ApXoWvfEYVU", // Post Malone, Swae Lee - Sunflower
    color: "#f59e0b",
  },
  {
    id: "dracula",
    title: "Dracula",
    artist: "Tame Impala & JENNIE",
    tag: "Psychedelic Pop",
    youtubeId: "JHl1L0rBeOE", // Official Tame Impala & JENNIE - Dracula
    color: "#ec4899",
  },
  {
    id: "nirvana",
    title: "Something In The Way",
    artist: "Nirvana",
    tag: "The Batman OST",
    youtubeId: "4VxdufqB9zg", // Nirvana - Something In The Way
    color: "#06b6d4",
  },
];

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(() => Math.floor(Math.random() * PLAYLIST.length));
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(65);
  const [showVolumePopup, setShowVolumePopup] = useState(false);
  const [hasShownPopupOnce, setHasShownPopupOnce] = useState(false);
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
              // If video error (101 or 150 embedding blocked), try next track
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

  // ─── 3-Second Music Playing Quick Action Popup Rule ───
  useEffect(() => {
    let timer;
    if (isPlaying && !hasShownPopupOnce) {
      timer = setTimeout(() => {
        setShowVolumePopup(true);
        setHasShownPopupOnce(true);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, hasShownPopupOnce]);

  // First User Interaction Autoplay Trigger (Complies with Browser Autoplay Policy)
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (playerRef.current && isReady && playerRef.current.playVideo) {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [isReady]);

  // Play / Pause Toggle
  const togglePlay = () => {
    if (!playerRef.current || !isReady) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  // Next Track
  const nextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % PLAYLIST.length;
    setCurrentTrackIndex(nextIdx);
    setIsPlaying(true);
  };

  // Previous Track
  const prevTrack = () => {
    const prevIdx = (currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    setCurrentTrackIndex(prevIdx);
    setIsPlaying(true);
  };

  // Set Volume
  const setVolume = (val) => {
    setVolumeState(val);
    if (playerRef.current && isReady && playerRef.current.setVolume) {
      playerRef.current.setVolume(val);
    }
  };

  // Volume Down Action (e.g. Lower to 25%)
  const handleVolumeDown = () => {
    setVolume(25);
    setShowVolumePopup(false);
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
        togglePlay,
        nextTrack,
        prevTrack,
        volume,
        setVolume,
        handleVolumeDown,
        isMuted,
        setIsMuted: toggleMute,
        showVolumePopup,
        setShowVolumePopup,
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
