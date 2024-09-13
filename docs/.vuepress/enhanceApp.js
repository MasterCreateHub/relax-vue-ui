// Element 组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import RelaxUI from "../../packages"

export default async ({ Vue }) => {
  if (typeof process === 'undefined') {
    Vue.use(ElementUI)
    Vue.use(RelaxUI)
  }
}
