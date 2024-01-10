import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import store from './store' // Import the store
import FuelPrices from './views/FuelPrices.vue'
import ServicesList from './views/ServicesList.vue'
import ContactForm from './views/ContactForm.vue'

Vue.use(VueRouter)
Vue.use(Vuex)

const routes = [
  { path: '/fuel-prices', component: FuelPrices },
  { path: '/services', component: ServicesList },
  { path: '/contact', component: ContactForm },
  { path: '/', redirect: '/fuel-prices' }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
