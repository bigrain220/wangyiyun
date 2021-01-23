import Vue from 'vue'
import VueRouter from 'vue-router'
import componentsArr from "./components.js"

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/admin/index',
  },
  {
    path: '/admin',
    component: resolve => require(['@/pages/home'], resolve),
    children: [{
      path: 'index',
      name: 'indexPage',
      component: () => import('@/views/indexPage.vue'),
    }, ]
  },
  {
    path: '/knowledge',
    component: resolve => require(['@/pages/home'], resolve),
    children: [{
        path: 'slotPage',
        name: 'slotPage',
        component: () => import('@/views/knowledge/slotPage.vue')
      },
      {
        path: 'directivesPage',
        name: 'directivesPage',
        component: () => import('@/views/knowledge/directivesPage.vue')
      },
      {
        path: 'mixinPage',
        name: 'mixinPage',
        component: () => import('@/views/knowledge/mixinPage.vue')
      },
      {
        path: 'filterPage',
        name: 'filterPage',
        component: () => import('@/views/knowledge/filterPage.vue')
      },
      {
        path: 'vueRouter',
        name: 'vueRouter',
        component: () => import('@/views/knowledge/vueRouter.vue')
      },
    ]
  },
  {
    path: '/tableview',
    component: resolve => require(['@/pages/home'], resolve),
    children: [
      {
      path: 'tablePage',
      name: 'tablePage',
      component: () => import('@/views/tableview/tablePage.vue'),
    },
    {
      path: 'tableTempete',
      name: 'tableTempete',
      component: () => import('@/views/tableview/tableTempete.vue'),
    }
  ]
  },
  ...componentsArr
]
//解决重复点击路由报警告的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})

export default router