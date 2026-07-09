import Header from "@/components/Header";
import TableOfContents from "@/components/TableOfContents";
import ArticleRenderer from "@/components/ArticleRenderer";
import { articleContent, citations } from "@/content/article";
import { tocItems } from "@/lib/toc";
import ReaderControls from "@/components/ReaderControls";
import SearchModal from "@/components/SearchModal";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Bối Rối Lương Tâm Trong Linh Thao Và Linh Đạo I-Nhã",
    "description": "Nghiên cứu chuyên sâu về scrupulosity trong truyền thống thiêng liêng I-Nhã: thần học, tâm lý học và đồng hành mục vụ.",
    "author": {
      "@type": "Person",
      "name": "Khuyết danh (Dòng Tên)"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Dòng Tên",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dongten.net/wp-content/uploads/2018/11/logo_dongten.png"
      }
    }
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReaderControls />
      <SearchModal />

      {/* Header with reading progress */}
      <Header />

      {/* Hero / Title Section */}
      <div className="bg-gradient-to-b from-[var(--color-parchment-dark)] to-[var(--color-parchment)] pt-16 pb-10 sm:pt-20 sm:pb-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Ornamental cross */}
          <div className="mb-6">
            <span
              className="text-[var(--color-cardinal)] text-3xl opacity-60"
              style={{ fontFamily: "var(--font-playfair)" }}
              aria-hidden="true"
            >
              ✠
            </span>
          </div>

          {/* Category label */}
          <p
            className="text-xs uppercase tracking-[0.25em] text-[var(--color-ink-muted)] mb-4 font-semibold"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Báo Cáo Nghiên Cứu Chuyên Sâu
          </p>

          {/* Title */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.1] text-[var(--color-ink)] mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Bối Rối Lương Tâm
            <br />
            <span className="text-[var(--color-cardinal)]">
              Trong Linh Thao Và Linh Đạo I-Nhã
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg text-[var(--color-ink-muted)] max-w-xl mx-auto leading-relaxed italic"
            style={{ fontFamily: "var(--font-lora)" }}
          >
            Dưới Lăng Kính Thần Học, Mục Vụ Và Tâm Lý Học
          </p>

          {/* Decorative divider */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--color-cardinal)]/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
            <span className="h-px w-8 bg-[var(--color-cardinal)]/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-cardinal)]" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--color-cardinal)]/60" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12 xl:grid-cols-[260px_1fr] xl:gap-16">
          {/* Table of Contents Sidebar */}
          <aside className="hidden lg:block pt-12">
            <TableOfContents items={tocItems} />
          </aside>

          {/* Article Content */}
          <div className="max-w-[68ch] mx-auto pt-8 sm:pt-12">
            <ArticleRenderer content={articleContent} />

            {/* References Section */}
            <section className="mt-16 pt-8 border-t border-[var(--color-ink)]/10" id="tai-lieu-tham-khao">
              <h2 
                className="text-xl font-bold mb-6 text-[var(--color-ink)] uppercase tracking-wider" 
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Tài Liệu Tham Khảo
              </h2>
              <ol className="list-decimal pl-5 space-y-3 text-[0.95rem] text-[var(--color-ink-light)] marker:text-[var(--color-cardinal)]/70">
                {Object.entries(citations).map(([key, ref]) => (
                  <li key={key} className="pl-2" id={`ref-${key}`}>
                    <span className="font-semibold">{ref.title}</span>
                    {ref.url && (
                      <>
                        <br />
                        <a 
                          href={ref.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[var(--color-cardinal)] hover:text-[var(--color-gold)] hover:underline break-all transition-colors"
                        >
                          {ref.url}
                        </a>
                      </>
                    )}
                  </li>
                ))}
              </ol>
            </section>

            {/* Article Footer */}
            <footer className="mt-20 pt-10 border-t border-[var(--color-ink)]/10">
              <div className="ornamental-divider">
                <span
                  className="text-[var(--color-cardinal)] text-lg"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  ✠
                </span>
              </div>
              <p className="text-center text-sm text-[var(--color-ink-muted)] italic mt-6">
                Ad Maiorem Dei Gloriam
              </p>
              <p className="text-center text-xs text-[var(--color-ink-muted)]/60 mt-2">
                 Dòng Tên 
              </p>
            </footer>
          </div>
        </div>
      </main>

      {/* Mobile ToC (rendered outside main for proper fixed positioning) */}
      <div className="lg:hidden">
        <TableOfContents items={tocItems} />
      </div>
    </>
  );
}
