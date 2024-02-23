import { useState } from "react"
import BaseModal from "./BaseModal"
import './NamingModal.css'
import useNodeEdgeStore from "../../Zustand/storeRF"
import axiosInstance from "../../configs/axios"
import useAuthStore, { AuthState } from "../../Zustand/storeAuth"
import { useNavigate } from "react-router-dom"

const selector = (state: any) => ({
    nodes: state.nodes,
    edges: state.edges,
})

const authSelector = (state: AuthState) => ({
    username: state.username,
    accessToken: state.accessToken
})

const NamingModal = ({ isOpen, onClose } : {isOpen: boolean, onClose: () => void }) => {

    const [ title, setTitle ] = useState<string>('')

    const { nodes, edges } = useNodeEdgeStore(selector)
    const { username, accessToken } = useAuthStore(authSelector)

    const navigate = useNavigate()

    const onSave = async (evt: any) => {
        evt.preventDefault()

        console.log("Current nodes...", nodes)
        console.log("Current edges...", edges)
    
        /// convert nodes and edges to BE schema
        const nodesList = nodes.map((ele: any) => ({
          nodeId: ele.id,
          title: ele.data.label,
          type: ele.type,
          position: ele.position
        })) 
    
        console.log("nodes for BE, ", nodesList)
    
        const edgesList = edges.map((ele: any) => ({
          source: Number(ele.source),
          destination: Number(ele.target)
        }))
    
        console.log("edges for BE, ", edgesList)

        /// submit the save to server
        try {
            const response = await axiosInstance.post('/flows',
                {
                    user: username,
                    title,
                    nodes: nodesList,
                    edges: edgesList,
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + accessToken
                    }
                }
            )

            console.log("Response from saving...", response)

            navigate('/user')
            
        } catch (err: any) {
            console.log("error while saving...", err)
        }
    }

    return (
        <BaseModal 
            onClose={onClose} 
            isOpen={isOpen}
        >
            <form className="naming-modal-form" onSubmit={(e) => onSave(e)}>
                <label className="naming-label">Flow Name </label>
                <input className="naming-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="btn-container">
                    <button className="btn" type="submit">Save</button>                    
                </div>

            </form>
        </BaseModal>
    )
}

export default NamingModal