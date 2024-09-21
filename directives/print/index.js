import Print from "./src";

Print.install = function (Vue) {
    Vue.directive(Print.name, Print);
};

export default Print;