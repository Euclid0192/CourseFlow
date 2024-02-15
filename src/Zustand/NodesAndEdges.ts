import {
    Node,
    Edge,
    NodeTypes
} from 'reactflow'

import GeneratedNode from '../ReactFlow/GeneratedNode';
import UsersCreatedNode from '../ReactFlow/UsersCreatedNode';

/// List of customized node types
export const nodeTypes: NodeTypes = { generated: GeneratedNode, usersCreated: UsersCreatedNode }

export const initialNodes: Node[] = [
    {
        id: "1", data: { label: "New Node" }, position: { x: 250, y: 100 }, type: 'usersCreated'
    },
];
  
export const initialEdges: Edge[] = [];
