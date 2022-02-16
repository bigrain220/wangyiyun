<template>
  <div class="main">
    <Header></Header>
    <leftNav></leftNav>
    <router-view></router-view>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  components: {
    Header: defineAsyncComponent(() => import('@/pages/header')),
    leftNav: defineAsyncComponent(() => import('@/pages/leftNav'))
  },
 
}
</script>
<style scoped></style>