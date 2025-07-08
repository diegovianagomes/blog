
import { SiLinkedin, SiGithub, SiYoutube, SiOrcid } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight} from "lucide-react";
import Image from "next/image";
import { LattesIcon } from "@/components/icons/LattesIcon";
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
    icon: <SiLinkedin className="fill-[#5b148f] dark:fill-zinc-300" />,
  },
  {
    name: "GitHub",
    url: "https://github.com/diegovianagomes",
    icon: <SiGithub className="fill-[#5b148f] dark:fill-zinc-300" />,
  },

  {
    name: "Orcid",
    url: "https://orcid.org/0009-0007-7290-0349",
    icon: <SiOrcid className="fill-[#5b148f]  dark:fill-zinc-300" />,
  },

  {
    name: "Lattes",
    url: "https://orcid.org/0000-0002-8701",
    icon: <LattesIcon className="h-4 w-4 fill-[#5b148f]  dark:fill-zinc-300"/>  },

  {
    name: "YouTube",
    url: "https://youtube.com/@diegovianagomes",
    icon: <SiYoutube className="fill-[#5b148f] dark:fill-zinc-300" />,
  },

  {
    name: "X",
    url: "https://x.com/drlegobox",
    icon: <FaXTwitter className="fill-[#5b148f] dark:fill-zinc-300" />,
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
      <ArrowUpRight className="size-5 shrink-0 text-[#5b148f] transition-all sm:group-hover:rotate-45 dark:text-zinc-300" />
    </a>
  );
};


export default function Home() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-center gap-6 rounded-lg  p-6">
        <Image
          src="/images/avatar.png"
          alt="Diego Viana"
          width={80}
          height={80}
          className="shrink-0 rounded-full ring-2 ring-[#c27bff] dark:ring-[#ead2ff]"
        />
        <p className="text-sm text-[#5b148f] dark:text-[#ead2ff]">
          Hi, I´m Diego Viana, a software engineer based in Brazil. I have a
          passion for building web applications and exploring new technologies. This is
          my personal blog where I share my thoughts, experiences, and projects.
        </p>
      </div>
      <div className="grid grid-cols-2  divide-y divide-x divide-[#5b148f] overflow-hidden rounded ring-2 ring-[#5b148f] dark:divide-[#ead2ff] dark:ring-[#ead2ff]">
        {externalLinks.map((link: Link) => (<ExternalLink key={link.url} {...link} /> ))}
      </div>

      
    </div>

  );
}
