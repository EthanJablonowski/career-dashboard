const influences = [
  {
    name: "Frank Kern",
    principle: "Help people first. Trust and attention are earned by actually being useful.",
  },
  {
    name: "Alex Hormozi",
    principle: "Make offers so clear and valuable that saying no feels irrational.",
  },
  {
    name: "Seth Godin",
    principle: "Marketing isn't about what you make — it's about the story people tell themselves.",
  },
];

export default function Influences() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">
        Ideas That Shaped How I Work
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {influences.map((influence, i) => (
          <div
            key={i}
            className="border border-slate-200 rounded-xl p-6 bg-slate-50/30 hover:bg-slate-50 transition-all duration-200"
          >
            <p className="text-sm font-semibold text-slate-900 mb-3">
              {influence.name}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              {influence.principle}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
