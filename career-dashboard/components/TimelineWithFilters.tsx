'use client';

import { useEffect, useMemo, useState } from 'react';
import { skillGraph } from '@/data/skillGraph';
import { projects } from '@/data/projects';
import Timeline from './Timeline';
import ExperienceMeter from './ExperienceMeter';
import {
  createProjectsMap,
  computeTotalMonthsFromExperiences,
} from '@/lib/durationUtils';

type BranchId = 'product' | 'growth' | 'ops';

type FilterState = {
  branch: BranchId | null;
  group: string | null;
  skill: string | null;
  tool: string | null;
};

interface TimelineWithFiltersProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  filterState: FilterState;
  setFilterState: (state: FilterState) => void;
  onJumpToFilter: (state: Partial<FilterState>) => void;
  onResetFilters: () => void;
}

// Constants for tool chip limiting
const MAX_VISIBLE_TOOLS = 8;

// Pre-compute projects map for efficient lookups
const projectsMap = createProjectsMap(projects);

/**
 * Gets the set of matching experience IDs for a given set of skill names.
 * Optionally filters by tool.
 */
function getMatchingExperienceIds(
  skillNames: string[],
  selectedTool?: string | null
): Set<string> {
  const ids = new Set<string>();

  for (const project of projects) {
    if (!project.sections) continue;

    const sections = Object.values(project.sections);
    const hasRelevantSkill = sections.some(section =>
      section?.skills?.some(skill => skillNames.includes(skill))
    );

    if (!hasRelevantSkill) continue;

    // If a tool is selected, further filter
    if (selectedTool) {
      const hasToolWithSkill = sections.some(section =>
        section?.tools?.includes(selectedTool) &&
        section?.skills?.some(skill => skillNames.includes(skill))
      );
      if (!hasToolWithSkill) continue;
    }

    ids.add(project.id);
  }

  return ids;
}

/**
 * Computes the total months from a set of experience IDs.
 */
function getTotalMonthsFromIds(ids: Set<string>): number {
  return computeTotalMonthsFromExperiences(ids, projectsMap);
}

/**
 * Helper: get all skill names for a branch
 */
function getBranchSkillNames(branchId: BranchId): string[] {
  const branch = skillGraph[branchId];
  if (!branch) return [];
  return Object.values(branch.skillGroups).flatMap(group =>
    Object.values(group.skills).map(s => s.name)
  );
}

/**
 * Helper: get all skill names for a skill group
 */
function getGroupSkillNames(branchId: BranchId, groupId: string): string[] {
  const branch = skillGraph[branchId];
  if (!branch) return [];
  const group = branch.skillGroups[groupId];
  if (!group) return [];
  return Object.values(group.skills).map(s => s.name);
}

export default function TimelineWithFilters({
  showFilters,
  setShowFilters,
  filterState,
  setFilterState,
  onResetFilters,
}: TimelineWithFiltersProps) {
  const { branch: expandedBranch, group: expandedGroup, skill: selectedSkill, tool: selectedTool } = filterState;
  const [showAllTools, setShowAllTools] = useState(false);

  // Sync filter state changes
  const setExpandedBranch = (branch: BranchId | null) => {
    setFilterState({ ...filterState, branch, group: null, skill: null, tool: null });
    setShowAllTools(false);
  };

  const setExpandedGroup = (group: string | null) => {
    setFilterState({ ...filterState, group, skill: null, tool: null });
    setShowAllTools(false);
  };

  const setSelectedSkill = (skill: string | null) => {
    setFilterState({ ...filterState, skill, tool: null });
    setShowAllTools(false);
  };

  const setSelectedTool = (tool: string | null) => {
    setFilterState({ ...filterState, tool });
  };

  // Collect all skill names based on current filter level
  const relevantSkillNames = useMemo(() => {
    if (!expandedBranch) return [];

    const branch = skillGraph[expandedBranch];
    if (!branch) return [];

    // Level 4: Specific skill selected
    if (selectedSkill && expandedGroup) {
      const skill = branch.skillGroups[expandedGroup]?.skills[selectedSkill];
      return skill ? [skill.name] : [];
    }

    // Level 3: Skill group selected - get all skills in that group
    if (expandedGroup) {
      const group = branch.skillGroups[expandedGroup];
      if (!group) return [];
      return Object.values(group.skills).map(s => s.name);
    }

    // Level 2: Branch selected - get all skills in all groups of this branch
    return Object.values(branch.skillGroups).flatMap(group =>
      Object.values(group.skills).map(s => s.name)
    );
  }, [expandedBranch, expandedGroup, selectedSkill]);

  // Get filtered projects based on current filter level (progressive filtering)
  const filteredProjects = useMemo(() => {
    // No filter active - show all projects
    if (!expandedBranch) return undefined;

    // No relevant skills found for current filter
    if (relevantSkillNames.length === 0) return undefined;

    return projects.filter(project => {
      if (!project.sections) return false;

      const sections = Object.values(project.sections);

      // Check if project has any of the relevant skills
      const hasRelevantSkill = sections.some(section =>
        section?.skills?.some(skill => relevantSkillNames.includes(skill))
      );

      if (!hasRelevantSkill) return false;

      // If a tool is selected, further filter by tool (must have tool AND a relevant skill in same section)
      if (selectedTool) {
        return sections.some(section =>
          section?.tools?.includes(selectedTool) &&
          section?.skills?.some(skill => relevantSkillNames.includes(skill))
        );
      }

      return true;
    });
  }, [expandedBranch, relevantSkillNames, selectedTool]);

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

  const handleToolClick = (tool: string) => {
    setSelectedTool(selectedTool === tool ? null : tool);
  };

  const handleResetFilters = () => {
    onResetFilters();
    setShowAllTools(false);
  };

  // Go back one level
  const handleBack = () => {
    if (selectedSkill) {
      setSelectedSkill(null);
    } else if (expandedGroup) {
      setExpandedGroup(null);
    } else if (expandedBranch) {
      setExpandedBranch(null);
    } else {
      setShowFilters(false);
    }
  };

  const isFiltered = expandedBranch !== null;
  const isFilteringActive = showFilters && (expandedBranch || expandedGroup || selectedSkill);
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

  // Get current breadcrumb label
  const getCurrentLabel = () => {
    if (selectedSkill && expandedBranch && expandedGroup) {
      return skillGraph[expandedBranch].skillGroups[expandedGroup]?.skills[selectedSkill]?.name || '';
    }
    if (expandedGroup && expandedBranch) {
      return skillGraph[expandedBranch].skillGroups[expandedGroup]?.name || '';
    }
    if (expandedBranch) {
      return skillGraph[expandedBranch].name;
    }
    return '';
  };

  // Get skill info for summary card
  const skillInfo = expandedBranch && expandedGroup && selectedSkill
    ? skillGraph[expandedBranch].skillGroups[expandedGroup]?.skills[selectedSkill]
    : null;

  // Get tools for the selected skill
  const tools = skillInfo?.tools || [];
  const visibleTools = showAllTools ? tools : tools.slice(0, MAX_VISIBLE_TOOLS);
  const hasMoreTools = tools.length > MAX_VISIBLE_TOOLS;

  // Compute experience metrics for Level 1 (Branch cards)
  const branchMetrics = useMemo(() => {
    const metrics: Record<BranchId, { ids: Set<string>; months: number }> = {} as Record<BranchId, { ids: Set<string>; months: number }>;
    let maxMonths = 0;

    for (const branchId of Object.keys(skillGraph) as BranchId[]) {
      const skillNames = getBranchSkillNames(branchId);
      const ids = getMatchingExperienceIds(skillNames);
      const months = getTotalMonthsFromIds(ids);
      metrics[branchId] = { ids, months };
      maxMonths = Math.max(maxMonths, months);
    }

    return { metrics, maxMonths };
  }, []);

  // Compute experience metrics for Level 2 (Skill Group cards)
  const groupMetrics = useMemo(() => {
    if (!expandedBranch) return { metrics: {}, maxMonths: 0 };

    const branch = skillGraph[expandedBranch];
    const metrics: Record<string, { ids: Set<string>; months: number }> = {};
    let maxMonths = 0;

    for (const groupId of Object.keys(branch.skillGroups)) {
      const skillNames = getGroupSkillNames(expandedBranch, groupId);
      const ids = getMatchingExperienceIds(skillNames);
      const months = getTotalMonthsFromIds(ids);
      metrics[groupId] = { ids, months };
      maxMonths = Math.max(maxMonths, months);
    }

    return { metrics, maxMonths };
  }, [expandedBranch]);

  // Compute experience metrics for Level 3 (Individual Skill cards)
  const skillMetrics = useMemo(() => {
    if (!expandedBranch || !expandedGroup) return { metrics: {}, maxMonths: 0 };

    const group = skillGraph[expandedBranch].skillGroups[expandedGroup];
    if (!group) return { metrics: {}, maxMonths: 0 };

    const metrics: Record<string, { ids: Set<string>; months: number }> = {};
    let maxMonths = 0;

    for (const skillId of Object.keys(group.skills)) {
      const skill = group.skills[skillId];
      const ids = getMatchingExperienceIds([skill.name]);
      const months = getTotalMonthsFromIds(ids);
      metrics[skillId] = { ids, months };
      maxMonths = Math.max(maxMonths, months);
    }

    return { metrics, maxMonths };
  }, [expandedBranch, expandedGroup]);

  // Compute experience metrics for Level 4 (Summary card with optional tool filter)
  const summaryMetrics = useMemo(() => {
    if (!expandedBranch || !expandedGroup || !selectedSkill) {
      return { ids: new Set<string>(), months: 0 };
    }

    const skill = skillGraph[expandedBranch].skillGroups[expandedGroup]?.skills[selectedSkill];
    if (!skill) return { ids: new Set<string>(), months: 0 };

    const ids = getMatchingExperienceIds([skill.name], selectedTool);
    const months = getTotalMonthsFromIds(ids);

    return { ids, months };
  }, [expandedBranch, expandedGroup, selectedSkill, selectedTool]);

  // Dev-only assertion: verify parent metrics are union-based
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    // Verify branch metrics equal union of group metrics
    if (expandedBranch && Object.keys(groupMetrics.metrics).length > 0) {
      const branchIds = branchMetrics.metrics[expandedBranch]?.ids || new Set();
      const unionOfGroupIds = new Set<string>();
      for (const groupData of Object.values(groupMetrics.metrics)) {
        for (const id of groupData.ids) {
          unionOfGroupIds.add(id);
        }
      }

      const branchSize = branchIds.size;
      const unionSize = unionOfGroupIds.size;

      if (branchSize !== unionSize) {
        console.warn(
          `[ExperienceMeter] Branch "${expandedBranch}" has ${branchSize} experiences, but union of groups has ${unionSize}. They should match.`
        );
      }
    }

    // Verify group metrics equal union of skill metrics
    if (expandedBranch && expandedGroup && Object.keys(skillMetrics.metrics).length > 0) {
      const groupIds = groupMetrics.metrics[expandedGroup]?.ids || new Set();
      const unionOfSkillIds = new Set<string>();
      for (const skillData of Object.values(skillMetrics.metrics)) {
        for (const id of skillData.ids) {
          unionOfSkillIds.add(id);
        }
      }

      const groupSize = groupIds.size;
      const unionSize = unionOfSkillIds.size;

      if (groupSize !== unionSize) {
        console.warn(
          `[ExperienceMeter] Group "${expandedGroup}" has ${groupSize} experiences, but union of skills has ${unionSize}. They should match.`
        );
      }
    }
  }, [expandedBranch, expandedGroup, branchMetrics, groupMetrics, skillMetrics]);

  return (
    <section className="max-w-4xl mx-auto px-6 pt-6 pb-20">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-medium text-warm-900">What I&apos;ve Built</h2>
      </div>

      {/* Mobile: Explore by skill button (when filters not shown) */}
      {isMobile && !showFilters && (
        <div className="mb-6">
          <button
            onClick={() => setShowFilters(true)}
            className="w-full py-3 bg-warm-800 text-white text-sm font-medium rounded-lg hover:bg-warm-900 transition-colors"
          >
            Explore by skill
          </button>
        </div>
      )}

      {/* Desktop: Filter by skill button (when filters not shown) */}
      {!isMobile && !showFilters && (
        <div className="mb-6">
          <button
            onClick={() => setShowFilters(true)}
            className="px-4 py-2 bg-warm-100 text-warm-700 text-sm font-medium rounded-lg hover:bg-warm-200 transition-colors border border-warm-200"
          >
            Filter by skill
          </button>
        </div>
      )}

      {/* Sticky compact navigation bar when filtering */}
      {isFilteringActive && (
        <div className="sticky top-0 z-10 bg-warm-50 border-b border-warm-200 -mx-6 px-6 py-2 mb-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-1 text-sm text-warm-600 hover:text-warm-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>{selectedSkill ? 'Change skill' : expandedGroup ? 'Back' : expandedBranch ? 'Back' : 'Close'}</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs text-warm-500 truncate max-w-[150px]">{getCurrentLabel()}</span>
            <button
              onClick={handleResetFilters}
              className="text-xs text-warm-500 hover:text-warm-700 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Skill Graph Filter UI */}
      {showFilters && (
        <div className="mb-6">
          {/* Level 1: Branch Tiles - Compact with match count */}
          {!expandedBranch && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(Object.keys(skillGraph) as BranchId[]).map(branchId => {
                const branch = skillGraph[branchId];
                const metrics = branchMetrics.metrics[branchId];
                const branchMatchCount = metrics?.ids.size || 0;

                return (
                  <button
                    key={branchId}
                    onClick={() => handleBranchClick(branchId)}
                    className="p-4 bg-white border border-warm-200 rounded-lg hover:border-sage-400 hover:shadow-sm transition-all duration-200 ease-out text-left group"
                  >
                    <h3 className="text-base font-medium text-warm-900 mb-1 group-hover:text-sage-700 transition-colors">
                      {branch.name}
                    </h3>
                    <p className="text-xs text-warm-600 line-clamp-2">{branch.description}</p>
                    <div className="mt-2">
                      <p className="text-[10px] text-warm-400">{branchMatchCount} experience{branchMatchCount === 1 ? '' : 's'}</p>
                      <ExperienceMeter
                        months={metrics?.months || 0}
                        maxMonths={branchMetrics.maxMonths}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Level 2: Skill Groups - Compact with match count */}
          {expandedBranch && !expandedGroup && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {Object.entries(skillGraph[expandedBranch].skillGroups).map(([groupId, group]) => {
                const metrics = groupMetrics.metrics[groupId];
                const groupMatchCount = metrics?.ids.size || 0;

                return (
                  <button
                    key={groupId}
                    onClick={() => handleGroupClick(groupId)}
                    className="p-4 bg-white border border-warm-200 rounded-lg hover:border-sage-400 hover:shadow-sm transition-all duration-200 ease-out text-left group"
                  >
                    <h4 className="text-sm font-medium text-warm-900 mb-1 group-hover:text-sage-700 transition-colors">
                      {group.name}
                    </h4>
                    <p className="text-xs text-warm-600 line-clamp-2">{group.description}</p>
                    <div className="mt-2">
                      <p className="text-[10px] text-warm-400">{groupMatchCount} experience{groupMatchCount === 1 ? '' : 's'}</p>
                      <ExperienceMeter
                        months={metrics?.months || 0}
                        maxMonths={groupMetrics.maxMonths}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Level 3: Skills List - Compact with match count */}
          {expandedBranch && expandedGroup && !selectedSkill && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(skillGraph[expandedBranch].skillGroups[expandedGroup].skills).map(([skillId, skill]) => {
                const metrics = skillMetrics.metrics[skillId];
                const skillMatchCount = metrics?.ids.size || 0;

                return (
                  <button
                    key={skillId}
                    onClick={() => handleSkillClick(skillId)}
                    className="p-4 bg-white border border-warm-200 rounded-lg hover:border-sage-400 hover:shadow-sm transition-all duration-200 ease-out text-left group"
                  >
                    <h5 className="text-sm font-medium text-warm-900 mb-1 group-hover:text-sage-700 transition-colors">
                      {skill.name}
                    </h5>
                    <p className="text-xs text-warm-600 line-clamp-2">{skill.description}</p>
                    <div className="mt-2">
                      <p className="text-[10px] text-warm-400">{skillMatchCount} experience{skillMatchCount === 1 ? '' : 's'}</p>
                      <ExperienceMeter
                        months={metrics?.months || 0}
                        maxMonths={skillMetrics.maxMonths}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Level 4: Skill Summary Card with Tools */}
          {selectedSkill && skillInfo && (
            <div className="p-4 bg-white border border-warm-200 rounded-lg">
              <h3 className="text-base font-medium text-warm-900 mb-1">
                {skillInfo.name}
              </h3>
              <p className="text-xs text-warm-600 mb-3">
                {skillInfo.description}
              </p>

              {/* Tool chips - compact */}
              {tools.length > 0 && (
                <div className="pt-3 border-t border-warm-100">
                  <p className="text-xs text-warm-500 mb-2">Filter by tool (optional)</p>
                  <div className="flex flex-wrap gap-1.5">
                    {visibleTools.map(tool => (
                      <button
                        key={tool}
                        onClick={() => handleToolClick(tool)}
                        className={`px-2 py-1 text-[11px] rounded border font-medium transition-all duration-150 ${
                          selectedTool === tool
                            ? 'bg-warm-800 text-white border-warm-800'
                            : 'bg-white text-warm-600 border-warm-200 hover:border-warm-300'
                        }`}
                      >
                        {tool}
                      </button>
                    ))}
                    {hasMoreTools && !showAllTools && (
                      <button
                        onClick={() => setShowAllTools(true)}
                        className="px-2 py-1 text-[11px] rounded border border-warm-200 text-warm-500 hover:text-warm-700 hover:border-warm-300 transition-colors"
                      >
                        +{tools.length - MAX_VISIBLE_TOOLS} more
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-3 pt-3 border-t border-warm-100">
                <p className="text-xs text-warm-500">
                  {summaryMetrics.ids.size} experience{summaryMetrics.ids.size === 1 ? '' : 's'} {selectedTool ? `using ${selectedTool}` : 'match'}
                </p>
                <ExperienceMeter
                  months={summaryMetrics.months}
                  maxMonths={skillMetrics.maxMonths}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Visual separator when filtered */}
      {isFiltered && (
        <div className="border-t border-warm-200 pt-4 mb-2">
          <h3 className="text-xs font-medium text-warm-500 uppercase tracking-wide mb-3">
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
