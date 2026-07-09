"use client";

import { useState, useEffect, useRef } from "react";
import { tocItems } from "@/lib/toc";
import { citations } from "@/content/article";

interface SearchResult {
  id: string;
  title: string;
  type: "section" | "citation";
}

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Compute search results
  const results: SearchResult[] = [];
  const q = query.toLowerCase().trim();
  
  if (q.length > 0) {
    // Search in headings
    tocItems.forEach((item) => {
      if (item.text.toLowerCase().includes(q)) {
        results.push({ id: item.id, title: item.text, type: "section" });
      }
    });

    // Search in citations
    Object.entries(citations).forEach(([key, ref]) => {
      if (ref.title.toLowerCase().includes(q)) {
        results.push({
          id: `ref-${key}`,
          title: `[${key}] ${ref.title}`,
          type: "citation",
        });
      }
    });
  }

  const handleSelect = (id: string) => {
    setIsOpen(false);
    // Slight delay to allow modal closing animation (if any) or state update before scrolling
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 z-[100] backdrop-blur-sm animate-fade-in-up" 
        style={{ animationDuration: '0.2s' }}
        onClick={() => setIsOpen(false)} 
      />
      <div className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[101] px-4 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
        <div className="bg-[var(--color-parchment-dark)] border border-[var(--color-cardinal)]/20 shadow-2xl rounded-lg overflow-hidden flex flex-col">
          <div className="flex items-center px-4 py-3 border-b border-[var(--color-ink)]/10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[var(--color-ink-muted)] shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Tìm kiếm mục lục hoặc tài liệu (VD: OCD, Favre)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none px-3 text-[var(--color-ink)] placeholder-[var(--color-ink-muted)] text-base font-serif"
            />
            <button onClick={() => setIsOpen(false)} className="text-[var(--color-ink-muted)] hover:text-[var(--color-cardinal)] px-2 py-1 text-xs border border-[var(--color-ink)]/20 rounded font-sans">
              ESC
            </button>
          </div>

          {q.length > 0 && (
            <div className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 ? (
                <div className="text-center py-8 text-sm text-[var(--color-ink-muted)] font-serif italic">
                  Không tìm thấy kết quả nào cho "{query}".
                </div>
              ) : (
                <ul className="flex flex-col gap-1">
                  {results.map((res) => (
                    <li key={res.id}>
                      <button
                        onClick={() => handleSelect(res.id)}
                        className="w-full text-left px-4 py-3 rounded hover:bg-[var(--color-cardinal)]/10 transition-colors group flex items-start gap-3"
                      >
                        {res.type === "section" ? (
                          <span className="text-[var(--color-cardinal)] opacity-50 shrink-0 mt-0.5" style={{ fontFamily: "var(--font-playfair)" }}>§</span>
                        ) : (
                          <span className="text-[var(--color-gold)] opacity-80 shrink-0 mt-0.5 font-bold">#</span>
                        )}
                        <span className="text-[0.95rem] font-medium text-[var(--color-ink)] group-hover:text-[var(--color-cardinal)] line-clamp-2 leading-relaxed">
                          {res.title}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          
          {q.length === 0 && (
            <div className="px-4 py-8 text-center text-xs text-[var(--color-ink-muted)] opacity-60 flex flex-col items-center gap-2">
              <span>Nhập từ khoá để tìm nhanh các đề mục hoặc tài liệu tham khảo.</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
