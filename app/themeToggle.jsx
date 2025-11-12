import { useState, useEffect } from 'react';
import sunIcon from "../public/sun.svg";
import moonIcon from "../public/moon.svg";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="w-10 px-2 rounded-full bg-light-brown dark:bg-neutral-500"
      aria-label="Toggle Dark Mode"
    >
      <img src={!isDarkMode ? sunIcon : moonIcon} className={`w-4 ${!isDarkMode ? 'filter-(--sun)' : 'filter-(--moon) ml-auto'}`}/>
    </button>
  );
}

export default ThemeToggle;