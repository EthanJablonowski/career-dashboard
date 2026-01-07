import Link from 'next/link';
import Image from 'next/image';

export default function TopNav() {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/images/EthanJablonowski_Headshot.png"
            alt="Ethan Jablonowski"
            width={40}
            height={40}
            className="rounded-full ring-2 ring-blue-100"
          />
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              Ethan Jablonowski
            </h1>
            <p className="text-sm text-slate-600 mt-0.5">
              Operator: Product • Growth • Ops
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="https://www.linkedin.com/in/ethan-jablonowski/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-700 hover:text-blue-600 transition-colors font-medium"
            aria-label="LinkedIn"
          >
            LinkedIn
          </Link>
          <a
            href="mailto:ethan.jablonowski@gmail.com"
            className="text-sm text-slate-700 hover:text-emerald-600 transition-colors font-medium"
            aria-label="Email"
          >
            Email
          </a>
          <a
            href="/images/EthanJablonowski_Resume.pdf"
            download
            className="text-sm px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            aria-label="Download Resume"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}