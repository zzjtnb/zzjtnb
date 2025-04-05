---
title: HTML lang 没你想的那么简单
category: 前端
tags:
  - html
cover: https://images.unsplash.com/photo-1539789788310-592bbc54b91e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80
---


## 前言

做 web 无障碍相关的研究时，遇到的第一件事就是要给 `<html>` 设置正确的 `lang` 属性，这么简单的一件事，想也不用就写好了：`<html lang="zh-CN">`，或者直接简写成 `<html lang="zh">`，Bingo，可以去做其它事了。

但仔细想一想，好像有些问题

* `zh` 是什么鬼？拼音？明明是国际标准怎么会用中文拼音？
* `CN` 为什么要大写？`zh-CN`表示中国中文，`zh-SG`表示新加坡中文，但都是用的简体中文，貌似没什么区别？
* 如果页面上显示的是用中文显示的粤语用词，如 `佢系一个须刨嚟嘅` (它是一个刮胡刀)，那屏幕阅读器是用普通话朗读还是用粤语朗读呢？

为了一探究竟，我决定开始了解下语言标记是如何定义的。

## 过程

先从 `lang` 属性的定义开始，参考 MDN 上关于 [lang](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/lang) 上的解释，它是由 [IETF](https://zh.wikipedia.org/wiki/%E4%BA%92%E8%81%94%E7%BD%91%E5%B7%A5%E7%A8%8B%E4%BB%BB%E5%8A%A1%E7%BB%84) 的 [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt) 规范来定义的， 根据 [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt) 规范的描述，它是 [RFC5646](https://tools.ietf.org/rfc/rfc5646.txt) 与 [RFC4647](https://tools.ietf.org/rfc/rfc4647.txt) 这两个规范的最佳实践合集，其中取代了 [RFC4646](https://tools.ietf.org/rfc/rfc4646.txt)、[RFC3066](https://tools.ietf.org/rfc/rfc3066.txt)、[RFC1766](https://tools.ietf.org/rfc/rfc1766.txt) 这三个旧的语言标签规范，最新的规范定义了语言标签的描述规则如下：

``` bash
language  -  extlang       -  script  -  region  -  variant  -  extension  -  privateuse
主语言     -  扩展语言(方言)  -  书写文字  -  区域    -  变体      -  扩展       -  私有
复制代码
```

由子标签按顺序通过连字号 (-) 连接起来组成一个完整的语言标签，各子标签的格式遵循以下标准：

* language：[ISO639-1](http://www.mathguide.de/info/tools/languagecode.html) (2002) 的 2 字母语言代码，[ISO639-2](https://www.loc.gov/standards/iso639-2/php/code_list.php) (1998) 或 [ISO639-3](https://iso639-3.sil.org/code_tables/639/data) (2007) 或 [ISO639-5](https://www.loc.gov/standards/iso639-5/id.php) (2008) 的 3 字母语言代码
* extlang：[ISO639-3](https://iso639-3.sil.org/code_tables/639/data) 每个由 3 字母组成
* script：[ISO15924](https://www.unicode.org/iso15924/iso15924-codes.html) 的 4 字母书写文字代码
* region：[ISO3166-1_alpha-2](https://zh.wikipedia.org/wiki/ISO_3166-1%E4%BA%8C%E4%BD%8D%E5%AD%97%E6%AF%8D%E4%BB%A3%E7%A0%81) 的 2 字母地区代码 (通常大写)，或 [UNM.49](https://zh.wikipedia.org/wiki/UN_M.49) 的 3 数字地理区代码
* variant：[IANA 语言子标签注册表](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) 每个为 5 至 8 个字母，或者 4 字母后跟 1 个数字
* extension：暂未知
* privateuse：暂未知

![1](https://user-gold-cdn.xitu.io/2019/6/20/16b757a9d7a73ff7?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

这才刚开始讲，就遇到了一堆的专有名称，一堆的国际规范，用一个字形象我现在的心情：懵

对新规范的解读先停一下，我们来先回过头来从 `zh-CN` 的历史开始讲起

## 历史

1995 年 3 月 `IETF`（互联网工程任务组）发布最早的 [RFC1766](https://tools.ietf.org/rfc/rfc1766.txt) 语言标签规范，使用 [ISO639-1](http://www.mathguide.de/info/tools/languagecode.html) 的 2 字母语言代码，[ISO3166-1_alpha-2](https://zh.wikipedia.org/wiki/ISO_3166-1%E4%BA%8C%E4%BD%8D%E5%AD%97%E6%AF%8D%E4%BB%A3%E7%A0%81) 的 2 字母国家地区代码并 (约定大写)。[ISO639-1](http://www.mathguide.de/info/tools/languagecode.html) 规范中汉语使用 `zh` 表示，来自 “中文” 的汉语拼音：`Zhōngwén`。[ISO3166-1_alpha-2](https://zh.wikipedia.org/wiki/ISO_3166-1%E4%BA%8C%E4%BD%8D%E5%AD%97%E6%AF%8D%E4%BB%A3%E7%A0%81) 规范中中国的代码是 `CN`，这大概就是 `zh-CN` 的由来，也是目前使用最普遍的一种中文语言标签。

2001 年 1 月发布的 [RFC3066](https://tools.ietf.org/rfc/rfc3066.txt) 语言标签规范, 使用 [ISO639-2](https://www.loc.gov/standards/iso639-2/php/code_list.php) 的 3 字母语言代码，汉语使用 `zho` 表示，同样来自 “中文” 的汉语拼音：`Zhōngwén` 的前 3 个字母。

2006 年 9 月发布 [RFC4646](https://tools.ietf.org/rfc/rfc4646.txt) (规范的主体) 与 [RFC4647](https://tools.ietf.org/rfc/rfc4647.txt) (处理匹配行为) 语言标签规范。 [RFC4646](https://tools.ietf.org/rfc/rfc4646.txt) 增加了使用 [ISO15924](https://www.unicode.org/iso15924/iso15924-codes.html) 的 4 字母书写文字子标签，简体中文是 `Hans`，繁体中文是 `Hant`，以及 [UNM.49](https://zh.wikipedia.org/wiki/UN_M.49) 的 3 数字地理分区码。

2009 年 9 月发布 [RFC5646](https://tools.ietf.org/rfc/rfc5646.txt) ，引入了 3 字符码的 [ISO639-3](https://iso639-3.sil.org/code_tables/639/data) 与 [ISO639-5](https://www.loc.gov/standards/iso639-5/id.php) 作为语言子标签，其中 [ISO639-3](https://iso639-3.sil.org/code_tables/639/data) 认定汉语文（`zho`）是一个大语文（macrolanguage），包含 14 种语文，`cdo` – 闽东语，`cjy` – 晋语，`cmn` – 普通话或國語，`cpx` – 莆仙语，`czh` – 徽语，`czo` – 闽中语，`gan` – 赣语，`hak` – 客家话，`hsn` – 湘语，`mnp` – 闽北语，`nan` – 闽南语，`wuu` – 吴语，`yue` – 粤语，`lzh` - 文言文。

2009 年 9 月发布的 [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt) 整合了 [RFC4647](https://tools.ietf.org/rfc/rfc4647.txt) 和 [RFC5646](https://tools.ietf.org/rfc/rfc5646.txt) 形成语言标签最佳实践，仍然使用 `zh` 作为大语文（macrolanguage）标签， [ISO639-3](https://iso639-3.sil.org/code_tables/639/data) 中引入的另外 14 种语文标签作为方言扩展标签，但推荐方言扩展标签直接作为主语言标签，因此赣语的标签以 `zh-gan` 或 `gan` 开头、粤语的以 `zh-yue` 或 `yue` 开头、普通话的以 `zh-cmn` 或 `cmn` 开头，[BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt) 规范建议优先选择后者，但关于这点目前在业界是有争议的，普遍的观点是希望保留 `zh` 作为主语言标签，这样能更好的向前兼容。

## IANA 语言子标签注册表

了解了语言标签规范的发展历史，我们再回到 [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt) 规范，语言标签描述规则中的以下子标签:

``` bash
language - extlang - script - region - variant - extension - privateuse
复制代码
```

在这些子标签中 **推荐** 使用 [IANA 语言子标签注册表](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) 中的子标签格式，这些格式通常是来源于各种 ISO 标准中的通用约定。

示例 1：region 的取值 CN（中国）

``` bash
%%
Type: region
Subtag: CN
Description: China
Added: 2005-10-16
%%
复制代码
```

示例 2：script 的取值 Hans（简体中文）

``` bash
%%
Type: script
Subtag: Hans
Description: Han (Simplified variant)
Added: 2005-10-16
%%
复制代码
```

## 中文子标签一览

[IANA 语言子标签注册表](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry)中，以下 `extlang` 中的方言同时也被归类到了 `language` 中，[BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt) 规范是建议将下面的 `extlang` 直接作为主语言使用，而我个人的建议是主语言仍然使用 `zh`，而 `extlang` 作为扩展方言使用。

### language

* `zh` 中国字或中国话

### extlang

* `cdo` 闽东语
* `cjy` 晋语
* `cmn` 普通话或國語
* `cpx` 莆仙语
* `czh` 徽语
* `czo` 闽中语
* `gan` 赣语
* `hak` 客家话
* `hsn` 湘语
* `mnp` 闽北语
* `nan` 闽南语
* `wuu` 吴语
* `yue` 粤语
* `lzh` 文言文

### script

* `Hans` 简体汉字
* `Hant` 繁体汉字

### region

* `CN` CHINA 中国
* `HK` HONG KONG 香港
* `TW` Taiwan 台湾
* `SG` Singapore 新加坡

## 正确的写法

综上所述，从 [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt) 规范的定义中，我们不难发现 `zh-CN` 这种语言标签的写法已经过时，不符合规范，以下从网上摘抄了一些标准的写法：

### 文字例子

* 圆珠笔 `zh-Hans-CN`
* 原子筆 `zh-Hant-TW`
* 它是一个刮胡刀 `zh-Hans-CN`
* 佢系一个须刨嚟嘅 yue-Hans
* 佢係一個鬚刨嚟嘅 yue-Hant
* 驴不胜怒，蹄之 `zh-lzh-Hans`
* 驢不勝怒，蹄之 `zh-lzh-Hant`
* 驴发怒踢他了 `zh-Hans-CN`

### 语言标签解释

* `zh-Hans` 简体中文 (个人推荐)
* `zh-Hans-CN` 以简体中文书写的中国大陆用词
* `zh-Hans-HK` 以简体中文书写的香港地区用词
* `zh-Hant` 繁體中文
* `zh-Hant-HK` 以繁體中文書寫的香港地區用詞
* `zh-Hant-TW` 以繁體中文書寫的台灣地區用詞
* `yue` 粤语发音
* `cmn` 普通话或國語发音
* `yue-Hans` 以简体中文书写的粤语用词
* `zh-yue-Hans` 以简体中文书写的粤语用词 (个人推荐)
* `yue-Hant` 以繁體中文書寫的粵語用詞
* `cmn-Hans` 以简体中文书写的普通话用词
* `zh-cmn-Hans` 以简体中文书写的普通话用词 (个人推荐)
* `cmn-Hans-CN` 以简体中文书写的中国大陆普通话用词
* `cmn-Hant-HK` 以繁體中文書寫的香港地区普通話用詞
* `cmn-Hant-TW` 以繁體中文書寫的台湾地区國語用詞

## 资料参考

* [www.cnblogs.com/sink_cup/ar…](https://www.cnblogs.com/sink_cup/archive/2011/04/15/written_language_and_spoken_language.html)
* [www.cnblogs.com/sink_cup/ar…](https://www.cnblogs.com/sink_cup/archive/2010/07/01/language_subtag_registry.html)
* [www.jianshu.com/p/f00414cc5…](https://www.jianshu.com/p/f00414cc566e)
* [www.iana.org/assignments…](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry)
* [zh.wikipedia.org/wiki/IETF 語言…](https://zh.wikipedia.org/wiki/IETF%E8%AA%9E%E8%A8%80%E6%A8%99%E7%B1%A4#cite_note-10)
* [zhuanlan.zhihu.com/p/29305702](https://zhuanlan.zhihu.com/p/29305702)
* [www.zhihu.com/question/21…](https://www.zhihu.com/question/21980689/answer/93615123)
* [www.ietf.org/rfc/bcp/bcp…](https://www.ietf.org/rfc/bcp/bcp47.txt)
* [developer.mozilla.org/zh-CN/docs/…](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/lang)
