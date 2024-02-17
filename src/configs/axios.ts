import axios from "axios"

const axiosInstance = axios.create()

axiosInstance.defaults.baseURL='http://localhost:3000'
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json'    

export default axiosInstance