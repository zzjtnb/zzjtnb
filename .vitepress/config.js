import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vitepress'
import { Generator } from './plugins/auto'

// import {nav, sidebar} from './plugins/nav'

export default async () => {
  // 项目根目录
  const root = process.cwd()
  // 获取当前模式  'development' 或 'production'
  const mode = process.env.NODE_ENV || 'development'
  // console.log('🚀 ~ Current mode:', mode)

  const generator = await Generator({
    srcDir: 'src',
    exclude: ['components', 'public'],
    debug: false,
  })
  // fs.writeFileSync('test/json/vitepress.json', JSON.stringify({nav: generator.nav, sidebar: generator.sidebar}, null, 2))
  // fs.writeFileSync('test/json/tree.json', JSON.stringify(generator?.fileTree || {}, null, 2))

  return defineConfig({
    base: '/', // 部署站点的基础路径 默认为 '/'
    srcDir: 'src', // 指定源码目录，默认为项目根目录
    outDir: 'dist', // 构建输出目录 默认为 '.vitepress/dist'
    cacheDir: '.cache', // 缓存目录 默认为 '.vitepress/cache'
    // lang: 'zh-Hans-CN',
    title: '争逐',
    description: '争霸世界，逐鹿全球。',
    titleTemplate: ':title -争逐',
    cleanUrls: true,
    lastUpdated: true,
    ignoreDeadLinks: true, // 忽略死链接检查
    locales: {
      root: { label: '简体中文', lang: 'zh-Hans-CN' },
    },

    markdown: {
      // https://shiki.tmrs.site/themes
      // theme: { light: 'github-light', dark: 'github-dark' },
      theme: { light: 'github-light', dark: 'slack-dark' },
      lineNumbers: true,
      image: {
        // 默认禁用图片懒加载
        lazyLoading: true,
      },
    },

    vite: {
      resolve: {
        alias: {
          '/': root,
          '@': fileURLToPath(new URL('../src', import.meta.url)),
          'components': path.resolve(root, 'src/components'), // 其他自定义别名
        },
      },
      server: {
        host: '0.0.0.0', // 监听所有公共ip
        port: 3000, // 端口号
        cors: true, // 允许跨域
        hmr: true, // 配置 HMR 连接
        // https: true, // 是否开启 https
        proxy: {},
      },
      plugins: [UnoCSS()],
      // 配置esbuild
      esbuild: {
        // esbuild生产环境移除console和debugger
        drop: mode === 'production' ? ['console', 'debugger'] : [],
      },
    },
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      // siteTitle: false,
      // logo: 'images/icons/logo.svg',
      nav: generator.nav,
      sidebar: generator.sidebar,
      socialLinks: [{ icon: 'github', link: 'https://github.com/zzjtnb' }],
      search: {
        provider: 'local',
        options: {
          translations: {
            button: {
              buttonText: '搜索',
              buttonAriaLabel: '搜索',
            },
            modal: {
              displayDetails: '显示详细列表',
              resetButtonTitle: '重置搜索',
              backButtonTitle: '关闭搜索',
              noResultsText: '没有结果',
              footer: {
                selectText: '选择',
                selectKeyAriaLabel: '输入',
                navigateText: '导航',
                navigateUpKeyAriaLabel: '上箭头',
                navigateDownKeyAriaLabel: '下箭头',
                closeText: '关闭',
                closeKeyAriaLabel: 'esc',
              },
            },
          },
        },
      },
      docFooter: {
        prev: '上一页',
        next: '下一页',
      },

      outline: {
        label: '页面导航',
      },
      lastUpdated: {
        text: '最后更新于',
        formatOptions: {
          dateStyle: 'short',
          timeStyle: 'medium',
        },
      },
      langMenuLabel: '多语言',
      returnToTopLabel: '回到顶部',
      sidebarMenuLabel: '菜单',
      darkModeSwitchLabel: '主题',
      lightModeSwitchTitle: '切换到浅色模式',
      darkModeSwitchTitle: '切换到深色模式',
      skipToContentLabel: '跳转到内容',
    },
    head: [
      ['link', { rel: 'icon', href: '/images/icons/logo.svg ', type: 'image/svg+xml' }],
      // 设置字符编码
      ['meta', { charset: 'utf-8' }],

      // 设置作者
      ['meta', { name: 'Author', content: '争逐' }],

      // 设置关键词
      ['meta', { name: 'keywords', content: '争逐,编程,博客,政治,经济,军事,历史,天文,地理,人文,哲学' }],

      // 设置版权信息
      ['meta', { name: 'Copyright', content: '争逐版权所有' }],

      // 设置搜索引擎爬虫规则
      ['meta', { name: 'robots', content: 'all' }],

      // 启用移动端 Web App 模式
      ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
      ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],

      // 设置应用名称
      ['meta', { name: 'application-name', content: '争逐' }],
      ['meta', { name: 'apple-mobile-web-app-title', content: '争逐' }],

      // 设置主题颜色
      ['meta', { name: 'theme-color', content: '#2d3748' }],
      ['meta', { name: 'msapplication-navbutton-color', content: '#2d3748' }],

      // 设置 iOS 状态栏样式
      ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],

      // 设置启动 URL
      ['meta', { name: 'msapplication-starturl', content: '/' }],

      // 设置视口
      ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' }],
    ],
  })
}
