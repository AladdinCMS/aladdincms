import { useState, useEffect } from "react";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200); // Show when scrolled down 200px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScrollToTop = () => {
    let currentPosition = window.scrollY;
    const scrollStep = currentPosition / 300; // Adjust for slower scroll

    const scroll = () => {
      if (currentPosition > 0) {
        currentPosition -= scrollStep;
        window.scrollTo(0, currentPosition);
        requestAnimationFrame(scroll);
      }
    };
    requestAnimationFrame(scroll);
  };

  return (
    isVisible && (
      <button
        onClick={smoothScrollToTop}
        className="fixed bottom-5 right-5 rounded-full bg-green-500 px-4 py-2 text-white shadow-lg transition-opacity hover:bg-green-600"
      >
        ↑ Top
      </button>
    )
  );
}
