import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 引入 Element UI 的样式

// 表单组件
import BaseInput from "@/components/base/BaseInput.vue"
import BaseInputNumber from '@/components/base/BaseInputNumber.vue'
import BaseCheckboxGroup from '@/components/base/BaseCheckboxGroup.vue'
import BaseRadioGroup from '@/components/base/BaseRadioGroup.vue'
import BasePopselect from "@/components/base/BasePopselect.vue"
import BaseSelect from "@/components/base/BaseSelect.vue"

// 通用组件
import BaseSearcher from '@/components/base/BaseSearcher.vue'
import BasePageTable from '@/components/base/BasePageTable.vue'
import BaseConverter from '@/components/base/BaseConverter.vue'
import BaseList from '@/components/base/BaseList.vue'

// 业务组件
import BasePoptabs from "@/components/base/BasePoptabs.vue"

Vue.config.productionTip = false;

Vue.component('BaseInput', BaseInput)
Vue.component('BaseInputNumber', BaseInputNumber)
Vue.component('BaseCheckboxGroup', BaseCheckboxGroup)
Vue.component('BaseRadioGroup', BaseRadioGroup)
Vue.component('BasePopselect', BasePopselect)
Vue.component('BaseSelect', BaseSelect)

Vue.component('BaseSearcher', BaseSearcher)
Vue.component('BasePageTable', BasePageTable)
Vue.component('BaseConverter', BaseConverter)
Vue.component('BaseList', BaseList)

Vue.component('BasePoptabs', BasePoptabs)

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");


