import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/home',
            name: 'AskCredentials',
            component: () => import('@/components/AskCredentials'),
            meta: {
                title: 'AskCredentials'
            }
        }
    ]
})

export default router


