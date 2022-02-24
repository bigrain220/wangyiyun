<template>
  <slot></slot>
  <slot name="one"></slot>
  <slot name="two"></slot>
  <slot name="three" :user="user"></slot>
</template>

<script>
import { reactive, toRefs } from "vue"

export default {
  setup() {
    const state = reactive({
      user: {
        firstName: 'yuhui',
        lastName: 'yang'
      }
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style>
</style>