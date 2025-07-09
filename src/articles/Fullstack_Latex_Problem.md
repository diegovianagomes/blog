---
title: "How I Solved a Markdown and LaTeX Problem"
date: "2025-07-09"
tags: ["Next.js", "React", "KaTeX"]
---

## The Promise and the Problem

Every developer who builds a blog or portfolio with Next.js eventually gets here: you want to write your posts in Markdown. It's simple, it's fast, it's universal. My journey began exactly like this. The goal was clear: render `.md` files as articles on my site, with support for tables and, crucially, mathematical equations in LaTeX. I chose the standard stack for this: `remark` and `remark-html`. The basics worked on the first try. Paragraphs, links, lists... all perfect. But upon trying to add a simple table, I hit the first wall: the HTML displayed the raw Markdown code.

```markdown
| Header 1 | Header 2 |
| :------: | :------: |
| Cell 1 | Cell 2 |
```

## The Server-Side Battle

The first battle was swift. A bit of research showed me that the core `remark` doesn't support everything. For tables and other features from the GitHub "dialect" of Markdown, I needed the `remark-gfm` plugin.

```typescript
import remarkGfm from 'remark-gfm';

const processedContent = await remark()
  .use(remarkGfm) 
  .use(html)
  .process(matterResult.content);
```

The tables rendered beautifully! But the joy was short-lived. When I added my first LaTeX equation (`$E=mc^2$`), I noticed the side effect: the math was also being displayed as raw text.

And so the real saga began.

### The Perfect Pipeline (That Didn't Work)

The logic seemed simple: if tables needed a plugin, math would too. The community recommended the following "dream pipeline":

1. `remark-math`: To understand the `$..$` and `$$..$$` syntax.

2. `remark-rehype`: A "bridge" to convert from `remark`'s format to `rehype`'s.

3. `rehype-katex`: To actually render the math into HTML using the KaTeX library.

4. `rehype-stringify`: To convert the final result into an HTML string.

My processing function looked like a work of software engineering art:

```typescript
const processedContent = await remark()
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype)
  .use(rehypeKatex)
  .use(rehypeStringify)
  .process(matterResult.content);
```

The result? **The page broke.** A fatal server-side error.

What followed were hours of frustrating debugging. I tried everything:

- I changed the plugin order (`math` before `gfm`).

- I forced the installation of compatible package versions, suspecting conflicts.

- I created a "perfect," absolutely minimal test `.md` file.

Nothing. The page kept breaking inexplicably, without a clear error message. The problem seemed impossible to solve on the server.

## The Turning Point

This was where a new idea emerged, inspired by how I was already handling syntax highlighting for code blocks:

> What if, instead of fighting with the server, we rendered the math on the client?

The strategy changed completely:

1. **Simplify the Server:** Have the build process generate simple HTML, with tables working, but with the LaTeX code left intact as if it were plain text.

2. **Delegate to the Browser:** Use JavaScript, in the user's browser, to find that LaTeX code and "draw" it on the screen after the page loads.

## The Implementation

This new approach worked like magic. Here is the step-by-step of the solution that finally brought peace.

### Step 1: Simplifying the Server (`lib/article.ts`)

The processing function went back to being ridiculously simple. Its only job was to convert basic Markdown and tables.

```typescript
import html from "remark-html";
import remarkGfm from 'remark-gfm';

// ...
const processedContent = await remark()
  .use(remarkGfm)
  .use(html)
  .process(matterResult.content);
// ...
```

### Step 2: Prepping the Client (`Article.tsx`)

In the React component that renders the article, I used `useEffect` to manipulate the DOM after the initial render.

First, I installed KaTeX in the project: `npm install katex`.

Next, I modified the component:

```typescript
"use client";

import { useEffect, useRef } from "react";
import "katex/dist/katex.min.css";
import renderMathInElement from "katex/dist/contrib/auto-render";

export function Article({ html }: { html: string }) {
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const articleElement = articleRef.current;
    if (!articleElement) return;

    renderMathInElement(articleElement, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
      ],
      throwOnError: false,
    });
  }, [html]);

  return <article ref={articleRef} dangerouslySetInnerHTML={{ __html: html }} />;
}
```

### The Type Error

Of course, it wouldn't be that easy. TypeScript complained, correctly, that it didn't know about the `katex/dist/contrib/auto-render` module. The solution was the last trick up any TS dev's sleeve: create our own type definition file.

I created the file `src/katex.d.ts`:

```typescript
declare module 'katex/dist/contrib/auto-render' {
  const renderMathInElement: (element: HTMLElement, options?: any) => void;
  export default renderMathInElement;
}
```

After restarting the development server, everything clicked into place. Tables rendered, code was highlighted, and the LaTeX equations appeared on the screen, perfectly.

The journey was long, but the lesson was valuable. When one approach (like server-side rendering) proves to be a dead end full of mysterious errors, the best solution isn't always to force the door open, but to find a completely different path. Client-side rendering is a powerful tool, separating concerns and, in this case, making the problem much simpler to solve.

Debugging can be frustrating, but persistence and the willingness to change strategies are our greatest allies.
