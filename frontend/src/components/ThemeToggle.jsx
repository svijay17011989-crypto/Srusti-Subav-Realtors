import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        px-4 py-2 rounded-full text-sm font-medium
        bg-white dark:bg-[var(--bg-card)]
        text-gray-800 dark:text-[var(--text-main)]
        border border-gray-300 dark:border-[var(--border-soft)]
        hover:scale-105 transition
      "
    >
      {theme === "dark" ? "☀ Light" : "🌙 Dark"}
    </button>
  );
};

export default ThemeToggle;
