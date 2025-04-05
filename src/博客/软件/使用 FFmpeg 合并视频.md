---
title: 使用ffmpeg合并视频
category: 软件
tags:
  - ffmpeg
cover: https://cdn.pixabay.com/photo/2020/05/31/19/38/job-5243951_960_720.jpg
---

## 故事的背景是这样的

有三个素材视频，名称分别为 1.mp4、2.mp4、……\3.mp4。
然后我就去下载了 ffmpeg。
ffmpeg 下载地址：<https://ffmpeg.zeranoe.com/builds/>
并且将解压后的文件的 bin 目录的位置加入到了环境变量 PATH 中。

然后在视频文件所在目录下新建一个文件**filelist.txt**，内容如下：

```json
file '1.mp4'
file '2.mp4'
file '3.mp4'
```

注意事项：视频文件名不要有中文
在命令行执行如下命令：
`ffmpeg -f concat -i filelist.txt -c copy output.mp4`
然后，一个合并好的 output.mp4 文件就生成了！
