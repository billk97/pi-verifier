import Vue from 'vue'
import App from './App.vue'
import { BootstrapVueIcons, BootstrapVue} from 'bootstrap-vue'
import store from '@/store'
import router from '@/router/index'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import VueQRCodeComponent from 'vue-qrcode-component'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(store)
Vue.component('qr-code', VueQRCodeComponent)

new Vue({
    store,
    router,
  render: h => h(App),
}).$mount('#app')
