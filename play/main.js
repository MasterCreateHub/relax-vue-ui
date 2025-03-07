
import Vue from 'vue'
import App from './src/App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import RelaxVueUI from "/src"

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(RelaxVueUI)

new Vue({
  render: h => h(App),
}).$mount('#play')
