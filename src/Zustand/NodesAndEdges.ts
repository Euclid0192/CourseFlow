import {
    Node,
    Edge,
    NodeTypes
} from 'reactflow'
import { useMemo } from 'react';

import GeneratedNode from '../ReactFlow/GeneratedNode';

/// List of customized node types
export const nodeTypes: NodeTypes = { generated: GeneratedNode }

export const initialNodes: Node[] = [
    {
        id: "1", data: { label: "CSE480" }, position: { x: 250, y: 100 }, type: 'generated'
    },
    { id: "2", data: { label: "CSE331" }, position: { x: 100, y: 10 } },
    { id: "3", data: { label: "CSE335" }, position: { x: 400, y: 10 } },
];
  
export const initialEdges: Edge[] = [
    { id: "e2-1", source: "2", target: "1", animated: true },
    { id: "e3-1", source: "3", target: "1", animated: true },
];
