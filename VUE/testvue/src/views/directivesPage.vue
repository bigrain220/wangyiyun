<template>
  <div class="directivesPage">
    <div class="item" v-color="'red'">* 通过全局的directives修改文字颜色</div>
    <div class="item">
      * 页面初始化时自动聚焦：<input type="text" v-focus v-model="msg">
    </div>
    <div class="item">
      <span>* 通过判断key是否存在于指定数组中控制渲染与否：</span>
      <el-button type="primary" v-display-key="{ key: '1' }">1</el-button>
      <el-button type="primary" v-display-key="{ key: '11' }">11</el-button>
    </div>
     <div class="item">
        <!-- 如果为direction为height，则显示高，否则显示宽。加上quiet修饰符则首次加载时不触发。(这是传函数的例子)-->
        <div v-resize:[direction].quiet="onResize">* 动态指令参数：window {{direction}} is： {{ length }}</div>
    </div>
    <div class="item">
      <div>* 在图片资源还没加载出来时，先显示默认背景图，当图片资源真正加载出来了之后，再把真实图片放置到对应的位置上并显示出来。</div>
      <div class="img-box">
        <div v-for="(item,index) in imageList" :key="index" class="img-box">
          <img src="../assets/logo.png" alt="默认图" v-image="item.url">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let that;
import '@/directives'
export default {
  name: 'directivesPage',
  components: {

  },
  data() {
    return {
      msg: "",
      imageList: [
        {
          url: "http://consumer-img.huawei.com/content/dam/huawei-cbg-site/greate-china/cn/mkt/homepage/section4/home-s4-p10-plus.jpg"
        },
        {
          url: "http://consumer-img.huawei.com/content/dam/huawei-cbg-site/greate-china/cn/mkt/homepage/section4/home-s4-watch2-pro-banner.jpg"
        },
        {
          url: "http://consumer-img.huawei.com/content/dam/huawei-cbg-site/en/mkt/homepage/section4/home-s4-matebook-x.jpg"
        }
      ],
      direction: "height",
      length: 0
    }
  },
  directives: {
    'focus': {
      // 当被绑定的元素插入到 DOM 中时……
      inserted: function (el) {
        el.focus()
      }
    },
    'display-key': {
      inserted: function (el, binding) {
        console.log(el, binding)
        let displayKey = binding.value;
        if (displayKey) {
          let hs = that.checkArray(displayKey.key);
          if (!hs) {
            el.parentNode && el.parentNode.removeChild(el);
          }
        } else {
          //抛出异常
          throw new Error(`Need Key! can't read the value of v-display-key!`);
        }

      }
    },
    "image": {
      inserted: function (el, binding) {
        //为了真实体现效果，用了延时操作
        setTimeout(function () {
          el.setAttribute("src", binding.value);
        }, Math.random() * 2000)
      }
    }
  },
  methods: {
    checkArray(key) {
      let arr = ['1', '2', '3', 'demo'];
      let index = arr.indexOf(key);
      if (index > -1) {
        return true;
      } else {
        return false;
      }
    },
    onResize(length) {
      this.length = length;
    }
  },
  created() {
    that = this;
  },
}
</script>
<style lang="scss" scoped>
.directivesPage {
  .item {
    margin: 10px 0;
  }
  .img-box {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    .img-box {
      width: 30%;
    }
  }
  img {
    /* 自适应图片 */
    width: 100%;
    height: auto;
  }
}
</style>
