<template>
  <div class="self-table-input">
    <el-input @focus="focusClick" :placeholder="options.placeholder||'请选择'" v-model="value" clearable></el-input>
    <el-dialog :visible.sync="dialogVisible.table" :title="options.placeholder||'请选择'">
            <el-table>

            </el-table>
    </el-dialog>
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
      type: String, required: true
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
      dialogVisible: {
        table: false
      }
    }
  },
  methods: {
    focusClick() {
      this.dialogVisible.table = true;
    }
  },
  created() {
    console.log(this.val)
  },
  computed:{
      value(){
          return this.val
      }
  }
}
</script>