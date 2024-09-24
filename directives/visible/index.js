import Visible from "./src";

Visible.install = function (Vue) {
    Vue.directive(Visible.name, Visible);
};

export default Visible;