const MyPlugin = {
    install: function (Vue, options) {
        let arg = {Vue,options}
        console.log(arg)
        // 1. 添加全局方法或 property
        Vue.myGlobalMethod = function () {
            // 逻辑...
        }


        // 3. 注入组件选项
        Vue.mixin({
            created: function () {
                // 逻辑...
            }


        })

        // 4. 添加实例方法
        Vue.prototype.$myMethod = function (methodOptions) {
            // 逻辑...
            console.log(methodOptions)
        }
    }
}

export {
    MyPlugin
};