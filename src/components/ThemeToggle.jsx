import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div
      className="relative w-14 h-8 bg-gray-300 dark:bg-gray-700 rounded-full p-1 cursor-pointer transition-colors"
      onClick={() => setIsDark(!isDark)}
    >
      <div
        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center transform transition-transform ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <Moon className="h-4 w-4 text-yellow-400" />
        ) : (
          <Sun className="h-4 w-4 text-orange-500" />
        )}
      </div>
    </div>
  );
}
