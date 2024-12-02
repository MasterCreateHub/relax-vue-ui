import ReEditableTable  from "./src/index.vue";

ReEditableTable.install = function (Vue) {
  Vue.component(ReEditableTable.name, ReEditableTable);
};

export default ReEditableTable;