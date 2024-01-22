import ReactFlow, {
  Background,
  MiniMap,
  Controls,
  BackgroundVariant,
  Node
} from "reactflow";

import "./Flow.css"
import "reactflow/dist/style.css";
import useNodeEdgeStore from "../Zustand/store";


const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  addNode: state.addNode,
  deleteNode: state.deleteNode,
});

const Flow = ({ onDelete }: { onDelete: any}) => {

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    deleteNode
  } = useNodeEdgeStore(selector)

  const onNodeClick = (_evt: any, node: Node) => {
    // console.log(node.data.label)
    // console.log("Before deletion ", onDelete.current)
    if (onDelete.current)
    {
      deleteNode(node)
      onDelete.current = false
    }
    console.log("After deletion (if at all): ", onDelete.current)
  } 

  return (
    <div className="flow__container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        zoomOnScroll={false}
        onNodeClick={onNodeClick}
      >
        <MiniMap />
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1}/>
      </ReactFlow>
    </div>

  );
};

export default Flow;
