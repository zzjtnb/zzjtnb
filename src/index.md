---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  # `text` 上方的字符，带有品牌颜色
  # 预计简短，例如产品名称
  name: "争逐"
  # hero 部分的主要文字，
  # 被定义为 `h1` 标签
  text: "争霸世界，逐鹿全球。"
  # `text` 下方的标语
  tagline: 坚持学习,持续进步.
  # text 和 tagline 区域旁的图片
  image:
    src: images/icons/logo.svg
    alt: VitePress
  # 主页 hero 部分的操作按钮
  actions:
    # 按钮的颜色主题，'brand' | 'alt',默认为 `brand`
    - theme: brand
      # 按钮的标签
      text: 📖 开始阅读
      # 按钮的目标链接
      link: /guide
    - theme: alt
      text: API Examples
      link: /examples/api

features:
  - icon: 📋
    title: DCS World
    details: DCS World 相关文档教程
    link: /博客/DCS World/
    linkText: 开始阅读
  - icon: 📋
    title: markdownlint
    details: markdownlint 相关文档教程
    link: /zh/markdownlint/CustomRules
    linkText: 开始阅读
---
