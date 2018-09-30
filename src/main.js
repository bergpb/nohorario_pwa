import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuetify, {
  theme: {
    primary: '#1976D2',
    secondary: '#424242',
    success: '#4CAF50',
    info: '#2196F3',
    warning: '#FFC107',
    danger: '#C82333',
    error: '#FF5252',
    app: '#F65E02',
    orange: '#EF6C00',
    accent: '#82B1FF',
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
