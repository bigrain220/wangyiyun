<template>
  <div id="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i v-if="!isCollapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="logo">learning center</div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["collapseAction"]),
    // 侧边栏折叠
    collapseChage() {
      this.collapseAction(!this.isCollapse);
    },
  
  },
  computed: {
    ...mapState(["isCollapse"])
  },
  mounted() {
   
  }
};
</script>

<style scoped>
#header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  background: #0173b2;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
#header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}
</style>>