import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import axios from 'axios' //  global axois
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

//  change request config
axios.defaults.baseURL = 'https://vueauth-e155c.firebaseio.com'
/*axios.defaults.headers.common['Authorization'] = 'tokenname'
axios.defaults.headers.get['Accepts'] = 'application/json'*/

//  interceptors
/*axios.interceptors.request.use(config => {  //  intercpts each req sent from this app
  console.log('REQ', config)
  return config     //  continues to further send the request
})

axios.interceptors.response.use(res => {  //  intercpts each res recieved
  console.log('RES', res.data)
  return res     //  continues to make res available to axios calls
})*/

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
