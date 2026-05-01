import { useState } from 'react';
import Canvas from '../components/canvas/Canvas';
import EditorPanel from '../components/editor/EditorPanel';
import flowData from '../data/flow_data.json';

export default function FlowBuilder() {
  const [nodes, setNodes] = useState(flowData.nodes);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  // Handle clicking a node on the canvas
  const handleNodeClick = (id) => {
    setSelectedNodeId(id);
  };

  // Handle updates coming from the Editor Panel
  const handleUpdateNode = (updatedNode) => {
    setNodes(nodes.map(node => node.id === updatedNode.id ? updatedNode : node));
  };

  return (
    <div className="w-full h-full flex relative overflow-hidden bg-surface">
      
      {/* Canvas Area (Shrinks if editor is open) */}
      <div className="flex-1 relative overflow-auto">
        <Canvas nodes={nodes} onNodeClick={handleNodeClick} />
        
        {/* Live Environment Badge */}
        {!selectedNodeId && (
          <div className="absolute top-4 right-4 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs text-slate-300 shadow-lg">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            Live Environment: Active
          </div>
        )}
      </div>

      {/* Editor Panel (Slides in when a node is selected) */}
      {selectedNodeId && (
        <EditorPanel 
          node={nodes.find(n => n.id === selectedNodeId)} 
          onClose={() => setSelectedNodeId(null)}
          onUpdate={handleUpdateNode}
        />
      )}
      
    </div>
  );
}