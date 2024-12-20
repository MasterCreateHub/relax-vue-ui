import Emerge from "./src";

Emerge.install = function (Vue) {
    Vue.directive(Emerge.name, Emerge);
};

export default Emerge;