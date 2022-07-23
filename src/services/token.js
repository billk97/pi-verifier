import axios from "axios";


const API_URL = `${process.env.VUE_APP_HOST_TOKEN_DOMAIN}`

const api = axios.create({
    baseURL: API_URL
})


api.interceptors.request.use(
    async config => {
        const token = localStorage.getItem('jwt-token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

const key = 'pi-verifier-2'

export default {
    checkIfTokenExist() {
        
        return api({
            url: `/api/token/${key}`,
            method: 'GET'
        })
    },
    saveToken(token) {
        return api({
            url: `/api/token/`,
            method: 'POST',
            data: {
                key:  key,
                token: token
            }
        })
    }

}