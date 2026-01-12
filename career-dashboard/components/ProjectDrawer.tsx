'use client';

import { useEffect, useState, useCallback } from 'react';
import { projects, Project } from '@/data/projects';
import { skillGraph } from '@/data/skillGraph';
import * as Dialog from '@radix-ui/react-dialog';

type FilterState = {
  branch: 'product' | 'growth' | 'ops' | null;
  group: string | null;
  skill: string | null;
  tool: string | null;
};

interface ProjectDrawerProps {
  onJumpToFilter: (state: Partial<FilterState>) => void;
}

// Helper to find skill location in taxonomy
function findSkillLocation(skillName: string): { branch: 'product' | 'growth' | 'ops'; group: string; skill: string } | null {
  for (const [branchId, branch] of Object.entries(skillGraph)) {
    for (const [groupId, group] of Object.entries(branch.skillGroups)) {
      for (const [skillId, skill] of Object.entries(group.skills)) {
        if (skill.name === skillName) {
          return {
            branch: branchId as 'product' | 'growth' | 'ops',
            group: groupId,
            skill: skillId
          };
        }
      }
    }
  }
  return null;
}

// Helper to find tool location in taxonomy
function findToolLocation(toolName: string): { branch: 'product' | 'growth' | 'ops'; group: string; skill: string } | null {
  for (const [branchId, branch] of Object.entries(skillGraph)) {
    for (const [groupId, group] of Object.entries(branch.skillGroups)) {
      for (const [skillId, skill] of Object.entries(group.skills)) {
        if (skill.tools.includes(toolName)) {
          return {
            branch: branchId as 'product' | 'growth' | 'ops',
            group: groupId,
            skill: skillId
          };
        }
      }
    }
  }
  return null;
}

export default function ProjectDrawer({ onJumpToFilter }: ProjectDrawerProps) {
  const [open, setOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const project = projects.find(p => p.id === hash);
        if (project) {
          setActiveProject(project);
          setOpen(true);
        }
      } else {
        setOpen(false);
        setActiveProject(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleClose = () => {
    window.location.hash = '';
  };

  const handleSkillClick = useCallback((skillName: string) => {
    const location = findSkillLocation(skillName);
    if (location) {
      handleClose();
      setTimeout(() => {
        onJumpToFilter({
          branch: location.branch,
          group: location.group,
          skill: location.skill,
          tool: null
        });
      }, 100);
    }
  }, [onJumpToFilter]);

  const handleToolClick = useCallback((toolName: string, sectionSkills?: string[]) => {
    // Try to find tool in context of section skills first
    if (sectionSkills) {
      for (const skillName of sectionSkills) {
        const location = findSkillLocation(skillName);
        if (location) {
          const skill = skillGraph[location.branch].skillGroups[location.group].skills[location.skill];
          if (skill.tools.includes(toolName)) {
            handleClose();
            setTimeout(() => {
              onJumpToFilter({
                branch: location.branch,
                group: location.group,
                skill: location.skill,
                tool: toolName
              });
            }, 100);
            return;
          }
        }
      }
    }

    // Fallback to first tool location
    const location = findToolLocation(toolName);
    if (location) {
      handleClose();
      setTimeout(() => {
        onJumpToFilter({
          branch: location.branch,
          group: location.group,
          skill: location.skill,
          tool: toolName
        });
      }, 100);
    }
  }, [onJumpToFilter]);

  if (!activeProject) return null;

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-warm-900/60 backdrop-blur-sm z-40" />
        <Dialog.Content className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-warm-50 shadow-2xl overflow-y-auto z-50">
          {/* Sticky header */}
          <div className="sticky top-0 z-10 bg-warm-50 border-b border-warm-200 px-10 py-4 pt-[89px]">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <Dialog.Title className="text-xl font-medium text-warm-900 truncate pr-4">
                  {activeProject.title}
                </Dialog.Title>
                <p className="text-sm text-warm-600 mt-1">
                  {activeProject.org} • {activeProject.role} • {activeProject.dateStart} - {activeProject.dateEnd}
                </p>
              </div>
              <Dialog.Close asChild>
                <button className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-warm-500 hover:text-warm-800 hover:bg-warm-100 rounded-lg transition-all duration-200 ease-out">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </Dialog.Close>
            </div>
          </div>

          <div className="p-10">
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {activeProject.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-warm-100 text-warm-700 text-xs rounded-full font-medium border border-warm-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {activeProject.primaryMetric && (
              <div className="mb-12 p-8 bg-amber-50/30 rounded-xl border-l-4 border-amber-600/40">
                <p className="text-3xl font-medium text-warm-900">{activeProject.primaryMetric.value}</p>
                <p className="text-base text-warm-700 font-medium mt-2">{activeProject.primaryMetric.label}</p>
                {activeProject.primaryMetric.context && (
                  <p className="text-sm text-warm-600 mt-1">{activeProject.primaryMetric.context}</p>
                )}
              </div>
            )}

            <div className="mb-12">
              <p className="text-base text-warm-700 leading-loose">{activeProject.snapshot}</p>
            </div>

            {/* New section-based structure */}
            {activeProject.sections ? (
              <div className="space-y-10 mb-12">
                {activeProject.sections.product && activeProject.sections.product.items.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-warm-600 uppercase tracking-wider mb-4">Product</h3>
                    <ul className="space-y-3 mb-4">
                      {activeProject.sections.product.items.map((item, i) => (
                        <li key={i} className="text-sm text-warm-700 flex leading-loose">
                          <span className="mr-2 text-sage-500">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    {activeProject.sections.product.skills && activeProject.sections.product.skills.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-medium text-warm-600 mb-2">Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.sections.product.skills.map((skill, i) => (
                            <button
                              key={i}
                              onClick={() => handleSkillClick(skill)}
                              className="px-3 py-1.5 bg-sage-100 text-sage-800 text-xs rounded-md border border-sage-300 font-medium hover:bg-sage-200 hover:border-sage-400 transition-all duration-200 cursor-pointer"
                            >
                              {skill}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {activeProject.sections.product.tools && activeProject.sections.product.tools.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-warm-600 mb-2">Tools:</p>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.sections.product.tools.map((tool, i) => (
                            <button
                              key={i}
                              onClick={() => handleToolClick(tool, activeProject.sections?.product?.skills)}
                              className="px-3 py-1.5 bg-warm-50 text-warm-600 text-xs rounded-md border border-warm-200 font-medium hover:bg-warm-100 hover:border-warm-300 transition-all duration-200 cursor-pointer"
                            >
                              {tool}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeProject.sections.growth && activeProject.sections.growth.items.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-warm-600 uppercase tracking-wider mb-4">Growth</h3>
                    <ul className="space-y-3 mb-4">
                      {activeProject.sections.growth.items.map((item, i) => (
                        <li key={i} className="text-sm text-warm-700 flex leading-loose">
                          <span className="mr-2 text-sage-500">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    {activeProject.sections.growth.skills && activeProject.sections.growth.skills.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-medium text-warm-600 mb-2">Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.sections.growth.skills.map((skill, i) => (
                            <button
                              key={i}
                              onClick={() => handleSkillClick(skill)}
                              className="px-3 py-1.5 bg-sage-100 text-sage-800 text-xs rounded-md border border-sage-300 font-medium hover:bg-sage-200 hover:border-sage-400 transition-all duration-200 cursor-pointer"
                            >
                              {skill}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {activeProject.sections.growth.tools && activeProject.sections.growth.tools.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-warm-600 mb-2">Tools:</p>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.sections.growth.tools.map((tool, i) => (
                            <button
                              key={i}
                              onClick={() => handleToolClick(tool, activeProject.sections?.growth?.skills)}
                              className="px-3 py-1.5 bg-warm-50 text-warm-600 text-xs rounded-md border border-warm-200 font-medium hover:bg-warm-100 hover:border-warm-300 transition-all duration-200 cursor-pointer"
                            >
                              {tool}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeProject.sections.ops && activeProject.sections.ops.items.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-warm-600 uppercase tracking-wider mb-4">Ops & Strategy</h3>
                    <ul className="space-y-3 mb-4">
                      {activeProject.sections.ops.items.map((item, i) => (
                        <li key={i} className="text-sm text-warm-700 flex leading-loose">
                          <span className="mr-2 text-sage-500">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    {activeProject.sections.ops.skills && activeProject.sections.ops.skills.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-medium text-warm-600 mb-2">Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.sections.ops.skills.map((skill, i) => (
                            <button
                              key={i}
                              onClick={() => handleSkillClick(skill)}
                              className="px-3 py-1.5 bg-sage-100 text-sage-800 text-xs rounded-md border border-sage-300 font-medium hover:bg-sage-200 hover:border-sage-400 transition-all duration-200 cursor-pointer"
                            >
                              {skill}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {activeProject.sections.ops.tools && activeProject.sections.ops.tools.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-warm-600 mb-2">Tools:</p>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.sections.ops.tools.map((tool, i) => (
                            <button
                              key={i}
                              onClick={() => handleToolClick(tool, activeProject.sections?.ops?.skills)}
                              className="px-3 py-1.5 bg-warm-50 text-warm-600 text-xs rounded-md border border-warm-200 font-medium hover:bg-warm-100 hover:border-warm-300 transition-all duration-200 cursor-pointer"
                            >
                              {tool}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* Legacy structure for older projects */
              <>
                {activeProject.bullets && activeProject.bullets.length > 0 && (
                  <div className="mb-12">
                    <h3 className="text-sm font-medium text-warm-600 uppercase tracking-wider mb-4">Key Responsibilities</h3>
                    <ul className="space-y-3">
                      {activeProject.bullets.map((bullet, i) => (
                        <li key={i} className="text-sm text-warm-700 flex leading-loose">
                          <span className="mr-2 text-sage-500">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {activeProject.skills && activeProject.skills.length > 0 && (
              <div className="mb-12">
                <h3 className="text-sm font-medium text-warm-600 uppercase tracking-wider mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {activeProject.skills.map((skill, i) => (
                    <button
                      key={i}
                      onClick={() => handleSkillClick(skill)}
                      className="px-3 py-1.5 bg-sage-100 text-sage-800 text-xs rounded-md border border-sage-300 font-medium hover:bg-sage-200 hover:border-sage-400 transition-all duration-200 cursor-pointer"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeProject.learned && (
              <div className="mb-12">
                <h3 className="text-sm font-medium text-warm-600 uppercase tracking-wider mb-4">What I learned</h3>
                <p className="text-base text-warm-700 leading-loose">{activeProject.learned}</p>
              </div>
            )}

            {activeProject.links && activeProject.links.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-medium text-warm-600 uppercase tracking-wider mb-4">References / Selected Artifacts</h3>
                <div className="space-y-2">
                  {activeProject.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-warm-600 hover:text-sage-700 transition-all duration-200 ease-out"
                    >
                      • {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
