import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';

import './assets/style/main.scss'
import 'element-ui/lib/theme-chalk/index.css';

import RelaxUI from '../src/index'

import ConfigSelect from './components/config-select/ConfigSelect.vue'
import ConfigRadioGroup from './components/config-radio-group/ConfigRadioGroup.vue'
import ConfigTable from './components/config-table/ConfigTable.vue'


Vue.component('ConfigSelect', ConfigSelect)
Vue.component('ConfigRadioGroup', ConfigRadioGroup)
Vue.component('ConfigTable', ConfigTable)

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(RelaxUI)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");


