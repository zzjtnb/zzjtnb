---
title: SourceTree 一直提示输入密码
category: Git
tags:
  - SourceTree
cover: https://cdn.pixabay.com/photo/2022/11/18/01/40/tropical-flower-7599292_1280.jpg
---

## SourceTree 一直提示输入密码

## 解决

1. `command+空格`搜索`钥匙串访问`

2. 左侧导航栏下种类下默认密钥串 (登录或者本地项目): 找到对应 `IP` 或者`网址`对应的钥匙串

3. 在终端 (terminal) 打开你的工程目录

4. 输入

```bash
git config --global credential.helper store
# 或者
git config --global credential.helper osxkeychain
```

5. 拉取代码

```bash
git pull
# 执行完成后会让你输入用户名密码
# Username for 'http://*.*.*.*': username
# Password for 'http://username@*.*.*.*: password
```

6. 允许 App 访问你的钥匙串

>如果你使用的是 Mac,Git 还有一种 "osxkeychain" 模式, 它会将凭证缓存到你系统用户的钥匙串中. 这种方式将凭证存放在磁盘中, 并且永不过期, 但是是被加密的, 这种加密方式与存放 HTTPS 凭证以及 Safari 的自动填写是相同的.

SourceTree  拉取代码会弹出`git-credential-osxkeychain`想要使用你储存在钥匙串的`*.*.*.*`中的钥匙串密码.
若要给予许可, 请输入"登录"钥匙串的密码
然书输入你计算机的当前用户名的密码
点击始终允许
>始终允许: 允许 App 在任何时候都不要求你输入密码即可取回密码.App 应该允许以后访问密码, 且不显示对话框.

后面就不用再输入了

## Git 凭证存储

今天给自己提了一个问题, 当我们在 github.com 或者 gitlab 上面新建仓库, 并克隆到本地, 首次使用的时候, 会被问及用户名密码, 但是这两个信息存在哪里呢?

带着这个问题,我开始搜索,并在[Pro Git7.14 Git - 工具 - 凭证存储](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%87%AD%E8%AF%81%E5%AD%98%E5%82%A8)中读到了完整的解答,但是当我第一次阅读的时候,并没有太清楚它所要表达的意思,于是我不断尝试后,总算是有所明白.

本文就作为一个解读贴, 作为补充.

### 凭证存储究竟要解决什么问题?

众所周知, 我们通常用 SSH 和 HTTP 协议来访问远程仓库.

SSH 协议并不采用这里讨论的凭证存储. 这里重点要描述的其实是 HTTP 协议下的凭证存储问题.

为什么会有这个问题呢? 因为 git 使用 HTTP 协议访问远程仓库进行操作的时候, 每个请求, 都需要带着用户名和密码以及一个防止重放攻击的随机码.

所以[Pro Git7.14 Git - 工具 - 凭证存储](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%87%AD%E8%AF%81%E5%AD%98%E5%82%A8),就指出,默认情况下每次进行操作的时候,都需要提供用户名和密码.

### 默认情况下你为什么没有被要求每次都输入用户名密码?

[Pro Git7.14 Git - 工具 - 凭证存储](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%87%AD%E8%AF%81%E5%AD%98%E5%82%A8)中的第一部分,针对这个问题也给出了解释.

如果你是 Mac 系统,git 默认是提供`osxkeychain`辅助程序来管理你的密码, 以至于每次你当你需要提供用户名和密码的时候,`osxkeychain`辅助程序都默默帮你填写了.

如果你是 Windows 系统, 你可能已经安装了`git-credential-winstore`了. 如果安装的是 Git GUI, 则提供的是`git-credential-manager`.

除此之外, 你也可以使用`git-credential-store`和`git-credential-cache`来管理密码, 前者在文件中用明文存储密码, 后者存在内存中.

而这几种方式都可以同时存在.

### 我们该如何选择 / 设置辅助程序的类型?

在回答这个问题前, 我们先简单看一下, 什么是辅助程序? 这个翻译对应的其实是 credential.helper 配置项, 我们可以通过如下命令查看当前配置:

```bash
git config --list | grep credential
```

Mac, 默认会输出:

```bash
include.path=.gitcredential
credential.helper=osxkeychain
```

对应的也就是 Mac 的 "钥匙串" 系统, 我们可以通过 Mac 系统菜单页面 "其他 -> 钥匙串访问"功能, 搜索 git 关键字查看.

Windows 安装 Git GUI 后, 默认会输出:

```bash
credential.helper=manager
```

接下来, 我们再设置一个明文文件存储的, 也就是 store 类型的全局存储, 使用下面的命令来试一下:

```bash
git config --global credential.helper store
```

虽然原文中提到 store 中提到可以使用 --file 命令, 但是实测在命令行下无效.(原因不未知)

但是可以通过直接编辑配置文件的方式来达到目的:

设置全局的:

```bash
git config --global -e
```

设置针对当前项目的:

```bash
git config --local -e
```

然后在 [credential] 配置节下添加:

```bash
helper = store --file $HOME/git-credentials/global.gitcredentials
helper = store
```

其中, 存储该文件的路径必须提前存在.

两行中,第一行代表指定目录,第二行代表使用[默认路径](https://git-scm.com/docs/git-credential-store).

(这里我们分别对 --global 和 --local 都做了设置)

```bash
[user]
        name = username
        email = email

[credential]
        helper = store --file $HOME/git-credentials/global.gitcredentials
        helper = store
```

再次运行后

```bash
git config --list | grep credential
```

会输出 (Mac):

```bash
include.path=.gitcredential

credential.helper=osxkeychain

credential.helper=store --file $HOME/git-credentials/global.gitcredentials

credential.helper=store

credential.helper=store --file $HOME/git-credentials/v-labs.gitcredentials
```

也就是说, 不仅支持 osxkeychain 模式, 还同时支持了 store 模式.

为了测试效果, 打开 "钥匙串访问" 程序 (如果是 Mac 的话), 搜索 git, 把所有出现的都删掉.

这时候使用`git push`命令向远程提交变更.(因为刚刚设置了较多的辅助程序, 因此会比较慢).

这时如果提示输入用户名密码, 就按正确的值输入. 当你被提示成功后, 这期间, 我们刚刚输入的密码, 都被存到了我们设置的所有辅助程序对应的凭证存储中.

在 "钥匙串访问" 程序中, 我们也会看到一条新增的凭证信息.

### 我们既然存储了密码, 那密码在哪, 又是什么呢?

先来看几个使用 store 类型的凭证存储, 它们以文本形式明文存在, 我们刚刚既在指定路径也在默认路径上进行了设置, 那么我们分别输入下面三个命令, 就可以查看到密码了:

```bash
localhost:~ xxx$ cd git-credentials/

localhost:git-credentials xxx$ ls
global.gitcredentials v-labs.gitcredentials

localhost:git-credentials xxx$ cat global.gitcredentials
https://*.*.*.*

localhost:git-credentials xxx$ cat v-labs.gitcredentials
https://*.*.*.*

localhost:git-credentials xxx$ cat ~/.git-credentials
https://*.*.*.*
```

当然,也可以用[Pro Git7.14 Git - 工具 - 凭证存储](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%87%AD%E8%AF%81%E5%AD%98%E5%82%A8)中提到的`git credential-store --file ~/git.store store`命令来读取了.

那么, 使用 Mac 的`osxkeychain`的钥匙串管理, 是否可以拿回密码呢?

答案是肯定的!

```bash
localhost:git-credentials xxx$ git credential-osxkeychain get
protocol=https
host=github.com

password=xxx
username=xxx
```

由这一点可以看出,在[Pro Git7.14 Git - 工具 - 凭证存储](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%87%AD%E8%AF%81%E5%AD%98%E5%82%A8)中提到的`foo`就是这个辅助程序的名字.

## get/store/erase 是什么作用?

从[Pro Git7.14 Git - 工具 - 凭证存储](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%87%AD%E8%AF%81%E5%AD%98%E5%82%A8)看,这三个均称为 Action,其实也就是从辅助程序获取密码(get)/ 设置密码(store)/ 删除密码(erase).

刚刚的动作中能 get 到密码了, 那么我们尝试删除一下. 执行以下命令试一下:

```bash
localhost:v-labs xxx$ git credential-osxkeychain erase
protocol=https
host=github.com
```

再次用以下代码验证, 将没有返回值. 使用 "钥匙串访问" 程序, 也将看不到新添加的凭证.

```bash
localhost:git-credentials xxx$ git credential-osxkeychain get
protocol=https
host=github.com
```

### 那 git credential fill 是什么用的?

在每次进行访问 git push(或其他需要用户名密码的命令) 的时候, 都会调用该方法, 它按照由近及远的思路, 尝试向辅助程序获取用户密码, 如果成功, 就用这个获得的用户密码去访问远程仓库. 如果获取不到, 就会让用户输入一次, 并尝试保存下来.

因此我们第一次使用的时候, 会被提示输入用户名密码, 就是因为 git 的内部调用了这个命令.

### 辅助程序是否可以自己定义呢?

答案当然是肯定的,在[Pro Git7.14 Git - 工具 - 凭证存储](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%87%AD%E8%AF%81%E5%AD%98%E5%82%A8)中也提供了 ruby 的示例.

### 按部就班: 拿回自己的密码

前面说了那么多, 都在帮助我们去理解整套凭证体系, 这一段用一个连贯的思路来取回自己的密码:

```bash
GC-RMBP:~ xxx$ git config --list | grep credential.helper
credential.helper=osxkeychain
GC-RMBP:~ xxx$ git credential-osxkeychain get
protocol=https
host=github.com

password=xxx
username=xxx
```

其中第二个命令的`osxkeychain`是由第一个命令得出来的.

### 刚刚设置了那么多, 我想删掉那些 store 存储怎么处理?

我们可以使用刚刚直接编辑 config 文件的思路, 直接修改后保存.

同时我们需要注意, 那些已经被明文保存的密码, 我们需要自行删掉.

也可以使用以下命令:

```bash
git config --global --unset credential.helper -f
git config --local --unset credential.helper -f
rm -rf $HOME/git-credentials
rm ~/.git-credentials
```

使用下面命令验证, 应该已经看不到结果了:

```bash
localhost:~ xxx$ git credential-store get
protocol=https
host=github.com
```

至此, 所有关于配置相关的内容都已经解释完毕.

结论就是, 如果不打算明文存储密码, 就尽量使用 SSH 的方式.

## 参考资料

[允许 App 访问你的钥匙串](https://support.apple.com/zh-cn/guide/mac-help/kychn002/13.0/mac/13.0.1)

[Git 工具 - 凭证存储](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%87%AD%E8%AF%81%E5%AD%98%E5%82%A8)
