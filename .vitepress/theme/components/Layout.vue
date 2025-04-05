<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const { frontmatter } = useData()
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-before>
      <!-- 或用插槽注入到文档顶部 -->
      <h1 v-if="frontmatter.title">{{ frontmatter.title }}</h1>
    </template>
  </Layout>
</template>
