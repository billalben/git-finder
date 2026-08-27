import { useTheme } from "../hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="icon-btn theme-btn"
      aria-pressed={theme === "light"}
      aria-label="Toggle dark and light theme"
      data-theme-btn
      onClick={toggleTheme}
    >
      <span className="material-symbols-rounded sun-icon" aria-hidden="true">
        light_mode
      </span>
      <span className="material-symbols-rounded moon-icon" aria-hidden="true">
        dark_mode
      </span>
    </button>
  );
}
