import './Account.css'
import useAuthStore, { AuthState } from "../../Zustand/storeAuth"
import axiosInstance from '../../configs/axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Edit, Trash } from 'grommet-icons'

const selector = (state: AuthState) => ({
  username: state.username,
  accessToken: state.accessToken,
  setUsername: state.setUsername,
  setAccessToken: state.setAccessToken,
  setRefreshToken: state.setRefreshToken
})

const Account = () => {

    const { username, accessToken, setUsername, setAccessToken, setRefreshToken } = useAuthStore(selector)

    const navigate = useNavigate()

    console.log("Acess token ", accessToken)

    const [ flows, setFlows ] = useState<string[]>([])

    const getAllFlow = async () => {

        try {
            const response = await axiosInstance.get(
                "/flows",
                {
                    headers: {
                        "Authorization": "Bearer " + accessToken
                    }
                }
            )        
            
            // console.log(response)
            /// Response: response.data = array of elements, each has .content = array of string (courses)

            const newFlow = response.data.filter((ele: any) => {
            
                console.log("compare ", ele.user, username)
                
                return ele.user === username
            })
            console.log("Flows after filter, ", newFlow)
            setFlows(newFlow)

        } catch (err: any) {
            console.log("Get flows error: ", err)

            if (err!.response.status === 400)
            {
                alert("Your session has expired!")
                navigate("/auth/login")     
                setUsername("")
                setAccessToken("")
                setRefreshToken("")          
            }

        }
    }

    /// Get the data
    useEffect(() => {
        getAllFlow()
    }, [])

    /// To edit each flow
    const submitEditFlow = (flowId: string, title: string, nodes: any, edges: any) => {
        navigate(`/main/${flowId}`, 
            { 
                state: {
                    flowId,
                    title, 
                    nodes, 
                    edges
                }
            }
        )
    }

    /// To delete a flow
    const submitDeleteFlow = async (flowId: string) => {
        try {
            const response = await axiosInstance.delete('/flows',
                {
                    data: {
                        id: flowId,
                    },
                    headers: {
                        Authorization: 'Bearer ' + accessToken
                    }
                }
            )

            console.log("response from deletion...", response)

            getAllFlow()


        } catch (err: any) {
            console.log("Error while deleting ", err)
        }
    }

    const UserFlow = ({title, flowId, nodes, edges} : {title: string, flowId: string, nodes: any, edges: any}) => {
        return (
            <div className='flow-element'>
                <h2>{title}</h2>
                <div className='edit-btn-container'>
                    <button className='edit-btn' onClick={() => submitEditFlow(flowId, title, nodes, edges)}>
                        <Edit size='30px'/>
                    </button>
                    <button className='delete-btn' onClick={() => submitDeleteFlow(flowId)}>
                        <Trash size='30px' />
                    </button>                    
                </div>
            </div>
        )
    }

    // console.log("the flows...", flows)

    return (
        <div className='account__container'>
            <h1 className='welcome-msg'>Welcome, {username}! 😁</h1>
            {/* <button className='btn' onClick={getAllFlow}>Get the flows</button> */}
            {flows.map((f: any) => <UserFlow title={f.title} flowId={f._id} nodes={f.nodes} edges={f.edges} key={f._id}/> )}
        </div>
    )
}

export default Account