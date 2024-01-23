/// Node type generated in flow
import { Handle, NodeProps, Position } from "reactflow"

export type GeneratedData = {
    label: string
}

const GeneratedNode = ({ data }: NodeProps<GeneratedData>) => {
  return (
    <>
        <div>
            <label htmlFor="text">{data.label}</label>
        </div>
        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} />
    </>
  )
}

export default GeneratedNode