import './Account.css'
import useAuthStore, { AuthState } from "../../Zustand/storeAuth"
import axiosInstance from '../../configs/axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Edit } from 'grommet-icons'

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
    const submitEditFlow = () => {
        navigate("/main")
    }

    const UserFlow = ({title} : {title: string}) => {
        return (
            <div className='flow-element'>
                <h2>{title}</h2>
                <button className='edit-btn' onClick={submitEditFlow}>
                    <Edit size='30px'/>
                </button>
            </div>
        )
    }

    // console.log("the flows...", flows)

    return (
        <div className='account__container'>
            <h1 className='welcome-msg'>Welcome, {username}! 😁</h1>
            {/* <button className='btn' onClick={getAllFlow}>Get the flows</button> */}
            {flows.map((f: any) => <UserFlow title={f.title} key={f._id}/> )}
        </div>
    )
}

export default Account