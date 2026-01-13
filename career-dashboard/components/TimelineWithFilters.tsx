'use client';

import { useEffect, useMemo, useState } from 'react';
import { skillGraph } from '@/data/skillGraph';
import { projects } from '@/data/projects';
import Timeline from './Timeline';

type BranchId = 'product' | 'growth' | 'ops';

type FilterState = {
  branch: BranchId | null;
  group: string | null;
  skill: string | null;
  tool: string | null;
};

interface BreadcrumbItem {
  level: 'branch' | 'group' | 'skill';
  id: string;
  label: string;
}

interface TimelineWithFiltersProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  filterState: FilterState;
  setFilterState: (state: FilterState) => void;
  onJumpToFilter: (state: Partial<FilterState>) => void;
  onResetFilters: () => void;
}

export default function TimelineWithFilters({
  showFilters,
  setShowFilters,
  filterState,
  setFilterState,
  onResetFilters,
}: TimelineWithFiltersProps) {
  const { branch: expandedBranch, group: expandedGroup, skill: selectedSkill, tool: selectedTool } = filterState;

  // Sync filter state changes
  const setExpandedBranch = (branch: BranchId | null) => {
    setFilterState({ ...filterState, branch, group: null, skill: null, tool: null });
  };

  const setExpandedGroup = (group: string | null) => {
    setFilterState({ ...filterState, group, skill: null, tool: null });
  };

  const setSelectedSkill = (skill: string | null) => {
    setFilterState({ ...filterState, skill, tool: null });
  };

  const setSelectedTool = (tool: string | null) => {
    setFilterState({ ...filterState, tool });
  };

  // Build breadcrumbs
  const breadcrumbs = useMemo<BreadcrumbItem[]>(() => {
    const crumbs: BreadcrumbItem[] = [];

    if (expandedBranch) {
      crumbs.push({
        level: 'branch',
        id: expandedBranch,
        label: skillGraph[expandedBranch].name
      });
    }

    if (expandedGroup && expandedBranch) {
      const group = skillGraph[expandedBranch].skillGroups[expandedGroup];
      if (group) {
        crumbs.push({
          level: 'group',
          id: expandedGroup,
          label: group.name
        });
      }
    }

    if (selectedSkill && expandedGroup && expandedBranch) {
      const skill = skillGraph[expandedBranch].skillGroups[expandedGroup]?.skills[selectedSkill];
      if (skill) {
        crumbs.push({
          level: 'skill',
          id: selectedSkill,
          label: skill.name
        });
      }
    }

    return crumbs;
  }, [expandedBranch, expandedGroup, selectedSkill]);

  // Get filtered projects based on skill/tool selection
  const filteredProjects = useMemo(() => {
    if (!selectedSkill || !expandedBranch || !expandedGroup) return undefined;

    const skill = skillGraph[expandedBranch].skillGroups[expandedGroup]?.skills[selectedSkill];
    if (!skill) return undefined;

    return projects.filter(project => {
      if (!project.sections) return false;

      const sections = Object.values(project.sections);
      const hasSkill = sections.some(section =>
        section?.skills?.includes(skill.name)
      );

      if (!hasSkill) return false;

      // If a tool is selected, further filter by tool
      if (selectedTool) {
        return sections.some(section =>
          section?.tools?.includes(selectedTool) && section?.skills?.includes(skill.name)
        );
      }

      return true;
    });
  }, [selectedSkill, expandedBranch, expandedGroup, selectedTool]);

  const handleBranchClick = (branchId: BranchId) => {
    if (expandedBranch === branchId) {
      setExpandedBranch(null);
    } else {
      setExpandedBranch(branchId);
    }
  };

  const handleGroupClick = (groupId: string) => {
    if (expandedGroup === groupId) {
      setExpandedGroup(null);
    } else {
      setExpandedGroup(groupId);
    }
  };

  const handleSkillClick = (skillId: string) => {
    if (selectedSkill === skillId) {
      setSelectedSkill(null);
    } else {
      setSelectedSkill(skillId);
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    const crumb = breadcrumbs[index];

    if (crumb.level === 'branch') {
      setExpandedGroup(null);
    } else if (crumb.level === 'group') {
      setSelectedSkill(null);
    }
  };

  const handleToolClick = (tool: string) => {
    setSelectedTool(selectedTool === tool ? null : tool);
  };

  const handleResetFilters = () => {
    onResetFilters();
  };

  const isFiltered = selectedSkill !== null;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-show filters if we have a pre-selected filter state from jumping
  useEffect(() => {
    if (filterState.branch || filterState.skill) {
      setShowFilters(true);
    }
  }, [filterState.branch, filterState.skill, setShowFilters]);

  // Get skill name for mobile filter bar
  const skillName = expandedBranch && expandedGroup && selectedSkill
    ? skillGraph[expandedBranch].skillGroups[expandedGroup]?.skills[selectedSkill]?.name
    : '';

  return (
    <section className="max-w-4xl mx-auto px-6 pt-6 pb-20">
      {/* Mobile sticky filter bar */}
      {isMobile && isFiltered && (
        <div className="sticky top-0 z-10 bg-warm-50 border-b border-warm-200 -mx-6 px-6 py-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="px-2 py-1 bg-sage-200 text-sage-800 text-xs rounded-md font-medium truncate">
                {skillName}
              </span>
              {selectedTool && (
                <span className="px-2 py-1 bg-warm-200 text-warm-700 text-xs rounded-md font-medium border border-warm-300 truncate">
                  {selectedTool}
                </span>
              )}
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs text-warm-500 hover:text-warm-700 transition-all shrink-0 ml-2"
            >
              Clear
            </button>
          </div>
          <p className="text-xs text-warm-500 mt-1">
            {filteredProjects?.length || 0} result{filteredProjects?.length === 1 ? '' : 's'}
          </p>
        </div>
      )}

      {/* Header with Filter Button and Reset */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-medium text-warm-900">What I&apos;ve Built</h2>
          {!isMobile && (showFilters || isFiltered) && (
            <button
              onClick={handleResetFilters}
              className="text-sm text-warm-500 hover:text-warm-700 transition-all duration-200 ease-out"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Filtered-by chips - desktop only when filtered */}
        {!isMobile && isFiltered && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs text-warm-500">Filtered by:</span>
            {expandedBranch && (
              <span className="px-2 py-1 bg-sage-100 text-sage-700 text-xs rounded-md font-medium">
                {skillGraph[expandedBranch].name}
              </span>
            )}
            {expandedGroup && expandedBranch && (
              <>
                <span className="text-warm-400">→</span>
                <span className="px-2 py-1 bg-sage-100 text-sage-700 text-xs rounded-md font-medium">
                  {skillGraph[expandedBranch].skillGroups[expandedGroup]?.name}
                </span>
              </>
            )}
            {selectedSkill && expandedGroup && expandedBranch && (
              <>
                <span className="text-warm-400">→</span>
                <span className="px-2 py-1 bg-sage-200 text-sage-800 text-xs rounded-md font-medium">
                  {skillGraph[expandedBranch].skillGroups[expandedGroup]?.skills[selectedSkill]?.name}
                </span>
              </>
            )}
            {selectedTool && (
              <>
                <span className="text-warm-400">+</span>
                <span className="px-2 py-1 bg-warm-200 text-warm-700 text-xs rounded-md font-medium border border-warm-300">
                  {selectedTool}
                </span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Skill Graph Filter UI */}
      {showFilters && (
      <div className="mb-8">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-warm-600 overflow-x-auto">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.id} className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleBreadcrumbClick(index)}
                    className="hover:text-sage-700 transition-all duration-200 ease-out"
                  >
                    {crumb.label}
                  </button>
                  {index < breadcrumbs.length - 1 && (
                    <span className="text-warm-400">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Level 1: Branch Tiles */}
        {!expandedBranch && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(Object.keys(skillGraph) as BranchId[]).map(branchId => {
              const branch = skillGraph[branchId];
              return (
                <button
                  key={branchId}
                  onClick={() => handleBranchClick(branchId)}
                  className="p-6 bg-white border border-warm-200 rounded-xl hover:border-sage-400 hover:shadow-sm transition-all duration-200 ease-out text-left group"
                >
                  <h3 className="text-lg font-medium text-warm-900 mb-2 group-hover:text-sage-700 transition-all duration-200 ease-out">
                    {branch.name}
                  </h3>
                  <p className="text-sm text-warm-600 mb-4">{branch.description}</p>
                  <div className="text-sm text-sage-600 font-medium">
                    Explore →
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Level 2: Skill Groups */}
        {expandedBranch && !expandedGroup && (
          <div>
            <button
              onClick={() => handleBranchClick(expandedBranch)}
              className="mb-6 px-4 py-2 bg-warm-100 text-warm-700 rounded-lg hover:bg-warm-200 transition-all duration-200 ease-out text-sm font-medium"
            >
              ← Back to branches
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(skillGraph[expandedBranch].skillGroups).map(([groupId, group]) => (
                <button
                  key={groupId}
                  onClick={() => handleGroupClick(groupId)}
                  className="p-6 bg-white border border-warm-200 rounded-xl hover:border-sage-400 hover:shadow-sm transition-all duration-200 ease-out text-left group"
                >
                  <h4 className="text-base font-medium text-warm-900 mb-2 group-hover:text-sage-700 transition-all duration-200 ease-out">
                    {group.name}
                  </h4>
                  <p className="text-sm text-warm-600">{group.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Level 3: Skills List */}
        {expandedBranch && expandedGroup && !selectedSkill && (
          <div>
            <button
              onClick={() => handleGroupClick(expandedGroup)}
              className="mb-6 px-4 py-2 bg-warm-100 text-warm-700 rounded-lg hover:bg-warm-200 transition-all duration-200 ease-out text-sm font-medium"
            >
              ← Back to skill groups
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(skillGraph[expandedBranch].skillGroups[expandedGroup].skills).map(([skillId, skill]) => (
                <button
                  key={skillId}
                  onClick={() => handleSkillClick(skillId)}
                  className="p-6 bg-white border border-warm-200 rounded-xl hover:border-sage-400 hover:shadow-sm transition-all duration-200 ease-out text-left group"
                >
                  <h5 className="text-base font-medium text-warm-900 mb-2 group-hover:text-sage-700 transition-all duration-200 ease-out">
                    {skill.name}
                  </h5>
                  <p className="text-sm text-warm-600">{skill.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Level 4: Skill Selected with Tools */}
        {expandedBranch && expandedGroup && selectedSkill && (
          <div>
            {/* Back button - hidden on mobile when we have results (sticky bar handles it) */}
            {!isMobile && (
              <button
                onClick={() => handleSkillClick(selectedSkill)}
                className="mb-6 px-4 py-2 bg-warm-100 text-warm-700 rounded-lg hover:bg-warm-200 transition-all duration-200 ease-out text-sm font-medium"
              >
                ← Back to skills
              </button>
            )}

            <div className="p-6 md:p-8 bg-white border border-warm-200 rounded-xl">
              <h3 className="text-lg font-medium text-warm-900 mb-2">
                {skillGraph[expandedBranch].skillGroups[expandedGroup].skills[selectedSkill].name}
              </h3>
              <p className="text-sm text-warm-600 mb-6">
                {skillGraph[expandedBranch].skillGroups[expandedGroup].skills[selectedSkill].description}
              </p>

              {/* Tools Section - with visual containment */}
              {skillGraph[expandedBranch].skillGroups[expandedGroup].skills[selectedSkill].tools.length > 0 && (
                <div className="p-4 bg-warm-50 rounded-lg border border-warm-200">
                  <h4 className="text-sm font-medium text-warm-700 mb-1">Filter by tool (optional)</h4>
                  <p className="text-xs text-warm-500 mb-3">Narrow results within this skill</p>
                  <div className="flex flex-wrap gap-2">
                    {skillGraph[expandedBranch].skillGroups[expandedGroup].skills[selectedSkill].tools.map(tool => (
                      <button
                        key={tool}
                        onClick={() => handleToolClick(tool)}
                        className={`px-3 py-1.5 text-xs rounded-md border font-medium transition-all duration-200 ease-out ${
                          selectedTool === tool
                            ? 'bg-warm-800 text-white border-warm-800'
                            : 'bg-white text-warm-700 border-warm-300 hover:border-warm-400'
                        }`}
                      >
                        {tool}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-warm-200">
                <p className="text-sm text-warm-600">
                  {filteredProjects?.length || 0} experience{filteredProjects?.length === 1 ? '' : 's'} {selectedTool ? `using ${selectedTool}` : 'match this skill'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      )}

      {/* Visual separator when filtered */}
      {isFiltered && (
        <div className="border-t border-warm-200 pt-6 mb-2">
          <h3 className="text-sm font-medium text-warm-600 mb-4">
            Matching experiences
          </h3>
        </div>
      )}

      {/* Timeline with filtered projects */}
      <div className={isFiltered ? '' : 'pt-2'}>
        <Timeline filteredProjects={filteredProjects} />
      </div>
    </section>
  );
}
