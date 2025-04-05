---
title: 一篇文章搞定Github API 调用 (v3）
category: 前端
tags:
  - Github
cover: https://images.unsplash.com/photo-1539362286735-21789f9187f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjI0MX0&auto=format&fit=crop&w=1350&q=80
---

> 对于常用 Github 的用户来说，经常有一些自动化的需求。比如我的需求是定时备份 Github 的 issues 和 comments 到本地。以下为 Github 的 API 的使用参考。

[v3 版 API 的文档链接](https://developer.github.com/v3/)  
[v3 版 API 的官方教程](https://developer.github.com/v3/guides/getting-started/)

## 基本访问路径 (Root Endpoints)

一开始读文档的时候，照着它的事例直接在命令行里`curl`，或者在 InSomnia 或 Postman 软件里访问，都完美显示 200 状态。可是一旦把链接里改写成自己的用户名就各种显示 404 无页面。还以为是授权问题，然后在页头 HEADER 中按照各种方式试了 username 和 token 密钥，都没用还是 404。结果发现，原来不是方法的问题，纯粹是链接地址没写对！  
`实际上只是读取的话，完全不用任何授权`，可以在命令行、Insomnia、网页等各种情况下直接输入链接访问任何人的所有公开信息。  
然后对照[官方路径列表 Root Endpoints](https://api.github.com/) 得到的链接，好像怎么访问都不对。反而在 Stackoverflow 中看到的一个链接，顺藤摸瓜自己发现了各种正确的访问路径，总结如下：

* 首先！访问的链接最后不能有`/`。如`https://api.github.com/users/solomonxie`是可以访问到我个人信息的，但是`https://api.github.com/users/solomonxie/`就不行了，唯一不同是多了一个`/`.
* 其次！不同于一般 URL 访问，GIthub 的 API 访问链接是`区分大小写`的！
* 个人主要信息。 `https://api.github.com/users/用户名`, 得到数据如下图：

![1460000015144131](https://segmentfault.com/img/remote/1460000015144131)

* 个人所有 repo。`https://api.github.com/users/用户名/repos`。会得到一个 repo 的 JSON 格式列表。
* repo 详细信息。`https://api.github.com/repos/用户名/仓库名`。repo 的路径就开始和个人信息不同了。
* 获取某个 repo 的内容列表。`https://api.github.com/repos/solomonxie/gists/contents`，注意这只会返回根目录的内容。
* 获取 repo 中子目录的内容列表。`https://api.github.com/repos/solomonxie/gists/contents/目录名`。一定要注意这里一定要完全遵循原文件名的大小写，否则无法获得信息。如果是更深层的内容，则在链接列按照顺序逐级写上目录名称。
* 获取 repo 中某文件信息（不包括内容）。`https://api.github.com/repos/solomonxie/gists/contents/文件路径`。文件路径是文件的完整路径，区分大小写。只会返回文件基本信息。
* 获取某文件的原始内容（Raw）。1. 通过上面的文件信息中提取`download_url`这条链接，就能获取它的原始内容了。2. 或者直接访问：`https://raw.githubusercontent.com/用户名/仓库名/分支名/文件路径`
* repo 中所有的 commits 列表。`https://api.github.com/repos/用户名/仓库名/commits`。
* 某一条 commit 详情。`https://api.github.com/repos/用户名/仓库名/commits/某一条commit的SHA`
* issues 列表。`https://api.github.com/repos/用户名/仓库名/issues`。
* 某条 issue 详情。`https://api.github.com/repos/用户名/仓库名/issues/序号`。issues 都是以 1,2,3 这样的序列排号的。
* 某 issue 中的 comments 列表。`https://api.github.com/repos/用户名/仓库名/issues/序号/comments`。
* 某 comment 详情。`https://api.github.com/repos/用户名/仓库名/issues/comments/评论详情的ID`。其中评论 ID 是从 issues 列表中获得的。

## 查询参数 (Parameters)

如果在上面基本链接中加入查询条件，那么返回的数据就是 filtered，过滤了的。比如要求只返回正在开放的 issues，或者让列表数据分页显示。常用如下：

* 分页功能。格式是`?page=页数&per_page=每页包含数量`。

如`https://api.github.com/users/solomonxie/repos?page=2&per_page=3`

* issues 状态。格式是`?state=状态`。

如`https://api.github.com/repos/solomonxie/solomonxie.github.io/issues?state=closed`

## 权限认证 Authentication

> 首先需要知道都是，到此为止之前所有都查询都是不需要任何权限的，给个地址就返回数据，全公开。  
> 但是创建文件、更新、删除等就是必须用自己的账号 "登录" 才能实现的。所以为了下面的增删改做准备，需要先看一下权限问题。  
> 官网虽然写的很简答，不过如果不熟悉 API 的话还是不能马上就理解。

常用的认证方法有三种，`Basic authentication`, `OAuth2 token`, `OAuth2 key/secret`  
三种方法效果一样，但是各有其特点和方便之处。选哪种就要看自己哪种方便了。

### 认证方法一：Basic authentication

这种最简单，如果是用 curl 的话，就：

``` bash
curl -u "用户名:密码" https:

```

如果是用 Insomnia 等 api 调试工具的话，直接在 Auth 选项栏里选 Basic Auth，然后填上用户名密码即可。

### 认证方法二：OAuth2 token

#### 关于 token

> 这种 token 方式，说实话如果不是操作过 API 或深度了解 REST 的话，是很难理解的东西。  
> 说白了就是`第二个密码`，你既不用到处泄露自己的用户名密码，又可以专门给这个 "第二密码" 设置不同需要的权限，如有的只可读有的还可以写等。而且这个 “第二密码” 是既包括用户名又包括密码功能的，全站只此一个绝对不会和别人重复。初次之外，你还可以设置很多个 token，也就是第三、第四、第五... 密码。很方便。

#### 设置 token 方法

就位于 github 个人账号设置 -> 开发者设置 -> 个人 token 里。创建一个新 token 时，可以选择具体的权限，创建成功时一定要复制到本地哪里保存，只会让你看见一次，如果忘记的话就需要重新生成（其实丢了也不算麻烦）。  
![1460000015144132](https://segmentfault.com/img/remote/1460000015144132)

另外！注意：

> token 字符串不能存储在 github 的 repo 中，经过测试，一旦提交的文件中包含这个 token 字符串，那么 github 就会自动删除这个 token -_-! 我用了很久才明白过来，创建的 Personal Access Token 总是自动消失，还以为是有时限的。

#### 用 token 通过权限认证

有两种传送方法，哪种都可以：

1. 作为 url 中的参数明文传输：

``` bash
curl https:

```

1. 作为 header 中的参数传输：

``` bash
curl -H "Authorization: token OAUTH-TOKEN" https:

```

如果不是用 curl 而是 Insomnia 测试的话，和上面 basic auth 是大同小异的，很容易操作就不复述了。  
到此为止，权限认证就算搞清了，而且也实际验证过有效了。强烈建议用 insomnia 工具操作，有 GUI 界面方便理解，成功后再转为 curl 或 python 等程序语言。

### 认证方法三：OAuth2 key/secret

这个是除了 Personal Access Token 之外的另一种好用的方法，即创建自己的 OAuth app，然后得到一对`client_id`和`client_secret`。如下：  
![1460000015144133](https://segmentfault.com/img/remote/1460000015144133)  
![1460000015144134](https://segmentfault.com/img/remote/1460000015144134)  
得到这两个值之后，直接在访问任何 api 的 url 连接后面显性加上这两个参数即可完成认证，如：  
`https://api.github.com/users/yourusername?client_id=YOUR-CLIENT-ID&client_secret=YOUR-CLIENT-SECRET`  
但是：

> 目前这种认证方式**不支持**查询以外的操作，也就是只能 GET 获取某些 api 信息，不能执行 request 里的任何 PUT/PATCH/DELETE 操作。

## 创建新文件 Create content

> [Contents 操作 官方文档](https://developer.github.com/v3/repos/contents/#get-contents)

* 传输方法：`PUT`
* 访问路径：`https://api.github.com/repos/用户名/仓库名/contents/文件路径`
* JSON 格式：

``` bash
{
  "message": "commit from INSOMNIA",
  "content": "bXkgbmV3IGZpbGUgY29udGVudHM="
}

```

JSON 填写如下图：  
![1460000015144135](https://segmentfault.com/img/remote/1460000015144135)

* 注意：1. 必须添加权限验证（上面有写） 2. 数据传送格式选择 JSON 3. 文件内容必须是把文件整体转为 Base64 字符串再存到 JSON 变量中 4. 文件路径中如果有不存在的文件夹，则会自动创建

起初不管怎么尝试都一直报同样都错误，400 Invalid JSON，如下图：  
[图片上传失败...(image-884e71-1527903120996)]

最后发现原来是犯了很小很小都错误才导致如此：  
![1460000015144136](https://segmentfault.com/img/remote/1460000015144136)  
原来，我的 token 看似是正常的，唯独错误的是，多了一个空行！也就是说，标明都是 invalid JSON，结果没注意竟然是 invalid Token!

增加文件成功后返回的消息：  
![1460000015144137](https://segmentfault.com/img/remote/1460000015144137)

## 更新文件 Update content

> 主要这几点： 1. 传送方式用`PUT` 和创建文件一样 2. 需要权限验证，3. 传输内容数据用 JSON 4. 需要指定该文件的 SHA 码 4. 路径和访问 content 时一样 5. 文件内容必须是把文件整体转为 Base64 字符串再存到 JSON 变量中

* 传输方法：`PUT`
* 访问路径：`https://api.github.com/repos/用户名/仓库名/contents/文件路径`
* JSON 格式：

``` bash
{
  "message": "update from INSOMNIA",
  "content": "Y3JlYXRlIGZpbGUgZnJvbSBJTlNPTU5JQQoKSXQncyB1cGRhdGVkISEhCgpJdCdzIHVwZGF0ZWQgYWdhaW4hIQ==",
  "sha": "57642f5283c98f6ffa75d65e2bf49d05042b4a6d"
}

```

* 注意：必须指定该文件的`SHA码`，相当于文件的 ID。

`SHA`虽然是对文件的唯一识别码，相当于 ID，但是它是会随着文件内容变化而变化的！所以必须每次都重新获取才行

至于获取方式，验证后发现，目前最靠谱的是用前面的`get content`获取到该文件的信息，然后里面找到`sha`。

对上传时的 JSON 格式另有要求，如果没有按照要求把必填项输入，则会出现 422 错误信息：  
![1460000015144138](https://segmentfault.com/img/remote/1460000015144138)

或者如果用错了 SHA，会出现 409 错误消息：  
![1460000015144139](https://segmentfault.com/img/remote/1460000015144139)

如果正确传送，就会显示 200 完成更新：  
![1460000015144140](https://segmentfault.com/img/remote/1460000015144140)

## 删除文件 Delete content

* 传输方法：`DELETE`
* 访问路径：`https://api.github.com/repos/用户名/仓库名/contents/文件路径`
* JSON 格式：

``` bash
{
  "message": "delete a file",
  "sha": "46d2b1f2ef54669a974165d0b37979e9adba1ab2"
}

```

删除成功后，会返回 200 消息：  
![1460000015144141](https://segmentfault.com/img/remote/1460000015144141)

## 增删改 issues

> 如果做过了上面文件的增删改，这里大同小异，不同的访问路径和 JSON 的格式而已。唯一不同的是，issues 是不用把内容转为 Base64 码的。

参考链接：[github 官方文档](https://developer.github.com/v3/issues/#create-an-issue)

### 增加一条 issue

* 传输方法：`POST`
* 访问路径：`https://api.github.com/repos/用户名/仓库名/issues`
* JSON 格式：

``` bash
{
  "title": "Creating issue from API",
  "body": "Posting a issue from Insomnia"
}

```

* 注意：issue 的数据里面是可以加 label，milestone 和 assignees 的。但是必须注意 milestone 和 assignees 必须是已有的名次完全对应才行，否则无法完成创建。

### 更改某条 issue

* 传输方法：`PATCH`
* 访问路径：`https://api.github.com/repos/用户名/仓库名/issues/序号`
* JSON 格式：

``` bash
{
  "title": "Creating issue from API ---updated",
  "body": "Posting a issue from Insomnia \n\n Updated from insomnia.",
  "state": "open"
}

```

* 注意：如果 JSON 中加入空白的 labels 或 assignees，如`"labels": []`，作用就是清空所有的标签和相关人。

### 锁住某条 issue

不允许别人评论（自己可以）  
![1460000015144142](https://segmentfault.com/img/remote/1460000015144142)

* 传输方法：`PUT`
* 访问路径：`https://api.github.com/repos/用户名/仓库名/issues/序号/lock`
* JSON 格式：

``` bash
{
  "locked": true,
  "active_lock_reason": "too heated"
}

```

* 注意：active_lock_reason 只能有 4 种值可选：`off-topic`, `too heated`, `resolved`, `spam`，否则报错。

另外，成功锁住，会返回`204 No Content`信息。

### 解锁某条 issue

* 传输方法：`DELETE`
* 访问路径：`https://api.github.com/repos/用户名/仓库名/issues/序号/lock`
* 无 JSON 传输

## 增删改 comments

> 参考[官方文档](https://developer.github.com/v3/issues/comments/#create-a-comment)

### 增加 comment

* 传输方法：`POST`
* 访问路径：`https://api.github.com/repos/用户名/仓库名/issues/序号/comments`
* JSON 格式：

``` bash
{
  "body": "Create a comment from API"
}

```

### 更改 comment

* 传输方法：`PATCH`
* 访问路径：`https://api.github.com/repos/用户名/仓库名/issues/comments/评论ID`
* JSON 格式：

``` bash
{
  "body": "Create a comment from API \n\n----Updated"
}

```

* 注意：地址中，issues 后不用序号了，因为可以通过唯一的`评论ID`追查到。查看评论 ID 的方法，直接在上面查询链接中找。

### 删除 comment

* 传输方法：`DELETE`
* 访问路径：`https://api.github.com/repos/用户名/仓库名/issues/comments/评论ID`
* 无传输数据
