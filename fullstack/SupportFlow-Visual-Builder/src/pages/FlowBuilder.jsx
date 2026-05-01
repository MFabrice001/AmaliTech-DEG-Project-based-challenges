import Canvas from '../components/canvas/Canvas';

export default function FlowBuilder() {
  return (
    <div className="w-full h-full flex relative">
      {/* The massive canvas taking up all remaining space */}
      <Canvas />
      
      {/* Live Environment Badge (Top Right) */}
      <div className="absolute top-4 right-4 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs text-slate-300 shadow-lg">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        Live Environment: Active
      </div>
    </div>
  );
}