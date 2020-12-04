const arr = [{
    path: '/components',
    component: resolve => require(['@/pages/home'], resolve),
    children: [{
        path: 'index',
        name: 'index',
        component: () => import('@/views/components/index.vue'),
    }, ]
}, ]
export default arr;