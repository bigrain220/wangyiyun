<template>
  <div class="self-arrary">
    <div class="self-arrary-item" v-for="(item,index) in val" :key="index">
      <el-input v-model="val[index]" :size="options.size ||'small'" class="item-input"></el-input>
      <el-button type="primary" icon="el-icon-plus" circle :size="options.size ||'small'" @click="addClick" v-if="index===0"></el-button>
      <el-button type="danger" icon="el-icon-minus" circle :size="options.size ||'small'" @click="delClick(index)" v-if="index!==0"></el-button>
    </div>
  </div>
</template>

<script>
export default {
  model: {//用model字段，而非props
    prop: "val",//定义在子组件中使用val作为父组件通过v-model的变量data的别名
  },
  props: {
    //你仍需要在这里定义，子组件才能使用val变量
    val: {
      type: Array, required: true
    },
    options: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    addClick() {
      this.val.push("");
    },
    delClick(index) {
      this.val.splice(index, 1);
    }
  },
  created() {
    // console.log(this.val)
  },
}
</script>

<style lang="scss" scoped>
.self-arrary {
  .self-arrary-item {
    display: flex;
    margin-bottom: 10px;
    .item-input {
      margin-right: 6px;
    }
  }
}
</style>