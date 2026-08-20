import { useState, useEffect, useRef } from "react";

export function useTypingEffect(strings, options = {}) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  const typeSpeed = options.typeSpeed || 80;
  const deleteSpeed = options.deleteSpeed || 40;
  const pauseTime = options.pauseTime || 2000;

  useEffect(() => {
    const current = strings[currentIndex];

    if (!isDeleting && currentText === current) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % strings.length);
    } else {
      timeoutRef.current = setTimeout(
        () => {
          setCurrentText((prev) =>
            isDeleting
              ? prev.slice(0, -1)
              : current.slice(0, prev.length + 1)
          );
        },
        isDeleting ? deleteSpeed : typeSpeed
      );
    }

    return () => clearTimeout(timeoutRef.current);
  }, [currentText, currentIndex, isDeleting, strings]);

  return currentText;
}
