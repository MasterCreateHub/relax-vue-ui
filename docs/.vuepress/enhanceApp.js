
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import RelaxUI from "../../lib/relax-ui.umd.js"

import ConfigSelect from './components/config-select/ConfigSelect.vue'
import ConfigRadioGroup from './components/config-radio-group/ConfigRadioGroup.vue'


Vue.component('ConfigSelect', ConfigSelect)
Vue.component('ConfigRadioGroup', ConfigRadioGroup)


export default async ({ Vue }) => {
  if (typeof process === 'undefined') {
    Vue.use(ElementUI)
    Vue.use(RelaxUI)
  }
}
