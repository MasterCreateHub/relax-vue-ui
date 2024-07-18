import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 引入 Element UI 的样式

import BaseSearcher from './baseComponents/BaseSearcher.vue'
import BasePageTable from './baseComponents/BasePageTable.vue'
import BaseConverter from './baseComponents/BaseConverter.vue'
import BaseList from './baseComponents/BaseList.vue'
import BasePopselect from "./baseComponents/BasePopselect.vue";

Vue.config.productionTip = false;
Vue.component('BaseSearcher', BaseSearcher)
Vue.component('BasePageTable', BasePageTable)
Vue.component('BaseConverter', BaseConverter)
Vue.component('BaseList', BaseList)
Vue.component('BasePopselect', BasePopselect)
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");


