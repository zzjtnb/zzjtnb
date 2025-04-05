---
title: NUXT项目打包优化策略
category: 前端
tags:
  - Nuxt.js
cover: https://images.unsplash.com/photo-1516918526298-eecb26841edc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjI5MzI0fQ&auto=format&fit=crop&w=1440&q=80
---

用 nuxt 开发完项目之后，开开心心打包扔上服务器准备收工，却没多久，测试童鞋遗憾的告诉我，压测 50 并发未通过。what？好吧。咱们再接下来老老实实的研究怎么压缩打包优化性能。

性能优化，无外乎那几个方案：文件压缩，文件缓存，CDN，DNS 预解析。。。

这里我们首先看一下不加任何优化的项目，打包后的分布：

![16268329-4b7c054e99690b2d](http://upload-images.jianshu.io/upload_images/16268329-4b7c054e99690b2d.png)

## 未优化

**

这里能看到 element-ui 占了绝大部分的打包空间，是因为全局引入了 element-ui，所以即使我们只使用了一部分的 elemnt 组件，但仍然把整个 element 给打包进来了。

所以这里有一个可以优化的点：**只引入 element 使用的组件，这样在打包的时候只需要打包使用的组件，体积就会减小很多**。

![16268329-5fcaaf21e925ebf9](http://upload-images.jianshu.io/upload_images/16268329-5fcaaf21e925ebf9.png) 只引入使用的组件

我们再来看看这么处理之后，我们打包出来的效果：

![16268329-8df05dc0fc49f6ff](http://upload-images.jianshu.io/upload_images/16268329-8df05dc0fc49f6ff.png) 引入部分 elemnet 组件后的打包分布

可以看出，我们减少了将近 **400kb** 的体积，效果十分显著。

好了，我又自信满满的把包丢到服务器上，准备金盆洗手。😎

然鹅没过多久，运维童鞋发过来一张图把我打回原点。

![16268329-8f569d3311280e3c](http://upload-images.jianshu.io/upload_images/16268329-8f569d3311280e3c.png) vendor.app.js 阻塞了

我看了一下 vendor.app.js，足有 501kb，难怪会阻塞🤷‍♀️好吧，这里应该使用上文件压缩这杆大枪了。

nuxt 本身就是基于 webpack 的，正好安装 compression-webpack-plugin 来对文件进行压缩。

## 首先安装

```bash
npm install compression-webpack-plugin
```

## 然后在 nuxt.config.js 中

```js
const CompressionPlugin = require('compression-webpack-plugin');
module.exports = {
  build: {
    plugins: [
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css/, // 匹配文件名
        threshold: 10240, // 对超过10kb的数据进行压缩
        deleteOriginalAssets: false // 是否删除原文件
      })
    ],
  }
}
```

这样打包出来的大小虽然没变，但是点击. nuxt-dist-client 中你会发现

![16268329-37170125d553a6fb](http://upload-images.jianshu.io/upload_images/16268329-37170125d553a6fb.png) 有 gz 后缀的文件

观察发现 gz 打包后，较原来的文件减少了 3/4 的体积。有了这些 gz 后缀的文件，再配合 nginx 打开 gzip 服务。我想这回应该可以冲过 50 并发了吧，说不定 200 并发都没问题🤩🤩🤩

好了，我这回真的自信满满的把包丢到服务器上，通知测试童鞋再次压测，果不其然，测试童鞋过了一会回复：50 并发跑 5 次无异常。😎😎我大气说，上 100！我翘着得意的二郎腿，等着好消息再次到来。过了一会，果不其然！测试童鞋告诉我，100 并发阻塞。原因同上，出在了 vendor.app.js 上😭

这里我说一下 vendor.app.js 打包之后的体积是 144kb。然鹅在高并发下，表现还是不理想，于是乎我只能上网去到处搜索解决方案，毕竟 po 主的 webpack 知识也就那么一勺水的深度🤷‍♀️🤷‍♀️

这里还真让我找到了一个台湾的网站，可见参考链接第三条。

splitChunks: 設定 Chunks 的最大和最小 size。

## 在 nuxt.config.js 中加入

```js
module.exports = {
  build: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    },
  }
}

```

## 完整

```js
const CompressionPlugin = require('compression-webpack-plugin');
module.exports = {
  build: {
    plugins: [
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css/, // 匹配文件名
        threshold: 10240, // 对超过10kb的数据进行压缩
        deleteOriginalAssets: false // 是否删除原文件
      })
    ],
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    },
  }
}
```

## 推荐下面这样

```js
const CompressionPlugin = require('compression-webpack-plugin');
export default {
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    //提取css到单独link文件
    extractCSS: {
      allChunks: true
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    },
    /**
     * You can extend webpack config here
     */
    extend(config, ctx) {
      if (!ctx.isDev && ctx.isClient) {
        config.plugins.push(
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css/, // 匹配文件名
            threshold: 10240, // 对超过10kb的数据进行压缩
            deleteOriginalAssets: false // 是否删除原文件
          }),
        )
        /**
        *  performance就是关闭每次打包之后的文件过大警告
        * 关闭文件过大提示，利于打包加快速度
        */
        config.performance = {
          hints: false,
          //入口起点的最大体积 整数类型(int)（以字节(bytes)为单位 200k）
          maxEntrypointSize: 204800,
          //生成文件的最大体积 整数类型(int)（以字节(bytes)为单位 200k）
          maxAssetSize: 204800,
        }
        /**
         * 公共代码抽离和代码分割，避免单个js文件过大
         */
        config.optimization = {
          splitChunks: {
            minSize: 10000,
            maxSize: 250000,
            cacheGroups: {
              vendor: {
                chunks: "all",
                test: /node_modules/,
                name: "vendor",
                minChunks: 1,
                maxInitialRequests: 5,
                priority: 100
              },
              common: {
                chunks: "all",
                test: /[\\/]src[\\/]js[\\/]/,
                name: "common",
                minChunks: 3,
                maxInitialRequests: 5,
                priority: 60
              },
              styles: {
                name: "styles",
                test: /\.(sa|sc|c)ss$/,
                chunks: "all",
                enforce: true
              },
              runtimeChunk: {
                name: "manifest"
              }
            }
          }
        }

      }
    },
    // 开启打包分析
    analyze: true,
  },
  // performance: {
  //   gzip: false
  // },
}
```

打包，观察打包结果：

![16268329-cef95899b944ec07](http://upload-images.jianshu.io/upload_images/16268329-cef95899b944ec07.png) splitChunks 之后的打包分析

可以看到虽然包体积虽然没变，但是像 vendor.app.js 这种单个体积大的被拆分成 n 个体积小的文件了。

这回终于是可以突破 100 并发 5 次无异常，达成并发要求了🎉🎊🎉🎊

总结一下，其实 po 主也不是什么 webpack 大神，也是摸爬滚打整出来的，大家如果能有什么更好的优化建议或者指教，请多多交流，不对之处我会改正！

参考：

[Nuxt 项目性能优化调研](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.cnblogs.com%2Flessfish%2Fp%2F12411497.html)

[NUXT 项目的性能优化](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.cnblogs.com%2Fhujinlong%2Fp%2F11088757.html)

[SplitChunks & Lodash & Vuetify tree shaking](https://links.jianshu.com/go?to=https%3A%2F%2Fithelp.ithome.com.tw%2Farticles%2F10207669)
