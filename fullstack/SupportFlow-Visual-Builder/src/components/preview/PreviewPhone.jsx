import { useState } from 'react';

export default function PreviewPhone({ nodes }) {
  // Find the Start node (usually ID 1)
  const startNode = nodes.find(n => n.id === '1') || nodes[0];
  const [currentNode, setCurrentNode] = useState(startNode);

  const handleOptionClick = (nextId) => {
    if (!nextId) return;
    const nextNode = nodes.find(n => n.id === nextId);
    if (nextNode) {
      setCurrentNode(nextNode);
    }
  };

  const handleRestart = () => {
    setCurrentNode(startNode);
  };

  if (!currentNode) return null;

  return (
    <div className="w-[320px] h-[600px] border-[8px] border-slate-800 rounded-[3rem] bg-[#0B1120] relative shadow-2xl flex flex-col overflow-hidden m-auto">
      
      {/* Top Speaker Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-slate-800 rounded-b-2xl z-10"></div>

      {/* Header */}
      <div className="bg-slate-800/80 p-4 pt-6 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">🤖</div>
          <div>
            <h3 className="text-white font-bold text-sm">Support Bot</h3>
            <div className="flex items-center gap-1 text-[10px] text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400"></span> ACTIVE
            </div>
          </div>
        </div>
        <button className="text-slate-400 font-bold">⋮</button>
      </div>

      {/* Chat Body */}
      <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
        {/* Bot Message */}
        <div>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-sm p-4 max-w-[85%] text-slate-200 text-sm shadow-sm">
            {currentNode.text}
          </div>
          <div className="text-[10px] text-slate-500 ml-1 mt-1">10:42 AM</div>
        </div>

        {/* Dynamic Options */}
        <div className="flex flex-col gap-2 mt-2">
          {currentNode.options?.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleOptionClick(opt.nextId)}
              className="w-full bg-slate-800/40 hover:bg-slate-700 border border-slate-700 rounded-xl p-3 text-sm text-slate-300 text-left flex justify-between items-center transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-primary opacity-70">⛖</span> {opt.label}
              </div>
              <span className="text-slate-500">›</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer / Input */}
      <div className="p-4 border-t border-slate-800/50 bg-[#0B1120] flex flex-col gap-3">
        <button 
          onClick={handleRestart} 
          className="w-full py-2.5 border border-slate-700 rounded-xl text-xs text-slate-400 hover:text-white hover:border-slate-500 transition-colors flex justify-center items-center gap-2"
        >
          ↻ RESTART SESSION
        </button>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Type a message..." 
            className="w-full bg-slate-800/50 border border-slate-700 rounded-full py-2.5 pl-4 pr-10 text-sm text-slate-300 outline-none" 
            disabled 
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary opacity-70">➤</button>
        </div>
      </div>
    </div>
  );
}