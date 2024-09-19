import ReDetail  from "./src/index.vue";

ReDetail.install = function (Vue) {
  Vue.component(ReDetail.name, ReDetail);
};

export default ReDetail;