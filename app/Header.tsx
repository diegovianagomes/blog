"use client";

import { ChevronLeft, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const path = usePathname();
  const isHome = path === "/";
  useEffect(() => {
    const themeIsDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDarkMode(themeIsDark);

    if (themeIsDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDarkMode = !isDarkMode;
    if (newIsDarkMode) {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    } else {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    }
    setIsDarkMode(newIsDarkMode);
  };

  return (
    <header className="mx-auto max-w-prose py-8 max-sm:pt-4">
      <nav className="flex items-center justify-between max-sm:flex-col max-sm:gap-6">
        {isHome ? (
          <div className="flex flex-col max-sm:items-center">
              Diego Viana
              <span className="text-zinc-500 dark:text-zink-400">
                Software Engineer
              </span>
          </div>
        ):(
          <Link
          className="group relative -m-12 -my-2 -mr-4 flex items-center rounded py-2 pl-12 pr-4  transition-all max-sm:text-center"
          href="/">
          <div
            className="absolute left-1 flex size-4 h-full w-12 items-center px-2">
            <ChevronLeft />
          </div>
          <div className="flex flex-col max-sm:items-center">
              Diego Viana
              <span className="text-zinc-500 dark:text-zink-400">
                Software Engineer
              </span>
          </div>
        </Link>
        )}

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="group relative flex items-center"
            >
            {isDarkMode ? (
              <Sun className="size-5 fill-[#4b0082] transition-all sm:hover:-rotate-12 sm:hover:scale-110" />
            ) : (
              <Moon className="size-5 fill-[#4b0082] transition-all sm:hover:-rotate-12 sm:hover:scale-110" />
            )}
          </button>
          <Link
            className="group relative rounded px-2 py-px  transition-all"
            href="/projects"
            data-is-current-path={path === "/projects"}
          >
            /projects
          </Link>
          <Link
            className="group relative rounded px-2 py-px  transition-all"
            href="/articles"
            data-is-current-path={path === "/articles"}
          >
            /articles
          </Link>
          <Link
            className="group relative rounded px-2 py-px  transition-all"
            href="/about"
            data-is-current-path={path === "/about"}
          >
            /about
          </Link>
        </div>
      </nav>
    </header>
  )
}