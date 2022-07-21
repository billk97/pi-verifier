// import adminService from "@/services/adminService"
import jwtUtils from "@/utils/jwt-utils";
import router from "@/router";

export default {
    state: {
        jwtToken: localStorage.getItem('jwt-token'),
        privileges: []
    },
    mutations: {
        setJwtToken(state, jwtToken) {
            state.jwtToken = jwtToken
        },
        setPrivileges(state, privileges) {
            state.privileges = privileges
        }
    },
    actions: {
        async login({commit}, credentials) {
            // const resp = await adminService.login(credentials)
            console.log(credentials)
            const resp  = {}
            const token = resp.data.token
            localStorage.setItem('jwt-token', token)
            commit('setJwtToken', token)
            const privileges = jwtUtils.getPrivileges(token)
            commit('setPrivileges', privileges)
            console.log("logged in!")
            router.push("employees")
        },
        async logout({commit}) {
            commit('setJwtToken', null)
            commit('setPrivileges', null)
            await localStorage.removeItem('jwt-token')
            await router.push("register")
            location.reload()
        }
    },
    getters: {
        isLoggedIn (state) {
            return state.jwtToken !== null
        }
    }
}
