<template>
  <div>
    <div :style="`position: absolute;left:${left}px;
        top: ${top}px;
        width: 200px;
        height: 200px;
        border:1px solid red;
        z-index:9999;
        background: #666;`" @mousedown="move">测试通用拖拽{{left}}/{{top}}</div>
    <!-- v-drag -->
    <div :style="`position: absolute;
        left: 400px;
        top:  100px;
        width: 200px;
        height: 200px;
        border:1px solid red;
        z-index:9999;
        background: #666;`" v-drag>测试自定义指令拖拽</div>
    <!-- 使用公共函数 -->
    <div :style="`position: absolute;
        left:700px;
        top: 100px;
        width: 200px;
        height: 200px;
        background:#eee;
        z-index:9999;`" class="drag-box">
      <div class="title" style="background-color: #2770d4;">
        <div id="shipinfoTitle">
          <div>
            <div>
              <p style="position:absolute;line-height:40px;"><span>this is title</span></p>
            </div>
          </div>
          <div style="height:40px;cursor:move;" @mousedown="move1(...arguments,{left:700,top:100,selector:'.drag-box'})"></div>
        </div>
      </div>
      <div style="position:relative;height:160px;overflow:hidden;background: #999;">测试指定元素拖拽</div>
    </div>
    <!-- 使用公共函数 -->
    <div :style="`position: absolute;left:1000px;
        top: 100px;
        width: 200px;
        height: 200px;
        background:#ddd;
        z-index:9999;`" @mousedown="moveSimple">测试函数简单拖拽</div>
  </div>
</template>

<script>
import { dragFn } from "@/utils/util"
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
    },
    move1(e, obj) {
      dragFn(e, obj);
    },
    moveSimple(e) {
      dragFn(e);
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

<style lang="scss" scoped>
</style>