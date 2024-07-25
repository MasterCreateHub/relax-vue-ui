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
import BasePoptabs from "./baseComponents/BasePoptabs.vue"
import BaseInput from "./baseComponents/BaseInput.vue"
import BaseInputNumber from '@/baseComponents/BaseInputNumber.vue'
import BaseCheckboxGroup from '@/baseComponents/BaseCheckboxGroup.vue'
import BaseRadioGroup from '@/baseComponents/BaseRadioGroup.vue'
import BasePopselect from "./baseComponents/BasePopselect.vue"
import BaseSelect from "./baseComponents/BaseSelect.vue"


Vue.config.productionTip = false;
Vue.component('BaseSearcher', BaseSearcher)
Vue.component('BasePageTable', BasePageTable)
Vue.component('BaseConverter', BaseConverter)
Vue.component('BaseList', BaseList)
Vue.component('BasePoptabs', BasePoptabs)
Vue.component('BaseInput',BaseInput)
Vue.component('BaseInputNumber',BaseInputNumber)
Vue.component('BaseCheckboxGroup',BaseCheckboxGroup)
Vue.component('BaseRadioGroup',BaseRadioGroup)
Vue.component('BasePopselect', BasePopselect)
Vue.component('BaseSelect', BaseSelect)

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");


