'use client';

import { useState, useCallback, useRef } from 'react';
import TopNav from '@/components/TopNav';
import Overview from '@/components/Overview';
import Highlights from '@/components/Highlights';
import TimelineWithFilters from '@/components/TimelineWithFilters';
import ProjectDrawer from '@/components/ProjectDrawer';
import AmbientBackground from '@/components/AmbientBackground';

export type FilterState = {
  branch: 'product' | 'growth' | 'ops' | null;
  group: string | null;
  skill: string | null;
  tool: string | null;
};

export default function Home() {
  const [showFilters, setShowFilters] = useState(false);
  const [filterState, setFilterState] = useState<FilterState>({
    branch: null,
    group: null,
    skill: null,
    tool: null,
  });
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleJumpToFilter = useCallback((state: Partial<FilterState>) => {
    setFilterState({
      branch: state.branch ?? null,
      group: state.group ?? null,
      skill: state.skill ?? null,
      tool: state.tool ?? null,
    });
    setShowFilters(true);
    // Scroll to timeline section
    setTimeout(() => {
      timelineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, []);

  const handleResetFilters = useCallback(() => {
    setShowFilters(false);
    setFilterState({
      branch: null,
      group: null,
      skill: null,
      tool: null,
    });
  }, []);

  return (
    <>
      <AmbientBackground />
      <main className="min-h-screen relative" style={{ zIndex: 1 }}>
        <TopNav />
        <Overview />
        <Highlights />
        <div ref={timelineRef}>
          <TimelineWithFilters
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            filterState={filterState}
            setFilterState={setFilterState}
            onJumpToFilter={handleJumpToFilter}
            onResetFilters={handleResetFilters}
          />
        </div>
        <ProjectDrawer onJumpToFilter={handleJumpToFilter} />
      </main>
    </>
  );
}
