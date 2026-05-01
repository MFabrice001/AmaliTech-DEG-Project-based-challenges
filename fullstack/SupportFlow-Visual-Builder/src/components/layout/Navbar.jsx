export default function Navbar() {
  return (
    <nav className="h-14 border-b border-slate-700 bg-surface flex items-center justify-between px-6 shrink-0">
      <div className="font-bold text-white tracking-wider text-sm">
        SUPPORT FLOW VISUAL BUILDER
      </div>
      
      <div className="flex items-center gap-4">
        <button className="bg-primary/20 text-primary hover:bg-primary/30 px-4 py-1.5 rounded text-sm font-medium transition-colors flex items-center gap-2">
          <span>▶</span> Preview
        </button>
        {/* Fake Settings & Profile Icons built with pure HTML/CSS */}
        <button className="text-slate-400 hover:text-white transition-colors">
          ⚙️
        </button>
        <div className="w-8 h-8 rounded-full bg-slate-600 border border-slate-500 overflow-hidden">
          {/* Avatar placeholder */}
          <div className="w-full h-full bg-slate-500 flex items-center justify-center text-xs">👤</div>
        </div>
      </div>
    </nav>
  );
}