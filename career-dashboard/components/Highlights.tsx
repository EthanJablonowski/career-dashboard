'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface Highlight {
  header: string;
  subheader: string;
  proof?: string;
  targetFilter?: {
    branch: 'product' | 'growth' | 'ops';
    group: string;
    skill: string;
  };
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

export default function Highlights() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrollCaptured, setIsScrollCaptured] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for mobile and reduced motion preference
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const checkMotion = () => {
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };

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

  // Desktop scroll capture behavior
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    let scrollAccumulator = 0;
    const scrollThreshold = 150;

    const handleWheel = (e: WheelEvent) => {
      const rect = container.getBoundingClientRect();
      const inView = rect.top <= 100 && rect.bottom >= window.innerHeight * 0.5;

      if (!inView) {
        setIsScrollCaptured(false);
        return;
      }

      // Start capturing if we're in view and haven't finished
      if (currentIndex < highlights.length) {
        setIsScrollCaptured(true);

        // Only prevent default if we're actively scrolling through cards
        if (currentIndex < highlights.length - 1 || e.deltaY < 0) {
          e.preventDefault();
        }

        scrollAccumulator += e.deltaY;

        if (scrollAccumulator > scrollThreshold) {
          setCurrentIndex(prev => Math.min(prev + 1, highlights.length - 1));
          scrollAccumulator = 0;
        } else if (scrollAccumulator < -scrollThreshold) {
          setCurrentIndex(prev => Math.max(prev - 1, 0));
          scrollAccumulator = 0;
        }

        // Release scroll capture when reaching the end
        if (currentIndex === highlights.length - 1 && e.deltaY > 0) {
          setIsScrollCaptured(false);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isMobile, prefersReducedMotion, currentIndex]);

  const handleCardClick = useCallback((highlight: Highlight) => {
    if (highlight.targetRole) {
      window.location.hash = highlight.targetRole;
    }
  }, []);

  const handleSkipHighlights = () => {
    setCurrentIndex(highlights.length - 1);
    setIsScrollCaptured(false);
    // Scroll to filter section
    const filterSection = document.getElementById('filter-handoff');
    if (filterSection) {
      filterSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Mobile carousel
  if (isMobile) {
    return (
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-lg font-medium text-warm-900">Highlights</h2>
            <p className="text-sm text-warm-600 mt-1">A few outcomes that define the work.</p>
          </div>

          {/* Mobile Carousel */}
          <div className="relative">
            <div
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {highlights.map((highlight, i) => (
                <button
                  key={i}
                  onClick={() => handleCardClick(highlight)}
                  className="flex-none w-[85vw] max-w-[320px] snap-center p-6 bg-white border border-warm-200 rounded-xl text-left hover:border-sage-400 hover:shadow-md transition-all duration-200"
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
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    i === currentIndex ? 'bg-sage-600 w-4' : 'bg-warm-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop scroll gallery (or static for reduced motion)
  if (prefersReducedMotion) {
    return (
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-warm-900">Highlights</h2>
            <p className="text-sm text-warm-600 mt-1">A few outcomes that define the work.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {highlights.map((highlight, i) => (
              <button
                key={i}
                onClick={() => handleCardClick(highlight)}
                className="p-6 bg-white border border-warm-200 rounded-xl text-left hover:border-sage-400 hover:shadow-md transition-all duration-200"
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

  // Desktop scroll-captured gallery
  return (
    <section
      ref={containerRef}
      className="relative py-16"
      style={{ minHeight: isScrollCaptured ? '100vh' : 'auto' }}
    >
      {/* Header - pinned during scroll capture */}
      <div className={`max-w-6xl mx-auto px-6 ${isScrollCaptured ? 'sticky top-24 z-10' : ''}`}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-lg font-medium text-warm-900">Highlights</h2>
            <p className="text-sm text-warm-600 mt-1">A few outcomes that define the work.</p>
          </div>
          <button
            onClick={handleSkipHighlights}
            className="text-xs text-warm-500 hover:text-warm-700 transition-colors"
          >
            Skip highlights
          </button>
        </div>
      </div>

      {/* Gallery container */}
      <div
        ref={galleryRef}
        className="relative max-w-6xl mx-auto px-6 mt-8"
      >
        <div className="relative h-[280px] flex items-center justify-center overflow-hidden">
          {highlights.map((highlight, i) => {
            const offset = i - currentIndex;
            const isActive = i === currentIndex;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            return (
              <button
                key={i}
                onClick={() => handleCardClick(highlight)}
                className={`absolute transition-all duration-500 ease-out p-8 bg-white border rounded-xl text-left cursor-pointer
                  ${isActive
                    ? 'border-sage-300 shadow-lg scale-100 z-20 w-[400px]'
                    : 'border-warm-200 shadow-sm scale-90 z-10 w-[360px] opacity-60'
                  }
                  hover:border-sage-400 hover:shadow-xl
                `}
                style={{
                  transform: `translateX(${offset * 420}px) scale(${isActive ? 1 : 0.9})`,
                }}
              >
                <h3 className={`font-medium text-warm-900 mb-3 leading-tight ${isActive ? 'text-xl' : 'text-base'}`}>
                  {highlight.header}
                </h3>
                <p className={`text-warm-600 mb-3 ${isActive ? 'text-base' : 'text-sm'}`}>
                  {highlight.subheader}
                </p>
                {highlight.proof && (
                  <p className={`text-warm-500 ${isActive ? 'text-sm' : 'text-xs'}`}>
                    {highlight.proof}
                  </p>
                )}
              </button>
            );
          })}
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {highlights.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'bg-sage-600 w-8'
                  : i < currentIndex
                    ? 'bg-sage-300 w-4'
                    : 'bg-warm-300 w-4'
              }`}
            />
          ))}
        </div>

        {/* Scroll hint */}
        {currentIndex < highlights.length - 1 && (
          <div className="flex justify-center mt-4 animate-bounce">
            <svg className="w-5 h-5 text-warm-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        )}
      </div>
    </section>
  );
}
