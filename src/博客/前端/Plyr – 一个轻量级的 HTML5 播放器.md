---
title: Plyr – 一个轻量级的 HTML5 播放器
category: 前端
tags:
  - JavaScript
cover: https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80
---

> Plyr 是一个简单的可定制的 HTML5 媒体播放器，使用原生 JavaScript 没有其他依赖。支持 YouTube 和 Vimeo 。

### 特色

* **无障碍** – 完全支持 VTT 字幕和屏幕阅读器
* **轻量级** – 压缩后小于 10 KB
* **可定制** – 根据需求定制你想要的播放器
* **语义化** – 使用 _正确的_ 元素。 `<input type="range">` 用于音量， `<progress>` 用于进度， `<button>`s 用于按钮。没有 `<span>` 或 `<a href="#">` 按钮 hacks
* **响应式** – 适用于任何屏幕尺寸
* **HTML 视频 & 音频** – 支持两种格式
* **嵌入式视频** – 支持 YouTube 和 Vimeo 视频播放
* **流视频** – 支持 hls.js，Shaka 和 dash.js 流播放
* **API** – 切换播放，音量等等
* **事件** – 不要混淆 Vimeo 和 YouTube API，所有的事件都是跨格式标准化的
* **全屏播放** – 支持本机全屏播放，可切换到 “全窗口” 模式
* **快捷键** – 支持键盘快捷键
* **国际化支持** – 支持国际化的控制器
* **没有依赖** – 使用原生 JavaScript, 不需要 jQuery
* **SASS 和 LESS** – 包含在构建过程中

### CMS 插件

[WordPress](https://wordpress.org/plugins/plyr/) ，[Neos](https://packagist.org/packages/jonnitto/plyr) ，[Kirby](https://github.com/dpschen/kirby-plyrtag)

### 安装

npm

```bash
npm install plyr
```

Bower

```bash
bower install plyr
```

Ember

```bash
ember addon:install ember-cli-plyr
```

### 快速开始

这是一个快速开始的示例。还有一个在 [Codepen](https://codepen.io/sampotts/pen/jARJYp) 上的演示。

##### HTML

Plyr 扩展了标准的 HTML5 标记，这就是你需要的那些类型。

## HTML5 视频

**

```html
<video poster="/path/to/poster.jpg" controls>
  <source src="/path/to/video.mp4" type="video/mp4">
  <source src="/path/to/video.webm" type="video/webm">
  <!-- Captions are optional -->
  <track kind="captions" label="English captions" src="/path/to/captions.vtt" srclang="en" default>
</video>
```

## HTML5 音频

**

```html
<audio controls>
  <source src="/path/to/audio.mp3" type="audio/mp3">
  <source src="/path/to/audio.ogg" type="audio/ogg">
</audio>
```

对于 YouTube 和 Vimeo ，Plyr 使用标准的 YouTube API 标记：

## 嵌入 YouTube

**

```html
<div data-type="youtube" data-video-id="bTqVqk7FSmY"></div>
```

## 嵌入 Vimeo

**

```html
<div data-type="vimeo" data-video-id="143418951"></div>
```

注意：`data-video-id` 的值可以是视频的 ID 或 URL 。

##### JavaScript

在 `</body>` 标记之前添加 plyr.js 脚本，然后调用 `plyr.setup()` 。

```html
<script src="path/to/plyr.js"></script>
<script>plyr.setup();</script>
```

##### CSS

在 `<head>` 标签中引入 plyr.css 样式。

```html
<link rel="stylesheet" href="path/to/plyr.css">
```

##### SVG 雪碧图

SVG 雪碧图从我们的 CDN 自动加载。你也可以下载后放在自己的服务器中（<https://cdn.plyr.io/2.0.13/plyr.svg）>

### 高级

##### LESS & SASS/SCSS

你可以使用 `/src` 中包含的 plyr.less 或 plyr.scss 文件作为构建的一部分，并根据你的设计更改变量。

##### SVG

Plyr 控件中使用的图标被放到 SVG 雪碧图中。默认情况下，雪碧图自动从我们的 CDN 加载。如果你已经有了自己的图标，你可以载入进来（ `/src/sprite` ）。

## 使用 iconUrl 选项

**

然而，你可以指定自己的 iconUrl 选项，并且 Plyr 将确定 url 是否是绝对的，由于当前的浏览器限制或需要由 AJAX/CORS 加载，只需直接使用路径即可。

##### 跨域资源 (CORS)

示例中的 `<video>` 元素使用跨域属性。这是因为 TextTrack 标题是从另一个域加载的。如果你的 TextTrack 字幕也托管在另一个域上，则需要添加此属性，并确保您的主机具有正确的 `<meta>` 设置。有关 CORS 可查看 MDN 文档：[https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)

##### 标题

支持 WebVTT 字幕。要添加字幕轨道，请检查 HTML 中是否有 `<track>` 元素。确保验证你的字幕文件。

##### JavaScript

## 初始化

**

默认情况下，`setup()` 将查找所有 `<video>` ，`<audio>` 和 `[data-type]` 元素。查找到的每个目标媒体元素都将被包裹在 `<div>` 中以添加样式和设置。你可以指定使用 `setup()` 的各种参数，包括不同的节点列表 ，HTML 元素 ，HTML 元素数组或字符串选择器，如下所示：

传递一个节点列表：

```js
plyr.setup(document.querySelectorAll('.js-player'), options);
```

传递一个 HTML 元素:

```js
plyr.setup(document.querySelector('.js-player'), options);
```

传递一组 HTML 元素数组：:

```js
plyr.setup([
 document.querySelector('.js-player-1'),
 document.querySelector('.js-player-2')
], options);
```

传递一个字符串选择器：

```js
plyr.setup('.js-player', options);
```

节点列表，HTML 元素或字符串选择器可以是目标 `<video>` ，`<audio>` 或 `[data-type]` （嵌入）元素本身或容器元素。

只传递选项对象：

```js
plyr.setup(options);
```

`setup()` 将返回一个可以与 API 方法一起使用的实例数组。

## 触摸范围

**

一些移动浏览器（特别是 iOS 上的移动 Safari）似乎有与 `<input type ="range">` 元素有关的问题，触摸轨迹设置的值不起作用，滑动拇指可能会很棘手。为了解决这个问题，我创建了 RangeTouch ，我建议你将它用在你的解决方案中。这是一个很小的脚本，对于触摸设备上的用户来说，这是非常有益的。

## 选项

**

必须将选项作为对象传递到上述的 `setup()` 方法，或将每个目标元素的 data-plyr 属性中的 JSON 作为对象传递：

```html
<video data-plyr='{ title: "testing" }'></video>
```

注意在对象上封装 JSON 的双引号和单引号。

<table><thead><tr><th>选项</th><th>类型</th><th>默认值</th><th>描述</th></tr></thead><tbody><tr><td><code>enabled</code></td><td>Boolean</td><td><code>true</code></td><td>完全禁用 Plyr。这将允许你执行用户代理检查或类似操作，以编程方式启用或禁用某个 UA 的 Plyr 。</td></tr><tr><td><code>html</code></td><td>String</td><td><code><a href="http://f2ex.cn/sampotts/plyr/blob/master/controls.md" target="_blank" rel="nofollow">查看 controls.md</a></code></td><td>更多关于 html 需要结构化的信息请查看 <a href="http://f2ex.cn/sampotts/plyr/blob/master/controls.md" target="_blank" rel="nofollow">controls.md</a></td></tr><tr><td><code>controls</code></td><td>Array</td><td><code>['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'fullscreen']</code></td><td>在使用 html 默认控件时，切换要显示的控件元素。如果你指定一个 <code>html</code> 选项，这是多余的。默认值是显示所有内容。</td></tr><tr><td><code>i18n</code></td><td>Object</td><td><code><a href="http://f2ex.cn/sampotts/plyr/blob/master/controls.md" target="_blank" rel="nofollow">查看 controls.md</a></code></td><td>用于国际化（i18n）的按钮中的工具提示 / 标签。</td></tr><tr><td><code>loadSprite</code></td><td>Boolean</td><td><code>true</code></td><td>加载指定为 <code>iconUrl</code> 选项（如果 URL）的 SVG 雪碧图。如果是 <code>false</code>，则假定你正在加载自己的 SVG 雪碧图。</td></tr><tr><td><code>iconUrl</code></td><td>String</td><td><code>null</code></td><td>指定 SVG 雪碧图的 URL 或路径。更新信息查看 SVG 部分</td></tr><tr><td><code>iconPrefix</code></td><td>String</td><td><code>plyr</code></td><td>为默认控件中使用的图标指定 ID 前缀（例如 “plyr-play” ）。这是为了防止在你使用自己的 SVG 雪碧图时产生冲突，如果使用默认控件， 你可以忽略此选项。</td></tr><tr><td><code>blankUrl</code></td><td>String</td><td><code>https://cdn.selz.com/plyr/blank.mp4</code></td><td>指定用于正确取消网络请求的空白视频文件的 URL 或路径。 更多信息查看 <a href="https://github.com/sampotts/plyr/issues/174" target="_blank" rel="nofollow">issue #174</a></td></tr><tr><td><code>debug</code></td><td>Boolean</td><td><code>false</code></td><td>显示 Plyr 的调试信息。</td></tr><tr><td><code>autoplay</code></td><td>Boolean</td><td><code>false</code></td><td>载入媒体自动播放。一般建议在用户体验的基础上不要自动播放。它也在 iOS 上禁用（苹果限制）。</td></tr><tr><td><code>seekTime</code></td><td>Number</td><td><code>10</code></td><td>当用户快进或快退时，以秒为单位寻找时间。</td></tr><tr><td><code>volume</code></td><td>Number</td><td><code>5</code></td><td>1 到 10 之间的数字，表示初始音量。</td></tr><tr><td><code>clickToPlay</code></td><td>Boolean</td><td><code>true</code></td><td>单击（或点击）视频容器将切换暂停 / 播放。</td></tr><tr><td><code>disableContextMenu</code></td><td>Boolean</td><td><code>true</code></td><td>将视频上的右键菜单禁用为 <em>帮助</em> ，作为非常原始的模糊处理，以防止内容下载。</td></tr><tr><td><code>hideControls</code></td><td>Boolean</td><td><code>true</code></td><td>2 秒后无鼠标或焦距移动，控制元素隐藏（标签输出），回放开始或进入全屏时自动隐藏视频控件。一旦鼠标移动，控制元素被聚焦或播放暂停，控件立即重新出现。</td></tr><tr><td><code>showPosterOnEnd</code></td><td>Boolean</td><td><code>false</code></td><td>一旦播放完成，这将恢复和 * 重新加载 * HTML5 视频。注意：根据浏览器缓存，这可能会导致视频再次下载（或其中的一部分）。谨慎使用。</td></tr><tr><td><code>keyboardShortcuts</code></td><td>Object</td><td><code>{ focused: true, global: false }</code></td><td>仅针对焦点播放器或全局启用键盘快捷键（只有文档中有一个播放器才有效）</td></tr><tr><td><code>tooltips</code></td><td>Object</td><td><code>{ controls: false, seek: true }</code></td><td><strong>controls</strong>: 将控制标签显示为工具提示 :hover&amp; :focus。<p><strong>seek</strong>: 显示工具提示。</p></td></tr><tr><td><code>duration</code></td><td>Number</td><td><code>null</code></td><td>指定自定义持续时间。</td></tr><tr><td><code>displayDuration</code></td><td>Boolean</td><td><code>true</code></td><td>在当前时间显示中显示 “metadataloaded” 事件（启动时）媒体的持续时间。 如果 `preload` 属性未设置为 `none`（或根本不设置），并且你选择不显示持续时间（参见<code>controls</code>选项），这将起作用。</td></tr><tr><td><code>selectors</code></td><td>Object</td><td>—</td><td>更多信息请查看 <code>/src</code> 中的 <code>plyr.js</code> 。你可能不需要改变任何东西。</td></tr><tr><td><code>listeners</code></td><td>Object</td><td>—</td><td>允许事件侦听器一开始绑定到控件。有关更多信息，请参阅上面的 <code>controls</code> 以获取控件列表，并查看 <code>/src</code>中的 <code>plyr.js</code>。</td></tr><tr><td><code>classes</code></td><td>Object</td><td>—</td><td>与上述类似，这些是当状态发生改变时添加到播放器的类。</td></tr><tr><td><code>captions</code></td><td>Object</td><td>—</td><td>默认情况下，属性 <code>defaultActive</code> 切换字幕。默认值为 <code>false</code>。</td></tr><tr><td><code>fullscreen</code></td><td>Object</td><td>—</td><td></td></tr><tr><td><code>storage</code></td><td>Object</td><td>—</td><td>两个属性; <code>enabled</code> 启用本地存储（如果浏览器支持）。 默认值为 “true” 。 这会存储用户设置，目前它只存储音量，但更多的功能将在以后被添加。第二个属性 <code>key</code> 是用于本地存储的密钥。默认值为 <code>plyr_volume</code> 。</td></tr></tbody></table>

### API

访问 plyr 实例的最简单方法是将调用的返回值存储到 `setup()` 中：

```js
var players = plyr.setup('.js-player');
```

这将返回所有被初始化的实例数组。另一种方法是使用 `plyr.get()` 获取给定容器中的所有实例，例如：

```js
var players = plyr.get('.js-player');
```

如果没有参数被传递，它将在当前文档中查找所有实例。这将返回给定选择器中找到的所有实例的数组。

最后一个选项是通过事件处理程序访问实例：

```js
instance.on('ready', function(event) {
  var instance = event.detail.plyr;
});
```
