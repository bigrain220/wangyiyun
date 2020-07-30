import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {MyPlugin} from "@/mixins/notify"

Vue.config.productionTip = false;
// 通过全局方法 Vue.use() 使用插件。它需要在你调用 new Vue() 启动应用之前完成：
Vue.use(ElementUI);
Vue.use(MyPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
