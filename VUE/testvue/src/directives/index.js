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

Vue.directive("drag", {
  bind: function (el) {
      let odiv = el;   //获取当前元素
      odiv.onmousedown = (e) => {
          //算出鼠标相对元素的位置
          let disX = e.clientX - odiv.offsetLeft;
          let disY = e.clientY - odiv.offsetTop;
          document.onmousemove = (e)=>{
              //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
              let left = e.clientX - disX;    
              let top = e.clientY - disY;
              //绑定元素位置到positionX和positionY上面
              this.positionX = top;
              this.positionY = left;
              //移动当前元素
              odiv.style.left = left + 'px';
              odiv.style.top = top + 'px';
          };
          document.onmouseup = () => {
              document.onmousemove = null;
              document.onmouseup = null;
          };
      };
  }
})