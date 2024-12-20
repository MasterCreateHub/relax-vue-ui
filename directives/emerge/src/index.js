export default {
    name: "emerge",
    bind(el, binding) {
      // 获取回调函数和配置
      const callback = binding.value;
      const config = binding.arg || {};
  
      // 创建新的 IntersectionObserver 实例
      const intersectObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          callback(entry, config);
        }
      }, config);
  
      // 执行观察
      intersectObserver.observe(el);
  
      // 存储观察者实例到元素上
      el._intersectObserver = intersectObserver;
    },
  
    update(el, binding) {
      // 更新回调函数
      const intersectObserver = el._intersectObserver;
      if (intersectObserver) {
        intersectObserver.disconnect();
        intersectObserver.takeRecords();
  
        // 创建新的 IntersectionObserver 实例
        const newObserver = new IntersectionObserver((entries) => {
          for (const entry of entries) {
            binding.value(entry, binding.arg || {});
          }
        }, binding.arg || {});
  
        // 执行观察
        newObserver.observe(el);
  
        // 更新观察者实例
        el._intersectObserver = newObserver;
      }
    },
  
    unbind(el) {
      // 取消监听
      const intersectObserver = el._intersectObserver;
      if (intersectObserver) {
        intersectObserver.unobserve(el);
        intersectObserver.disconnect();
        delete el._intersectObserver;
      }
    }
  };