<template>
  <div id="header">
    <div class="collapse-btn" @click="collapseChage">
      <i v-if="!isCollapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="logo">learning center</div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex'
export default {
    name:'Header',
    setup(){
        const store = useStore();
        const isCollapse = computed(()=>store.state.isCollapse)
        const collapseChage=()=>{
            store.dispatch('collapseAction',!isCollapse.value)
        }
        return {
            isCollapse,
            collapseChage
        }
    }
}
</script>

<style>
</style>