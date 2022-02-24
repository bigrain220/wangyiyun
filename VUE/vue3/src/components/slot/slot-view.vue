<template>
  <!-- slot标签里面可以填写默认值，当匹配不到对应的templete时才显示 -->
  <slot name="view">
    <div>没有匹配到对应的slot-name,我是view组件子内容</div>
  </slot>
</template>

<script>
export default {

}
</script>

<style>
</style>