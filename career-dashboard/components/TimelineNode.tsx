'use client';

import { Project } from '@/data/projects';

interface TimelineNodeProps {
  project: Project;
  index: number;
}

export default function TimelineNode({ project, index }: TimelineNodeProps) {
  const handleClick = () => {
    window.location.hash = project.id;
  };

  // Alternate label position (above/below) based on index
  const isAbove = index % 2 === 0;

  // Get node styling based on type with stronger visual hierarchy
  const getNodeStyles = () => {
    switch (project.nodeType) {
      case 'primary':
        return {
          size: 'w-20 h-20',
          bgColor: 'bg-slate-100',
          borderColor: 'border-[3px] border-slate-800',
          hoverBg: 'group-hover:bg-slate-200 group-hover:scale-110 group-hover:shadow-lg',
          innerDot: 'w-4 h-4 bg-slate-800',
          labelWeight: 'font-semibold',
        };
      case 'experiment':
        return {
          size: 'w-12 h-12',
          bgColor: 'bg-white',
          borderColor: 'border-2 border-blue-500',
          hoverBg: 'group-hover:bg-blue-50 group-hover:scale-110 group-hover:shadow-md',
          innerDot: 'w-2.5 h-2.5 bg-blue-500',
          labelWeight: 'font-medium',
        };
      case 'life':
        return {
          size: 'w-9 h-9',
          bgColor: 'bg-white',
          borderColor: 'border-2 border-amber-500',
          hoverBg: 'group-hover:bg-amber-50 group-hover:scale-110 group-hover:shadow-md',
          innerDot: 'w-2 h-2 bg-amber-500',
          labelWeight: 'font-normal',
        };
      case 'cert':
        return {
          size: 'w-7 h-7',
          bgColor: 'bg-white',
          borderColor: 'border border-slate-300',
          hoverBg: 'group-hover:bg-slate-50 group-hover:scale-125 group-hover:shadow',
          innerDot: 'w-1.5 h-1.5 bg-slate-400',
          labelWeight: 'font-normal',
        };
      default:
        return {
          size: 'w-12 h-12',
          bgColor: 'bg-white',
          borderColor: 'border-2 border-slate-400',
          hoverBg: 'group-hover:bg-slate-100 group-hover:scale-110',
          innerDot: 'w-2.5 h-2.5 bg-slate-500',
          labelWeight: 'font-medium',
        };
    }
  };

  const styles = getNodeStyles();

  // Shorten title if needed for better fit
  const getDisplayTitle = () => {
    const title = project.title;
    // Shorten "Digitopia — Media Buying" to "Digitopia — Media"
    if (title === "Digitopia — Media Buying") return "Digitopia — Media";
    if (title === "Digitopia — Project Management") return "Digitopia — PM";
    return title;
  };

  return (
    <div className="flex flex-col items-center cursor-pointer group" onClick={handleClick}>
      {/* Label above or below */}
      <div className={`text-center max-w-[110px] ${isAbove ? 'order-1 mb-4' : 'order-2 mt-4'}`}>
        <p className={`text-[11px] ${styles.labelWeight} text-slate-900 leading-tight break-words hyphens-auto`}>
          {getDisplayTitle()}
        </p>
      </div>

      {/* Node circle - always in the middle, on the line */}
      <div className={`${styles.size} rounded-full ${styles.bgColor} ${styles.borderColor} ${styles.hoverBg} transition-all duration-200 flex items-center justify-center shrink-0 ${isAbove ? 'order-2' : 'order-1'}`}>
        {styles.innerDot && (
          <div className={`${styles.innerDot} rounded-full`} />
        )}
      </div>
    </div>
  );
}