/// Node type generated in flow
import { Handle, NodeProps, Position } from "reactflow"
import "./GeneratedNode.css"

export type GeneratedData = {
    label: string
}

const GeneratedNode = ({ data }: NodeProps<GeneratedData>) => {
  return (
    <>
        <div className="generate-node">
            <label htmlFor="text">{data.label}</label>
        </div>
        <Handle type="target" position={Position.Top} className="generated__handle__target" isConnectable={false}/>
        <Handle type="source" position={Position.Bottom} className="generated__handle__source" isConnectable={false} />
    </>
  )
}

export default GeneratedNode