import RePagination  from "./src/index.vue";

RePagination.install = function (Vue) {
  Vue.component(RePagination.name, RePagination);
};

export default RePagination;