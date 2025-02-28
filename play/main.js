
import Vue from 'vue'
import App from './src/App.vue'
import RelaxVueUI from "./../packages/index"

Vue.config.productionTip = false

Vue.use(RelaxVueUI)

new Vue({
  render: h => h(App),
}).$mount('#play')
