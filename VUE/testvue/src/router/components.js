const arr = [{
    path: '/components',
    component: resolve => require(['@/pages/home'], resolve),
    children: [{
            path: 'index',
            name: 'index',
            component: () => import('@/views/components/index.vue'),
        },
        {
            path: 'self_multiInput',
            name: 'self_multiInput',
            component: () => import('@/views/components/slef_multiInput.vue'),
        },
        {
            path: 'self_tableInput',
            name: 'self_tableInput',
            component: () => import('@/views/components/slef_tableInput.vue'),
        },
    ]
}, ]
export default arr;