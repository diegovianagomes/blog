"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";



export default function Header() {

  const path = usePathname();
  const isHome = path === "/";

  return (
    <header className="mx-auto max-w-prose py-8 max-sm:pt-4">
      <nav className="flex items-center justify-between max-sm:flex-col max-sm:gap-6">
        {isHome ? (
          <div className="flex flex-col max-sm:items-center text-[#5b148f] dark:text-[#ead2ff]">
              Diego Viana
              {/*<span className="text-[#ab49ff] dark:text-[#9825f8]">
                AI/ML Engineer
              </span>*/}
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
              {/*<span className="text-[#ab49ff] dark:text-[#9825f8]">
                AI/ML Engineer
              </span>*/}
          </div>
        </Link>
        )}

        <div className="flex items-center gap-4">
          <Link
            className="group relative rounded px-2 py-px  transition-all hover:underline"
            href="/projects"
            data-is-current-path={path === "/projects"}
          >
            projects
          </Link>
          <Link
            className="group relative rounded px-2 py-px  transition-all hover:underline"
            href="/articles"
            data-is-current-path={path === "/articles"}
          >
            articles
          </Link>
          <Link
            className="group relative rounded px-2 py-px  transition-all hover:underline"
            href="/about"
            data-is-current-path={path === "/about"}
          >
            about
          </Link>
        </div>
      </nav>
    </header>
  )
}