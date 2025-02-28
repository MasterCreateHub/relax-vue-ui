import Disabled from "./src";

Disabled.install = function (Vue) {
    Vue.directive(Disabled.name, Disabled);
};

export default Disabled;