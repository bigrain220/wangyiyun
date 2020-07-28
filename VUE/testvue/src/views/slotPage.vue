<template>
  <div>
    <div>i am the parents' component content!</div>
    <slot-child>
      <!-- default时可省略不写，不写默认值为 v-slot:default -->
      <template>
        <div>i am the child default</div>
      </template>
      <!-- 如果备注下面的tempele或者备注template下面的内容，会显示slotChild设置的默认值 -->
      <template slot="content">
        <!-- 111 -->
      </template>
      <!-- slot传值 -->
      <template v-slot:getprops="slotProps">
        <div>{{slotProps.user.lastName}}</div>
      </template>
      <!-- 结构赋值 多个同名slot时(比如这里两个getprops),只有最后一个有效果-->
      <template v-slot:getprops="{user}">
        <div>{{user.firstName}}</div>
      </template>
      <!-- 具名插槽的缩写 用#替代 v-slot: #后面必须要有值,default也要写成#default-->
      <template #name>
        <div>i am the child name</div>
      </template>
      <!-- 老版本写法 -->
      <template slot="one">
        <div>i am the child one</div>
      </template>
      <!-- 以下为最新slot写法 -->
      <template v-slot:two>
        <div>i am the child two</div>
      </template>
      <template v-slot:three>
        <div>i am the child three</div>
      </template>
    </slot-child>
  </div>
</template>

<script>
export default {
  name: 'slotPage',
  components: { slotChild: () => import('@/components/slotChild') }
}
</script>

<style>
</style>