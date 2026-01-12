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
  const [showFilters, setShowFilters] = useState(false);
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
    setShowFilters(false);
    setExpandedBranch(null);
    setExpandedGroup(null);
    setSelectedSkill(null);
    setSelectedTool(null);
  };

  const isFiltered = selectedSkill !== null;

  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      {/* Header with Filter Button and Reset */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-medium text-warm-900">What I&apos;ve Built</h2>
          {(showFilters || isFiltered) && (
            <button
              onClick={handleResetFilters}
              className="text-sm text-warm-600 hover:text-warm-900 transition-all duration-200 ease-out font-medium"
            >
              Reset & show all
            </button>
          )}
        </div>

        {!showFilters && !isFiltered && (
          <div className="text-center">
            <button
              onClick={() => setShowFilters(true)}
              className="px-6 py-3 bg-warm-800 text-white rounded-lg hover:bg-warm-900 transition-all duration-200 ease-out font-medium shadow-sm"
            >
              Filter by skill
            </button>
            <p className="text-sm text-warm-600 mt-3">or browse all experiences below</p>
          </div>
        )}
      </div>

      {/* Skill Graph Filter UI */}
      {showFilters && (
      <div className="mb-10">
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
            <button
              onClick={() => handleSkillClick(selectedSkill)}
              className="mb-6 px-4 py-2 bg-warm-100 text-warm-700 rounded-lg hover:bg-warm-200 transition-all duration-200 ease-out text-sm font-medium"
            >
              ← Back to skills
            </button>

            <div className="p-8 bg-white border border-warm-200 rounded-xl">
              <h3 className="text-lg font-medium text-warm-900 mb-2">
                {skillGraph[expandedBranch].skillGroups[expandedGroup].skills[selectedSkill].name}
              </h3>
              <p className="text-sm text-warm-600 mb-6">
                {skillGraph[expandedBranch].skillGroups[expandedGroup].skills[selectedSkill].description}
              </p>

              {/* Tools Section */}
              {skillGraph[expandedBranch].skillGroups[expandedGroup].skills[selectedSkill].tools.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-warm-700 mb-3">Filter by tool (optional)</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGraph[expandedBranch].skillGroups[expandedGroup].skills[selectedSkill].tools.map(tool => (
                      <button
                        key={tool}
                        onClick={() => handleToolClick(tool)}
                        className={`px-3 py-1.5 text-xs rounded-md border font-medium transition-all duration-200 ease-out ${
                          selectedTool === tool
                            ? 'bg-warm-800 text-white border-warm-800'
                            : 'bg-warm-50 text-warm-700 border-warm-300 hover:border-warm-400'
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

      {/* Timeline with filtered projects */}
      <Timeline filteredProjects={filteredProjects} />
    </section>
  );
}
