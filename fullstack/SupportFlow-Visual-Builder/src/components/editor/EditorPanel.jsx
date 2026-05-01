export default function EditorPanel({ node, onClose, onUpdate, onDelete }) {
  if (!node) return null;

  // Handlers for real-time state updates
  const handleTitleChange = (e) => {
    onUpdate({ ...node, title: e.target.value });
  };

  const handleTextChange = (e) => {
    onUpdate({ ...node, text: e.target.value });
  };

  const handleOptionChange = (index, newLabel) => {
    const updatedOptions = [...node.options];
    updatedOptions[index].label = newLabel;
    onUpdate({ ...node, options: updatedOptions });
  };

  const handleAddOption = () => {
    const newOption = { label: "New Option", nextId: null }; 
    onUpdate({ ...node, options: [...(node.options || []), newOption] });
  };

  const handleDeleteOption = (indexToRemove) => {
    const updatedOptions = node.options.filter((_, index) => index !== indexToRemove);
    onUpdate({ ...node, options: updatedOptions });
  };

  return (
    <aside className="w-96 border-l border-slate-700 bg-surface flex flex-col shrink-0 h-full shadow-2xl z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-slate-800">
        <h2 className="text-white font-bold">Node Properties</h2>
        <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6">
        
        {/* Node ID Card */}
        <div className="bg-slate-800/50 border border-slate-700 rounded p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-700 rounded flex items-center justify-center text-slate-300">
            {node.type === 'start' ? '▶' : node.type === 'question' ? '💬' : '⚡'}
          </div>
          <div className="flex-1 overflow-hidden">
            <h3 className="text-white font-semibold text-sm truncate">{node.title}</h3>
            <p className="text-slate-500 font-mono text-xs mt-1 truncate">ID: node_{node.id}</p>
          </div>
        </div>

        {/* Node Title Input */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wider">
            Node Title
          </label>
          <input
            type="text"
            value={node.title || ''}
            onChange={handleTitleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-slate-300 text-sm focus:outline-none focus:border-primary"
            placeholder="e.g. Account Type"
          />
        </div>

        {/* Message Content Input */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wider">
            Message Content
          </label>
          <textarea
            value={node.text}
            onChange={handleTextChange}
            className="w-full h-24 bg-slate-900 border border-slate-700 rounded p-3 text-slate-300 text-sm focus:outline-none focus:border-primary resize-none"
            placeholder="Type your message here..."
          />
        </div>

        {/* Options / Buttons */}
        {node.type !== 'end' && (
          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wider">
              Options / Buttons
            </label>
            <div className="flex flex-col gap-2">
              {node.options?.map((opt, i) => (
                <div key={i} className="group flex items-center bg-slate-900 border border-slate-700 rounded p-2 hover:border-slate-500 transition-colors">
                  <span className="text-slate-500 px-2 cursor-grab">⋮⋮</span>
                  <input
                    type="text"
                    value={opt.label}
                    onChange={(e) => handleOptionChange(i, e.target.value)}
                    className="bg-transparent border-none outline-none text-sm text-slate-300 flex-1 ml-2"
                  />
                  <button 
                    onClick={() => handleDeleteOption(i)}
                    className="text-slate-500 hover:text-danger px-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete Option"
                  >✕</button>
                </div>
              ))}
              <button 
                onClick={handleAddOption}
                className="w-full mt-2 py-2 border border-dashed border-slate-600 rounded text-slate-400 text-xs hover:text-white hover:border-slate-400 transition-colors flex items-center justify-center gap-2"
              >
                + Add Option
              </button>
            </div>
          </div>
        )}

        {/* Delete Entire Node Button */}
        <button 
          onClick={onDelete} 
          className="w-full mt-4 py-2 bg-danger/10 hover:bg-danger text-danger hover:text-white rounded border border-danger transition-colors text-sm font-bold flex items-center justify-center gap-2"
        >
          🗑️ Delete Entire Node
        </button>

      </div>
    </aside>
  );
}