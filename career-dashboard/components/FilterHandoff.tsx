'use client';

interface FilterHandoffProps {
  onFilterClick: () => void;
}

export default function FilterHandoff({ onFilterClick }: FilterHandoffProps) {
  return (
    <section id="filter-handoff" className="py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-sage-50 to-warm-50 border border-sage-200 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-medium text-warm-900 mb-3">
            Want to explore by skill?
          </h3>
          <p className="text-sm text-warm-600 mb-6">
            Jump straight to the work behind the highlights.
          </p>
          <button
            onClick={onFilterClick}
            className="px-8 py-3 bg-warm-800 text-white rounded-lg hover:bg-warm-900 transition-all duration-200 ease-out font-medium shadow-sm hover:shadow-md"
          >
            Filter by skill
          </button>
        </div>
      </div>
    </section>
  );
}
