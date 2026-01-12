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
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-lg font-medium text-warm-900 mb-6">
        Ideas That Shape My Work
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {influences.map((influence, i) => (
          <div
            key={i}
            className="border border-warm-200 rounded-xl p-6 bg-white hover:shadow-sm transition-all duration-200 ease-out flex flex-col"
          >
            <div className="flex-1 mb-4">
              <p className="text-sm text-warm-700 leading-relaxed italic">
                &ldquo;{influence.quote}&rdquo;
              </p>
            </div>
            <p className="text-xs font-medium text-warm-900">
              {influence.attribution}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
