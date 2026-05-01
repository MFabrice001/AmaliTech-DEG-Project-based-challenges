export default function Navbar({ isPreviewMode, onTogglePreview }) {
  return (
    <header className="h-16 bg-surface border-b border-slate-700 flex items-center justify-between px-6 shrink-0">
      <h1 className="text-white font-bold text-sm tracking-wider">SUPPORT FLOW VISUAL BUILDER</h1>
      
      <div className="flex items-center gap-4">
        {/* The Dynamic Preview Button */}
        <button 
          onClick={onTogglePreview}
          className="bg-primary hover:bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors flex items-center gap-2"
        >
          {isPreviewMode ? '✎ Exit Preview' : '▶ Preview'}
        </button>
        
        {/* Icons */}
        <button className="text-slate-400 hover:text-white text-lg">⚙️</button>
        <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-sm text-slate-300">👤</div>
      </div>
    </header>
  );
}