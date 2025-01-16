const handleMask = (el, binding) => {
  const defaultStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(245,247,250,0.5)",
    zIndex: 100000,
    cursor: "not-allowed",
  };

  let disabled = false;
  let style = {};

  if (typeof binding.value === "boolean") {
    disabled = binding.value;
  } else if (typeof binding.value === "object" && binding.value !== null) {
    disabled = binding.value.disabled || false;
    style = binding.value.style || {};
  } else {
    console.warn(
      `[disabled directive] Binding value should be a boolean or an object with 'disabled' and 'style' properties. Received: ${typeof binding.value}`
    );
    disabled = false;
  }

  const finalStyle = { ...defaultStyle, ...style };
  finalStyle.display = disabled ? "block" : "none";

  Object.keys(finalStyle).forEach((key) => {
    el._disabledMask.style[key] = finalStyle[key];
  });
};
export default {
  name: "disabled",
  bind(el, binding) {
    const mask = document.createElement("div");
    mask.className = "disabled-mask";
    el.style.position = "relative";
    el.appendChild(mask);
    el._disabledMask = mask;
    handleMask(el, binding);
  },
  update(el, binding) {
    if (el._disabledMask) {
      handleMask(el, binding);
    }
  },
  unbind(el) {
    if (el._disabledMask) {
      el._disabledMask.remove();
      delete el._disabledMask;
    }
  },
};
