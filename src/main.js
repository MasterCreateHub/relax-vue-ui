import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import '@/assets/style/main.scss'
import 'element-ui/lib/theme-chalk/index.css'; // 引入 Element UI 的样式

// 表单组件
import BaseInput from "@/components/base/BaseInput.vue"
import BaseInputNumber from '@/components/base/BaseInputNumber.vue'
import BaseCheckboxGroup from '@/components/base/BaseCheckboxGroup.vue'
import BaseRadioGroup from '@/components/base/BaseRadioGroup.vue'
import BasePopselect from "@/components/base/BasePopselect.vue"
import BaseSelect from "@/components/base/BaseSelect.vue"
import BaseTimePicker from '@/components/base/BaseTimePicker.vue'
import BaseDatePicker from '@/components/base/BaseDatePicker.vue'
import BaseTimeSelect from '@/components/base/BaseTimeSelect.vue'

// 通用组件
import BaseConverter from '@/components/base/BaseConverter.vue'
import BaseDescriptions from '@/components/base/BaseDescriptions.vue'
import BaseSearcher from '@/components/base/BaseSearcher.vue'
import BaseList from '@/components/base/BaseList.vue'
import BaseWorkbench from '@/components/base/BaseWorkbench.vue'
import BasePageTable from '@/components/base/BasePageTable.vue'

// 业务组件
import PopTabs from "@/components/work/PopTabs.vue"
import PopStaging from "@/components/work/PopStaging.vue"

Vue.config.productionTip = false;

Vue.component('BaseInput', BaseInput)
Vue.component('BaseInputNumber', BaseInputNumber)
Vue.component('BaseCheckboxGroup', BaseCheckboxGroup)
Vue.component('BaseRadioGroup', BaseRadioGroup)
Vue.component('BasePopselect', BasePopselect)
Vue.component('BaseSelect', BaseSelect)
Vue.component('BaseTimePicker', BaseTimePicker)
Vue.component('BaseDatePicker', BaseDatePicker)
Vue.component('BaseTimeSelect', BaseTimeSelect)

Vue.component('BaseConverter', BaseConverter)
Vue.component('BaseDescriptions', BaseDescriptions)
Vue.component('BaseSearcher', BaseSearcher)
Vue.component('BaseList', BaseList)
Vue.component('BaseWorkbench', BaseWorkbench)
Vue.component('BasePageTable', BasePageTable)

Vue.component('PopTabs', PopTabs)
Vue.component('PopStaging', PopStaging)

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");


