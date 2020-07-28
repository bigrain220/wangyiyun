<template>
  <div>
    <div>there are the slots' content:</div>
    <!-- 不写默认值为name="default" -->
    <slot></slot>
    <!-- slot标签里面可以填写默认值，当匹配不到对应的templete时才显示 -->
    <slot name="content">if parents templete donot have slot which names content,i will appear! </slot>
    <!-- slot传值 -->
    <slot name="getprops" :user="user"></slot>
    <slot name="name"></slot>
    <slot name="one"></slot>
    <slot name="two"></slot>
    <slot name="three"></slot>
  </div>
</template>

<script>
export default {
  name: "slotChild",
  data(){
      return{
          user:{
              firstName:'yuhui',
              lastName:'yang'
          }
      }
  }
}
</script>

<style>
</style>