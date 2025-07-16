import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const savedSound = localStorage.getItem("soundEnabled");
    
    if (savedTheme) {
      setTheme(savedTheme);
    }
    
    if (savedSound !== null) {
      setSoundEnabled(savedSound === "true");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("soundEnabled", soundEnabled.toString());
  }, [soundEnabled]);

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, soundEnabled, toggleSound }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
