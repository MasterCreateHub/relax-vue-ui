import { debounce } from "lodash";

// 创建一个 WeakMap 来存储 DOM 元素和对应的处理函数
const map = new WeakMap();

// 创建 ResizeObserver 实例
const Observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const handler = map.get(entry.target);
    if (handler) {
      debounce(handler, 100)(entry);
    }
  }
});

export default {
  name: "measure",
  bind(el, binding) {
    // 监听元素尺寸的变化
    map.set(el, binding.value);

    // 执行观察
    Observer.observe(el);
  },

  update(el, binding) {
    // 如果绑定的值发生变化，则更新处理函数
    map.set(el, binding.value);
  },

  unbind(el) {
    // 取消监听
    Observer.unobserve(el);
  },
};
