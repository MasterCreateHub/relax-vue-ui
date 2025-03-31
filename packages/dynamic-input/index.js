import ReDynamicInput  from "./src/index.vue";

ReDynamicInput.install = function (Vue) {
  Vue.component(ReDynamicInput.name, ReDynamicInput);
};

export default ReDynamicInput;