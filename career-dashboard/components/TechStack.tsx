export default function TechStack() {
  return (
    <div className="fixed bottom-6 right-6 bg-warm-50/95 backdrop-blur-md border border-warm-200 rounded-xl p-4 shadow-sm max-w-xs">
      <p className="text-xs font-medium text-warm-600 mb-2">Built with</p>
      <div className="flex flex-wrap gap-2 text-xs text-warm-700">
        <span>Next.js</span>
        <span className="text-sage-400">•</span>
        <span>TypeScript</span>
        <span className="text-sage-400">•</span>
        <span>Tailwind</span>
        <span className="text-sage-400">•</span>
        <span>Claude Code</span>
      </div>
    </div>
  );
}