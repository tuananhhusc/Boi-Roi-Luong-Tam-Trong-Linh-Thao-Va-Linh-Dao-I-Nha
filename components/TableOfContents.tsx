"use client";

import { useEffect, useState, useCallback } from "react";
import type { TocItem } from "@/lib/toc";

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting entry
        const intersecting = entries.find((entry) => entry.isIntersecting);
        if (intersecting) {
          setActiveId(intersecting.target.id);
        }
      },
      {
        rootMargin: "-80px 0px -75% 0px",
        threshold: 0,
      }
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        const offset = 96; // header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
        setActiveId(id);
        setIsMobileOpen(false);
      }
    },
    []
  );

  return (
    <>
      {/* Desktop Sidebar ToC */}
      <nav
        className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
        aria-label="Table of Contents"
      >
        <div className="pr-4">
          {/* Header */}
          <h2
            className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)] mb-5 font-semibold flex items-center gap-2"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            <span
              className="w-6 h-px bg-[var(--color-cardinal)]"
              aria-hidden="true"
            />
            Mục Lục
          </h2>

          {/* Links */}
          <ul className="border-l-2 border-[var(--color-ink)]/10 space-y-0.5">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`toc-link ${item.level === 3 ? "toc-link-h3" : ""} ${
                    activeId === item.id ? "active" : ""
                  }`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>

          {/* Ornamental footer */}
          <div className="mt-6 flex items-center gap-1.5 opacity-30">
            <span className="h-px flex-1 bg-[var(--color-cardinal)]" />
            <span
              className="text-[var(--color-cardinal)] text-xs"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              ✦
            </span>
            <span className="h-px flex-1 bg-[var(--color-cardinal)]" />
          </div>
        </div>
      </nav>

      {/* Mobile ToC Button */}
      <button
        className="mobile-toc-btn lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle table of contents"
        aria-expanded={isMobileOpen}
      >
        {isMobileOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        )}
      </button>

      {/* Mobile ToC Overlay */}
      {isMobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="fixed bottom-20 left-4 right-4 sm:right-auto sm:w-80 z-50 lg:hidden bg-[var(--color-parchment-dark)] rounded-xl shadow-2xl border border-[var(--color-cardinal)]/20 p-5 pb-6 max-h-[60vh] overflow-y-auto animate-fade-in-up">
            <h2
              className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)] mb-4 font-semibold"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Mục Lục
            </h2>
            <ul className="border-l-2 border-[var(--color-ink)]/10 space-y-0.5">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className={`toc-link ${item.level === 3 ? "toc-link-h3" : ""} ${
                      activeId === item.id ? "active" : ""
                    }`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}
