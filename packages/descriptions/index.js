import ReDescriptions  from "./src/index.vue";

ReDescriptions.install = function (Vue) {
  Vue.component(ReDescriptions.name, ReDescriptions);
};

export default ReDescriptions;