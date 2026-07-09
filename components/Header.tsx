"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent =
        docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(scrollPercent, 100));
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Reading Progress Bar */}
      <div
        className="reading-progress"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />

      {/* Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isVisible
            ? "header-glass shadow-sm border-b border-[var(--color-ink)]/5 translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        style={{ paddingTop: "3px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
          {/* Left: Cross symbol + title */}
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="text-[var(--color-cardinal)] text-lg shrink-0"
              style={{ fontFamily: "var(--font-playfair)" }}
              aria-hidden="true"
            >
              ✠
            </span>
            <span
              className="text-sm text-[var(--color-ink-muted)] hidden sm:inline truncate"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Bối Rối Lương Tâm Trong Linh Thao
            </span>
          </div>

          {/* Right: Progress percentage */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--color-ink-muted)] tabular-nums">
              {Math.round(progress)}%
            </span>
            {/* Mini progress ring */}
            <svg className="w-6 h-6 -rotate-90" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-[var(--color-ink)]/10"
              />
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="var(--color-cardinal)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`${progress * 0.628} 62.83`}
                className="transition-all duration-200"
              />
            </svg>
          </div>
        </div>
      </header>
    </>
  );
}
