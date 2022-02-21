<template>
  <div class="main">
    <Header></Header>
    <leftNav></leftNav>
    <div class="content" :class="{'content-collapse':isCollapse}">
      <div class="content-box">
        <!-- <transition name="move" mode="out-in">
          <router-view ></router-view>
        </transition> -->
        <router-view v-slot="{ Component }">
          <transition>
            <component :is="Component" />
          </transition>
        </router-view>
        <el-backtop target=".content-box"></el-backtop>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent, computed } from 'vue'
import { useStore } from 'vuex'
export default {
  components: {
    Header: defineAsyncComponent(() => import('@/pages/header')),
    leftNav: defineAsyncComponent(() => import('@/pages/leftNav'))
  },
  setup() {
    let store = useStore();
    const isCollapse = computed(() => store.state.isCollapse);
    return {
      isCollapse
    }
  }


}
</script>
<style scoped>
.main {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.content {
  position: absolute;
  left: 180px;
  right: 0;
  top: 70px;
  bottom: 0;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
}

.content-box {
  width: auto;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  box-sizing: border-box;
}

.content-collapse {
  left: 65px;
}
</style>