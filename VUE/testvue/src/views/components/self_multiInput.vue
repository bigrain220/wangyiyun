<template>
  <div>
    <div>值：{{data}}</div>
    <br>
    <el-row :span="24">
      <el-col :span="6">
        <array-input v-model="data" placeholder="请输入内容"></array-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {
    arrayInput: () => import("@/components/arrayInput")
  },
  data() {
    return {
      data: [
        '第一条',
        '第二条',
        '第三条',
        '第四条',
      ]
    }
  },
  methods: {

  }

}
</script>

<style>
</style>