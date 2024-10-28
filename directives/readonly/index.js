import Readonly from "./src";

Readonly.install = function (Vue) {
    Vue.directive(Readonly.name, Readonly);
};

export default Readonly;