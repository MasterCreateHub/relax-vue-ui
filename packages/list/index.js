import ReList  from "./src/index.vue";

ReList.install = function (Vue) {
  Vue.component(ReList.name, ReList);
};

export default ReList;