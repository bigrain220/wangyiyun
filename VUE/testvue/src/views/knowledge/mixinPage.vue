<template>
  <div class="mixinPage">
    <ul>
      <li>全局注册的Vue.mixin,会影响所有创建的Vue实例。</li>
      <li>同名钩子函数将合并为一个数组，混入对象的钩子将在组件自身钩子之前调用</li>
      <li>二者的methods,components和directives,将被合并为同一个对象。若对象键名冲突时,取组件对象的键值对。</li>
      <li>Vue.use()接受一个函数或者 提供install 方法的对象,作为参数</li>
    </ul>

  </div>
</template>

<script>
//引入
import { myMixin } from "@/mixins"
export default {
  name: 'mixinPage',
  //使用
  mixins: [myMixin],
  data() {
    return {

    }
  },
  mounted() {
    this.$myMethod(666);
    console.log(this.message)
  },
}
</script>
<style lang="scss" scoped>
li {
  margin: 4px 0;
}
</style>
