import NodeCard from './NodeCard';
//import flowData from '../../data/flow_data.json';

export default function Canvas({ nodes, onNodeClick }) {
  //const nodes = flowData.nodes;
  const NODE_WIDTH = 256; // 64rem in Tailwind = 256px

  // This helper calculates the height of a node dynamically to find the exact bottom center
  const calculateNodeHeight = (node) => {
    let baseHeight = 80; // Header + Padding + Text
    if (node.options && node.options.length > 0) {
      baseHeight += (node.options.length * 36) + 12; // Add height for each option row
    }
    return baseHeight;
  };

  // Generate SVG path strings connecting parent nodes to child nodes
  const generateConnections = () => {
    const paths = [];
    
    nodes.forEach(node => {
      if (!node.options) return;

      node.options.forEach((option, index) => { // <-- Added 'index' here
        const targetNode = nodes.find(n => n.id === option.nextId);
        if (targetNode) {
          // Parent Bottom Center
          const startX = node.position.x + (NODE_WIDTH / 2);
          const startY = node.position.y + calculateNodeHeight(node);
          
          // Child Top Center
          const endX = targetNode.position.x + (NODE_WIDTH / 2);
          const endY = targetNode.position.y;

          // Bezier curve magic
          const curveOffset = 60; 
          const d = `M ${startX} ${startY} C ${startX} ${startY + curveOffset}, ${endX} ${endY - curveOffset}, ${endX} ${endY}`;
          
          paths.push(
            <path 
              key={`${node.id}-${targetNode.id}-${index}`} // <-- Added '-${index}' here to guarantee uniqueness!
              d={d}
              stroke="#3B82F6" 
              strokeWidth="2" 
              fill="none" 
              className="opacity-60"
            />
          );
        }
      });
      });
    return paths;
  };

  return (
    <div className="relative w-full h-full bg-surface overflow-auto">
      {/* Background Dot Grid for that "Editor" feel */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}
      ></div>

      {/* SVG Overlay for Lines */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        {generateConnections()}
      </svg>

      {/* Render React Nodes */}
      {nodes.map(node => (
      <NodeCard key={node.id} node={node} onClick={() => onNodeClick(node.id)} />
      ))}
    </div>
  );
}