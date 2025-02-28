import ReWorkbench  from "./src/index.vue";

ReWorkbench.install = function (Vue) {
  Vue.component(ReWorkbench.name, ReWorkbench);
};

export default ReWorkbench;