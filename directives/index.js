


import resize from './resize';

// 存储所有自定义指令对象
const directives = {
    resize
};
// 定义 directivesInstall 方法
const directivesInstall = function (Vue, option = []) {
    if (directivesInstall.installed) return;
    // 可部分注册，默认全部注册
    if (Array.isArray(option) && option.length > 0) {
        Object.keys(directives).forEach(key => {
            if (option.includes(key)) {
                Vue.directive(key, directives[key]);
            }
        });
    } else {
        Object.keys(directives).forEach(key => {
            Vue.directive(key, directives[key]);
        });
    }
    directivesInstall.installed = true;
}

export default {
    ...directives,
    directivesInstall
}
