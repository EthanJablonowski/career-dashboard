const metrics = [
  {
    label: "Built and operated a $100M+ decentralized game economy",
    note: "Owned economic design, product decisions, and live-market outcomes."
  },
  {
    label: "Served as Public Operator for a Live Financial Product",
    note: "100+ AMAs, panels, and public stakeholder presentations for a real-time trading market."
  },
  {
    label: "Built and Scaled Profitable Digital Funnels",
    note: "Launched and optimized affiliate, service, and information products from zero to profit."
  },
  {
    label: "Managed Six-Figure Monthly Paid Media Spend",
    note: "Consistently positive ROI across Meta and Google through unique arbitrage strategy."
  },
  {
    label: "Drove Ecommerce Growth as In-House Marketing Lead",
    note: "Owned ads and UX improvements, delivering peak customer acquisition and record holiday AOV."
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