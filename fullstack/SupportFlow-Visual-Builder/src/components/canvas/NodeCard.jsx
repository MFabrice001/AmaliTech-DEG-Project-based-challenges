export default function NodeCard({ node }) {
  // Determine header color based on node type
  const getHeaderColor = (type) => {
    switch (type) {
      case 'start': return 'bg-primary/20 text-primary border-primary';
      case 'end': return 'bg-danger/20 text-danger border-danger';
      default: return 'bg-slate-700 text-slate-200 border-slate-600';
    }
  };

  return (
    <div 
      className="absolute w-64 bg-node border border-slate-700 rounded-lg shadow-xl text-sm flex flex-col z-10"
      style={{ left: node.position.x, top: node.position.y }}
    >
      {/* Top Connection Dot (Except for Start Node) */}
      {node.type !== 'start' && (
        <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-slate-400 border-2 border-node rounded-full" />
      )}

      {/* Node Header */}
      <div className={`px-3 py-2 border-b text-xs font-bold uppercase rounded-t-lg flex items-center gap-2 ${getHeaderColor(node.type)}`}>
        {node.type === 'start' ? '▶ Start' : node.type === 'question' ? '⚙️ Troubleshoot' : '📞 Action'}
      </div>

      {/* Node Content */}
      <div className="p-4 text-slate-300">
        {node.text}
      </div>

      {/* Options/Buttons */}
      {node.options && node.options.length > 0 && (
        <div className="px-3 pb-3 flex flex-col gap-2">
          {node.options.map((opt, i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-700 rounded px-3 py-1.5 text-xs text-slate-400 flex justify-between items-center">
              <span>{opt.label}</span>
              <span className="w-2 h-2 rounded-full bg-primary/50"></span>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Connection Dot (Except for End Nodes) */}
      {node.type !== 'end' && (
        <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary border-2 border-node rounded-full z-20" />
      )}
    </div>
  );
}