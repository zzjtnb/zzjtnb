---
title: 【译】如何创造带方向感应的纯 CSS 悬停效果
category: 前端
tags:
  - css
cover: https://images.unsplash.com/photo-1532518166026-5c82c8583b9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80
---

原文:[How to Create Direction-Aware CSS-Only Hover Effects](http://codepen.io/gabriellewee/post/how-to-create-direction-aware-css-only-hover-effects)

## 概述

_几个关于带方向感应的纯 CSS 悬停效果教程._

#### 要求

这些教程面向有基础 HTML 知识和熟练 CSS/SASS 高级用法的人.

#### 声明

这些效果在旧的浏览器中无效 - 你需要一个可以渲染 3D 变换的浏览器. 我已在最新的 Chrome、Firefox 和 Safari 浏览器中测试过.

我还使用了出色的 AutoPrefixer 来替代供应商前缀. 请确保前往你的 Pen 设置, 点击 CSS, 并选择 AutoPrefixer.

#### 目录

1. [视差悬停效果]
2. [立方体链接悬停效果]
3. [结论]

## 视差悬停效果

#### 背景

[我的设计搭档](http://jeselleobina.com/)和我在 2015 年偶然发现了 [Kikk Festival homepage](http://www.kikk.be/2015/), 其中包含了惊艳的视差悬停卡片. 我们喜欢这个样子并想在一个项目中重新创造它, 但由于代码库的原因, 不能使用 JavaScript 来实现它. 不管怎样, 我开始寻找纯 CSS 的解决方案, 偶然发现了一些有趣的东西.

#### 全能的波浪号

对我来说, 最迷人的 CSS 选择器之一是 `~` 波浪号, 它选择与选择器匹配的最近的元素, 并且是第一个. 比如, `ul ~ p` 选择了 p 元素在

```html
<div>

    <ul></ul>
    <ol></ol>
    <p></p>
    <p></p>

</div>

```

我意识到我可以使用它来创造带方向感应的悬停效果, 在几乎任何东西上!

#### 结构

这些链接的结构非常简单 — 一个容器包含多个 `<a>` 元素和一个用于卡片内容的容器. 所有的 `href` 应该包含相同的 URL.

```html
<div class="container">
    <a href="http://gabriellew.ee"></a>
    <a href="http://gabriellew.ee"></a>
    <a href="http://gabriellew.ee"></a>
    <a href="http://gabriellew.ee"></a>
    <div class="card">
        <h1>Content</h1>
    </div>
</div>
```

我们首先添加一些基本的 SASS/CSS 来将链接定位到卡片的每个角上. 你可以做更多的链接, 但为了简单起见, 我们固定为四个. 我们还将使用 Haml 来加快这一过程.
<iframe allowfullscreen="true" allowpaymentrequest="true" allowtransparency="true" class="cp_embed_iframe " frameborder="0" height="400" name="cp_embed_1" scrolling="no" src="https://codepen.io/anon/embed/c9681b4f3e1f871d4503bad1f5f8821d?slug-hash=c9681b4f3e1f871d4503bad1f5f8821d&amp;default-tab=result&amp;height=400&amp;theme-id=0&amp;embed-version=2&amp;user=anon&amp;name=cp_embed_1" style="width: 100%; overflow:hidden; display:block; " title="CodePen Embed" loading="lazy" id="cp_embed_c9681b4f3e1f871d4503bad1f5f8821d"></iframe>
因为我们不能使用 JavaScript 来提醒我们鼠标移动的方向或鼠标的位置, `<a>` 元素将起到把卡片分为不同检测区域的角色 — 如果你移动你的鼠标到 `<a>` #1 上, 例如, 你的鼠标会在你进入 #3 或 #4 的检测区域之前进到 #1.

#### 悬停

下一步是获取每个链接事件来作用到真正的卡片元素上. 波浪号在这里登场.

```css
a {

    &:hover, &:focus {
        ~ .card {
            // some CSS here
        }
    }

}

```

当你鼠标悬停到_任意_链接上时会影响到卡片, 而不是像 `+` 选择器那样仅选择相邻的兄弟元素.
<iframe allowfullscreen="true" allowpaymentrequest="true" allowtransparency="true" class="cp_embed_iframe " frameborder="0" height="400" name="cp_embed_2" scrolling="no" src="https://codepen.io/anon/embed/5790b507dfe38a664829af6a066062ff?slug-hash=5790b507dfe38a664829af6a066062ff&amp;default-tab=result&amp;height=400&amp;theme-id=0&amp;embed-version=2&amp;user=anon&amp;name=cp_embed_2" style="width: 100%; overflow:hidden; display:block;" title="CodePen Embed" loading="lazy" id="cp_embed_5790b507dfe38a664829af6a066062ff"></iframe>
接下来, 我们会为各个链接添加单独的悬停效果. 我把链接背景改为了边框, 这样你可以更轻松的看到效果.
<iframe allowfullscreen="true" allowpaymentrequest="true" allowtransparency="true" class="cp_embed_iframe " frameborder="0" height="400" name="cp_embed_3" scrolling="no" src="https://codepen.io/anon/embed/1ea676ad4a584fc30945565eca919f37?slug-hash=1ea676ad4a584fc30945565eca919f37&amp;default-tab=result&amp;height=400&amp;theme-id=0&amp;embed-version=2&amp;user=anon&amp;name=cp_embed_3" style="width: 100%; overflow:hidden; display:block;" title="CodePen Embed" loading="lazy" id="cp_embed_1ea676ad4a584fc30945565eca919f37"></iframe>

#### 变换

现在我们知道每个角已经被正确的检测到了, 我们将添加变换效果来让卡片向各个角倾斜. 第一件要做的事是为容器添加透视(perspective). 我通常使用 `1000px` 左右的范围 — 这足以呈现出微妙的深度.

对于这种视差类型, 最重要的属性不是实际的变换(transform), 而是卡片的变换原点(transform-origin). 它需要针对不同的检测区域做改变, 作用在当前检测区域的相对角上.

举例来说, 如果你悬停在 #1 检测区域(左上角), 变换原点(transform-origin)应该是 `bottom right` , 它的相对角. 这个想法是为了模拟被检测角向后移动, 而其他角向前移动.
<iframe allowfullscreen="true" allowpaymentrequest="true" allowtransparency="true" class="cp_embed_iframe " frameborder="0" height="400" name="cp_embed_4" scrolling="no" src="https://codepen.io/anon/embed/7d1760ef7b02fe3a1a5151ccd973398c?slug-hash=7d1760ef7b02fe3a1a5151ccd973398c&amp;default-tab=result&amp;height=400&amp;theme-id=0&amp;embed-version=2&amp;user=anon&amp;name=cp_embed_4" style="width: 100%; overflow:hidden; display:block;" title="CodePen Embed" loading="lazy" id="cp_embed_7d1760ef7b02fe3a1a5151ccd973398c"></iframe>

#### 画龙点睛

为了完成这个视差, 我们还在卡片内添加了一个边框, 当你悬停在链接上时它会_向前_移动. 你也可以应用这个技术到卡片内的其他元素上.

```css
// styling for the border
.card {
    position: relative;
    .border {
        transform-origin: center center;
        position: absolute;
        top: 12px;
        left: 12px;
        width: calc(100% - 24px);
        height: calc(100% - 24px);
        border: 2px solid white;
    }
}
// parallax behavior
.container {
    a {
        &:hover, &:focus {
            ~ .card {
                .border {
                    transform: translateZ(24px);
                }
            }
        }
        // pushes the border backwards when you click
        &:active {
            ~ .card {
                .border {
                    transform: none;
                }
            }
        }
    }
}
```

最后的两个步骤是 (1) 为卡片元素添加过渡(transition), 使得角到角的移动是平滑的 (2) 移除链接的样式, 使得它们是不可见的. 我喜欢将透明度(opacity)设置为 `0` 来以防万一. 我还会把前置当前链接来防止卡片旋转产生重叠.
<iframe allowfullscreen="true" allowpaymentrequest="true" allowtransparency="true" class="cp_embed_iframe " frameborder="0" height="400" name="cp_embed_5" scrolling="no" src="https://codepen.io/anon/embed/991e7d405a24f36c30acf9e7f01c1949?slug-hash=991e7d405a24f36c30acf9e7f01c1949&amp;default-tab=result&amp;height=400&amp;theme-id=0&amp;embed-version=2&amp;user=anon&amp;name=cp_embed_5" style="width: 100%; overflow:hidden; display:block; " title="CodePen Embed" loading="lazy" id="cp_embed_991e7d405a24f36c30acf9e7f01c1949"></iframe>

#### 结果

下面是我的[完整版视差悬停效果](http://codepen.io/gabriellewee/pen/zBoMGY) — 切换复选框可以看到我的链接位置. 我决定添加更多链接来进一步改善视差.
<iframe allowfullscreen="true" allowpaymentrequest="true" allowtransparency="true" class="cp_embed_iframe " frameborder="0" height="400" name="cp_embed_6" scrolling="no" src="https://codepen.io/anon/embed/e2bfe2c7c6099275a5f20e4c338042a4?slug-hash=e2bfe2c7c6099275a5f20e4c338042a4&amp;default-tab=result&amp;height=400&amp;theme-id=0&amp;embed-version=2&amp;user=anon&amp;name=cp_embed_6" style="width: 100%; overflow:hidden; display:block; " title="CodePen Embed" loading="lazy" id="cp_embed_e2bfe2c7c6099275a5f20e4c338042a4"></iframe>
## 立方体链接悬停效果

#### 背景

另一个实现了令人印象深刻的方向感应悬停效果的网站是 [Adult Swim Singles 2016](http://adultswim.com/music/singles-2016/). 如果你点击左上角像日历一样的图标, 你会被带入到一个 3D 日历, 那里每天都是一个带方向感应的立方体. 多么棒的创意啊!

我立即想到我可以使用波浪号做出一个类似的效果, 我已经有了一个[立方体模型](http://codepen.io/gabriellewee/pen/BKgyEw), 我可以轻松修改它为链接作为视差悬停的基础.

#### 基础

视差悬停和立方体链接之间的主要区别是检测区域的形式. 不再使用角, 我们使用整个面 / 边做为检测区域 — 四个三角形取代了四个四边形.
<iframe allowfullscreen="true" allowpaymentrequest="true" allowtransparency="true" class="cp_embed_iframe " frameborder="0" height="300" name="cp_embed_7" scrolling="no" src="https://codepen.io/anon/embed/52b5a4e2b5dc1abc19a40dd9b04fa1d7?slug-hash=52b5a4e2b5dc1abc19a40dd9b04fa1d7&amp;default-tab=result&amp;height=300&amp;theme-id=0&amp;embed-version=2&amp;user=anon&amp;name=cp_embed_7" style="width: 100%; overflow:hidden; display:block; " title="CodePen Embed" loading="lazy" id="cp_embed_52b5a4e2b5dc1abc19a40dd9b04fa1d7"></iframe>
有了上面的想法, 我们可以开始构建立方体链接基础了. 我们需要创建一个外层容器、四个三角形链接形成的一个正方形, 以及一个包含六个元素的内部容器 — 四个空的、两个有内容. 我对这六个的顺序倾向于: 上、下、左、右、前、后.

``` html
<div class="link">
  <a href="http://codepen.io/gabriellewee/"></a>
  <a href="http://codepen.io/gabriellewee/"></a>
  <a href="http://codepen.io/gabriellewee/"></a>
  <a href="http://codepen.io/gabriellewee/"></a>
  <div class="cube">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div>Front content</div>
    <div>Back content</div>
  </div>
</div>
```

对于三角形链接, 你可以使用 [Clippy](http://bennettfeely.com/clippy/) 来获取正确的三角形形状. 你还需要 SVG clip-paths 来兼容 Firefox. 另外, 链接必需具有正的 translateZ(向前移动)— 不然, 它们会隐藏在立方体后面.

我们使用一个 12px 变量来定义宽度、高度和立方体变换. 为了区分立方体的各个面, 我们使用一种颜色的不同色调来模拟明暗, 背面为纯白.
<iframe allowfullscreen="true" allowpaymentrequest="true" allowtransparency="true" class="cp_embed_iframe " frameborder="0" height="300" name="cp_embed_8" scrolling="no" src="https://codepen.io/anon/embed/e50423a596887c0a7d396ff973be5206?slug-hash=e50423a596887c0a7d396ff973be5206&amp;default-tab=result&amp;height=300&amp;theme-id=0&amp;embed-version=2&amp;user=anon&amp;name=cp_embed_8" style="width: 100%; overflow:hidden; display:block; " title="CodePen Embed" loading="lazy" id="cp_embed_e50423a596887c0a7d396ff973be5206"></iframe>
我们稍微的旋转了立方体, 以便你可以看到每个面都已经放置正确. 如果你看一眼 transform, 你会注意到所有的立方体面都有负的 translateZ — 这意味着立方体除了前面的每个面都被向后推了.

由于 3D 变换的性质, 这意味着除非你把整个立方体向前变动, 否则其中一些会被切断在背景之后. 你可以把立方体向前移动来防止这个问题, 但我已经有了立方体基础, 所以大多数情况下不用管它. 如果你无法理解这部分可以留言告诉我, 或者就建一个普通的立方体.

#### 悬停

下一步是在悬停时添加旋转. 你可以用你喜欢的任何方式来实现, 但我发现最真实的旋转是_远离_鼠标交互点. 所以如果鼠标从左侧进入, 立方体应该从左向右转. 每次旋转应该是 `180deg` / `0.5turn` 或负的等量. 我们还提早加上了过渡(transition)来确保立方体正确旋转.
<iframe allowfullscreen="true" allowpaymentrequest="true" allowtransparency="true" class="cp_embed_iframe " frameborder="0" height="300" name="cp_embed_9" scrolling="no" src="https://codepen.io/anon/embed/1861f1050aabfe56b5db97e26be2542a?slug-hash=1861f1050aabfe56b5db97e26be2542a&amp;default-tab=result&amp;height=300&amp;theme-id=0&amp;embed-version=2&amp;user=anon&amp;name=cp_embed_9" style="width: 100%; overflow:hidden; display:block; " title="CodePen Embed" loading="lazy" id="cp_embed_1861f1050aabfe56b5db97e26be2542a"></iframe>

#### 打磨

有两件事需要打磨:

1. 底部的三角导致背面的文字上下颠倒显示了。
2. 三角悬停太敏感了：从一个三角移动到另一个会导致不必要的旋转。

对于上下颠倒的文字, 最简单的解决方法就是在主旋转发生_之前_把背面旋转到正确的位置, 且没有任何过渡. 由于某些原因, 修改底部三角的背面行为会一同修改顶部三角, 所以我们需要为这些悬停添加额外的旋转.

触发太敏感的行为修复起来更加困难. 解决它的方法是让当前的链接占据其他三处所有的空间(全部的宽 / 高、移除 clip-path、前置移动), 但这也会使你在立方体上快速移动鼠标时无法触发角的旋转. 我最终决定插入一个过渡延迟来修复这个问题, 除非你的光标在立方体上超过了一秒否则不会生效. 这个延迟不会解决所有的问题, 但可以减轻大多数问题.
<iframe allowfullscreen="true" allowpaymentrequest="true" allowtransparency="true" class="cp_embed_iframe " frameborder="0" height="300" name="cp_embed_10" scrolling="no" src="https://codepen.io/anon/embed/3ebcfb34d5b6f4fc77602d1c18891947?slug-hash=3ebcfb34d5b6f4fc77602d1c18891947&amp;default-tab=result&amp;height=300&amp;theme-id=0&amp;embed-version=2&amp;user=anon&amp;name=cp_embed_10" style="width: 100%; overflow:hidden; display:block; " title="CodePen Embed" loading="lazy" id="cp_embed_3ebcfb34d5b6f4fc77602d1c18891947"></iframe>

#### 结果

下面是添加了颜色和图标的完整版示例. 虽然这个项目中的概念更困难, 但我完成它的速度比视差悬停更快, 因为我在制作视差悬停时已经学到了这个概念.
<iframe allowfullscreen="true" allowpaymentrequest="true" allowtransparency="true" class="cp_embed_iframe " frameborder="0" height="300" name="cp_embed_11" scrolling="no" src="https://codepen.io/anon/embed/Qdpgwx?slug-hash=Qdpgwx&amp;default-tab=result&amp;height=300&amp;theme-id=0&amp;embed-version=2&amp;user=anon&amp;name=cp_embed_11" style="width: 100%; overflow:hidden; display:block; " title="CodePen Embed" loading="lazy" id="cp_embed_Qdpgwx"></iframe>
## 结论

还有许多有趣的悬停效果可以通过组合波浪号、变换和过渡实现. 我的设计搭档提议了一个鱼缸, 其中鱼的游动方向取决于你的鼠标方向. 其他我还想到了包括水波纹效果、图片倾斜和运动模糊动画. 如果你用这个技术实现了自己的作品, 欢迎告诉我!
