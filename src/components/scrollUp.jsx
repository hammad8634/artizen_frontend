import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex items-center">
      {isVisible && (
        <button
          className="fixed bottom-8 right-2 pl-2 pr-2 p-0.5 bg-blue-500 text-white rounded-lg cursor-pointer text-2xl font-bold hover:bg-blue-600"
          onClick={handleClick}
        >
          ^
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
