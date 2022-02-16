<template>
  <div class="hello">
    <div>{{msg}}</div>
     <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[100, 200, 300, 400]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>

    <div>{{isCollapse}}</div>
    <el-button @click="change">change</el-button>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { ref } from 'vue'
export default{
  props:{
    msg:String
  },
  setup(){
    const store = useStore()

    const currentPage = ref(5)
    const pageSize = ref(100)
    const small = ref(false)
    const background = ref(false)
    const disabled = ref(false)

    const handleSizeChange = (val) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val) => {
      console.log(`current page: ${val}`)
    }
    const isCollapse= computed(() => store.state.isCollapse);
    const change = () => store.commit('setCollapse',!isCollapse.value);
    return {
      isCollapse,
      currentPage,
      pageSize,
      small,
      background,
      disabled,
      change,
      handleSizeChange,
      handleCurrentChange
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
