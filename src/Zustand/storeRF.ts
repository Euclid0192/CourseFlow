import {
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    Connection,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    XYPosition
} from 'reactflow';
import { create } from 'zustand';   
import { initialNodes, initialEdges } from './NodesAndEdges';
import { nanoid } from 'nanoid';

export type RFState = {
    nodeId: number,
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    addNode: (title: string) => void;
    addNodeDrag: (parentNodeId: string, position: XYPosition) => void;
    deleteNode: (title: string) => void;
    updateNodeLabel: (id: string, newLabel: string) => void;
    setNodes: (Nodes: Node[]) => void,
    setEdges: (Edges: Edge[]) => void,
    clear: () => void
    generateFlow: (flow: string[]) => void,
};
   
const useNodeEdgeStore = create<RFState>()((set, get) => ({
    nodeId: 4,
    nodes: initialNodes,
    edges: initialEdges,
    onNodesChange: (changes: NodeChange[]) => {
        set({
        nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
        set({
        edges: applyEdgeChanges(changes, get().edges),
        });
    },
    onConnect: (connection: Connection) => {
        set({
          edges: addEdge(connection, get().edges),
        });
    },
    addNode: (title: string) => {
        const newNode: Node = {
            id: get().nodeId.toString(),
            data: { label: title},
            position: { x: 100, y: 100 },
            type: 'usersCreated',
            dragHandle: '.custom-drag-handle'
        }
        set({
            nodeId: get().nodeId + 1,
            nodes: [...get().nodes, newNode]
        })
    },
    addNodeDrag: (parentNodeId: string, position: XYPosition) => {
        const newNode: Node = {
            id: get().nodeId.toString(),
            data: { label: 'New Node'},
            position,
            type: 'usersCreated',
            dragHandle: '.custom-drag-handle'
        }

        const newEdge: Edge = {
            id: nanoid(),
            source: parentNodeId,
            target: newNode.id
        }

        set({
            nodeId: get().nodeId + 1,
            nodes: [...get().nodes, newNode],
            edges: [...get().edges, newEdge]
        })
    },
    deleteNode: (title: string) => {
        set({
            nodes: get().nodes.filter((nd) => nd.data.label != title && title != "New Node")
        })
    },
    updateNodeLabel: (id: string, newLabel: string) => {
        set({
            nodes: get().nodes.map((node) => {
                if (node.id == id)
                    node.data = { ...node.data, label: newLabel }

                return node
            })
        })
    },
    setNodes: (Nodes: Node[]) => {
        set({
            nodes: Nodes,
        })
    },
    setEdges: (Edges: Edge[]) => {
        set({
            edges: Edges
        })
    },
    clear: () => {
        set({
            nodeId: 0,
            nodes: [],
            edges: [],
        })
    },
    generateFlow: (flow: string[]) => {
        let newNode: Node 
        let newNodeList: Node[] = []
        let newEdge: Edge 
        let newEdgeList: Edge[] = []
        let i = 0, locY: number = 100
        
        ///
        for (; i < flow.length; i++)
        {
            newNode = {
                id: i.toString(),
                type: 'generated',
                data: {label: flow[i]},
                position: {x: 250, y: locY}
            }

            newNodeList.push(newNode)
            locY += 100

            if (i == 0)
                continue 
            
            newEdge = {
                id: i.toString(),
                source: (i - 1).toString(),
                target: i.toString(),
                animated: true,
            }
            newEdgeList.push(newEdge)
        }

        set({
            nodeId: i,
            nodes: newNodeList,
            edges: newEdgeList
        })
    } /// end of generateFlow
})
);
   
export default useNodeEdgeStore;