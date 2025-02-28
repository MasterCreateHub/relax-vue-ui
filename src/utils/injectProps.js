/**
 * @description props注入指定属性
 * @param {Object} options - 包含原始props对象、覆盖标志和深拷贝标志的对象
 * @param {Object} options.props - 原始props对象
 * @param {Boolean} [options.override=true] - 是否覆盖
 * @param {Object|Array<Object>} keyValuePairs - 包含键值对的对象或对象数组
 * @returns {Object} 新的props对象
 */

export function injectProps({ props, override = true }, keyValuePairs) {
    if (!props || typeof props !== 'object') {
        console.warn('Invalid props object provided.');
        return {};
    }

    let newProps = { ...props };

    const inject = (target, { key, value }) => {
        if (!(key && value)) {
            console.warn('Invalid key-value pair provided. Both key and value must be defined.');
            return;
        }
        if (typeof key !== 'string') {
            console.warn('Invalid key provided. Key must be a string.');
            return target;
        }
        if (override) {
            target[key] = value;
        }else{
            !(key in target) && (target[key] = value);
        }

        return target;
    };

    const handleKeyValuePairs = (pairs) => {
        if (typeof pairs === 'object') {
            inject(newProps, pairs);
            return;
        }
        if (Array.isArray(pairs)) {
            pairs.forEach((pair) => {
                inject(newProps, pair);
            });
            return
        }
        return console.warn('Invalid keyValuePairs provided. Must be an array or object.');
    };

    handleKeyValuePairs(keyValuePairs);

    return newProps;
}