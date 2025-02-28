import ReToolbar  from "./src/index.vue";

ReToolbar.install = function (Vue) {
  Vue.component(ReToolbar.name, ReToolbar);
};

export default ReToolbar;