import api from '@/utils/api';

export default {

    createInvitation() {
        return api({
            url: `/connections/create-invitation`,
            method: 'POST'
        })
    },

    getConnections() {
        return api({
            url: `/connections`,
            method: 'GET'
        })
    },
    getConnectionsById(id) {
        return api({
            url: `/connections/${id}`,
            method: 'GET'
        })
    },
    deleteConnection(id) {
        return api({
            url: `/connections/${id}`,
            method: 'DELETE'
        })
    },
    accept(id) {
        return api({
            url: `/connections/${id}/accept-request`,
            method: 'POST'
        })
    }

}