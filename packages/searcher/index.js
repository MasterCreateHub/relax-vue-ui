import ReSearcher  from "./src/index.vue";

ReSearcher.install = function (Vue) {
  Vue.component(ReSearcher.name, ReSearcher);
};

export default ReSearcher;