import Measure from "./src";

Measure.install = function (Vue) {
    Vue.directive(Measure.name, Measure);
};

export default Measure;