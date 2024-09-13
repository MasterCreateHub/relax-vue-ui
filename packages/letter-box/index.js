import ReLetterBox from "./src/index.vue";

ReLetterBox.install = function (Vue) {
  Vue.component(ReLetterBox.name, ReLetterBox);
};

export default ReLetterBox;