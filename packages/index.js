import ReSearcher from "./searcher";
import ReToolbar from "./toolbar";
import ReTable from "./table";
import RePagination from "./pagination";
import ReWorkbench from "./workbench";
import ReForm from "./form";
import ReConverter from "./converter";
import ReDescriptions from "./descriptions";
import ReDetail from "./detail";

// 存储组件列表
const components = [ReSearcher, ReToolbar, ReTable, RePagination, ReWorkbench, ReForm, ReConverter, ReDescriptions, ReDetail];

// 定义 componentsInstall 方法
const componentsInstall = function (Vue, option = []) {
  if (componentsInstall.installed) return;
  // 可部分注册，默认全部注册
  if (Array.isArray(option) && option.length > 0) {
    components.forEach((component) => {
      if (option.includes(component.name)) {
        Vue.component(component.name, component);
      }
    });
  } else {
    components.forEach((component) => {
      Vue.component(component.name, component);
    });
  }
  componentsInstall.installed = true;
};


export default {
  ...components,
  componentsInstall,
};
