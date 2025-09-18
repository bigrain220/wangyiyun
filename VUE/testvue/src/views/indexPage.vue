<template>
  <div class="block">
    <el-date-picker ref="datePicker" v-model="value1" type="datetimerange" @focus="focus"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: [],
    };
  },
  methods: {
    focus(){
      setTimeout(() => {
        
        const ref = this.$refs.datePicker;
      console.log("ref",ref.picker._data );
      ref.picker._data.minDate=Date.now()
      ref.picker._data.maxDate=Date.now()
      }, 2000);
    }
  },
  mounted() {
   
  },
};
</script>
<style scoped>
.block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.block:last-child {
  border-right: none;
}
.block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
