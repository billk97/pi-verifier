import axios from "axios";

const API_URL = `${process.env.VUE_APP_HOST_DOMAIN}`

const api = axios.create({
    baseURL: API_URL
})

api.interceptors.request.use(
    async config => {
        const token = localStorage.getItem('verifier-jwt')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export default api

