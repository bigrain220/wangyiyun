<template>
  <div>
    <div>值：{{data}}</div>
    <br>
    <el-row :span="24">
      <el-col :span="6">
        <arrary-input v-model="data" placeholder="请输入内容"></arrary-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {
    arraryInput: () => import("@/components/arraryInput")
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