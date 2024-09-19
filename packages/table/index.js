import ReTable  from "./src/index.vue";

ReTable.install = function (Vue) {
  Vue.component(ReTable.name, ReTable);
};

export default ReTable;