---
title: 用Vue.js和Tailwind CSS构建一个确认框
category: 前端
tags:
  - Vue
cover: https://images.unsplash.com/photo-1511836536898-6d6f1b8f6948?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80
---

modal.vue

```html
<template>
  <div v-if="showing" class="fixed inset-0 w-full h-screen flex items-center justify-center bg-semi-75">
    <div class="relative w-full max-w-2xl  bg-gray-800 shadow-lg rounded-lg p-8">
      <button aria-label="close" class="absolute top-0 right-0 text-xl text-gray-500 my-2 mx-4" @click.prevent="close">×</button>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showing: {
      required: true,
      type: Boolean
    }
  },
  watch: {
    showing(value) {
      if (value) {
        return document.querySelector('body').classList.add('overflow-hidden');
      }

      document.querySelector('body').classList.remove('overflow-hidden');
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>
```

app.js

```html
<template>
  <card-modal :showing="exampleModalShowing" @close="exampleModalShowing = false">
    <h2>Example modal</h2>
    <p>This is example text passed through to the modal via a slot.</p>
    <section class="flex flex-col justify-center bg-gray-300 h-64 w-full">
      <div class="flex flex-row w-full justify-center border">
        <div class="self-center p-1">
          <button class="px-4 py-2 bg-indigo-200 border border-b-4 border-r-2 border-indigo-400 rounded-sm text-gray-800 font-semibold text-sm uppercase">确认</button>
        </div>
        <div class="self-center p-1">
          <button class="px-4 py-2 bg-red-200 border border-b-4 border-r-2 border-red-400 rounded-sm text-gray-800 font-semibold text-sm uppercase">取消</button>
        </div>
      </div>
    </section>
  </card-modal>
</template>

<script>

import modal from '../../components/modal.vue';
export default {
  data() {
    return {
      exampleModalShowing: false,
    }
  },

  components: {
    'card-modal': modal
  },

}
</script>

<style scoped>
</style>

```
