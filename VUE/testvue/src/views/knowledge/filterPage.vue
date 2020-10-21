<template>
  <div>
    <el-card class="filter-page-card">
      <h3>Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：双花括号插值和 v-bind 表达式 (后者从 2.1.0+ 开始支持)。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示：</h3>
      <br />
      <ul>
        <li v-text="'在双花括号中使用 {{ message | capitalize }}'">
        </li>
        <li v-text="'在 `v-bind` 中使用  v-bind:id=\'rawId | formatId\''">
        </li>
      </ul>
      <div class="list">
        <span>1.字母变成大写(局部过滤器)： &nbsp;&nbsp;</span>
        <div style="width:20%;">
          <el-input v-model="nameScope" size="small"></el-input>
        </div>
        <span> {{nameScope|capitalize}}</span>
      </div>
      <div class="list">
        <span>2.字母变成大写(全局过滤器)：&nbsp;&nbsp;</span>
        <div style="width:20%;">
          <el-input v-model="nameGlobal" size="small"></el-input>
        </div>
        <span> {{nameGlobal|capitalizeGlobal}}</span>
      </div>
      <div class="list">
        <span>2.字母变成大写+加横杆(过滤器串联)：&nbsp;&nbsp;</span>
        <div style="width:20%;">
          <el-input v-model="nameMult" size="small"></el-input>
        </div>
        <span>{{ nameMult | capitalize | addStr }}</span>
      </div>
      <div class="list">
        <span>2.加横杆(过滤器传参数)：&nbsp;&nbsp;</span>
        <div style="width:20%;">
          <el-input v-model="nameMultparams" size="small"></el-input>
        </div>
        <span> {{nameMultparams|addParams('+')}}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nameScope: "",
      nameGlobal: "",
      nameMult: "",
      nameMultparams: ""
    }
  },
  methods: {

  },
  mounted() {

  },
  //本地过滤器
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.toUpperCase();
    },
    addStr: function (value) {
      if (!value) return ''
      return value.split('').join('-');
    },
    addParams: function (value, a) {
      if (!value) return ''
      return value.split('').join(a);
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-page-card {
  .list {
    display: flex;
    margin-top: 20px;
  }
}
</style>