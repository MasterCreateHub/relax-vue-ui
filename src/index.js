

import Components from '../packages/index'
import Directives from '../directives/index'
import { version } from "../package.json";

const install = function (Vue, option = {}) {
    if (!option.components) {
        Components.componentsInstall(Vue)
    }else{
        Array.isArray(option.components) && Components.componentsInstall(Vue,option.components)
    }
    if(!option.directives){
        Directives.directivesInstall(Vue)
    }else{
        Array.isArray(option.directives) && Directives.directivesInstall(Vue,option.directives)
    }
}

// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
  }
  

export default {
    version,
    install,
    ...Components,
    ...Directives
}