'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface Highlight {
  header: string;
  subheader: string;
  proof?: string;
  targetRole?: string;
}

const highlights: Highlight[] = [
  {
    header: "Built & operated a $100M+ game economy",
    subheader: "On-chain marketplace at scale",
    proof: "110k+ transactions • live economy decisions",
    targetRole: "kompete-scale"
  },
  {
    header: "Public operator for an actively traded product",
    subheader: "Real-time stakeholder communication",
    proof: "100+ AMAs, panels, and presentations",
    targetRole: "kompete-scale"
  },
  {
    header: "Managed six-figure monthly paid spend",
    subheader: "Unique Meta/Google arbitrage strategy",
    proof: "Consistently positive ROI at scale",
    targetRole: "digitopia-media"
  },
  {
    header: "Drove ecommerce growth in-house",
    subheader: "Platform migration + paid acquisition",
    proof: "Record holiday AOV and new customers",
    targetRole: "linnea-design"
  },
  {
    header: "Built digital funnels from zero to profit",
    subheader: "Affiliate, service, and info products",
    proof: "Numerous successful experiments",
    targetRole: "fitness-with-ethan"
  }
];

interface HighlightsProps {
  onFilterClick: () => void;
}

export default function Highlights({ onFilterClick }: HighlightsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [, setScrollProgress] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const checkMotion = () => setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    checkMobile();
    checkMotion();

    window.addEventListener('resize', checkMobile);
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', checkMotion);

    return () => {
      window.removeEventListener('resize', checkMobile);
      motionQuery.removeEventListener('change', checkMotion);
    };
  }, []);

  // Track horizontal scroll on mobile
  const handleMobileScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    setScrollProgress(progress);

    // Calculate which card is most visible
    const cardWidth = container.clientWidth * 0.85 + 16; // 85vw + gap
    const newIndex = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(Math.min(newIndex, highlights.length - 1));
  }, []);

  const handleCardClick = useCallback((highlight: Highlight) => {
    if (highlight.targetRole) {
      window.location.hash = highlight.targetRole;
    }
  }, []);

  // Mobile carousel
  if (isMobile) {
    return (
      <section className="py-8 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="px-6 mb-4">
            <h2 className="text-lg font-medium text-warm-900">Highlights</h2>
            <p className="text-sm text-warm-600 mt-1">A few outcomes that define the work.</p>
          </div>

          {/* Mobile Carousel */}
          <div className="relative">
            <div
              ref={scrollContainerRef}
              onScroll={handleMobileScroll}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-6 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {highlights.map((highlight, i) => (
                <button
                  key={i}
                  onClick={() => handleCardClick(highlight)}
                  className="flex-none w-[85vw] max-w-[320px] snap-center p-5 bg-white border border-warm-200 rounded-xl text-left hover:border-sage-400 transition-all duration-200"
                >
                  <h3 className="text-base font-medium text-warm-900 mb-2 leading-tight">
                    {highlight.header}
                  </h3>
                  <p className="text-sm text-warm-600 mb-2">
                    {highlight.subheader}
                  </p>
                  {highlight.proof && (
                    <p className="text-xs text-warm-500">
                      {highlight.proof}
                    </p>
                  )}
                </button>
              ))}
            </div>

            {/* Progress bar */}
            <div className="px-6 mt-2">
              <div className="h-1 bg-warm-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sage-500 rounded-full transition-all duration-150"
                  style={{ width: `${((currentIndex + 1) / highlights.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Mobile CTA - leads into filter */}
          <div className="px-6 mt-6">
            <button
              onClick={onFilterClick}
              className="w-full py-3 bg-warm-800 text-white text-sm font-medium rounded-lg hover:bg-warm-900 transition-colors"
            >
              Explore by skill
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Desktop - horizontal scroll gallery (non-hijacking)
  if (prefersReducedMotion) {
    return (
      <section className="py-10 bg-warm-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-warm-900">Highlights</h2>
            <p className="text-sm text-warm-600 mt-1">A few outcomes that define the work.</p>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {highlights.map((highlight, i) => (
              <button
                key={i}
                onClick={() => handleCardClick(highlight)}
                className="p-5 bg-white border border-warm-200 rounded-xl text-left hover:border-sage-400 hover:shadow-md transition-all duration-200"
              >
                <h3 className="text-sm font-medium text-warm-900 mb-2 leading-tight">
                  {highlight.header}
                </h3>
                <p className="text-xs text-warm-600 mb-2">
                  {highlight.subheader}
                </p>
                {highlight.proof && (
                  <p className="text-[0.65rem] text-warm-500">
                    {highlight.proof}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop - gentle horizontal scroll
  return (
    <section ref={containerRef} className="py-10 bg-warm-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-warm-900">Highlights</h2>
          <p className="text-sm text-warm-600 mt-1">A few outcomes that define the work.</p>
        </div>

        {/* Horizontal scroll gallery */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            onScroll={() => {
              const container = scrollContainerRef.current;
              if (!container) return;
              const scrollLeft = container.scrollLeft;
              const cardWidth = 340;
              const newIndex = Math.round(scrollLeft / cardWidth);
              setCurrentIndex(Math.min(newIndex, highlights.length - 1));
            }}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {highlights.map((highlight, i) => (
              <button
                key={i}
                onClick={() => handleCardClick(highlight)}
                className={`flex-none w-[320px] snap-start p-6 bg-white border rounded-xl text-left transition-all duration-300
                  ${i === currentIndex
                    ? 'border-sage-300 shadow-lg scale-[1.02]'
                    : 'border-warm-200 shadow-sm hover:border-sage-300 hover:shadow-md'
                  }
                `}
              >
                <h3 className="text-base font-medium text-warm-900 mb-2 leading-tight">
                  {highlight.header}
                </h3>
                <p className="text-sm text-warm-600 mb-3">
                  {highlight.subheader}
                </p>
                {highlight.proof && (
                  <p className="text-xs text-warm-500">
                    {highlight.proof}
                  </p>
                )}
              </button>
            ))}
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-4">
            {highlights.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const container = scrollContainerRef.current;
                  if (container) {
                    container.scrollTo({ left: i * 340, behavior: 'smooth' });
                  }
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'bg-sage-600 w-6'
                    : 'bg-warm-300 w-3 hover:bg-warm-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
