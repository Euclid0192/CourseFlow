import axios from "axios"
import useAuthStore from "../Zustand/storeAuth"
import { AuthState } from "../Zustand/storeAuth"

const selector = (state: AuthState) => ({
    accessToken: state.accessToken
})

const { accessToken } = useAuthStore(selector)

axios.defaults.baseURL='http://localhost:3000'
axios.defaults.headers.common['Authorization'] = accessToken
axios.defaults.headers.post['Content-Type'] = 'application/json'