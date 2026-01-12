const metrics = [
  {
    label: "Built and operated a $100M+ decentralized game economy",
    note: "Owned economic design, product decisions, and live-market outcomes."
  },
  {
    label: "Served as public operator for an actively traded financial product",
    note: "100+ AMAs, panels, and public stakeholder presentations for a real-time trading market."
  },
  {
    label: "Managed six-figure monthly paid media spend",
    note: "Consistently positive ROI using unique Meta/Google arbitrage strategy."
  },
  {
    label: "Drove ecommerce growth as in-house marketing lead",
    note: "Drove ads strategy and UX, achieving record holiday AOV and new customers."
  },
  {
    label: "Built and scaled numerous digital business funnels",
    note: "Numerous affiliate, service, and info product funnels from zero to profit."
  }
];

export default function MetricStrip() {
  const colors = [
    'border-sage-200 bg-sage-50/40 hover:bg-sage-50 hover:shadow-sm hover:scale-[1.02]',
    'border-amber-200 bg-amber-50/40 hover:bg-amber-50 hover:shadow-sm hover:scale-[1.02]',
    'border-warm-200 bg-white hover:bg-warm-50 hover:shadow-sm hover:scale-[1.02]',
    'border-terracotta-200 bg-terracotta-50/40 hover:bg-terracotta-50 hover:shadow-sm hover:scale-[1.02]',
    'border-forest-200 bg-forest-50/40 hover:bg-forest-50 hover:shadow-sm hover:scale-[1.02]',
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-lg font-medium text-warm-900 mb-6">Highlights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((metric, i) => (
          <div
            key={i}
            className={`border rounded-xl p-6 transition-all duration-200 ease-out flex flex-col ${colors[i]}`}
          >
            <div className="mb-3">
              <p className="text-[0.9375rem] font-medium text-warm-900 leading-snug line-clamp-3">
                {metric.label}
              </p>
            </div>
            <p className="text-xs text-warm-600 leading-relaxed line-clamp-2">
              {metric.note}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}