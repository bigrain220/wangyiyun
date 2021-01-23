<template>
  <div class="self-table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column v-for="(item,index) in tableOption.column" :key="index" :ref="item.prop"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: Array, required: true },
    option: { type: Object, required: true }
  },
  data() {
    return {

    }
  },
  methods: {

  },
  mounted() {
    this.$nextTick(() => {
      this.tableOption.column.map((item) => {
        let ref = this.$refs[item.prop][0];
        for (const key in item) {
          if (Object.hasOwnProperty.call(item, key)) {
            const element = item[key];
            this.$set(ref, key, element);
            // console.log(ref)
          }
        }
      });
    })
  },
  computed: {
    tableData() {
      return this.data;
    },
    tableOption() {
      return this.option;
    }
  }
}
</script>

<style>
</style>