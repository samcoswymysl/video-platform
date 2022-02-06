import Vue from 'vue';
import VueCookies from 'vue-cookies';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueCookies);

Vue.$cookies.config('7d');
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
