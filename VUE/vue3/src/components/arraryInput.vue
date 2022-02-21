<template>
  <div class="self-arrary">
    <div class="self-arrary-item" v-for="(item,index) in val" :key="index">
      <el-input v-model="val[index]" :size="options.size ||'small'" class="item-input"></el-input>
      <el-button type="primary" icon="Plus" circle :size="options.size ||'small'" @click="addClick" v-if="index===0"></el-button>
      <el-button type="danger" icon="SemiSelect" circle :size="options.size ||'small'" @click="delClick(index)" v-if="index!==0"></el-button>
    </div>
  </div>
</template>

<script>
import { toRefs } from 'vue'
export default {
  props: {
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
  setup(props) {
    let { val } = toRefs(props);
    const addClick = () => { val.value.push("") }
    const delClick = (index) => { val.value.splice(index, 1) }
    return {
      addClick,
      delClick
    }
  }
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