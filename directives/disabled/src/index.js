export default {
    name: "disabled",
    bind(el, binding) {
      const mask = document.createElement("div");
      mask.className = "read-only-mask";
  
      const defaultOptions = {
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
      };
  
      const options = { ...defaultOptions, ...(binding.value || {}) };
  
      mask.style.position = "absolute";
      mask.style.top = options.top;
      mask.style.left = options.left;
      mask.style.width = options.width;
      mask.style.height = options.height;
      mask.style.background = "rgba(255, 255, 255, 0.5)";
      mask.style.zIndex = 100000;
      mask.style.cursor = "not-allowed";
  
      el.style.position = "relative";
      el.appendChild(mask);
      mask.style.display = options.visible ? "block" : "none";
      el._disabledMask = mask;
    },
    update(el, binding) {
      if (el._disabledMask) {
        const options = { ...el._disabledMask.dataset, ...(binding.value || {}) };
        el._disabledMask.style.display = options.visible ? "block" : "none";
        el._disabledMask.style.top = options.top;
        el._disabledMask.style.left = options.left;
        el._disabledMask.style.width = options.width;
        el._disabledMask.style.height = options.height;
      }
    },
    unbind(el) {
      if (el._disabledMask) {
        el._disabledMask.remove();
        delete el._disabledMask;
      }
    },
  };
  