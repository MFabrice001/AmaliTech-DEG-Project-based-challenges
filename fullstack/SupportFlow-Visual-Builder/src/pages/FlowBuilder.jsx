import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Canvas from '../components/canvas/Canvas';
import EditorPanel from '../components/editor/EditorPanel';
import flowData from '../data/flow_data.json';

// Helper to inject titles into the original JSON data so they become editable state
const initializeNodes = (nodes) => {
  const getInitialTitle = (id) => {
    switch (id) {
      case '1': return '▶ Start';
      case '2': return '⚙️ Troubleshoot';
      case '3': return '🏦 Account Type';
      case '4': return '📞 Action: Call';
      case '5': return '✅ Resolution';
      case '6': return '🤝 Action: Handoff';
      default: return '⚙️ Node';
    }
  };
  return nodes.map(n => ({ ...n, title: n.title || getInitialTitle(n.id) }));
};

export default function FlowBuilder() {
  const [nodes, setNodes] = useState(() => initializeNodes(flowData.nodes));
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [draggingNodeId, setDraggingNodeId] = useState(null);

  // --- NODE MANAGEMENT ---
  const handleAddNode = () => {
    const newNodeId = Date.now().toString(); 
    const newNode = {
      id: newNodeId,
      type: "question",
      title: "⚙️ Custom Node", // <-- Now the new node has an editable title!
      text: "New Node Created! Edit me.",
      position: { x: 300, y: 150 }, 
      options: []
    };
    setNodes([...nodes, newNode]);
    setSelectedNodeId(newNodeId); 
  };

  const handleDeleteNode = () => {
    setNodes(nodes.filter(n => n.id !== selectedNodeId));
    setSelectedNodeId(null); 
  };

  const handleUpdateNode = (updatedNode) => {
    setNodes(nodes.map(node => node.id === updatedNode.id ? updatedNode : node));
  };

  // --- DRAG LOGIC ---
  const handleDragStart = (id) => {
    setDraggingNodeId(id);
    setSelectedNodeId(id);
  };

  const handleMouseMove = (e) => {
    if (!draggingNodeId) return;
    setNodes(nodes.map(n => 
      n.id === draggingNodeId 
        ? { ...n, position: { x: n.position.x + e.movementX, y: n.position.y + e.movementY } }
        : n
    ));
  };

  const handleMouseUp = () => {
    setDraggingNodeId(null);
  };

  return (
    <div className="w-full h-full flex relative overflow-hidden bg-surface">
      <Sidebar onAddNode={handleAddNode} />

      <div 
        className="flex-1 relative overflow-auto"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Canvas 
          nodes={nodes} 
          onNodeClick={(id) => setSelectedNodeId(id)} 
          onDragStart={handleDragStart}
        />
        
        {!selectedNodeId && (
          <div className="absolute top-4 right-4 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs text-slate-300 shadow-lg">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            Live Environment: Active
          </div>
        )}
      </div>

      {selectedNodeId && (
        <EditorPanel 
          node={nodes.find(n => n.id === selectedNodeId)} 
          onClose={() => setSelectedNodeId(null)}
          onUpdate={handleUpdateNode}
          onDelete={handleDeleteNode}
        />
      )}
    </div>
  );
}