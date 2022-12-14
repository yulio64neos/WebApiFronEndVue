import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'
import VueAxios from 'vue-axios'
import JsonExcel from "vue-json-excel";
 
Vue.component("downloadExcel", JsonExcel);
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
