"use client";

import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";

export default function ReaderControls() {
  const { theme, setTheme, fontSize, setFontSize, mounted } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const handleDecreaseFont = () => {
    if (fontSize === "xl") setFontSize("lg");
    else if (fontSize === "lg") setFontSize("base");
  };

  const handleIncreaseFont = () => {
    if (fontSize === "base") setFontSize("lg");
    else if (fontSize === "lg") setFontSize("xl");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Floating Theme Controls */}
      <div className="reader-controls fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Scroll to Top */}
        <button
          onClick={scrollToTop}
          className={`w-11 h-11 flex items-center justify-center rounded-sm bg-[var(--color-parchment-dark)] border border-[var(--color-cardinal)]/20 text-[var(--color-ink-light)] shadow-md hover:text-[var(--color-cardinal)] hover:border-[var(--color-cardinal)]/50 transition-all duration-300 ${
            showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
          }`}
          aria-label="Cuộn lên đầu trang"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>

        {/* Toggle & Panel Container */}
        <div className="relative flex flex-col items-end">
          {/* Settings Panel */}
          <div 
            className={`absolute bottom-full right-0 mb-3 bg-[var(--color-parchment-dark)] border border-[var(--color-cardinal)]/20 shadow-lg rounded-sm p-3 flex flex-col gap-3 backdrop-blur-md transition-all duration-300 origin-bottom-right ${
              isOpen ? "scale-100 opacity-100 pointer-events-auto" : "scale-90 opacity-0 pointer-events-none"
            }`}
          >
            {/* Panel Title */}
            <div className="text-[0.65rem] uppercase tracking-widest text-[var(--color-ink-muted)] text-center font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
              Tuỳ Chỉnh
            </div>

            <div className="flex justify-between items-center gap-2">
              <button
                onClick={handleDecreaseFont}
                disabled={fontSize === "base"}
                className="px-3 py-1 text-sm font-serif font-bold text-[var(--color-ink)] border border-transparent hover:border-[var(--color-ink)]/10 rounded-sm disabled:opacity-30 hover:text-[var(--color-cardinal)] transition-colors"
                aria-label="Giảm cỡ chữ"
              >
                A-
              </button>
              <span className="w-px h-4 bg-[var(--color-ink)]/10" />
              <button
                onClick={handleIncreaseFont}
                disabled={fontSize === "xl"}
                className="px-3 py-1 text-lg font-serif font-bold text-[var(--color-ink)] border border-transparent hover:border-[var(--color-ink)]/10 rounded-sm disabled:opacity-30 hover:text-[var(--color-cardinal)] transition-colors"
                aria-label="Tăng cỡ chữ"
              >
                A+
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-2 opacity-50">
              <span className="h-[1px] w-6 bg-[var(--color-cardinal)]/40" />
              <span className="text-[var(--color-cardinal)] text-[0.6rem]" style={{ fontFamily: "var(--font-playfair)" }}>✦</span>
              <span className="h-[1px] w-6 bg-[var(--color-cardinal)]/40" />
            </div>

            <div className="flex justify-between gap-3 p-1">
              <button
                onClick={() => setTheme("parchment")}
                className={`w-9 h-9 rounded-sm border transition-all ${theme === 'parchment' ? 'border-[var(--color-cardinal)] ring-1 ring-[var(--color-cardinal)]/50 scale-110' : 'border-[var(--color-ink)]/20'}`}
                style={{ backgroundColor: '#F9F8F6' }}
                aria-label="Giao diện sáng (Parchment)"
                title="Parchment"
              />
              <button
                onClick={() => setTheme("sepia")}
                className={`w-9 h-9 rounded-sm border transition-all ${theme === 'sepia' ? 'border-[#7A3B2E] ring-1 ring-[#7A3B2E]/50 scale-110' : 'border-[var(--color-ink)]/20'}`}
                style={{ backgroundColor: '#F4ECD8' }}
                aria-label="Giao diện ngả vàng (Sepia)"
                title="Sepia"
              />
              <button
                onClick={() => setTheme("dark")}
                className={`w-9 h-9 rounded-sm border transition-all ${theme === 'dark' ? 'border-[#D45B5B] ring-1 ring-[#D45B5B]/50 scale-110' : 'border-[var(--color-ink)]/40'}`}
                style={{ backgroundColor: '#121212' }}
                aria-label="Giao diện tối (Dark)"
                title="Dark"
              />
            </div>
          </div>
          
          {/* Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-11 h-11 flex items-center justify-center rounded-sm bg-[var(--color-parchment-dark)] border border-[var(--color-cardinal)]/20 text-[var(--color-ink)] shadow-md hover:text-[var(--color-cardinal)] hover:border-[var(--color-cardinal)]/50 transition-all duration-300 relative z-10"
            aria-label="Tuỳ chỉnh giao diện"
            title="Tuỳ chỉnh giao diện"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <span className="font-serif font-bold text-lg" style={{ fontFamily: "var(--font-playfair)" }}>Aa</span>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
