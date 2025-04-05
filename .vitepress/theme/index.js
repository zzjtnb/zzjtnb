import AnotherCustomComponent from '@/components/test/AnotherCustomComponent.vue'
import MyCustomComponent from '@/components/test/MyCustomComponent.vue'
// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import {h} from 'vue'
import Layout from './components/Layout.vue'
// 引入样式
import './assets/styles/fonts.scss'
import './assets/styles/style.css'
import './assets/styles/custom.scss'
// 注意：项目内的样式最好放在重置样式后，uno.css前
import 'virtual:uno.css'
/** @type {import('vitepress').Theme} */
export default {
  // 扩展另一个主题，在我们的主题之前调用它的 `enhanceApp` 钩子
  extends: DefaultTheme,
  // 每个页面的根布局组件
  Layout: () => {
    return h(Layout, null, {
      // https://vitepress.dev/zh/guide/extending-default-theme#layout-slots
      // 'layout-top': () => h(Announcement),
    })
  },
  // 注册全局组建
  enhanceApp({app, router, siteData}) {
    // 注册自定义全局组件
    app.component('MyCustomComponent', MyCustomComponent)
    app.component('AnotherCustomComponent', AnotherCustomComponent)
  },
}
