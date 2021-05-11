/**
 * @param left 重置left坐标
 * @param top  重置top坐标
 * @param selector 拖拽容器的选择器名称
 */
// 用法示例：
// 1. 指定元素拖拽 @mousedown="dragEvent(...arguments,{left:500,top:100,selector:'.ship-card'})"
// 2. @mousedown="dragEvent"
export const dragFn = (e, obj = {}) => {
    // console.log(obj)
    let disX = e.layerX;
    let disY = e.layerY;
    let ref = document.querySelector(obj.selector) || e.target;
    const refW = ref.offsetWidth;
    const refH = ref.offsetHeight;
    //阻止文字拖动
    ref.ondragstart = function() {
      return false;
    };
    document.onmousemove = (e) => {
      //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
      let left = e.clientX - disX;
      let top = e.clientY - disY;
      //临界值判断
      if (left < 0) {
        left = 0;
      } else if (left > document.documentElement.clientWidth - refW) {
        left = document.documentElement.clientWidth - refW;
      }
      if (top < 0) {
        top = 0;
      } else if (top > document.documentElement.clientHeight - refH) {
        top = document.documentElement.clientHeight - refH;
      }
      ref.style.top = top + "px";
      ref.style.left = left + "px";
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
    window.onresize = () => {
      ref.style.top = obj.top + "px" || 0;
      ref.style.left = obj.left + "px" || 0;
    };
  };
  