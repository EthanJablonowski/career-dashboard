'use client';

interface FilterHandoffProps {
  onFilterClick: () => void;
  showButton?: boolean;
}

export default function FilterHandoff({ onFilterClick, showButton = true }: FilterHandoffProps) {
  if (!showButton) return null;

  return (
    <section id="filter-handoff" className="py-8 px-6 bg-warm-50">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-sage-50/80 to-warm-100/50 border border-sage-200/60 rounded-xl p-6 text-center">
          <h3 className="text-lg font-medium text-warm-900 mb-2">
            Want to explore by skill?
          </h3>
          <p className="text-sm text-warm-600 mb-5">
            Jump straight to the work behind the highlights.
          </p>
          <button
            onClick={onFilterClick}
            className="px-6 py-2.5 bg-warm-800 text-white text-sm rounded-lg hover:bg-warm-900 transition-all duration-200 ease-out font-medium shadow-sm hover:shadow-md"
          >
            Filter by skill
          </button>
        </div>
      </div>
    </section>
  );
}
