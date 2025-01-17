import { debounce } from "lodash";

// 创建一个 WeakMap 来存储 DOM 元素和对应的处理函数
const map = new WeakMap();

// 创建 ResizeObserver 实例
const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const { handler, delay } = map.get(entry.target);
    if (handler) {
      debounce(handler, delay)(entry);
    }
  }
});

// 处理绑定值
const handleBinding = (value) => {
  if (typeof value === "function") {
    return {
      handler: value,
      delay: 100,
    };
  } else if (typeof value === "object" && value !== null) {
    return {
      handler: value.handler || (() => {}),
      delay: value.delay || 100,
    };
  } else {
    console.warn(
      `[measure directive] Binding value should be a function or an object with 'handler' property and 'delay' property. Received: ${typeof value}`
    );
  }
  return {
    handler: () => {},
    delay: 100,
  };
};

export default {
  name: "measure",
  bind(el, binding) {
    // 监听元素尺寸的变化
    map.set(el, handleBinding(binding.value));

    // 执行观察
    resizeObserver.observe(el);
  },

  update(el, binding) {
    // 如果绑定的值发生变化，则更新处理函数
    map.set(el, handleBinding(binding.value));
  },

  unbind(el) {
    // 取消监听
    resizeObserver.unobserve(el);
  },
};
