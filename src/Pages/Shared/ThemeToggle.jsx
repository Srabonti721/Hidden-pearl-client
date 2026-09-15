import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme((currentTheme) => currentTheme === "light" ? "dark" : "light")}
      className="btn btn-circle btn-ghost ml-2"
      aria-label={"Switch to " + (theme === "light" ? "dark" : "light") + " theme"}
      title={"Switch to " + (theme === "light" ? "dark" : "light") + " theme"}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
