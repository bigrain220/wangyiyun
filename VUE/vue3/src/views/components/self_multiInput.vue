<template>
  <div>
    <div>值：{{data}}</div>
    <br>
    <el-row :span="24">
      <el-col :span="6">
        <arrary-input v-model:val="data" placeholder="请输入内容"></arrary-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { defineAsyncComponent, reactive } from 'vue'
export default {
  components: {
    arraryInput: defineAsyncComponent(() => import("@/components/arraryInput"))
  },
  setup() {
    let data = reactive(['第一条',
      '第二条',
      '第三条',
      '第四条',]);
    return {
      data
    }
  }
}
</script>

<style>
</style>