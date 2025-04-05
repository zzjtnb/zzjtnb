<!-- MyCustomComponent.vue -->
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Default Title',
    },
  },
}
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <!-- 其他内容 -->
  </div>
</template>
