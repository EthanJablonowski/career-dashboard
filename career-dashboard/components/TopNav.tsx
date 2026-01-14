import Link from 'next/link';

export default function TopNav() {
  return (
    <nav className="sticky top-0 z-50 bg-warm-50/95 backdrop-blur-lg border-b border-warm-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-end">
        <div className="flex items-center gap-8">
          <Link
            href="https://www.linkedin.com/in/ethan-jablonowski/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-warm-600 hover:text-warm-900 transition-all duration-200 ease-out font-medium"
            aria-label="LinkedIn"
          >
            LinkedIn
          </Link>
          <Link
            href="https://paragraph.com/@0xjablo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-warm-600 hover:text-warm-900 transition-all duration-200 ease-out font-medium"
            aria-label="Blog"
          >
            Blog
          </Link>
          <a
            href="mailto:ethan.jablonowski@gmail.com"
            className="text-sm text-warm-600 hover:text-warm-900 transition-all duration-200 ease-out font-medium"
            aria-label="Email"
          >
            Email
          </a>
          <a
            href="/images/EthanJablonowski_Resume.pdf?v=2025-01-b"
            download
            className="text-sm px-6 py-3 bg-warm-800 text-white rounded-lg hover:bg-warm-900 transition-all duration-200 ease-out font-medium"
            aria-label="Download Resume"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}