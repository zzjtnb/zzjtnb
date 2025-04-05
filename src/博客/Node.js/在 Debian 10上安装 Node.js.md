---
title: 在Debian 10上安装Node.js
category: Node.js
tags:
  - Node.js
cover: https://cdn.pixabay.com/photo/2021/02/24/09/51/magical-6046020_960_720.jpg
---

Node.js 是一个用于通用编程的 JavaScript 平台，允许用户快速构建异步网络应用程序。通过在前端和后端利用 JavaScript，Node.js 可以使 Web 应用程序开发更加一致......

### 介绍

[Node.js](https://nodejs.org/en/) 是一个用于通用编程的 JavaScript 平台，允许用户快速构建异步网络应用程序。 通过在前端和后端利用 JavaScript，Node.js 可以使 Web 应用程序开发更加一致和集成。

在本指南中，我们将向您展示如何在 Debian 10 服务器上开始使用 Node.js. 我们将讨论从默认 Debian 存储库安装 Node，使用更新的 PPA 存储库，并使用 NVM（节点版本管理器）来安装和激活不同版本的 Node。

最后，我们将展示如何卸载这些不同版本的 Node。

## 先决条件

本指南假设您使用的是 Debian 10. 在开始之前，您应该让非 root 用户在您的系统上设置 sudo 权限。 您可以通过遵循 Debian 10 教程的初始服务器设置来学习如何设置它。

## 安装官方 Debian Node.js 包

Debian 在其默认存储库中包含一个 Node.js 版本。 在撰写本文时，此版本为 10.15.2，将于 2021 年 4 月 1 日达到使用寿命。在此日期，将不再支持安全性和错误修复。 如果您想使用易于安装，稳定和长期的选项来试验 Node，那么从 Debian 仓库安装可能是有意义的。

要从默认的 Debian 软件存储库中获取 Node.js，您可以使用`apt`包管理器。 首先，刷新本地包索引：

```bash
sudo apt update
```

然后安装 Node.js 包，并`npm` Node Package Manager：

```bash
sudo apt install nodejs npm
```

要验证安装是否成功，请运行带有`-v`标志的`node`命令以获取版本：

```bash
node -v
```

```bash
Outputv10.15.2
```

如果您需要比此更新的 Node.js 版本，接下来的两节将介绍其他安装选项。

## 使用 PPA 安装

要使用更新版本的 Node.js，您可以从 [NodeSource](https://nodesource.com/) 维护的 _PPA_ （个人包存档）进行[安装](https://nodesource.com/) 。 这是一个备用存储库，仍然可以使用 `apt，并且将拥有比官方 Debian 存储库更多的 Node.js 最新版本。 NodeSource 具有从 0.10 到 12 的节点版本可用的 PPA。

我们现在安装 PPA。 这会将存储库添加到我们的包列表中，并允许我们使用`apt`安装新包。

在您的主目录中，使用`curl`检索首选 Node.js 版本的安装脚本，确保将`12.x`替换为您首选的版本字符串（如果不同）：

```bash
cd ~
curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
```

您可以使用`nano`或首选文本编辑器检查此脚本的内容：

```bash
nano nodesource_setup.sh
```

如果一切正常，请退出文本编辑器并使用`sudo`运行脚本：

```bash
sudo bash nodesource_setup.sh
```

PPA 将添加到您的配置中，您的本地包缓存将自动更新。 现在，您可以像上一步一样安装`nodejs`包：

```bash
sudo apt install nodejs
```

在这种情况下，我们不需要为`npm`安装单独的包，因为它包含在`nodejs` packae 中。

通过使用`-v` version 选项运行`node`验证安装：

```bash
node -v
```

```bash
Outputv12.8.0
```

`npm`使用主目录中的配置文件来跟踪更新。 它将在您第一次运行`npm`时创建。 执行此命令以验证是否已安装`npm`并创建配置文件：

```bash
npm -v
```

```bash
Output6.10.2
```

为了使某些`npm`包能够工作（例如，需要从源代码编译代码），您需要安装`build-essential`包：

```bash
sudo apt install build-essential
```

您现在拥有必要的工具来处理需要从源代码编译代码的`npm`包。

## 使用 NVM 安装

通过`apt`安装 Node.js 的替代方法是使用名为`nvm`的工具，它代表 “节点版本管理器”。 `nvm`不是在操作系统级别工作，而是在用户主目录中的独立目录级别工作。 这意味着您可以安装多个自包含的 Node.js 版本，而不会影响整个系统。

使用`nvm`控制您的环境允许您访问最新版本的 Node.js，同时保留和管理以前的版本。 然而，它是与`apt`不同的实用程序，并且您使用它管理的 Node.js 版本与您使用`apt`管理的版本不同。

要从[项目的 GitHub 页面](https://github.com/creationix/nvm)下载`nvm`安装脚本，您可以使用`curl` 。 请注意，版本号可能与此处突出显示的不同：

```bash
curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh -o install_nvm.sh
```

使用`nano`检查安装脚本：

```bash
nano install_nvm.sh
```

如果脚本看起来没问题，退出文本编辑器并使用`bash`运行脚本：

```bash
bash install_nvm.sh
```

我们这里不需要`sudo` ，因为`nvm`没有安装到任何特权系统目录中。 它将安装软件到`~/.nvm`主目录的子目录中。 它还会为`~/.profile`文件添加一些配置以启用新软件。

要获得对`nvm`功能的访问权限，您需要注销并重新登录或获取`~/.profile`文件，以便当前会话知道更改：

```bash
source ~/.profile
```

安装`nvm` ，您可以安装隔离的 Node.js 版本。 有关可用的 Node.js 版本的信息，请键入：

```bash
nvm ls-remote
```

```bash
Output. . .
       v10.16.2   (Latest LTS: Dubnium)
        v11.0.0
        v11.1.0
        v11.2.0
        v11.3.0
        v11.4.0
        v11.5.0
        v11.6.0
        v11.7.0
        v11.8.0
        v11.9.0
       v11.10.0
       v11.10.1
       v11.11.0
       v11.12.0
       v11.13.0
       v11.14.0
       v11.15.0
        v12.0.0
        v12.1.0
        v12.2.0
        v12.3.0
        v12.3.1
        v12.4.0
        v12.5.0
        v12.6.0
        v12.7.0
        v12.8.0

```

如您所见，本文撰写时的当前 LTS 版本为 v10.16.2。 您可以通过输入以下命令安装：

```bash
nvm install 10.16.2
```

通常， `nvm`将切换为使用最近安装的版本。 您可以通过键入以下命令告诉`nvm`使用您刚刚下载的版本：

```bash
nvm use 10.16.2
```

与往常一样，您可以通过键入以下内容来验证当前正在使用的 Node.js 版本：

```bash
node -v
```

```bash
Outputv10.16.2
```

如果您有多个 Node.js 版本，则可以通过键入以下内容来查看安装的内容：

```bash
nvm ls
```

如果您希望默认使用其中一个版本，请键入：

```bash
nvm alias default 10.16.2
```

当新会话产生时，将自动选择此版本。 您也可以通过以下别名引用它：

```bash
nvm use default
```

每个版本的 Node.js 都会跟踪自己的软件包，并且可以使用`npm`来管理这些软件包。

## 删除 Node.js

您可以使用`apt`或`nvm`卸载 Node.js，具体取决于您要定位的版本。 要删除从 Debian 存储库或 PPA 安装的版本，您需要在系统级别使用`apt`实用程序。

要删除其中任何一个版本，请键入以下内容：

```bash
sudo apt remove nodejs
```

此命令将删除程序包和配置文件。

要卸载已使用`nvm`启用的 Node.js 版本，请首先确定要删除的版本是否为当前活动版本：

```bash
nvm current
```

如果您要定位的版本**不是**当前的活动版本，则可以运行：

```bash
nvm uninstall node_version
```

此命令将卸载所选的 Node.js 版本。

如果要删除的版本**是**当前活动版本，则必须先停用`nvm`以启用更改：

```bash
nvm deactivate
```

您现在可以使用上面的`uninstall`命令卸载当前版本，这将删除与目标版本的 Node.js 相关联的所有文件，但可用于重新安装的缓存文件除外。

## 结论

在 Debian 10 服务器上有很多方法可以启动和运行 Node.js. 您的情况将决定上述哪种方法最适合您的需求。 虽然在 Debian 存储库中使用打包版本是一个实验选项，但从 PPA 安装并使用`npm`或`nvm`提供了额外的灵活性。
