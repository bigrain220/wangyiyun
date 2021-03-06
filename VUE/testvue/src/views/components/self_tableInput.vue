<template>
  <div>
    <div>值：{{data}}</div>
    <br>
    <el-row :span="24">
      <el-col :span="6">
        <table-input v-model="data"></table-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {
    tableInput: () => import("@/components/tableInput")
  },
  data() {
    return {
      data:'张三'
    }
  },
  methods: {

  }

}
</script>

<style>
</style>