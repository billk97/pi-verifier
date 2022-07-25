export default {
    state: {
        invitation: localStorage.getItem('invitation'),
        connectionId: localStorage.getItem('connectionId'),
        invitationExist: localStorage.getItem('invitation') !== null,
        pres_ex_id: localStorage.getItem('pres_ex_id')
    },
    mutations: {
        setInvitation(state, invitation) {
            state.invitation = invitation
        },
        setConnectionId(state, id) {
            state.connectionId = id
        },
        setInvitationExist(state, invitationExist) {
            state.invitationExist = invitationExist
        },
        setPresExId(state, pres_ex_id) {
            state.pres_ex_id = pres_ex_id
        }
    },
    actions: {
        updateInvitation({commit}, data) {
            commit('setConnectionId', data.connection_id)
            localStorage.setItem('connectionId', data.connection_id)
            const encoded = btoa(JSON.stringify(data.invitation))
            localStorage.setItem('invitation', encoded)
            commit('setInvitation', encoded)
            commit('setInvitationExist', true)
        },
        clearInvitation({commit}) {
            commit('setConnectionId', null)
            localStorage.removeItem('connectionId')
            localStorage.removeItem('invitation')
            commit('setInvitation', null)
            commit('setInvitationExist', false)
        },
        updatePresExId({commit}, id) {
            commit('setPresExId', id)
            localStorage.setItem('pres_ex_id', id)
        },
        clearPresExId({commit}) {
            commit('setPresExId', null)
            localStorage.setItem('pres_ex_id', null)
        }
    },
    getters: {
        getInvitation (state) {
            if (!state.invitation) {
                return null
            }
            return JSON.parse(atob(state.invitation))
        },
        getBase64Invitation: state => state.invitation,
        getConnectionId: state => state.connectionId,
        invitationExist: state => state.invitationExist,
        getPresExId: state => state.pres_ex_id
    }
}