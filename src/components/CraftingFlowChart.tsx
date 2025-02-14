import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Position,
  MarkerType,
  useNodesState,
  useEdgesState,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { recipes } from '../data/recipes';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CraftingFlowChartProps {
  breakdown: Array<{
    item: string;
    quantity: number;
    level: number;
  }>;
}

const getItemColor = (itemName: string, isDark: boolean = false): string => {
  if (isDark) {
    if (itemName.includes('Green Wood')) return '#9ca3af';
    if (itemName.includes('Timber')) return '#86efac';
    if (itemName.includes('Lumber')) return '#86efac';
    if (itemName.includes('Wyrdwood')) return '#67e8f9';
    if (itemName.includes('Ironwood')) return '#fca5a5';
    if (itemName.includes('Glittering Ebony')) return '#fcd34d';
    if (itemName.includes('Runewood')) return '#a78bfa';
    if (itemName.includes('Prismatic')) return '#fb923c';
    return '#d1d5db';
  }
  
  if (itemName.includes('Green Wood')) return '#35393e';
  if (itemName.includes('Timber')) return '#2b7718';
  if (itemName.includes('Lumber')) return '#2b7718';
  if (itemName.includes('Wyrdwood')) return '#3eb7d3';
  if (itemName.includes('Ironwood')) return '#820000';
  if (itemName.includes('Glittering Ebony')) return '#f0a116';
  if (itemName.includes('Runewood')) return '#4417f0';
  if (itemName.includes('Prismatic')) return '#b83a1a';
  return '#666666';
};

const CustomNode = ({ data }: { data: any }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const isDarkMode = document.documentElement.classList.contains('dark');
  const color = getItemColor(data.name, isDarkMode);
  
  return (
    <div
      className="rounded-lg shadow-lg transition-all duration-200"
      style={{
        background: `${color}20`,
        border: `2px solid ${color}`,
        minWidth: '200px',
      }}
    >
      <div 
        className="p-4 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <div className="font-semibold" style={{ color }}>
            {data.name}
            {data.isBaseResource && ' (Base Material)'}</div>
          <div className="text-sm opacity-90" style={{ color }}>
            Quantity: {data.quantity}x
          </div>
        </div>
        {data.ingredients.length > 0 && (
          <div style={{ color }}>
            {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </div>
        )}
      </div>
      
      {isExpanded && data.ingredients.length > 0 && (
        <div className="border-t border-current p-4" style={{ background: `${color}10`, borderColor: `${color}40` }}>
          <div className="text-sm space-y-2">
            {data.ingredients.map((ing: any, i: number) => {
              const ingColor = getItemColor(ing.item, isDarkMode);
              return (
                <div key={i} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: ingColor }} />
                  <span style={{ color: ingColor }}>
                    {ing.quantity}x {ing.item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export function CraftingFlowChart({ breakdown }: CraftingFlowChartProps) {
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  const createFlowElements = useCallback(() => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    const VERTICAL_SPACING = 150;
    const HORIZONTAL_SPACING = 250;

    // Group items by their level
    const itemsByLevel = breakdown.reduce((acc, item) => {
      if (!acc[item.level]) {
        acc[item.level] = [];
      }
      acc[item.level].push(item);
      return acc;
    }, {} as Record<number, typeof breakdown>);

    // Process each level
    Object.entries(itemsByLevel).forEach(([level, items], levelIndex) => {
      const y = Number(level) * VERTICAL_SPACING;

      // Create nodes for items in this level
      items.forEach((item, itemIndex) => {
        const recipe = recipes.find(r => r.name === item.item);
        const isBaseResource = !recipe;
        const x = itemIndex * HORIZONTAL_SPACING;

        const nodeId = `${item.item}-${level}-${itemIndex}`;
        newNodes.push({
          id: nodeId,
          type: 'custom',
          data: {
            name: item.item,
            quantity: item.quantity,
            ingredients: recipe?.ingredients?.map(ing => ({
              item: ing.item,
              quantity: ing.quantity * item.quantity
            })) || [],
            isBaseResource
          },
          position: { x, y },
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top,
        });

        // Create edges to ingredients in the next level
        if (recipe) {
          recipe.ingredients.forEach(ing => {
            const targetItem = breakdown.find(b => 
              b.item === ing.item && b.level === Number(level) + 1
            );
            if (targetItem) {
              const targetIndex = itemsByLevel[Number(level) + 1]?.findIndex(i => i.item === ing.item) ?? 0;
              const targetId = `${ing.item}-${Number(level) + 1}-${targetIndex}`;
              newEdges.push({
                id: `${nodeId}-${targetId}`,
                source: nodeId,
                target: targetId,
                type: 'smoothstep',
                animated: true,
                label: `${ing.quantity}x`,
                labelStyle: { fill: '#666', fontSize: 12 },
                style: { stroke: '#888', strokeWidth: 2 },
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                  width: 20,
                  height: 20,
                  color: '#888',
                },
              });
            }
          });
        }
      });
    });

    return { nodes: newNodes, edges: newEdges };
  }, [breakdown]);

  // Update nodes and edges when breakdown changes
  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = createFlowElements();
    setNodes(newNodes);
    setEdges(newEdges);
  }, [breakdown, createFlowElements]);

  const nodeTypes = {
    custom: CustomNode,
  };

  return (
    <div className="h-[600px] border rounded-lg bg-gray-50 dark:bg-gray-800">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView={true}
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.5}
        maxZoom={1.5}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
        }}
        attributionPosition="bottom-right"
      >
        <Panel position="top-left" className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow-lg border dark:border-gray-700">
          <div className="text-sm font-medium mb-2 text-gray-900 dark:text-white">Material Types</div>
          <div className="space-y-1.5">
            {[
              { name: 'Common Resource', color: getItemColor('Green Wood', true) },
              { name: 'Timber/Lumber', color: getItemColor('Timber', true) },
              { name: 'Wyrdwood', color: getItemColor('Wyrdwood', true) },
              { name: 'Ironwood', color: getItemColor('Ironwood', true) },
              { name: 'Glittering Ebony', color: getItemColor('Glittering Ebony', true) },
              { name: 'Runewood', color: getItemColor('Runewood', true) },
              { name: 'Prismatic', color: getItemColor('Prismatic', true) },
            ].map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ background: item.color }}
                />
                <span className="text-xs text-gray-700 dark:text-gray-300">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}