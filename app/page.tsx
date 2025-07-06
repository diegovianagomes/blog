
import { SiLinkedin, SiGithub, SiYoutube } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

import { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Copy, Download, Send } from "lucide-react";


interface Link {
  name: string;
  description?: string;
  url: string;
  icon?: ReactNode;
}

const externalLinks: Link[] = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/diegovianagomes",
    icon: <SiLinkedin className="fill-[#0077B5] dark:fill-zinc-300" />,
  },
  {
    name: "GitHub",
    url: "https://github.com/diegovianagomes",
    icon: <SiGithub />,
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@diegovianagomes",
    icon: <SiYoutube className="fill-[#FF0032] dark:fill-zinc-300" />,
  },
  {
    name: "X",
    url: "https://x.com/drlegobox",
    icon: <FaXTwitter className="fill-[#FF0032] dark:fill-zinc-300" />,
  },
];

const ExternalLink = (link: Link) => {
  return (
    <a
      key={link.description}
      href={link.url}
      target="_blank"
      className="group flex items-center justify-between p-6 transition-all sm:hover:bg-zinc-100 sm:dark:hover:bg-[#8315db]"
    >
      <span className="flex items-center gap-4">
        {link.icon} {link.name}
        <span className="-translate-x-4 text-zinc-500 opacity-0 transition-all max-sm:hidden sm:group-hover:translate-x-0 sm:group-hover:opacity-100 dark:text-zinc-400">
          {link.description}
        </span>
      </span>
      <ArrowUpRight className="size-5 shrink-0 text-zinc-800 transition-all sm:group-hover:rotate-45 dark:text-zinc-300" />
    </a>
  );
};


export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center">
        <p className="text-sm">
          Hi, I´m Diego Viana, a software engineer based in Brazil. I have a passion for building web applications and exploring new technologies. This is my personal blog where I share my thoughts, experiences, and projects.
        </p>
      </div>
      <div className="divide-y divide-zinc-400 overflow-hidden rounded ring-2 ring-zinc-400 dark:divide-zinc-500 dark:ring-zinc-500">
        {externalLinks.map((link: Link) => (<ExternalLink key={link.url} {...link} /> ))}
      </div>

      <div className="flex justify-center gap-y-6 max-sm:flex-col-reverse sm:justify-between">
        <div className="flex flex-col justify-center gap-y-5 max-sm:items-center">
          <div className="sm:group relative -m-8 flex items-center gap-3 p-8 transition-all">
            diegovianagomes@gmail.com
            <div className="inline-flex items-center gap-3 transition-all sm:absolute sm:right-4 sm:opacity-0 sm:group-hover:right-1 sm:group-hover:opacity-100">
                <button className="text-zinc-800 sm:group-hover:inline-flex dark:text-zinc-300">
                  <Copy className="size-4" />
                  Teste
                </button>
              <a
                href="mailto:diegovianagomes@gmail.com"
                className="text-zinc-800 dark:text-zinc-300"
              >
                <Send className="size-4" />
              </a>
            </div>
          </div>
          <span
            className="-mt-2 flex w-fit items-center gap-1.5 rounded-full bg-green-100 px-2 py-0.5 text-sm text-green-600 ring-1 ring-green-500 dark:bg-transparent dark:text-emerald-500 dark:ring-emerald-500">
            <div className="size-2 animate-pulse rounded-full bg-green-500 dark:bg-emerald-500" />
            Online
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <a
            href="/diego-viana-cv.pdf"
            download="Diego-Viana-CV.pdf"
            className="flex flex-row items-center justify-center gap-3 rounded bg-[#ead2ff] p-4 text-[#c27bff] ring-1 ring-[#c27bff] transition-all sm:hover:bg-sky-400 dark:bg-inherit dark:text-[#c27bff] dark:ring-[#c27bff] sm:sm:dark:hover:bg-[#6f17b2]"
          >
            <span className="text-nowrap">Download my CV</span>
            <Download className="size-5 max-sm:hidden" />
          </a>
        </div>

      </div>
    </div>

  );
}
