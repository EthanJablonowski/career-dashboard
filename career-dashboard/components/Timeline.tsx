'use client';

import { useMemo, useCallback } from 'react';
import { projects } from '@/data/projects';

type Project = (typeof projects)[number];

interface TimelineProps {
  filteredProjects?: Project[];
}

function parseQuarterDate(dateStr: string): number {
  // Supports: "Q1 2026" and "Present"
  if (!dateStr) return 0;
  if (dateStr === 'Present') return 9999;

  const match = dateStr.match(/Q([1-4])\s+(\d{4})/);
  if (!match) return 0;

  const quarter = Number(match[1]); // 1..4
  const year = Number(match[2]);
  return year + (quarter - 1) * 0.25;
}

function getTypeBadge(nodeType: Project['nodeType']) {
  switch (nodeType) {
    case 'primary':
      return { label: 'Core Experience', color: 'bg-forest-50 text-forest-700 border-forest-200' };
    case 'experiment':
      return { label: 'Experiment', color: 'bg-terracotta-50 text-terracotta-700 border-terracotta-200' };
    case 'life':
      return { label: 'Personal', color: 'bg-amber-50 text-amber-700 border-amber-200' };
    default:
      return { label: 'Experience', color: 'bg-warm-100 text-warm-700 border-warm-200' };
  }
}

function getNodeColor(nodeType: Project['nodeType']) {
  switch (nodeType) {
    case 'primary':
      return 'bg-forest-800';
    case 'experiment':
      return 'bg-terracotta-500';
    case 'life':
      return 'bg-amber-500';
    default:
      return 'bg-warm-400';
  }
}

export default function Timeline({ filteredProjects }: TimelineProps) {
  // Derived data only; no mutation of imported data.
  const allProjects = useMemo(() => {
    const projectsToSort = filteredProjects || projects;
    return [...projectsToSort].sort((a, b) => {
      return parseQuarterDate(b.dateStart) - parseQuarterDate(a.dateStart);
    });
  }, [filteredProjects]);

  const handleClick = useCallback((projectId: string) => {
    // Keep hashes consistent. If your drawer expects "#<id>", this is correct.
    window.location.hash = projectId.startsWith('#') ? projectId : `#${projectId}`;
  }, []);

  return (
    <div>
      {/* Unified Timeline Stream */}
      <div className="relative">
        {/* Vertical timeline line with subtle gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-warm-300 via-warm-200 to-warm-100 rounded-full" />

        {/* Timeline entries */}
        <div className="space-y-10">
          {allProjects.map((project) => {
            const badge = getTypeBadge(project.nodeType);
            const nodeColor = getNodeColor(project.nodeType);

            return (
              <div key={project.id} className="relative pl-10">
                {/* Node dot */}
                <div
                  className={`absolute left-0 top-2 w-3 h-3 rounded-full ${nodeColor} ring-4 ring-warm-50 shadow-sm`}
                  style={{ transform: 'translateX(-5px)' }}
                />

                {/* Content */}
                <button
                  type="button"
                  className="text-left w-full group p-4 -m-4 rounded-xl hover:bg-warm-100/50 transition-all duration-200 ease-out"
                  onClick={() => handleClick(project.id)}
                >
                  <div className="mb-2">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="text-base font-medium text-warm-900 group-hover:text-sage-700 transition-all duration-200 ease-out">
                        {project.title}
                      </h3>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full border font-medium whitespace-nowrap ${badge.color}`}
                      >
                        {badge.label}
                      </span>
                    </div>
                    <p className="text-sm text-warm-600">
                      {project.role} · {project.dateStart} – {project.dateEnd}
                    </p>
                  </div>

                  <p className="text-sm text-warm-700 leading-relaxed mb-2">
                    {project.snapshot}
                  </p>

                  <span className="text-xs text-sage-600 group-hover:text-sage-700 font-medium inline-flex items-center gap-1 transition-all duration-200 ease-out">
                    View details
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
