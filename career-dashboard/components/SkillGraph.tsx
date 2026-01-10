'use client';

import { useState, useMemo } from 'react';
import { skillGraph } from '@/data/skillGraph';
import { projects } from '@/data/projects';

type BranchId = 'product' | 'growth' | 'ops';

interface BreadcrumbItem {
  level: 'branch' | 'group' | 'skill';
  id: string;
  label: string;
}

export default function SkillGraph() {
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

  // Get roles that use a specific skill
  const getMatchingRoles = useMemo(() => {
    if (!selectedSkill || !expandedBranch || !expandedGroup) return [];

    const skill = skillGraph[expandedBranch].skillGroups[expandedGroup]?.skills[selectedSkill];
    if (!skill) return [];

    return projects.filter(project => {
      if (!project.sections) return false;

      const sections = Object.values(project.sections);
      return sections.some(section =>
        section?.skills?.includes(skill.name)
      );
    }).filter(project => {
      // If a tool is selected, further filter by tool
      if (!selectedTool || !project.sections) return true;

      const sections = Object.values(project.sections);
      return sections.some(section =>
        section?.tools?.includes(selectedTool) && section?.skills?.includes(skill.name)
      );
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

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Skill Graph</h2>
        <p className="text-sm text-slate-600">
          Explore how skills, tools, and experience connect across my work.
        </p>
      </div>

      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-600 overflow-x-auto">
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
            className="mb-6 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
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
            className="mb-6 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
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

      {/* Level 4: Skill Details with Tools & Roles */}
      {expandedBranch && expandedGroup && selectedSkill && (
        <div>
          <button
            onClick={() => handleSkillClick(selectedSkill)}
            className="mb-6 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
          >
            ← Back to skills
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Skill Info */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {skillGraph[expandedBranch].skillGroups[expandedGroup].skills[selectedSkill].name}
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                {skillGraph[expandedBranch].skillGroups[expandedGroup].skills[selectedSkill].description}
              </p>
              <p className="text-xs text-slate-500">
                Used across {getMatchingRoles.length} {getMatchingRoles.length === 1 ? 'role' : 'roles'}
              </p>

              {/* Tools Section */}
              {skillGraph[expandedBranch].skillGroups[expandedGroup].skills[selectedSkill].tools.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-slate-700 mb-3">Tools commonly used</h4>
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
                  {selectedTool && (
                    <p className="text-xs text-slate-500 mt-2">
                      Filtering by {selectedTool}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Right: Roles */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-semibold text-slate-700 mb-4">
                Roles using this skill
                {selectedTool && ` with ${selectedTool}`}
              </h4>

              {getMatchingRoles.length === 0 ? (
                <p className="text-sm text-slate-500">No roles found with this filter combination.</p>
              ) : (
                <div className="space-y-3">
                  {getMatchingRoles.map(role => (
                    <div
                      key={role.id}
                      className="p-4 bg-white border border-slate-200 rounded-lg hover:border-blue-400 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h5 className="text-base font-semibold text-slate-900 truncate">
                            {role.title}
                          </h5>
                          <p className="text-sm text-slate-600 mt-0.5">
                            {role.org} • {role.role}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {role.dateStart} – {role.dateEnd}
                          </p>
                        </div>
                        <div className="shrink-0">
                          <span className={`inline-block px-2 py-1 text-xs rounded ${
                            role.nodeType === 'primary'
                              ? 'bg-blue-100 text-blue-700'
                              : role.nodeType === 'experiment'
                              ? 'bg-green-100 text-green-700'
                              : role.nodeType === 'life'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {role.tags[0] || role.nodeType}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
