const handleMask = (el, binding) => {
  const defaultStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "transparent",
    zIndex: 100000,
    cursor: "unset",
  };

  let readonly = false;
  let style = {};

  if (typeof binding.value === "boolean") {
    readonly = binding.value;
  } else if (typeof binding.value === "object" && binding.value !== null) {
    readonly = binding.value.readonly || false;
    style = binding.value.style || {};
  } else {
    console.warn(
      `[readonly directive] Binding value should be a boolean or an object with 'readonly' and 'style' properties. Received: ${typeof binding.value}`
    );
    readonly = false;
  }

  const finalStyle = { ...defaultStyle, ...style };
  finalStyle.display = readonly ? "block" : "none";

  Object.keys(finalStyle).forEach((key) => {
    el._readonlyMask.style[key] = finalStyle[key];
  });
};
export default {
  name: "readonly",
  bind(el, binding) {
    const mask = document.createElement("div");
    mask.className = "readonly-mask";
    el.style.position = "relative";
    el.appendChild(mask);
    el._readonlyMask = mask;
    handleMask(el, binding);
  },
  update(el, binding) {
    if (el._readonlyMask) {
      handleMask(el, binding);
    }
  },
  unbind(el) {
    if (el._readonlyMask) {
      el._readonlyMask.remove();
      delete el._readonlyMask;
    }
  },
};
