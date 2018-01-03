import 'reset-css/reset.css';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import VueResource from 'vue-resource';
import firebase from 'firebase';
import VueFire from 'vuefire';
import VueMoment from 'vue-moment';
import ElementUI from 'element-ui';

import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(VueFire);
Vue.use(VueMoment);
Vue.use(ElementUI);

firebase.initializeApp({
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
