import { useState, useEffect } from "react";

export function useIsMobile(breakpoint = 768) {
  // Initialize with the correct value if window is defined (browser environment)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < breakpoint;
    }
    return false;
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    
    window.addEventListener("resize", checkMobile);
    // Double check on mount in case it changed between initial render and effect
    checkMobile();
    
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}
