---
title: NVM安装和配置npm yarn pnpm
category: Node.js
tags:
  - nvm
cover: https://cdn.pixabay.com/photo/2021/04/30/14/53/deer-6219100_960_720.jpg
---

nvm 用于管理多个`node`版本的工具.

## Windows

### 下载安装与使用

1. 点击 [下载地址](https://github.com/coreybutler/nvm-windows/releases) 进入 nvm 下载页面;
2. 选择最新版本, 进去之后选择`nvm-setup.zip`安装版, 下载之后解压安装即可;

    >Select Destination Location(设置 nvm 安装路径)
    >F:\Node\nvm

3. 遇到`Set Node.js Symlink`步骤指的是设置 nodejs 的快捷方式存放的目录; 是待会 `nvm use` 存放你的 nodejs 程序的目录 .

    >Set Node.js Symlink(设置 nodejs 软连接)
    >F:\Node\nodejs
    >nodejs 这个文件夹可以不用创建,使用 nvm use 自动创建

4. 如果本地有安装过 node, 会提示是否加入 nvm 版本管理选择确定即可.

### 常用命令

|命令|含义|
|:----|:----|
|`nvm`|查看所有命令|
|`nvm version`| 显示当前运行的 nvm 版本, 可以简写为 `nvm v`|
|`nvm arch`| 显示 node 是运行在 32 位还是 64 位模式|
|`nvm arch [32/64]`| 指定 32 或 64 来覆盖默认体系结构|
|`nvm on`| 启用 node.js 版本管理|
|`nvm off`| 禁用 node.js 版本管理 (不卸载任何东西)|
|`nvm list`|查看现在使用的 node 版本|
|`nvm list available`|查看 node 所有可安装版本|
|`nvm current`|显示当前节点的激活版本|
|`nvm exec [--silent] [version] [command]`|使用指定的版本运行 command 命令|
|`nvm run [--silent] [version] [args]`|使用指定的版本运行 args|
|`nvm alias`| 对 version 版本设置一个别名|
|`nvm unalias`| 删除这个别名|
|`nvm install [version]`|安装指定版本 node|
|`nvm install [version] [arch]`| 默认是 64 位,32 位需指定|
|`nvm install-latest-npm`|在当前 node 版本上升级最新的 npm 版本|
|`nvm install --lts`|仅从 LTS 版本中选择安装|
|`nvm install --lts=[version]`|仅从特定 LTS 系列的版本中选择|
|`nvm reinstall-packages`|将 version 版本中的全局安装包安装到当前版本中|
|`nvm install --skip-default-packages`|跳过默认软件包文件|
|`nvm install --reinstall-packages-from=[version]`|重新安装对应的 node 版本|
|`nvm uninstall [version]`|卸载指定版本 node|
|`nvm uninstall 6.2.0`| 卸载对应的版本|
|`nvm use [version]`|使用指定版本 node|
|`nvm use --lts`| 使用 LTS 版本|
|`nvm use --lts=[version]`| 使用指定的 LTS 版本|
|`nvm use [version] [arch]`|切换到使用指定的 nodejs 版本. 可以指定 32/64 位 [arch]|
|`nvm use <arch>`|将继续使用所选版本, 但根据提供的值切换到 32/64 位模式|
|`nvm root [path]`| 设置 nvm 存储 node.js 不同版本的目录, 如果未设置, 将使用当前目录|
|`nvm proxy [url]`| 设置用于下载的代理. 留 [url] 空白, 以查看当前的代理. 设置 [url] 为 none 删除代理.|
|`nvm node_mirror [url]`|设置 node 镜像, 默认为`https://nodejs.org/dist`, 可以设置为淘宝的镜像`https://npm.taobao.org/mirrors/node`|
|`nvm npm_mirror [url]`|设置 npm 镜像, 默认为`https://github.com/npm/npm/archive`, 可以设置为淘宝的镜像`https://npm.taobao.org/mirrors/npm`|

使用`nvm install 16.17.0`下载完成后, 会在 `F:\Node\nvm` 文件夹下多个 `v16.17.0` 文件夹.

```bash
nvm use 16.17.0 # 引入使用
```

这时就会在 `Set Node.js Symlink`步骤指的是设置的目录`F:\Node\nodejs`出现个 [nodejs](https://nodejs.org/en) 包的解压程序.

查看已安装的 node 版本

```bash
nvm list
  * 16.17.0 (Currently using 64-bit executable)
```

更多命令使用键入 `nvm` 查看.

### 配置 npm 全局安装路径

#### 1、配置 prefix 和 cache 目录

+ 查看 npm 的所有配置

```bash
npm config list #查看基本配置
npm config list -l #查看所有配置
```

+ 改变 npm 全局安装位置

```bash
npm config set prefix "你的磁盘路径"
```

示例目录地址为：F:\Node\npm

```bash
npm config set prefix "F:\Node\npm"
```

+ 改变 npm 缓存位置

```bash
npm config set cache "你的磁盘路径"
```

示例目录地址为：F:\Node\npm\cache

```bash
npm config set cache "F:\Node\npm\cache"
```

`C:\Users\你的用户名`(win+r 输入`%HOMEPATH%`回车) 目录下会生成个 `.npmrc` 文件, 内容如下:

```bash
prefix=F:\Node\npm
cache=F:\Node\npm\cache
```

删除`C:\Users\你的用户名\AppData\Roaming`(`%APPDATA%`) 和`C:\Users\你的用户名\AppData\Local`(`%LOCALAPPDATA%`) 下面的

```bash
npm
npm-cache
```

去装些全局的东西 `npm install pnpm -g`.

全局的所有包都在这:`F:\Node\npm\node_modules`

#### 2、配置环境变量

在`设置--系统--关于--系统信息--高级程序设置--环境变量-系统变量`,
新增

```bash
变量名:NVM_HOME       变量值:F:\Node\nvm
变量名:NVM_SYMLINK    变量值:F:\Node\nodejs
#上面两条在安装NVM程序的时候会自动生成,如果存在则校验信息是否正确
变量名:NPM_HOME       变量值:F:\Node\npm
```

`NPM_HOME`的变量值就是上一步中, 通过 `npm config set prefix` 设置的值.可以用下面命令查看

```bash
npm config get prefix
# F:\Node\npm
```

变量`Path`中新增值:

```bash
%NVM_HOME%
%NVM_SYMLINK%
#上面两条在安装NVM程序的时候会自动生成,如果存在则校验信息是否正确
%NPM_HOME%
```

变量`Path`中删除值:

```bash
#如果存在
C:\Users\你的用户名\AppData\Roaming\npm
%APPDATA%\AppData\Roaming\npm
```

### [pnpm](https://www.pnpm.cn/installation)

#### 1. 安装 pnpm

```bash
# 全局安装pnpm
npm install -g pnpm
# pnpm 版本
pnpm -v | pnpm --version
```

#### 2.配置 pnpm 环境

+ pnpm 设置全局安装包的 bin 文件的目标目录

```bash
# pnpm 全局安装包的 bin 文件的目标目录
pnpm config set global-bin-dir "F:\Node\pnpm"
```

+ pnpm 指定储存全局依赖的目录

```bash
# pnpm 储存全局依赖的目录
pnpm config set global-dir "F:\Node\pnpm\global"
```

+ pnpm 全局仓库路径

```bash
# pnpm 全局仓库路径 (类似 .git 仓库)
pnpm config set store-dir "F:\Node\pnpm\store"
```

+ pnpm 创建 pnpm-state.json 文件的目录

```bash
# pnpm 创建 pnpm-state.json 文件的目录
pnpm config set state-dir "F:\Node\pnpm\state"
```

+ pnpm 全局缓存路径

```bash
# pnpm 全局缓存路径
pnpm config set cache-dir "F:\Node\pnpm\cache"
```

打开目录`C:\Users\你的用户名`(win+r 输入`%HOMEPATH%`回车) 目录下的 `.npmrc` 文件, 内容如下:

```bash
prefix=F:\Node\npm
cache=F:\Node\npm\cache

global-dir=F:\Node\pnpm\global
state-dir=F:\Node\pnpm\state
store-dir=F:\Node\pnpm\store
cache-dir=F:\Node\pnpm\cache
```

#### 3.配置环境变量

报错:

```bash
pnpm i -g npkill
#  ERROR  Unable to find the global bin directory
# Run "pnpm setup" to create it automatically, or set the global-bin-dir setting, or the PNPM_HOME env variable. The global bin directory should be in the PATH.
```

> `pnpm install -g <pkg>` 会在预先设定的地址安装全局命令.`pnpm` 不会再去全局的 `Node.js` 或者 `npm` 的文件夹安装命令.设置全局命令文件夹，要么设置 `PNPM_HOME` 环境变量或者 `global-bin-dir` 设置。

在`设置--系统--关于--系统信息--高级程序设置--环境变量-系统变量`新增

```bash
变量名:PNPM_HOME   变量值:F:\Node\pnpm
```

`PNPM_HOME`的变量值就是上一步中, 通过 `pnpm config set global-bin-dir` 设置的值.可以用下面命令查看

```bash
npm config get global-bin-dir
# F:\Node\pnpm
```

报错:`ERROR  The configured global bin directory "F:\Node\pnpm" is not in PATH`

变量`Path`中新增值:

```bash
%PNPM_HOME%
```

### Yarn 安装

+ 方式一：使用 npm 安装

```bash
npm install -g yarn
```

+ 方式二：使用安装文件安装

> 即在官网中下载 exe 文件安装（Windows），其它系统根据实际情况安装。

#### 1、配置 prefix 和 cache 目录

+ 查看 yarn 的所有配置

```bash
yarn config list
```

+ 改变 yarn 全局安装位置

```bash
yarn config set global-folder "你的磁盘路径"
```

示例目录地址为：F:\Node\yarn

```bash
yarn config set global-folder "F:\Node\yarn"
```

+ 改变 yarn 缓存位置

```bash
yarn config set cache-folder "你的磁盘路径"
```

示例目录地址为：F:\Node\yarn\cache

```bash
yarn config set cache-folder "F:\Node\yarn\cache"
```

> 或者在你的用户目录找到 `.yarnrc` 的文件(没有自行创建)打开它，直接进行编辑

打开`C:\Users\你的用户名`(win+r 输入`%HOMEPATH%`回车) 目录下的`.yarnrc` 文件, 内容如下:

```bash
global-folder "F:\\Node\\yarn"
cache-folder "F:\\Node\\yarn\\cache"
```

#### 2、配置环境变量

注: 如果上面全局安装 yarn 但是运行 yarn 命令提示找不到, 需要添加下面的环境变量

```bash
F:\Node\npm\node_modules\yarn\bin
```

在我们使用**全局安装**包的时候，会在"F:\Node\yarn"下生成 node_modules\.bin 目录

我们需要将`F:\Node\yarn\node_modules\.bin`整个目录 添加到**系统环境变量**中的**Path**中去，否则通过 yarn 添加的全局包 在 cmd 中是找不到的。

检查当前 yarn 的 bin 的 位置

```bash
yarn global bin
# F:\Node\npm\bin
```

检查当前 yarn 的 全局安装位置

```bash
yarn global dir
# F:\Node\yarn
```

#### 3、Yarn 配置阿里源

1、查看一下当前源

```bash
yarn config get registry
```

2、切换为淘宝源

```bash
yarn config set registry https://registry.npm.taobao.org
yarn config set sass_binary_site "https://npm.taobao.org/mirrors/node-sass/"
yarn config set phantomjs_cdnurl "http://cnpmjs.org/downloads"
yarn config set electron_mirror "https://npm.taobao.org/mirrors/electron/"
yarn config set sqlite3_binary_host_mirror "https://foxgis.oss-cn-shanghai.aliyuncs.com/"
yarn config set profiler_binary_host_mirror "https://npm.taobao.org/mirrors/node-inspector/"
yarn config set chromedriver_cdnurl "https://cdn.npm.taobao.org/dist/chromedriver"
```

### 安装 [cnpm](https://npm.taobao.org)

#### 临时使用

```bash
npm --registry https://registry.npm.taobao.org install express
```

#### 永久使用

```bash
npm config set registry https://registry.npm.taobao.org
```

#### 配置 CNPM

这样的话，你用 npm 走的还是官方的，cnpm 走的代理

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

#### 恢复使用

```bash
npm config set registry https://registry.npmjs.org
```

#### 验证是否设置成功

```bash
npm info express
or
npm config get registry
```

#### 默认源列表

N 代表 npm，Y 代表 yarn，*代表 npm 和 yarn 共用的源

```bash
N npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
Y taobao - https://registry.npm.taobao.org/
  yarn --- https://registry.yarnpkg.com/
```

### 安装加配置

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
npm install -g cnpm --registry=http://r.cnpmjs.org
```

`cnpm`默认配置了`-registry`和`-disturl`

可手动设置

```bash
npm config set registry https://registry.npm.taobao.org -g
npm config set disturl https://npm.taobao.org/dist -g
```

### 解决 nvm 无法切换源

> 由于最近重装了 node & nvm, 使用时 `nvm install` 正常, 但是切换源无法使用.

```bash
nvm use 8.0.0
Now using node v8.0.0 (64-bit) # 这个提示正常来讲是切换成功的

node -v
v7.6.4 # 还是原来版本
```

### 卸载原来已安装的 node, 与全局安装的包

#### Windows

1. 开始 - 搜索: node – 点击 uninstall node.js,  或者 从卸载程序卸载程序和功能.

2. 重新启动 (或者您可能会从任务管理器中杀死所有与节点相关的进程).

3. 寻找这些文件夹并删除它们 (及其内容)(如果还有). 根据您安装的版本,UAC 设置和 CPU 架构, 这些可能或可能不存在:

```bash
C:\Program Files (x86)\Nodejs
C:\Program Files\Nodejs
C:\Users\{User}\AppData\Roaming\npm(或%appdata%)
C:\Users\{User}\AppData\Roaming\npm-cache(或%appdata%)
```

4. 检查您的 %PATH% 环境变量以确保没有引用 Nodejs 或 npm 存在.

5. 如果仍然没有卸载, 请 where node 在命令提示符下键入, 您将看到它所在的位置 – 删除 (也可能是父目录).

6. 重新启动, 很好的措施.

#### linux

```bash
sudo apt-get remove --purge npm
sudo apt-get remove --purge nodejs
sudo apt-get remove --purge nodejs-legacy
sudo apt-get autoremove(这个不要轻易运行)
​
#手动删除 npm 相关目录
rm -r /usr/local/bin/npm
rm -r /usr/local/lib/node-modules
rm -r /tmp/npm*
rm -r /usr/local/n
rm -r /usr/local/lib/node_modules
```

### 解决 nvm 下载慢的问题

> 在程序安装目录下找到 `settings.txt`, 添加下面两行.

```bash
root: D:\Office\Node\nvm
path: D:\Office\Node\nodejs
+ node_mirror: https://npm.taobao.org/mirrors/npm
+ npm_mirror: https://npm.taobao.org/mirrors/npm
```

> node 淘宝镜像:[https://npm.taobao.org/mirrors/npm](https://npm.taobao.org/mirrors/npm)
>
> npm 淘宝镜像:[https://npm.taobao.org/mirrors/npm](https://npm.taobao.org/mirrors/npm)
>
> **注意**: 切换 node 版本后, 一些全局安装的依赖需要重新安装, 不会是用原来的.

## Mac OS

> 安装前卸载掉已安装的 Node 和已安装的全局模块

### 安装

> 安装前新建 .bash_profile 文件 (如果没有), 这样就不需要手动添加下面的代码. 安装的时候会自动插入 `.bash_profile`.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```

### 解决安装完成无法使用

安装成功后, 执行 `nvm`, 如果提示 `-bash: nvm: command not found`

新建 `~/.bash_profile` 文件

> 可以在安装 (curl...) 前新建 .bash_profile 文件 (如果没有), 这样就不需要手动添加下面的代码 (`export NVM_DIR...`). 安装的时候会自动插入 `.bash_profile`

```bash
vi ~/.bash_profile
```

输入以下代码

```bash
export NVM_DIR="${XDG_CONFIG_HOME/:-$HOME/.}nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

保存退出 `Esc` -> `:wq`, 再次执行 `nvm`

如果还是报错, 执行一下:

```bash
source ~/.nvm/nvm.sh
```

最后大功告成!

```bash
nvm --version
0.34.0
```

### 解决 zsh: command not found: nvm

> 报这个错, 说明你安装了 `oh-my-zsh`, nvm 的配置又放在 `.bash_profile` 文件里.

解决: 把 `.bash_profile` 文件中关于 nvm 的配置删除. 在 `.zshrc` 最后添加:

```bash
export NVM_DIR="${XDG_CONFIG_HOME/:-$HOME/.}nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

### 使用

```bash
nvm install node
nvm use 12.4.0
node -v
v12.4.0
npm -v
6.9.0
nvm install 10.16
nvm list # 查看已安装的 Node
```

### 卸载 NVM

```bash
sudo rm -rf `$NVM_DIR` # 执行完重启程序,输入 `nvm` 测试成功
```

> 还需要到以下文件中删除干净 `NVM_DIR` 相关的 (如果有)
> `~/.bash_profile`, `~/.zshrc`, `~/.profile`, or `~/.bashrc`
