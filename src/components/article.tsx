"use client";

import { useEffect, useRef } from "react";
import { highlight } from "sugar-high";
import renderMathInElement from "katex/dist/contrib/auto-render";
import "katex/dist/katex.min.css";

export function Article({ html }: { html: string }) {
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const articleElement = articleRef.current;
    if (!articleElement) return;

    const codes = articleElement.querySelectorAll("pre code");
    codes.forEach((code) => {
      if (code.innerHTML.includes("span")) return;
      const html = highlight(code.textContent as string);
      code.innerHTML = html;
    });

    const titles = articleElement.querySelectorAll("h2");
    titles.forEach((title) => {
      title.id = title.textContent?.toLowerCase().replace(/\s+/g, "-") as string;
    });

    try {
      renderMathInElement(articleElement, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
        ],
        throwOnError: false,
      });
    } catch (error) {
      console.error("Erro ao renderizar equação com KaTeX:", error);
    }
  }, [html]);

  return <article ref={articleRef} dangerouslySetInnerHTML={{ __html: html }} />;
}