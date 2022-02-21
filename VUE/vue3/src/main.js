import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from "@/router/index"
import store from "@/store/index"
import * as ElementIcons from '@element-plus/icons'
const app =createApp(App);
// 将 element-plus 的图标库注册到全局
Object.keys(ElementIcons).forEach(key => {
  app.component(key, ElementIcons[key])
})


app.use(router).use(store).use(ElementPlus,{
    locale: zhCn,
  }).mount('#app')
