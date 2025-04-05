---
title: Nuxt使用Plyr.js视频播放
category: 前端
tags:
  - Nuxt.js
cover: https://images.unsplash.com/photo-1491466424936-e304919aada7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80
---

## 安装依赖

- vue-plyr

```bash
npm i vue-plyr
```

## 1.vue-plyr.js

```js
import Vue from 'vue'
import VuePlyr from 'vue-plyr/dist/vue-plyr.ssr.js'

// The second argument is optional and sets the default config values for every player.
Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: true },
    tooltips: { controls: true, seek: true },
    i18n: {
      restart: '从头开始',
      rewind: 'Rewind {seektime} secs',
      play: '播放',
      pause: '暂停',
      fastForward: 'Forward {seektime} secs',
      seek: '工具栏',
      seekLabel: '{currentTime} of {duration}',
      played: '已播放',
      buffered: '已缓冲',
      currentTime: '当前时间',
      duration: '持续时间',
      volume: '音量',
      mute: '静音',
      unmute: '取消静音',
      enableCaptions: '启用字幕',
      disableCaptions: '禁用字幕',
      download: '下载',
      enterFullscreen: '进入全屏',
      exitFullscreen: '退出全屏',
      frameTitle: 'Player for {title}',
      captions: '字幕',
      settings: '设置',
      speed: '速度',
      normal: '正常',
      quality: '画质',
      loop: '循环',
      start: '开始',
      end: '结束',
      all: '所有',
      reset: '重播',
      disabled: '禁用',
      enabled: '启用',
      pip: '画中画',
      advertisement: '广告',
      qualityBadge: {
        2160: '4K',
        1440: 'HD',
        1080: 'HD',
        720: 'HD',
        576: 'SD',
        480: 'SD',
      },
    }
  },
  emit: ['ended']
})
```

## 2.nuxt.config.js

```js
css: [
  'plyr/dist/plyr.css'
],

plugins: [
  '~/plugins/vue-plyr'
],
```

## 3.video.vue

```html
<template>
  <div class="video-player">
    <vue-plyr v-if="type === 'video' && source === 'youtube'">
      <div class="plyr__video-embed">
        <iframe :src="youtubeURL" allowfullscreen allowtransparency allow="autoplay">
        </iframe>
      </div>
    </vue-plyr>
    <vue-plyr v-if="type === 'video' && source === 'vimeo'">
      <div class="plyr__video-embed">
        <iframe :src="vimeoURL" allowfullscreen allowtransparency allow="autoplay">
        </iframe>
      </div>
    </vue-plyr>
    <vue-plyr v-if="type === 'video' && source === 'web'">
      <video :poster="thumbnail" :src="videoURL" tooltips>
        <source v-for="(url, index) in videoSizeURLS" :key="url" :src="url" :type="videoType" :size="videoSourceSizes[index]">
        <!-- <track kind="captions" label="English" srclang="en" src="captions-en.vtt" default> -->
      </video>
    </vue-plyr>
    <vue-plyr v-if="type === 'audio' && source === 'web'">
      <source v-if="mp3URL" :src="mp3URL" type="audio/mp3" />
      <source v-if="oggURL" :src="oggURL" type="audio/ogg" />
    </vue-plyr>
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-prop-types
    plyr: {
      fullscreen: {
        enabled: true
      }
    },
    // eslint-disable-next-line vue/require-prop-type-constructor
    emit: ['embed'],
    type: {
      type: String,
      default: 'video', // 'audio' or 'video'
      required: false
    },
    source: {
      type: String,
      default: 'web', // 'youtube', 'web', or 'vimeo'
      required: false
    },
    vidId: {
      type: String,
      required: false // GHMjD0Lp5DY
    },
    mp3URL: {
      type: String,
      required: false // https://example.com/audio.mp3
    },
    oggURL: {
      type: String,
      required: false // https://example.com/audio.ogg
    },
    videoURL: {
      type: String,
      required: false // https://example.com/video.mp4
    },
    thumbnail: {
      type: String,
      required: false // poster.png
    },
    videoType: {
      type: String,
      required: false,
      default: 'video/mp4'
    },
    videoSourceSizes: {
      type: Array, // [720, 1080]
      required: false
    },
    videoSizeURLS: {
      type: Array, // [video-720p.mp4, video-1080p.mp4]
      required: false
    },
    videoCaptions: {
      type: Object, // {[name: 'English', lang: 'en', src: 'captions-en.vtt'], [name: 'Spanish', lang: 'es', src: 'captions-es.vtt']}
      required: false
    }
  },
  data() {
    return {

    }
  },
  computed: {
    vimeoURL() {
      return `https://player.vimeo.com/video/${this.vidId}?loop=false&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media`
    },
    youtubeURL() {
      return `https://www.youtube.com/embed/${this.vidId}?iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1`
    },
    // player() {
    //   return this.$refs.plyr.player
    // },
  },

  mounted() {
    // this.player.on('event', () => console.log('event fired'))
  },
  methods: {

  },
  components: {

  },
}
</script>

<style scoped lang='scss'>
</style>
```

## 使用

app.vue

```html
<template>
  <div>
    <!-- <video-player source="youtube" vid-id="GHMjD0Lp5DY" /> -->
    <video-player source="web" videoURL='xxx.mp4' :thumbnail='data.thumbnail' />
  </div>
</template>

<script>
import Video from '../../../components/Video';
export default {
  async asyncData({ app, params, query, store, route, error }) {
    const { data } = await app.$axios.get(`/api/xxx?path=${params.id}`);
    return { data: data };
  },
  data() {
    return {
    }
  },
  mounted() {

  },
  methods: {

  },
  components: {
    'video-player': Video
  },
}
</script>

<style scoped lang='scss'>
</style>
```
