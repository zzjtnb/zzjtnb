---
title: Nest.js 项目创建&路由设置&模块
category: Node.js
tags:
  - Nest.js
cover: https://cdn.pixabay.com/photo/2021/06/01/16/15/island-6302137_960_720.jpg
---

> Nest 是一个用于构建高效，可扩展的 Node.js 服务器端应用程序的框架。它使用渐进式 JavaScript，内置并完全支持 TypeScript（但仍然允许开发人员使用纯 JavaScript 编写代码）并结合了 OOP（面向对象编程），FP（函数式编程）和 FRP（函数式响应编程）的元素。
>
> 在底层，Nest 使用强大的 HTTP Server 框架，如 Express（默认）和 Fastify。Nest 在这些框架之上提供了一定程度的抽象，同时也将其 API 直接暴露给开发人员。这样可以轻松使用每个平台的无数第三方模块。

## 一、项目创建

先确操作系统上安装了 Node.js（>= 8.9.0），然后安装 Nest.js，然后新建项目，输入如下指令：

```bash
npm i -g @nestjs/cli
nest new project-name
```

输入完后, 会初始化, 此时, 会问你使用哪一种方式来依赖包:

我选择的是 `yarn`, 主要是国内的 `npm` 下载得比较慢. 如果没有 `yarn` 的, 可以下载一个, 也可以使用 `npm`, 不过本系列教程都可以使用 `yarn`.

等鸡啄面完完, 等狗舔, 等火烧了锁最终创建完成

按照提示, 进入项目, 不出意外, 目录应该是这样的:

```bash
app
├── nest-cli.json
├── README.md
├── src
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock
```

运行 `yarn run start` 或 `yarn start`, 会显示服务输出信息, 表示已启动:

```bash
[Nest] 9108   - 2021/06/06 上午5:08:52   [NestApplication] Nest application successfully started +2ms
```

## 二、Hello World

### 1. 路由指向

打开 `src` 下的 `main.ts`，不出意外，应该会看到下列代码：

```js
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

`await NestFactory.create(AppModule);` 表示使用 Nest 的工厂函数创建了 AppModule，关于 Module 稍后会介绍。

`await app.listen(3000)` 表示监听的是 3000 端口，这个可以自定义。若 3000 端口被占用导致项目启动失败，可以修改成其他端口。

然后我们通过 Postman 访问本地的 3000 端口会出现 `Hello World!`
然后我们需要做的就是，找到为什么会出现 `Hello World!` 的原因。

打开 `src` 下的 `app.service.ts`，会看到如下代码：

```js
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

发现这里有个方法 `getHello()`，返回了 `Hello World!` 字符串，那么它在哪里被调用呢？

打开 `src` 下的 `app.controller.ts`：

```js
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

喔，原来如此，这里引入了 `app.service.ts` 中的 `AppService` 类，并实例化，然后通过 `@Get()` 修饰 `AppController` 里的 `getHello()` 方法，表示这个方法会被 `GET` 请求调用。

我们修改一下路由，就是在 `@Get()` 括号里面写上字符串：

```js
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('hello-world')
  getHello(): string {
    return this.appService.getHello();
  }
}
```

然后**重启项目**（在控制台按下 Ctrl + C 终止项目，然后再输入 `yarn start`），此时我们再访问 `localhost:3000/`，就会发现 `404` 了：

此时，我们输入 `localhost:3000/hello-world`，熟悉的字符 (hello world) 出现了
这就是 Nest 的路由，是不是很简单？

### 2. 局部路由前缀

路由还可以设置局部和全局的前缀，使用前缀可以避免在所有路由共享通用前缀时出现冲突的情况。

还是 `app.controller.ts`，在 `@Controller()`写入 `lesson-1`，这样的话就表示**当前文件**中，所有的路由都有了前缀 `lesson-1`：

```js
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('lesson-1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello-world')
  getHello(): string {
    return this.appService.getHello();
  }
}
```

重启项目，此时我们访问 `localhost:3000/lesson-1/hello-world`，就会指向 `getHello()` 方法了

### 3. 全局路由前缀

这个更简单了，只需要在 `main.ts` 中加上`app.setGlobalPrefix()`：

```js
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/v1/api'); // 全局路由前缀
  await app.listen(3000);
}
bootstrap();
```

之后只要请求服务，所有的路由都要加上 `/v1/api` 前缀：

```bash
http://localhost:3000/v1/api/lesson-1/hello-world
```

### 4. 使用 nodemon 模式启动项目

如果不想频繁重启，可以使用 `yarn start:dev` 启动项目，它会使用 nodemon 监听文件的变化，并自动重启服务。

如果出现下列信息：

```bash
node modules/@nestj s/ core/ injector/module.d.ts(38,9) TS1086: An accessor cannot be declared in an ambient context
9:54:42 AM - Found 26 errors. Watching for file changes.
```

原因是可能之前装过 `typescript` 或者 `nestjs` 脚手架，然后新建项目的时候，`typescript` 版本比较旧，只需在项目中更新到 `3.7.0` 以上：

```bash
yarn add typescript -D
```

出现这个截图，但是没有路由信息，表示 nodemon 的配置需要更改：

```bash
10:34:37 AM - Starting compilation in watch mode...
AM - Found @ errors. Watching for file changes.

```

```bash
package.json:
❌ "start:dev": "concurrently --handle-input \"wait-on dist/main.js && nodemon\" \"tsc -w -p tsconfig.build.json\" ",
✅ "start:dev": "concurrently --handle-input \"wait-on dist/src/main.js && nodemon\" \"tsc -w -p tsconfig.build.json\" ",

nodemon.json:
❌ "exec": "node dist/main"
✅ "exec": "node dist/src/main"
```

然后再运行 `yarn start:dev` 就可以了：

或者干脆直接把 `main.ts` 扔到根目录去（和 src 同级）

这样再改动什么文件，都会自动重启服务了。

## 三、新增模块

通过上文，应该熟悉了 NestJS 的设计模式，主要就是 `Controller`、`Service`、`Module` 共同努力，形成了一个模块。

* `Controller`：传统意义上的控制器，提供 api 接口，负责处理路由、中转、验证等一些简洁的业务；

* `Service`：又称为 `Provider`， 是一系列服务、repo、工厂方法、helper 的总称，主要负责处理具体的业务，如数据库的增删改查、事务、并发等逻辑代码；

* `Module`：负责将 `Controller` 和 `Service` 连接起来，类似于 `namespace` 的概念；

很直观的传统 MVC 结构，有 Spring 开发经验的后端应该不会陌生。

下面我们通过新增一个 User 模块来进行实战：

### 1. Service

个人习惯先创建 `Service`，最后再创建 `Module`，因为 `Controller` 和 `Module`都需要引入 `Service`，这样引入的时候就可以有提示了（当然，也可以事先写 `import`语句，但 `ESLint` 的检查会冒红点，强迫症患者表示不接受）。

使用 `nest-cli` 提供的指令可以快速创建文件，语法如下：

```bash
nest g [文件类型] [文件名] [文件目录（src目录下）]
```

我们输入：

```bash
nest g service user logical
```

就会发现 `src` 目录下多了 `logical/user/` 文件夹（个人喜欢将业务逻辑相关的文件放入 `logical`）

多出的 `user.service.spec.ts`可以不用管…… 至少我写了大半年，也没动过这种文件。

然后我们看一下 `user.service.ts`，用指令创建的文件，基本都长这样:

```js
// src/logical/user/user.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {}

```

于是，我们可以仿照 app.service.ts 来写一个简单的业务了：

```js
// src/logical/user/user.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findOne(username: string): string {
  if (username === 'Kid') {
    return 'Kid is here';
  }
  return 'No one here';
}
}
```

### 2. Controller

现在，我们来写控制器，输入下列命令：

```bash
nest g controller user logical
```

初始化的 `Controller` 基本都长这个样：

```js
// src/logical/user/user.controller.ts
import { Controller } from '@nestjs/common';

@Controller('user')
export class UserController {}
```

接下来，我们把 `Service` 的业务逻辑引入进来：

```js
// src/logical/user/user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('find-one')
  findOne(@Body() body: any) {
    return this.usersService.findOne(body.username);
  }
}
```

需要先用构造器实例化，然后才能调用方法，这里使用的是 `POST` 来接收请求，通过 `@Body()` 来获取请求体（request.body）的参数。

我们用 Postman 来测试一下，

```bash
http://localhost:3000/v1/api/user/find-one
```

先随意传入一个 username：'test'

```bash
No one here
```

再传入 Kid：

```bash
Kid is here
```

由此可知，我们成功匹配到了路由，并且编写的业务生效了。

至此 70% 的流程已经走完，以后开发业务（搬砖），基本都是在 `Service` 和 `Controller` 里面折腾了。。。

## 注意：千万不要往 Controller 里面添加乱七八糟的东西，尤其不要在里面写业务逻辑，Controller 就应该保持简洁、干净。很多前端刚写 Node 的时候，都喜欢在这里面写逻辑，只为了省事，殊不知这对后期的维护是个灾难

**

### 3. Module

这个是连接 `Service` 和 `Controller` 的东东，很多人会奇怪，上文只是创建了 `Service` 和 `Controller`，怎么就可以访问了呢？

打开 app.module.ts：

```js
// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './logical/user/user.service';
import { UserController } from './logical/user/user.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
```

发现使用指令创建文件的时候，已经自动帮我们引入 `User` 相关文件了，而 `main.ts` 文件里，又已经引入了 `AppModule`，并使用 `NestFactory` 创建了实例。

因此，如果是新建无关痛痒的子模块，即使不新建 `Module` 文件，也能通过路由访问。

但是作为教程，还是大致说一下吧，先创建文件：

```bash
nest g module user logical
```

初始化的 `Module`基本都长这个样：

```js
// src/logical/user/user.module.ts
import { Module } from '@nestjs/common';

@Module({})
export class UserModule {}
```

我们把 `Service` 和 `Controller` 组装起来：

```js
// src/logical/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
```

这样做有什么好处呢，就是其他 `Module` 想引入 `User` 的时候，就不用同时引入 `Service` 和 `Controller` 了，我们修改一下 `app.module.ts`：

```js
// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserService } from './logical/user/user.service';
// import { UserController } from './logical/user/user.controller';
import { UserModule } from './logical/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

保存运行，发现路由依然生效：

```bash
[Nest] 11224   - 2021/06/06 上午7:11:51   [NestFactory] Starting Nest application...
[Nest] 11224   - 2021/06/06 上午7:11:51   [InstanceLoader] AppModule dependencies initialized +21ms
[Nest] 11224   - 2021/06/06 上午7:11:51   [InstanceLoader] UserModule dependencies initialized +1ms
[Nest] 11224   - 2021/06/06 上午7:11:51   [RoutesResolver] AppController {/v1/api/lesson-1}: +4ms
[Nest] 11224   - 2021/06/06 上午7:11:51   [RouterExplorer] Mapped {/v1/api/lesson-1/hello-world, GET} route +2ms
[Nest] 11224   - 2021/06/06 上午7:11:51   [RoutesResolver] UserController {/v1/api/user}: +0ms
[Nest] 11224   - 2021/06/06 上午7:11:51   [RouterExplorer] Mapped {/v1/api/user/find-one, POST} route +1ms
[Nest] 11224   - 2021/06/06 上午7:11:51   [NestApplication] Nest application successfully started +1ms
```

当然，`Module` 还有其他高级玩法，这个就不在这里展开了。

## 总结

本篇介绍了 Nest.js 项目的创建，路由的访问，以及如何新增模块。

每个模块又可分为 `Service、Controller、Module`。在本篇中：`Service 负责处理逻辑、Controller 负责路由、Module 负责整合`。

通过实战可以看出，Nest 还是相对简单的，唯一的障碍可能就是 TypeScript 了。

写惯了 JavaScript 的人，可能不是很能适应这种类型检查，尤其是热衷于使用各种骚操作的，不过既然涉及到了后端领域，还是严谨一点比较好，前期可以避免各种不规范导致的坑。

## 拓展

### nest-cli 命令

```bash
nest g [文件类型] [文件名] [文件目录(src目录下)]
nest g service login logical/user
nest g controller login logical/user
nest g module login logical/user
```

```bash
trees  -I "node_modules" > tree.md
```

### nestjs 基础目录结构

```bash
nodejs
├── package.json
├── README.md
├── src
│   │   └── constants（全局常量定义）
│   │       ├──common.constants.ts
│   │   └── utils（常用工具类）
│   │       ├──http.util.ts
│   │       └──file.util.ts
│   ├── app.module.ts（模块配置文件）
│   ├── common （通用模块，包含自定义装饰器、过滤器、守卫、拦截器、中间件）
│   │   ├── decorators （项目通用装饰器）
│   │   │   └── roles.decorator.ts
│   │   ├── filters （过滤器）
│   │   │   └── http-exception.filter.ts
│   │   ├── guards （守卫）
│   │   │   └── roles.guard.ts
│   │   ├── interceptors （拦截器）
│   │   │   ├── exception.interceptor.ts
│   │   │   ├── logging.interceptor.ts
│   │   ├── middleware （中间件）
│   │   │   └── logger.middleware.ts
│   │   └── pipes （管道，主要用于数据验证和类型转换）
│   │       ├── parse-int.pipe.ts
│   │       └── validation.pipe.ts
│   ├── config （配置文件信息）
│   │   ├── database.ts
│   │   ├── redis.ts
│   ├── jobs （高并发场景下队列处理）
│   ├── main.ts （入口文件）
│   ├── modules （业务代码，按目录区分模块）
│   │   ├── hello
│   │   │   ├── hello.controller.ts
│   │   │   ├── hello.module.ts
│   │   │   └── hello.service.ts
│   │   └── users
│   │   │   ├── dto （数据传输对象定义）
│   │   │   │   └── users.create.dto.ts
│   │   │   │   └── users.update.dto.ts
│   │       ├── users.controller.ts （控制层）
│   │       ├── users.entity.ts （映射数据库模型对象）
│   │       ├── users.module.ts (模块定义）
│   │       └── users.service.ts （service层）
│   ├── tasks （定时任务）
│   │   ├── tasks.module.ts
│   │   └── tasks.service.ts
│   └── templates （页面模板）
├── test （单元测试）
│   ├── app.e2e-spec.ts
├── tsconfig.json
```
