<template>
  <div>
        <div>第二个子组件：{{provideVal}}</div>
  </div>
</template>

<script>
export default {
  inject: ['provideVal'],
  data() {
    return {

    }
  }
}
</script>

<style>
</style>