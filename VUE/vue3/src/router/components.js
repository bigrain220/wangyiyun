const arr = [{
    path: '/components',
    // component: (resolve) => require(['@/pages/home'], resolve), //会报错：Cannot read properties of undefined (reading 'apply')
    component:()=>import('@/pages/home'),
    children: [
        // {
        //     path: 'index',
        //     name: 'index',
        //     component: () => import('@/views/components/index.vue'),
        // },
        {
            path: 'self_multiInput',
            name: 'self_multiInput',
            component: () => import('@/views/components/self_multiInput.vue'),
        },
        // {
        //     path: 'self_tableInput',
        //     name: 'self_tableInput',
        //     component: () => import('@/views/components/self_tableInput.vue'),
        // },
        // {
        //     path: 'self_upload',
        //     name: 'self_upload',
        //     component: () => import('@/views/components/self_upload.vue'),
        // },
    ]
}, ]
export default arr;