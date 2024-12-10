import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';

import '@/assets/style/main.scss'
import 'element-ui/lib/theme-chalk/index.css'; // 引入 Element UI 的样式

import  RelaxUI from '../src/index'

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(RelaxUI)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");


