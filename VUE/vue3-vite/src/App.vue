<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <span>4545</span>
      <input type="text" v-model="original.count">
      <input type="text" v-model="copy.count">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
<script setup>
import { reactive, readonly, watchEffect } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

const original = reactive({ count: 0 })
const copy = readonly(original)

watchEffect(() => {
  // 用来做响应性追踪
  console.log(copy.count)
})

</script>


<style scoped lang="scss">

</style>
