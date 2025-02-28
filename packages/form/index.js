import ReForm  from "./src/index.vue";

ReForm.install = function (Vue) {
  Vue.component(ReForm.name, ReForm);
};

export default ReForm;