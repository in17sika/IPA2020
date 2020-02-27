// ANCHOR Imports dependencies
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Axios from 'axios';

Vue.config.productionTip = false

// ANCHOR set auth header
Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
