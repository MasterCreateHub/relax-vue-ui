import resize from "./src";

resize.install = function (Vue) {
    Vue.directive("resize", resize);
};

export default resize;