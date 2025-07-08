import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Header";
//import Script from "next/script";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Diego Viana",
  description: "Diego Viana's personal blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-screen">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 text-zinc-800 dark:bg-[#4b0082] dark:text-zinc-300`}
      >
        {/*<Script id="theme-toggle" strategy="beforeInteractive">
          {`document.documentElement.classList.toggle("dark", localStorage.theme ===
        "dark" || (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches))`}
        </Script>*/}
        <Header />
        <main className="mx-auto max-w-prose pb-4">
          {children}
        </main>
        <footer className="mx-auto flex max-w-prose flex-col items-center gap-2 py-6 text-sm text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-4">
            <a
              className="decoration-zinc-500 underline-offset-4 transition-all sm:hover:underline dark:decoration-zinc-400"
              href="https://github.com/diegovianagomes/blog"
              target="_blank"
            >
              Code
            </a>
            <a
              className="decoration-zinc-500 underline-offset-4 transition-all sm:hover:underline dark:decoration-zinc-400"
              href="https://x.com/iamlegobox"
              target="_blank"
            >
              @iamlegobox
            </a>
          </div>
          <blockquote className="text-[#6f17b2] dark:text-[#6f17b2]">
            The answer is 42
          </blockquote>
        </footer>
      </body>
    </html>
  );
}
