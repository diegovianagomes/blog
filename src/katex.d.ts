declare module 'katex/dist/contrib/auto-render' {
  interface AutoRenderOptions {
    delimiters?: { left: string; right: string; display: boolean; }[];
    throwOnError?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  const renderMathInElement: (element: HTMLElement, options?: AutoRenderOptions) => void;
  export default renderMathInElement;
}