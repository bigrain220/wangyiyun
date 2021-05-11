<template>
  <div>
    <div :style="`position: absolute;left:${left}px;
        top: ${top}px;
        width: 200px;
        height: 200px;
        border:1px solid red;
        z-index:9999;
        background: #666;`" @mousedown="move">测试拖拽 {{left}}
      {{top}}</div>
    <div :style="`position: absolute;right: 100px;
        top:  100px;
        width: 200px;
        height: 200px;
        border:1px solid red;
        z-index:9999;
        background: #666;`" v-drag>测试拖拽</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      left: 100,
      top: 100,
    }
  },
  methods: {
    move(e) {
      //获取目标元素
      let odiv = e.target;
      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      //鼠标按下并移动的事件
      document.onmousemove = (e) => {
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        //临界值判断
        if (left < 0) {
          left = 0
        } else if (left > document.documentElement.clientWidth - odiv.offsetWidth) {
          left = document.documentElement.clientWidth - odiv.offsetWidth;
        }
        if (top < 0) {
          top = 0
        } else if (top > document.documentElement.clientHeight - odiv.offsetHeight) {
          top = document.documentElement.clientHeight - odiv.offsetHeight;
        }
        this.top = top;
        this.left = left;
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
      window.onresize = () => {
        this.top = 100;
        this.left = 100;
      }
    }
  },
  directives: {
    'drag': {
      inserted: function (el) {
        el.onmousedown = function (e) {
          e.stopPropagation();
          let disx = e.pageX - el.offsetLeft;
          let disy = e.pageY - el.offsetTop;
          document.onmousemove = function (e) {
            e.preventDefault();
            el.style.left = e.pageX - disx + 'px';
            el.style.top = e.pageY - disy + 'px';
          }
          document.onmouseup = function () {
            document.onmousemove = document.onmouseup = null;
          }
        }
      }
    },
  }
}
</script>

<style>
</style>