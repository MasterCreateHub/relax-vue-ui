
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import RelaxUI from "/src"

import ConfigSelect from './components/config-select/ConfigSelect.vue'
import ConfigRadioGroup from './components/config-radio-group/ConfigRadioGroup.vue'
import ConfigTable from './components/config-table/ConfigTable.vue'


Vue.component('ConfigSelect', ConfigSelect)
Vue.component('ConfigRadioGroup', ConfigRadioGroup)
Vue.component('ConfigTable', ConfigTable)


export default async ({ Vue }) => {
  if (typeof process === 'undefined') {
    Vue.use(ElementUI)
    Vue.use(RelaxUI)
  }
}
