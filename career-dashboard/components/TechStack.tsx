export default function TechStack() {
  return (
    <div className="fixed bottom-6 right-6 bg-white/95 backdrop-blur-md border-2 border-blue-200 rounded-xl p-4 shadow-lg max-w-xs">
      <p className="text-xs font-semibold text-slate-900 mb-2">Built with</p>
      <div className="flex flex-wrap gap-2 text-xs text-slate-700">
        <span>Next.js</span>
        <span className="text-blue-400">•</span>
        <span>TypeScript</span>
        <span className="text-emerald-400">•</span>
        <span>Tailwind</span>
        <span className="text-blue-400">•</span>
        <span>Claude Code</span>
      </div>
    </div>
  );
}