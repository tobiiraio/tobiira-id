"use client"

import { useTheme } from "./theme-provider"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="inline-flex items-center justify-center rounded-md p-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
    >
      <span className="sr-only">Toggle theme</span>
      {theme === "light" ? (
        <span>🌙</span>
      ) : (
        <span>☀️</span>
      )}
    </button>
  )
}