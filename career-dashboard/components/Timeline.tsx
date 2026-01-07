'use client';

import { useMemo, useCallback } from 'react';
import { projects } from '@/data/projects';

type Project = (typeof projects)[number];

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
      return { label: 'Core Experience', color: 'bg-slate-100 text-slate-700 border-slate-200' };
    case 'experiment':
      return { label: 'Experiment', color: 'bg-blue-50 text-blue-700 border-blue-200' };
    case 'life':
      return { label: 'Personal', color: 'bg-amber-50 text-amber-700 border-amber-200' };
    default:
      return { label: 'Experience', color: 'bg-slate-100 text-slate-700 border-slate-200' };
  }
}

function getNodeColor(nodeType: Project['nodeType']) {
  switch (nodeType) {
    case 'primary':
      return 'bg-slate-400';
    case 'experiment':
      return 'bg-blue-400';
    case 'life':
      return 'bg-amber-400';
    default:
      return 'bg-slate-300';
  }
}

export default function Timeline() {
  // Derived data only; no mutation of imported data.
  const allProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      return parseQuarterDate(b.dateStart) - parseQuarterDate(a.dateStart);
    });
  }, []);

  const handleClick = useCallback((projectId: string) => {
    // Keep hashes consistent. If your drawer expects "#<id>", this is correct.
    window.location.hash = projectId.startsWith('#') ? projectId : `#${projectId}`;
  }, []);

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">My Career Evolution</h2>
        <p className="text-sm text-slate-600">Click any role to expand for details.</p>
      </div>

      {/* Unified Timeline Stream */}
      <div className="relative">
        {/* Vertical timeline line with subtle gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-slate-300 via-slate-200 to-slate-100 rounded-full" />

        {/* Timeline entries */}
        <div className="space-y-8">
          {allProjects.map((project) => {
            const badge = getTypeBadge(project.nodeType);
            const nodeColor = getNodeColor(project.nodeType);

            return (
              <div key={project.id} className="relative pl-8">
                {/* Node dot */}
                <div
                  className={`absolute left-0 top-2 w-3 h-3 rounded-full ${nodeColor} ring-4 ring-white shadow-sm`}
                  style={{ transform: 'translateX(-5px)' }}
                />

                {/* Content */}
                <button
                  type="button"
                  className="text-left w-full group"
                  onClick={() => handleClick(project.id)}
                >
                  <div className="mb-2">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full border font-medium whitespace-nowrap ${badge.color}`}
                      >
                        {badge.label}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">
                      {project.role} · {project.dateStart} – {project.dateEnd}
                    </p>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed mb-2">
                    {project.snapshot}
                  </p>

                  <span className="text-xs text-blue-600 group-hover:text-blue-700 font-medium inline-flex items-center gap-1">
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
    </section>
  );
}
