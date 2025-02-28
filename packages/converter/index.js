import ReConverter  from "./src/index.vue"

ReConverter.install = function (Vue) {
  Vue.component(ReConverter.name, ReConverter)
}

export default ReConverter