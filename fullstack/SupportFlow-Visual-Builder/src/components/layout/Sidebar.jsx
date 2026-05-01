export default function Sidebar({ onAddNode, activeView, onViewChange }) { 
  return (
    <aside className="w-64 border-r border-slate-700 bg-surface flex flex-col shrink-0">
      {/* Project Info */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold text-sm">
          A
        </div>
        <div>
          <h2 className="text-white text-sm font-semibold">Project Alpha</h2>
          <p className="text-slate-500 text-xs">v1.2.0-STABLE</p>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-4 mb-6">
        <button 
          onClick={onAddNode} 
          className="w-full bg-primary hover:bg-blue-600 text-white py-2 rounded text-sm font-medium transition-colors"
        >
          + New Node
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 flex flex-col gap-1">
        <button 
          onClick={() => onViewChange('flow')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-r border-l-2 transition-colors ${
            activeView === 'flow' 
              ? 'bg-slate-800/50 text-primary border-primary' 
              : 'text-slate-400 border-transparent hover:bg-slate-800/30 hover:text-slate-300'
          }`}
        >
          <span className="opacity-80">🔀</span>
          <span className="text-sm font-medium">Nodes</span>
        </button>

        <button 
          onClick={() => onViewChange('design')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-r border-l-2 transition-colors ${
            activeView === 'design' 
              ? 'bg-slate-800/50 text-primary border-primary' 
              : 'text-slate-400 border-transparent hover:bg-slate-800/30 hover:text-slate-300'
          }`}
        >
          <span className="opacity-80">🎨</span>
          <span className="text-sm font-medium">Design System</span>
        </button>
      </nav>
    </aside>
  );
}