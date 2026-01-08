const metrics = [
  {
    label: "$100M+ marketplace trade volume",
    note: "verified on-chain"
  },
  {
    label: "350k players supported",
    note: "peak concurrent"
  },
  {
    label: "100+ talks and AMAs",
    note: "unscripted"
  },
  {
    label: "Built 6+ revenue systems",
    note: "startups, services, affiliates"
  },
  {
    label: "End-to-end GTM",
    note: "ads, funnels, pricing, ops"
  }
];

export default function MetricStrip() {
  const colors = [
    'border-blue-200 bg-blue-50/50 hover:bg-blue-100/70 hover:border-blue-300',
    'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/70 hover:border-emerald-300',
    'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300',
    'border-blue-200 bg-blue-50/50 hover:bg-blue-100/70 hover:border-blue-300',
    'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/70 hover:border-emerald-300',
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Career Highlights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {metrics.map((metric, i) => (
          <div
            key={i}
            className={`border-2 rounded-xl p-5 transition-all duration-200 flex flex-col justify-between min-h-[100px] ${colors[i]}`}
          >
            <p className="text-sm font-semibold text-slate-900 leading-snug mb-2">
              {metric.label}
            </p>
            <p className="text-xs font-normal text-slate-600">
              {metric.note}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}