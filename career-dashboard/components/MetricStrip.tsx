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
    'border-blue-200 bg-blue-50/50 hover:bg-blue-100/70 hover:border-blue-300',
    'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/70 hover:border-emerald-300',
    'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300',
    'border-blue-200 bg-blue-50/50 hover:bg-blue-100/70 hover:border-blue-300',
    'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/70 hover:border-emerald-300',
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Highlights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {metrics.map((metric, i) => (
          <div
            key={i}
            className={`border-2 rounded-xl p-5 transition-all duration-200 flex flex-col ${colors[i]}`}
          >
            <div className="flex-1 mb-3">
              <p className="text-sm font-semibold text-slate-900 leading-snug">
                {metric.label}
              </p>
            </div>
            <p className="text-xs font-normal text-slate-600 leading-relaxed">
              {metric.note}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}