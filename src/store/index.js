import Vue from 'vue'
import Vuex from 'vuex'
import employee from '@/store/modules/employee'
import admin from "@/store/modules/admin";
Vue.use(Vuex)

export default new Vuex.Store( {
    modules: {
        employee,
        admin
    }
})
