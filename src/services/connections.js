import api from '@/utils/api';

export default {

    createInvitation() {
        return api({
            url: `/connections/create-invitation`,
            method: 'POST'
        })
    }

}