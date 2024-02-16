/// Node type generated in flow
import { Handle, NodeProps, Position } from "reactflow"
import "./UsersCreatedNode.css"
import { Pan } from "grommet-icons"
import useNodeEdgeStore, { RFState } from "../Zustand/storeRF"

export type UsersCreatedData = {
    label: string
}

const selector = (state: RFState) => ({
    updateNodeLabel: state.updateNodeLabel
})

const UsersCreatedNode = ({ id, data }: NodeProps<UsersCreatedData>) => {

  const { updateNodeLabel } = useNodeEdgeStore(selector)

  return (
    <>
        <div className="users-created-node">
            <div className="custom-drag-handle">
                <Pan className="drag-icon" size="15px"/>
            </div>
            <input 
                className="users-created__input"
                value={data.label}
                onChange={(e) => updateNodeLabel(id, e.target.value)}
            />
        </div>

        <Handle type="target" position={Position.Top} className="users-created__handle__target"/>
        <Handle type="source" position={Position.Bottom} className="users-created__handle__source"/>
    </>
  )
}

export default UsersCreatedNode