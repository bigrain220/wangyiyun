<template>
  <div id="sidebar">
    <el-menu class="sidebar-el-menu" router :defaultOpeneds="['one','two']" :default-active="onRoutes" :collapse="isCollapse" background-color="#fff" text-color="#434444" active-text-color="#29e">
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      items: [
        {
          icon: "el-icon-user",
          index: "/admin/index",
          title: "首页"
        },
        {
          icon: "el-icon-document-copy",
          index: "one",
          title: "知识点",
          subs: [
            {
              index: "/knowledge/slotPage",
              title: "插槽slot"
            },
            {
              index: "/knowledge/directivesPage",
              title: "自定义指令"
            },
            {
              index: "/knowledge/mixinPage",
              title: "插件mixin"
            },
          ]
        },
        {
          icon: "el-icon-document-copy",
          index: "two",
          title: "表格相关",
          subs: [
            {
              index: "/tableview/tablePage",
              title: "表格模板"
            },
          ]
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path;
    },
    ...mapState(['isCollapse']),
  },
};
</script>

<style lang="scss" scoped>
#sidebar {
  display: block;
  position: fixed;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  background: #fff;
  font-size: 12px;
}
.sidebar-el-menu {
  border-right: 1px solid #e6e6e6 !important;
  box-sizing: border-box;
  height: 100%;
  width: 180px;
}
.sidebar-el-menu.el-menu--collapse {
  width: 65px;
}
.el-submenu .el-menu-item {
  min-width: 179px;
}
#sidebar .el-menu--inline .el-menu-item {
  padding-left: 56px !important;
}
.el-menu-item.is-active {
  background: #fff !important;
}
</style>
<style>
#sidebar .el-submenu__title,
.el-menu-item,
.el-submenu .el-menu-item {
  height: 40px !important;
  line-height: 40px !important;
  font-size: 14px;
}
.el-submenu.is-active .el-submenu__title > * {
  color: rgb(34, 153, 238) !important;
}
ul.el-menu--popup {
  padding: 0 !important;
}
#sidebar .el-menu-item:hover,
.el-submenu__title:hover,
ul.el-menu--popup li:hover {
  background: #ecf5ff !important;
}
</style>