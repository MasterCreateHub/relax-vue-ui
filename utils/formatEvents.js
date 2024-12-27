/**
 * @description 格式化事件绑定对象
 * @param {Object} options - 包含事件绑定对象和额外参数位置信息的对象
 * @param {Object} options.events - 事件对象，键为事件名称，值为事件处理函数
 * @param {Boolean} [options.position=true] - 是否将额外参数放在前面（true）或后面（false）
 * @param {...*} extraArgs - 额外的参数，将在事件处理函数中使用
 * @returns {Object} 格式化后的事件绑定对象
 */
export function formatEvents({ events, position = true }, ...extraArgs) {
    if (!events || typeof events !== 'object') {
        console.warn('Invalid events object provided.');
        return {};
    }

    return Object.keys(events).reduce((finalEvents, key) => {
        const originalHandler = events[key];
        if (typeof originalHandler === 'function') {
            finalEvents[key] = (...args) => {
                try {
                    if (position === true) {
                        originalHandler(...extraArgs, ...args);
                    } else {
                        originalHandler(...args, ...extraArgs);
                    }
                } catch (error) {
                    console.error(`Error in event handler for "${key}":`, error);
                }
            };
        } else {
            console.warn(`Event handler for "${key}" is not a function.`);
        }
        return finalEvents;
    }, {});
}