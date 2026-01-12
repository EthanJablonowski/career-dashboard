'use client';

import { useEffect, useState } from 'react';
import { projects, Project } from '@/data/projects';
import * as Dialog from '@radix-ui/react-dialog';

export default function ProjectDrawer() {
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

  if (!activeProject) return null;

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-warm-900/60 backdrop-blur-sm z-40" />
        <Dialog.Content className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-warm-50 shadow-2xl overflow-y-auto z-50 pt-[73px]">
          <div className="p-10 pt-12">
            <div className="mb-12">
              <Dialog.Title className="text-3xl font-medium text-warm-900 mb-3">
                {activeProject.title}
              </Dialog.Title>
              <p className="text-base text-warm-700 font-medium">{activeProject.org} • {activeProject.role}</p>
              <p className="text-sm text-warm-600 mt-1">{activeProject.dateStart} - {activeProject.dateEnd}</p>

              <div className="flex flex-wrap gap-2 mt-6">
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
              <p className="text-base text-warm-700 leading-relaxed">{activeProject.snapshot}</p>
            </div>

            {/* New section-based structure */}
            {activeProject.sections ? (
              <div className="space-y-10 mb-12">
                {activeProject.sections.product && (
                  <div>
                    <h3 className="text-sm font-medium text-warm-600 uppercase tracking-wider mb-4">Product</h3>
                    <ul className="space-y-3 mb-4">
                      {activeProject.sections.product.items.map((item, i) => (
                        <li key={i} className="text-sm text-warm-700 flex leading-relaxed">
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
                            <span key={i} className="px-3 py-1.5 bg-sage-50 text-sage-700 text-xs rounded-md border border-sage-200 font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {activeProject.sections.product.tools && activeProject.sections.product.tools.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-warm-600 mb-2">Tools:</p>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.sections.product.tools.map((tool, i) => (
                            <span key={i} className="px-3 py-1.5 bg-warm-100 text-warm-700 text-xs rounded-md border border-warm-200 font-medium">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeProject.sections.growth && (
                  <div>
                    <h3 className="text-sm font-medium text-warm-600 uppercase tracking-wider mb-4">Growth</h3>
                    <ul className="space-y-3 mb-4">
                      {activeProject.sections.growth.items.map((item, i) => (
                        <li key={i} className="text-sm text-warm-700 flex leading-relaxed">
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
                            <span key={i} className="px-3 py-1.5 bg-sage-50 text-sage-700 text-xs rounded-md border border-sage-200 font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {activeProject.sections.growth.tools && activeProject.sections.growth.tools.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-warm-600 mb-2">Tools:</p>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.sections.growth.tools.map((tool, i) => (
                            <span key={i} className="px-3 py-1.5 bg-warm-100 text-warm-700 text-xs rounded-md border border-warm-200 font-medium">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeProject.sections.ops && (
                  <div>
                    <h3 className="text-sm font-medium text-warm-600 uppercase tracking-wider mb-4">Ops & Strategy</h3>
                    <ul className="space-y-3 mb-4">
                      {activeProject.sections.ops.items.map((item, i) => (
                        <li key={i} className="text-sm text-warm-700 flex leading-relaxed">
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
                            <span key={i} className="px-3 py-1.5 bg-sage-50 text-sage-700 text-xs rounded-md border border-sage-200 font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {activeProject.sections.ops.tools && activeProject.sections.ops.tools.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-warm-600 mb-2">Tools:</p>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.sections.ops.tools.map((tool, i) => (
                            <span key={i} className="px-3 py-1.5 bg-warm-100 text-warm-700 text-xs rounded-md border border-warm-200 font-medium">
                              {tool}
                            </span>
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
                        <li key={i} className="text-sm text-warm-700 flex leading-relaxed">
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
                    <span key={i} className="px-3 py-1.5 bg-sage-50 text-sage-700 text-xs rounded-md border border-sage-200 font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeProject.learned && (
              <div className="mb-12">
                <h3 className="text-sm font-medium text-warm-600 uppercase tracking-wider mb-4">What I learned</h3>
                <p className="text-base text-warm-700 leading-relaxed">{activeProject.learned}</p>
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

            <Dialog.Close asChild>
              <button className="mt-10 px-6 py-3 bg-warm-800 text-white rounded-lg hover:bg-warm-900 transition-all duration-200 ease-out font-medium shadow-sm">
                Close
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}