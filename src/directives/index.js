


import Measure from './measure';
import Emerge from './emerge';
import Readonly from './readonly';
import Disabled from './disabled';

// 存储所有自定义指令对象
const directives = [Measure, Emerge, Readonly, Disabled]
// 定义 directivesInstall 方法
const directivesInstall = function (Vue, option = []) {
    if (directivesInstall.installed) return;
    // 可部分注册，默认全部注册
    if (Array.isArray(option) && option.length > 0) {
        directives.forEach((directive) => {
            if (option.includes(directive.name)) {
                Vue.directive(directive.name, directive);
            }
        });
    } else {
        directives.forEach((directive) => {
            Vue.directive(directive.name, directive);
        });
    }
    directivesInstall.installed = true;
}

export default {
    ...directives,
    directivesInstall
}
