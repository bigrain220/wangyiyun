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
      <h3 class="card-title">路由跳转的方式： <span style="font-size:12px;">(query和path一起用，查询参数会拼接在url上。params和name一起用，不会拼接在url上。有path会忽略params)</span></h3>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="router-link" name="1">
          <router-link to="./directivesPage">不带参数跳转</router-link>&nbsp;&nbsp;&nbsp;&nbsp;
          <router-link :to="{name:'directivesPage',params:{userId:666}}">携带params参数跳转</router-link>&nbsp;&nbsp;&nbsp;&nbsp;
          <router-link :to="{path:'./directivesPage',query:{userId:666}}">携带query参数跳转</router-link>
        </el-collapse-item>
        <el-collapse-item title="this.$router.push()" name="2">
          <el-row>
            不传参数：
            <el-button type="text" @click="pushClick('one')">push+'路径'</el-button>
            <el-button type="text" @click="pushClick('two')">push+'name'</el-button>
            <el-button type="text" @click="pushClick('three')">push+路径对象</el-button>
          </el-row>
          <el-row>
            传参数：
            <el-button type="text" @click="pushClick('four')">携带params参数跳转</el-button>
            <el-button type="text" @click="pushClick('five')">携带query参数跳转</el-button>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="router-replace" name="3">
          <el-button type="text" @click="pushClick('six')">repalce跳转,浏览器点击返回时不是返回到当前页，而是当前页的上一个浏览页面</el-button>
        </el-collapse-item>
        <el-collapse-item title="router-go" name="4">
          <el-button type="text" @click="pushClick('seven')">go跳转</el-button>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <el-card class="fn-card card">
      <h3 class="card-title">编程式的导航：<el-link href="https://router.vuejs.org/zh/guide/essentials/navigation.html" target="_blank">(查看官网文档)</el-link>
      </h3>
      <ol class="li-box">
        <el-row :gutter="40">
          <el-col :lg="12" :span="24">
            <li>
              <h4>push</h4>
              <img src="../../assets/images/router_push.png" alt="" style="width:100%;height:auto;">
            </li>
          </el-col>
          <el-col :lg="12" :span="24">
            <li>
              <h4>replace</h4>
              <img src="../../assets/images/router_replace.jpg" alt="" style="width:100%;height:auto;">
            </li>
          </el-col>
          <el-col :lg="12" :span="24">
            <li>
              <h4>go</h4>
              <img src="../../assets/images/router_go.jpg" alt="" style="width:100%;height:auto;">
            </li>
          </el-col>
        </el-row>
      </ol>
    </el-card>
    <el-card class="query-card card">
      <h3 class="card-title">路由传参：</h3>
      <ol class="li-box">
        <ol>
          <el-row>
            <el-col :span="20">
              <li>
                <h4>声明式的导航</h4>
                <img src="../../assets/images/router_link_query.jpg" alt="" style="width:100%;height:auto;">
              </li>
            </el-col>
            <el-col :span="20">
              <li>
                <h4>编程式的导航</h4>
                <img src="../../assets/images/router_name_query.jpg" alt="" style="width:100%;height:auto;margin:30px 0;">
                <img src="../../assets/images/router_path_query.jpg" alt="" style="width:100%;height:auto;">
              </li>
            </el-col>
          </el-row>
        </ol>
      </ol>
    </el-card>

  </div>
</template>

<script>
export default {
  name: "vueRouter",
  data() {
    return {
      activeNames: []
    }
  },
  methods: {
    pushClick(params) {
      var _this = this;
      let obj = {
        one() {
          _this.$router.push('/knowledge/directivesPage');
        },
        two() {
          _this.$router.push('directivesPage');
        },
        three() {
          _this.$router.push({ path: 'home' });
        },
        four() {
          _this.$router.push({ name: 'directivesPage', params: { userId: 666 } });
        },
        five() {
          _this.$router.push({ path: './directivesPage', query: { userId: 666 } });
        },
        six() {
          _this.$router.replace({ path: './directivesPage' });
        },
        seven() {
          _this.$router.go(-1);
        }
      };
      obj[params]();
    }
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
    .li-box {
      padding-left: 20px;
    }
    .card-title {
      margin-bottom: 20px;
    }
  }
  .card:nth-child(1) {
    margin-top: 0;
  }
}
</style>