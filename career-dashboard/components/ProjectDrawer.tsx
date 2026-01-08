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
        <Dialog.Overlay className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40" />
        <Dialog.Content className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-gradient-to-br from-white via-blue-50/20 to-emerald-50/10 shadow-2xl overflow-y-auto z-50 pt-[73px]">
          <div className="p-8 pt-10">
            <div className="mb-10">
              <Dialog.Title className="text-2xl font-bold text-slate-900 mb-2">
                {activeProject.title}
              </Dialog.Title>
              <p className="text-sm text-slate-700 font-medium">{activeProject.org} • {activeProject.role}</p>
              <p className="text-sm font-normal text-slate-600">{activeProject.dateStart} - {activeProject.dateEnd}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {activeProject.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium border border-blue-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {activeProject.primaryMetric && (
              <div className="mb-10 p-6 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl border-2 border-blue-200 max-w-sm shadow-sm">
                <p className="text-3xl font-bold text-slate-900">{activeProject.primaryMetric.value}</p>
                <p className="text-sm text-slate-700 font-medium mt-1">{activeProject.primaryMetric.label}</p>
                {activeProject.primaryMetric.context && (
                  <p className="text-xs text-slate-600 mt-1">{activeProject.primaryMetric.context}</p>
                )}
              </div>
            )}

            <div className="mb-10">
              <p className="text-sm text-slate-800 leading-relaxed">{activeProject.snapshot}</p>
            </div>

            <div className="mb-10">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">Key Responsibilities</h3>
              <ul className="space-y-2.5">
                {activeProject.bullets.map((bullet, i) => (
                  <li key={i} className="text-sm font-normal text-slate-700 flex">
                    <span className="mr-2 text-blue-500">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-10">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {activeProject.skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-emerald-100 text-emerald-800 text-xs rounded-lg border border-emerald-200 font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {activeProject.learned && (
              <div className="mb-10">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">What I learned</h3>
                <p className="text-sm font-normal text-slate-700 leading-relaxed">{activeProject.learned}</p>
              </div>
            )}

            {activeProject.links && activeProject.links.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">References / Selected Artifacts</h3>
                <div className="space-y-2">
                  {activeProject.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-xs text-slate-600 hover:text-blue-600 font-normal transition-colors"
                    >
                      • {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <Dialog.Close asChild>
              <button className="mt-8 px-6 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-md">
                Close
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}