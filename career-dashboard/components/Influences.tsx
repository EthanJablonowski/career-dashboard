const influences = [
  {
    quote: "If you want to impress people, make things complicated. If you want to help people, keep it simple.",
    attribution: "Frank Kern",
  },
  {
    quote: "One of the fundamental rules of marketing: a confused mind always says no.",
    attribution: "Russell Brunson",
  },
  {
    quote: "Don't find customers for your product; find products for your customers.",
    attribution: "Seth Godin",
  },
];

export default function Influences() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">
        Ideas That Shape My Work
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {influences.map((influence, i) => (
          <div
            key={i}
            className="border border-slate-200 rounded-xl p-6 bg-slate-50/30 hover:bg-slate-50 transition-all duration-200"
          >
            <p className="text-sm text-slate-700 leading-relaxed mb-3 italic">
              &ldquo;{influence.quote}&rdquo;
            </p>
            <p className="text-xs font-semibold text-slate-900">
              {influence.attribution}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
