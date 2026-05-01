import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import Canvas from '../components/canvas/Canvas';
import EditorPanel from '../components/editor/EditorPanel';
import PreviewPhone from '../components/preview/PreviewPhone';
import DesignSystem from './DesignSystem'; // <-- Imported Design System
import flowData from '../data/flow_data.json';

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
  
  // STATE FOR PREVIEW MODE
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  // STATE FOR SIDEBAR NAVIGATION (Flow vs Design System)
  const [activeView, setActiveView] = useState('flow');

  const handleAddNode = () => {
    const newNodeId = Date.now().toString(); 
    const newNode = {
      id: newNodeId,
      type: "question",
      title: "⚙️ Custom Node",
      text: "New Node Created! Edit me.",
      position: { x: 300, y: 150 }, 
      options: []
    };
    setNodes([...nodes, newNode]);
    setSelectedNodeId(newNodeId); 
    setIsPreviewMode(false); 
    setActiveView('flow'); // Automatically switch to canvas view if adding a node
  };

  const handleDeleteNode = () => {
    setNodes(nodes.filter(n => n.id !== selectedNodeId));
    setSelectedNodeId(null); 
  };

  const handleUpdateNode = (updatedNode) => {
    setNodes(nodes.map(node => node.id === updatedNode.id ? updatedNode : node));
  };

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
    <div className="w-screen h-screen flex flex-col bg-surface overflow-hidden">
      {/* 1. TOP NAVBAR */}
      <Navbar 
        isPreviewMode={isPreviewMode} 
        onTogglePreview={() => setIsPreviewMode(!isPreviewMode)} 
      />

      {/* 2. MAIN WORKSPACE */}
      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar 
          onAddNode={handleAddNode} 
          activeView={activeView} 
          onViewChange={setActiveView} 
        />

        {/* --- CONDITIONALLY RENDER DESIGN SYSTEM OR FLOW BUILDER --- */}
        {activeView === 'design' ? (
          <div className="flex-1 overflow-auto bg-surface">
            <DesignSystem />
          </div>
        ) : (
          <>
            <div 
              className="flex-1 relative overflow-auto flex"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Toggle Between Canvas and Phone based on Navbar State */}
              {isPreviewMode ? (
                <PreviewPhone nodes={nodes} />
              ) : (
                <Canvas 
                  nodes={nodes} 
                  onNodeClick={(id) => setSelectedNodeId(id)} 
                  onDragStart={handleDragStart}
                />
              )}

              {!selectedNodeId && !isPreviewMode && (
                <div className="absolute top-4 right-4 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs text-slate-300 shadow-lg">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  Live Environment: Active
                </div>
              )}
            </div>

            {selectedNodeId && !isPreviewMode && (
              <EditorPanel 
                node={nodes.find(n => n.id === selectedNodeId)} 
                allNodes={nodes}
                onClose={() => setSelectedNodeId(null)}
                onUpdate={handleUpdateNode}
                onDelete={handleDeleteNode}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}