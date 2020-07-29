import Vue from 'vue'
import VueRouter from 'vue-router'


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
    }]
  },
  {
    path: '/learning',
    component: resolve => require(['@/pages/home'], resolve),
    children: [{
        path: 'slotPage',
        name: 'slotPage',
        component: () => import('@/views/slotPage.vue')
      },
      {
        path: 'directivesPage',
        name: 'directivesPage',
        component: () => import('@/views/directivesPage.vue')
      },
    ]
  }
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