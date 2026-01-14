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
    subheader: "Decentralized marketplace and ecosystem",
    proof: "110k+ transactions across tokens and assets",
    targetRole: "kompete-scale"
  },
  {
    header: "Public face for an actively traded product",
    subheader: "Real-time stakeholder communication",
    proof: "100+ updates, AMAs, and panels",
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
    proof: "Key insights on attention and conversion",
    targetRole: "fitness-with-ethan"
  }
];

// Chevron arrow icon for click affordance
function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export default function Highlights() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track horizontal scroll on mobile
  const handleMobileScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
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
            <p className="text-sm text-warm-600 mt-1">Outcomes that define my work</p>
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
                  className="relative flex-none w-[85vw] max-w-[320px] snap-center p-5 bg-white border border-warm-200 rounded-xl text-left hover:border-sage-400 transition-all duration-200"
                >
                  <h3 className="text-base font-medium text-warm-900 mb-2 leading-tight pr-6">
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
                  {/* Chevron affordance - always visible on mobile */}
                  <ChevronRight className="absolute bottom-4 right-4 text-warm-400" />
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
        </div>
      </section>
    );
  }

  // Desktop - all cards visible in grid
  return (
    <section className="py-10 bg-warm-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-warm-900">Highlights</h2>
          <p className="text-sm text-warm-600 mt-1">Outcomes that define my work</p>
        </div>

        {/* Grid of all cards */}
        <div className="grid grid-cols-5 gap-4">
          {highlights.map((highlight, i) => (
            <button
              key={i}
              onClick={() => handleCardClick(highlight)}
              className="relative p-5 bg-white border border-warm-200 rounded-xl text-left hover:border-sage-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
            >
              <h3 className="text-sm font-medium text-warm-900 mb-2 leading-tight pr-4">
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
              {/* Chevron affordance - faint normally, full on hover */}
              <ChevronRight className="absolute bottom-4 right-4 text-warm-300 group-hover:text-sage-500 transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
