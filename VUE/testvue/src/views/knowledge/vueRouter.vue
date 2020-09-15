<template>
  <div class="vue-router-page">
    <el-card class="label-card card">
      <h3 class="card-title">完整的导航解析流程</h3>
      <ol class="li-box">
        <li>导航被触发。</li>
        <li>在失活的组件里调用 <code>beforeRouteLeave</code> 守卫。</li>
        <li>调用全局的 <code>beforeEach</code> 守卫。</li>
        <li>在重用的组件里调用 <code>beforeRouteUpdate</code> 守卫 (2.2+)。</li>
        <li>在路由配置里调用 <code>beforeEnter</code>。</li>
        <li>解析异步路由组件。</li>
        <li>在被激活的组件里调用 <code>beforeRouteEnter</code>。</li>
        <li>调用全局的 <code>beforeResolve</code> 守卫 (2.5+)。</li>
        <li>导航被确认。</li>
        <li>调用全局的 <code>afterEach</code> 钩子。</li>
        <li>触发 DOM 更新。</li>
        <li>调用 <code>beforeRouteEnter</code> 守卫中传给 <code>next</code> 的回调函数，创建好的组件实例会作为回调函数的参数传入。</li>
      </ol>
    </el-card>
    <el-card class="content-card card">
      <h3 class="card-title">在vue中使用路由：</h3>
      <h5>将组件 (components) 映射到路由 (routes)，然后告诉 Vue Router 在哪里渲染它们</h5>
      <br />
      <div>在router的js文件中把组件映射到路由，然后在main.js中引入，并且挂载到new Vue里面</div>
    </el-card>
    <el-card class="using-card card">
      <h3 class="card-title">路由跳转的方式：</h3>
      <ol class="li-box">
        <li> router-link</li>
        <li> this.$router.push() </li>
        <li> this.$router.replace() </li>
        <li>this.$router.go(n) </li>
      </ol>
    </el-card>
  </div>
</template>

<script>

export default {
  name: "vueRouter",
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
.vue-router-page {
  .card {
    margin-top: 20px;
    font-size: 14px;
    li {
      line-height: 24px;
    }
    .li-box{
         padding-left: 20px; 
    }
    .card-title{
         margin-bottom: 20px;
    }
  }
  .card:nth-child(1) {
    margin-top: 0;
  }
}
</style>