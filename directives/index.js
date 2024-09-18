

// 导入所有自定义指令
import resize from './resize';

// 注册所有自定义指令
const directives = {
    resize
};

const install = function (Vue) {
    if (install.installed) return;

    Object.keys(directives).forEach(key => {
        Vue.directive(key, directives[key]);
    });

    install.installed = true;
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    ...directives,
    install
}
