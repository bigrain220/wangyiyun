<template>
  <div id="sidebar">
    <el-menu class="sidebar-el-menu" router :collapse="isCollapse" background-color="#fff" text-color="#434444" active-text-color="#29e">
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-sub-menu :index="item.index" :key="item.index">
            <template #title>
              <!-- <i :class="item.icon"></i> -->
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-sub-menu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template #title>{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">{{ threeItem.title }}</el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :index="subItem.index" :key="subItem['index']">{{ subItem.title }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>



<script>
// el-submenu改成了el-sub-menu
import { computed, reactive } from "vue"
import { useStore } from 'vuex'

export default {
  setup() {
    const items = reactive(
      [
        {
          icon: "aim",
          index: "/admin/index",
          title: "首页"
        },
        {
          icon: "Refrigerator",
          index: "one",
          title: "知识点",
          subs: [
            {
              index: "/knowledge/slotPage",
              title: "slot插槽"
            },
            {
              index: "/knowledge/directivesPage",
              title: "directives指令"
            },
            {
              index: "/knowledge/mixinPage",
              title: "mixin插件"
            },
            {
              index: "/knowledge/filterPage",
              title: "filter过滤器"
            },
            {
              index: "/knowledge/vueRouter",
              title: "vue路由"
            },
          ]
        },
        {
          icon: "ScaleToOriginal",
          index: "two",
          title: "表格相关",
          subs: [
            {
              index: "/tableview/tablePage",
              title: "表格操作模板"
            },
            {
              index: "/tableview/tableTempete",
              title: "表格模板"
            },
          ]
        },
        {
          icon: "Grid",
          index: "three",
          title: "组件相关",
          subs: [
            {
              index: "/components/index",
              title: "组件传值"
            },
            {
              index: "/components/self_multiInput",
              title: "input多选"
            },
            {
              index: "/components/self_tableInput",
              title: "表格选择器"
            },
            {
              index: "/components/self_upload",
              title: "上传组件"
            },
            {
              index: "/drag",
              title: "拖拽组件"
            },
          ]
        }
      ]
    )
    const store = useStore();
    const isCollapse = computed(() => store.state.isCollapse);
    return {
      items,
      isCollapse,
    }
  }
}
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
/* 解决默认min-width的样式 */
.el-sub-menu .el-menu-item{
  min-width: 0 !important;;
}
</style>