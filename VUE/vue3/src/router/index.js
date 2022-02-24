import { createRouter, createWebHashHistory } from "vue-router";
import componentsArr from "./components.js";
const routes = [
  {
    path: "/",
    redirect: "/admin/index",
  },
  {
    path: "/admin",
    component: () => import("@/pages/home.vue"),
    children: [
      {
        path: "index",
        name: "indexPage",
        component: () => import("@/views/indexPage.vue"),
      },
    ],
  },
    {
      path: '/knowledge',
      component: () => import('@/pages/home'),
      children: [{
          path: 'slotPage',
          name: 'slotPage',
          component: () => import('@/views/knowledge/slotPage.vue')
        },
        // {
        //   path: 'directivesPage',
        //   name: 'directivesPage',
        //   component: () => import('@/views/knowledge/directivesPage.vue')
        // },
        // {
        //   path: 'mixinPage',
        //   name: 'mixinPage',
        //   component: () => import('@/views/knowledge/mixinPage.vue')
        // },
        // {
        //   path: 'filterPage',
        //   name: 'filterPage',
        //   component: () => import('@/views/knowledge/filterPage.vue')
        // },
        // {
        //   path: 'vueRouter',
        //   name: 'vueRouter',
        //   component: () => import('@/views/knowledge/vueRouter.vue')
        // },
      ]
    },
  // {
  //   path: "/tableview",
  //   component: () => import("@/pages/home"),
  //   children: [
  //     {
  //       path: "tablePage",
  //       name: "tablePage",
  //       component: () => import("@/views/tableview/tablePage.vue"),
  //     },
  //     // {
  //     //   path: "tableTempete",
  //     //   name: "tableTempete",
  //     //   component: () => import("@/views/tableview/tableTempete.vue"),
  //     // },
  //   ],
  // },
  ...componentsArr,
  {
    path: "/test",
    component: () => import("@/views/test.vue"),
  },
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes,
});

export default router;
