import axios from "axios"
import useAuthStore from "../Zustand/storeAuth"
import { AuthState } from "../Zustand/storeAuth"

const selector = (state: AuthState) => ({
    accessToken: state.accessToken
})

const { accessToken } = useAuthStore(selector)

const axiosInstance = axios.create()

axiosInstance.defaults.baseURL='http://localhost:3000'
axiosInstance.defaults.headers.common['Authorization'] = accessToken
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json'

export default axiosInstance