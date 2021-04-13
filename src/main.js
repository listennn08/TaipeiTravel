import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store'

Vue.config.productionTip = true;

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app');
