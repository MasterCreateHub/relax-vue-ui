import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';

import '@examples/assets/style/main.scss'
import 'element-ui/lib/theme-chalk/index.css'; 


import  RelaxUI from '../src/index'

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(RelaxUI)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");


