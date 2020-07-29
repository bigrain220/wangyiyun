import Vue from 'vue'

Vue.directive('color', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, binding) {
    // console.log(el, binding)
    let displayKey = binding.value;
    if (displayKey) {
      el.style.color = displayKey;
    } else {
      throw new Error("need key!can't read the value of v-color!");
    }
  }
})


Vue.directive("resize", {
  inserted(el, binding) {
    console.log(binding)
    const callback = binding.value;
    const direction = binding.arg;
    const modifiers = binding.modifiers;

    const result = () => {
      return direction === "height" ? window.innerHeight : window.innerWidth;
    };
    const onResize = () => callback(result());
    window.addEventListener("resize", onResize);
    if (!modifiers || !modifiers.quiet) {
      onResize();
    }
    el._onResize = onResize;
  },
  unbind(el) {
    if (!el._onResize) return;
    window.removeEventListener("resize", el._onResize);

    delete el._onResize;
  }
});