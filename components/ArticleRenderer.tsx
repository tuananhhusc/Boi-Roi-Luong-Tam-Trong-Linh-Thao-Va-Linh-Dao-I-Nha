"use client";

import { useState, useRef, useCallback, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { citations } from "@/content/article";
import { slugify } from "@/lib/toc";

/* ===== CITATION TOOLTIP COMPONENT ===== */
function CitationRef({ number }: { number: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<"above" | "below">("above");
  const ref = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition(rect.top < 220 ? "below" : "above");
    }
    setIsVisible(true);
  }, []);

  const citation = citations[number];

  return (
    <span className="relative inline-block" ref={ref}>
      <span
        className="citation-ref"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVisible(false)}
        role="doc-noteref"
        aria-label={`Citation ${number}`}
      >
        {number}
      </span>
      {isVisible && citation && (
        <span
          className={`citation-tooltip ${
            position === "above"
              ? "bottom-full mb-2"
              : "top-full mt-2"
          } left-1/2 -translate-x-1/2`}
        >
          <span className="font-semibold text-[var(--color-cardinal)] block mb-1">
            Nguồn [{number}]
          </span>
          <span className="block text-[var(--color-ink-light)] mb-1.5 line-clamp-2">
            {citation.title}
          </span>
          {citation.url && (
            <a
              href={citation.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-cardinal)] hover:text-[var(--color-gold)] block truncate underline decoration-1 underline-offset-2 transition-colors"
            >
              {(() => {
                try {
                  return new URL(citation.url).hostname;
                } catch {
                  return citation.url;
                }
              })()}
            </a>
          )}
        </span>
      )}
    </span>
  );
}

/* ===== HELPER: Detect citation sup elements ===== */
function isCitationSup(children: ReactNode): number | null {
  let text: string | null = null;

  if (typeof children === "string") {
    text = children;
  } else if (Array.isArray(children) && children.length === 1) {
    if (typeof children[0] === "string") {
      text = children[0];
    }
  }

  if (text !== null) {
    const trimmed = text.trim();
    const num = parseInt(trimmed, 10);
    if (!isNaN(num) && num >= 1 && num <= 50 && String(num) === trimmed) {
      return num;
    }
  }
  return null;
}

/* ===== HELPER: Extract heading text ===== */
function extractText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) {
    return children.map(extractText).join("");
  }
  if (children && typeof children === "object" && "props" in children) {
    return extractText((children as any).props.children);
  }
  return "";
}

/* ===== ARTICLE RENDERER ===== */
interface ArticleRendererProps {
  content: string;
}

export default function ArticleRenderer({ content }: ArticleRendererProps) {

  return (
    <article className="prose prose-lg prose-academic max-w-none" role="article">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          /* --- HEADINGS --- */
          h1: ({ children }) => (
            <header className="mb-12 mt-4">
              <h1
                className="text-3xl sm:text-4xl md:text-[2.75rem] font-black leading-[1.15] tracking-tight text-[var(--color-ink)] mb-0"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {children}
              </h1>
              <div className="mt-6 flex items-center gap-2">
                <span className="h-1 w-16 bg-[var(--color-cardinal)] rounded-full" />
                <span className="h-1 w-8 bg-[var(--color-gold)] rounded-full" />
                <span className="h-1 w-4 bg-[var(--color-cardinal)]/40 rounded-full" />
              </div>
            </header>
          ),

          h2: ({ children }) => {
            const text = extractText(children);
            const id = slugify(text);
            return (
              <h2
                id={id}
                className="group text-2xl sm:text-[1.75rem] font-bold mt-20 mb-6 text-[var(--color-ink)] scroll-mt-24 leading-snug"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                <span className="text-[var(--color-cardinal)] mr-2 opacity-60 text-xl">§</span>
                {children}
                <div className="mt-3 h-px bg-gradient-to-r from-[var(--color-cardinal)]/50 via-[var(--color-gold)]/25 to-transparent" />
              </h2>
            );
          },

          h3: ({ children }) => {
            const text = extractText(children);
            const id = slugify(text);
            return (
              <h3
                id={id}
                className="text-xl sm:text-[1.375rem] font-bold mt-14 mb-5 text-[var(--color-ink-light)] scroll-mt-24 leading-snug"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {children}
              </h3>
            );
          },

          /* --- PARAGRAPH with drop cap on first --- */
          p: ({ children }) => {
            const text = extractText(children);
            // Apply drop cap only to the first actual body paragraph
            const isFirst = text.startsWith("Thuật ngữ");
            return (
              <p
                className={`text-lg leading-[1.85] mb-6 text-[var(--color-ink)] ${
                  isFirst ? "drop-cap" : ""
                }`}
              >
                {children}
              </p>
            );
          },

          /* --- EMPHASIS --- */
          em: ({ children }) => (
            <em className="italic text-[var(--color-ink-light)]">{children}</em>
          ),

          strong: ({ children }) => (
            <strong className="font-bold text-[var(--color-ink)]">
              {children}
            </strong>
          ),

          /* --- BLOCKQUOTE: Scriptural/ancient style --- */
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[var(--color-cardinal)] bg-gradient-to-br from-[var(--color-cardinal)]/[0.04] to-[var(--color-gold)]/[0.03] px-6 py-5 my-10 rounded-r-lg italic text-lg text-[var(--color-ink-light)] relative overflow-hidden not-prose">
              <div className="relative z-10">{children}</div>
            </blockquote>
          ),

          /* --- TABLE: Academic style --- */
          table: ({ children }) => (
            <div className="overflow-x-auto my-10 rounded-lg border border-[var(--color-ink)]/10 shadow-sm not-prose">
              <table className="w-full text-sm">{children}</table>
            </div>
          ),

          thead: ({ children }) => (
            <thead className="bg-[var(--color-cardinal)]/[0.05] border-b-2 border-[var(--color-cardinal)]/20">
              {children}
            </thead>
          ),

          th: ({ children }) => (
            <th
              className="text-left px-4 py-3 font-bold text-[var(--color-ink)] text-xs uppercase tracking-wider"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="px-4 py-3 border-b border-[var(--color-ink)]/[0.06] text-sm leading-relaxed text-[var(--color-ink-light)] align-top">
              {children}
            </td>
          ),

          tr: ({ children }) => (
            <tr className="hover:bg-[var(--color-cardinal)]/[0.02] transition-colors duration-200">
              {children}
            </tr>
          ),

          /* --- LINKS --- */
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-cardinal)] hover:text-[var(--color-gold)] underline decoration-[var(--color-cardinal)]/30 hover:decoration-[var(--color-gold)]/60 underline-offset-2 transition-colors duration-300"
            >
              {children}
            </a>
          ),

          /* --- CITATION SUPERSCRIPTS --- */
          sup: ({ children }) => {
            const num = isCitationSup(children);
            if (num !== null) {
              return <CitationRef number={num} />;
            }
            return <sup>{children}</sup>;
          },

          /* --- LISTS --- */
          ol: ({ children }) => (
            <ol className="list-decimal list-outside pl-6 space-y-4 my-8 text-lg leading-[1.85] marker:text-[var(--color-cardinal)] marker:font-bold">
              {children}
            </ol>
          ),

          ul: ({ children }) => (
            <ul className="list-disc list-outside pl-6 space-y-3 my-8 text-lg leading-[1.85] marker:text-[var(--color-cardinal)]">
              {children}
            </ul>
          ),

          li: ({ children }) => (
            <li className="text-[var(--color-ink)] pl-2">{children}</li>
          ),

          /* --- HORIZONTAL RULE --- */
          hr: () => (
            <div className="ornamental-divider" aria-hidden="true">
              <span
                className="text-[var(--color-cardinal)] text-sm"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                ❧
              </span>
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
