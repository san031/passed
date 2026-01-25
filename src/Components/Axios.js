import axios from "axios";

const baseUrl="http://127.0.0.1:8000/"
const axiosInstance=axios.create({
    baseURL:baseUrl,
    timeout:5000,
    headers:{
        "Content-Type":"application/json",
        // Accept:"application/json"
    }
})

axiosInstance.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('user'))?.token || ''

    if(token && !config._skipAuth){
        config.headers.Authorization = `Token ${token}`
    }
    return config
},
(error) => Promise.reject(error)

)

export default axiosInstance