'use client';

import { useState, useMemo } from 'react';
import { skillGraph } from '@/data/skillGraph';
import { projects } from '@/data/projects';
import Timeline from './Timeline';

type BranchId = 'product' | 'growth' | 'ops';

interface BreadcrumbItem {
  level: 'branch' | 'group' | 'skill';
  id: string;
  label: string;
}

export default function TimelineWithFilters() {
  const [expandedBranch, setExpandedBranch] = useState<BranchId | null>(null);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

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
      setExpandedGroup(null);
      setSelectedSkill(null);
      setSelectedTool(null);
    } else {
      setExpandedBranch(branchId);
      setExpandedGroup(null);
      setSelectedSkill(null);
      setSelectedTool(null);
    }
  };

  const handleGroupClick = (groupId: string) => {
    if (expandedGroup === groupId) {
      setExpandedGroup(null);
      setSelectedSkill(null);
      setSelectedTool(null);
    } else {
      setExpandedGroup(groupId);
      setSelectedSkill(null);
      setSelectedTool(null);
    }
  };

  const handleSkillClick = (skillId: string) => {
    if (selectedSkill === skillId) {
      setSelectedSkill(null);
      setSelectedTool(null);
    } else {
      setSelectedSkill(skillId);
      setSelectedTool(null);
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    const crumb = breadcrumbs[index];

    if (crumb.level === 'branch') {
      setExpandedGroup(null);
      setSelectedSkill(null);
      setSelectedTool(null);
    } else if (crumb.level === 'group') {
      setSelectedSkill(null);
      setSelectedTool(null);
    }
  };

  const handleToolClick = (tool: string) => {
    setSelectedTool(selectedTool === tool ? null : tool);
  };

  const handleResetFilters = () => {
    setExpandedBranch(null);
    setExpandedGroup(null);
    setSelectedSkill(null);
    setSelectedTool(null);
  };

  const isFiltered = selectedSkill !== null;

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">What I&apos;ve Built</h2>
        <p className="text-sm text-slate-600">
          {isFiltered
            ? 'Filtered by skill. Click "Show all experiences" to reset.'
            : 'Explore by skill or browse all experiences below.'}
        </p>
      </div>

      {/* Skill Graph Filter UI */}
      <div className="mb-8">
        {/* Breadcrumbs and Reset */}
        {breadcrumbs.length > 0 && (
          <div className="mb-4 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-slate-600 overflow-x-auto">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.id} className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleBreadcrumbClick(index)}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {crumb.label}
                  </button>
                  {index < breadcrumbs.length - 1 && (
                    <span className="text-slate-400">→</span>
                  )}
                </div>
              ))}
            </div>
            {isFiltered && (
              <button
                onClick={handleResetFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap"
              >
                Show all experiences
              </button>
            )}
          </div>
        )}

        {/* Level 1: Branch Tiles */}
        {!expandedBranch && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(Object.keys(skillGraph) as BranchId[]).map(branchId => {
              const branch = skillGraph[branchId];
              return (
                <button
                  key={branchId}
                  onClick={() => handleBranchClick(branchId)}
                  className="p-6 bg-white border-2 border-slate-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-left group"
                >
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {branch.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">{branch.description}</p>
                  <div className="text-sm text-blue-600 font-medium">
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
              className="mb-4 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
            >
              ← Back to branches
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(skillGraph[expandedBranch].skillGroups).map(([groupId, group]) => (
                <button
                  key={groupId}
                  onClick={() => handleGroupClick(groupId)}
                  className="p-5 bg-white border border-slate-200 rounded-lg hover:border-blue-400 hover:shadow transition-all text-left group"
                >
                  <h4 className="text-base font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {group.name}
                  </h4>
                  <p className="text-sm text-slate-600">{group.description}</p>
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
              className="mb-4 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
            >
              ← Back to skill groups
            </button>

            <div className="space-y-3">
              {Object.entries(skillGraph[expandedBranch].skillGroups[expandedGroup].skills).map(([skillId, skill]) => (
                <button
                  key={skillId}
                  onClick={() => handleSkillClick(skillId)}
                  className="w-full p-4 bg-white border border-slate-200 rounded-lg hover:border-blue-400 hover:shadow transition-all text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-base font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                        {skill.name}
                      </h5>
                      <p className="text-sm text-slate-600 mt-1">{skill.description}</p>
                    </div>
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Level 4: Skill Selected with Tools */}
        {expandedBranch && expandedGroup && selectedSkill && (
          <div>
            <button
              onClick={() => handleSkillClick(selectedSkill)}
              className="mb-4 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
            >
              ← Back to skills
            </button>

            <div className="p-6 bg-white border border-slate-200 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {skillGraph[expandedBranch].skillGroups[expandedGroup].skills[selectedSkill].name}
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                {skillGraph[expandedBranch].skillGroups[expandedGroup].skills[selectedSkill].description}
              </p>

              {/* Tools Section */}
              {skillGraph[expandedBranch].skillGroups[expandedGroup].skills[selectedSkill].tools.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-3">Filter by tool (optional)</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGraph[expandedBranch].skillGroups[expandedGroup].skills[selectedSkill].tools.map(tool => (
                      <button
                        key={tool}
                        onClick={() => handleToolClick(tool)}
                        className={`px-2.5 py-1 text-xs rounded-md border font-medium transition-colors ${
                          selectedTool === tool
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        {tool}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-600">
                  {filteredProjects?.length || 0} experience{filteredProjects?.length === 1 ? '' : 's'} {selectedTool ? `using ${selectedTool}` : 'match this skill'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Timeline with filtered projects */}
      <Timeline filteredProjects={filteredProjects} />
    </section>
  );
}
