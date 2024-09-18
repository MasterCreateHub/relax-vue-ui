import ReConverter from "./converter/index";
import ReSearcher from "./searcher/index";
import { version } from "../package.json";
// 存储组件列表
const components = [ReConverter, ReSearcher];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  if (install.installed) return;
  // 遍历注册全局组件
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
  install.installed = true;
};

// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
// 按需引入
export { ReConverter, ReSearcher };
export default {
  version,
  ...components,
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
};
