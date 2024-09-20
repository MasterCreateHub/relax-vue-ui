import ResizeObserver from "./src";

ResizeObserver.install = function (Vue) {
    Vue.directive(ResizeObserver.name, ResizeObserver);
};

export default ResizeObserver;