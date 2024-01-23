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
        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} />
    </>
  )
}

export default GeneratedNode