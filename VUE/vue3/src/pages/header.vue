<template>
  <div id="header">
    <div class="collapse-btn" @click="collapseChage">
       <el-icon v-if="!isCollapse">
        <fold />
      </el-icon>
       <el-icon v-else>
        <Expand />
      </el-icon>
    </div>
    <div class="logo">
        VUE3
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex'
export default {
  name: 'Header',
  setup() {
    const store = useStore();
    const isCollapse = computed(() => store.state.isCollapse)
    const collapseChage = () => {
      store.dispatch('collapseAction', !isCollapse.value)
    }
    return {
      isCollapse,
      collapseChage
    }
  }
}
</script>

<style scoped>
#header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  background: #0173b2;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
#header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}
</style>>