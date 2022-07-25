import Vue from 'vue'
import Vuex from 'vuex'
import invitation from '@/store/modules/invitation'
Vue.use(Vuex)

export default new Vuex.Store( {
    modules: {
        invitation
    }
})
