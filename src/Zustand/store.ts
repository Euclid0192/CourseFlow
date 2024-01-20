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
    addEdge
} from 'reactflow';
import { create } from 'zustand';   
import { initialNodes, initialEdges } from './NodesAndEdges';

export type RFState = {
    nodeId: number,
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    addNode: (title: string) => void;
    deleteNode: (node: Node) => void;
    clear: () => void
    generateFlow: (flow: string[]) => void
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
            position: { x: 100, y: 100 }
        }
        set({
            nodeId: get().nodeId + 1,
            nodes: [...get().nodes, newNode]
        })
    },
    deleteNode: (node: Node) => {
        set({
            nodes: get().nodes.filter((nd) => nd.id != node.id)
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