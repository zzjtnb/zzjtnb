---
title: 封装Fetch请求
category: 前端
tags:
  - Fetch
cover: https://cdn.pixabay.com/photo/2023/11/20/18/21/sunset-8401670_1280.jpg
---

## 默认

```js
fetch('xxx.png').then((response) => {
  const reader = response.body.getReader()
  return new ReadableStream({
    start(controller) {
      const push = () => {
        reader.read().then(({done, value}) => {
          if (done) {
            controller.close()
            return
          }
          controller.enqueue(value)
          console.log(`Received ${value.length} bytes`)
          push()
        })
      }
      push()
    },
  })
})
```

## 语法

```js
Promise<Response> fetch(input[, init]);
```

### input

定义要获取的资源. 这可能是:

- 一个 USVString 字符串, 包含要获取资源的 URL. 一些浏览器会接受 blob: 和 data: 作为 schemes.
- 一个 Request 对象.

### init 可选

一个配置项对象, 包括所有对请求的设置. 可选的参数有:

#### method

请求方法:GET|POST|PUT|DELETE|PATCH 等, 默认:GET

#### headers

请求的头信息,形式为 [Headers](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers) 的对象或包含 [ByteString](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 值的对象字面量.

以下是一些常见的 HTTP 方法 (GET,POST,PUT,PATCH,DELETE) 和它们的默认头部字段及其默认值:

- 所有请求方法:

  1. Host: 请求的目标服务器的主机名. 默认值取决于你的请求目标.
  2. User-Agent: 发起请求的用户代理的信息, 比如浏览器的名称和版本. 默认值通常是你的浏览器或其他客户端软件的标识.

- GET 请求:

  1. 默认头部字段与所有请求方法相同.

- POST,PUT,PATCH 请求:

  1. 默认头部字段与所有请求方法相同.
  2. Content-Type: 告诉服务器, 请求体的媒体类型是什么. 默认值取决于你的请求体的内容.
     例如, 如果你的请求体是 JSON 格式的,Content-Type 的值应该是 application/json.
  3. Content-Length: 告诉服务器, 请求体的长度是多少. 默认值是你的请求体的字节长度.

- DELETE 请求:
  1. 默认头部字段与所有请求方法相同.

请注意, 这些只是一些常见的默认头部字段, 实际的默认头部字段可能会根据具体的库, 框架或应用程序而变化.
如果你需要知道具体的默认头部字段, 你可以查看你正在使用的库或框架的文档, 或者使用开发者工具来检查发出的 HTTP 请求.

### body

你想添加到你的请求中的任何主体:
[Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) [FormData](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData),[URLSearchParams](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams),[USVString](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 对象,ArrayBuffer,TypedArray,DataView, 或者一个 ReadableStream 对象.`注意 GET 或 HEAD 方法的请求不能包含 body 信息`

### mode

你想要用于请求的模式

- `cors`: 默认值, 允许跨域请求
- `no-cors`: 只允许同源请求
- `same-origin`: 请求方法只限于 `GET`,`POST` 和 `HEAD`, 并且只能使用有限的几个简单标头, 不能添加跨域的复杂标头, 相当于提交表单所能发出的请求.

### credentials

控制浏览器对凭证 (`cookies`,`HTTP 认证条目`和 `TLS 客户端证书`) 的处理

- `omit`: 一律不发送
- `include`: 不管同源请求, 还是跨域请求, 一律发送 Cookie.
- `same-origin`: `默认值`, 同源请求时发送 Cookie, 跨域请求时不发送.

为了在当前域名内自动发送 `cookie`, 必须提供这个选项, 从 `Chrome 50` 开始, 这个属性也可以接受 [FederatedCredential (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/FederatedCredential) 实例或是一个 [PasswordCredential (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/PasswordCredential) 实例.

### cache

缓存模式

- `default`: `默认值`, 先在缓存里面寻找匹配的请求.
- `no-store`: 直接请求远程服务器, 并且不更新缓存.
- `reload`: 直接请求远程服务器, 并且更新缓存.
- `no-cache`: 将服务器资源跟本地缓存进行比较, 有新的版本才使用服务器资源, 否则使用缓存.
- `force-cache`: 缓存优先, 只有不存在缓存的情况下, 才请求远程服务器.
- `only-if-cached`: 只检查缓存, 如果缓存里面不存在, 将返回 `504` 错误.

### redirect

重定向模式, 指定 HTTP 跳转的处理方法

- `follow`: `默认值`, 动重定向.
- `error`: 如果产生重定向将自动终止并且抛出一个错误.
- `manual`: 手动处理重定向, 但是 response.url 属性会指向新的 URL,response.redirected 属性会变为 true, 由开发者自己决定后续如何处理跳转.

在 Chrome 中默认使用 follow(Chrome 47 之前的默认值是 manual)

### referrer

用于设定 fetch() 请求的 referrer 标头.
一个 [USVString](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 可以是 `no-referrer`,`client` 或一个 `URL`.`默认值`: `client`

这个属性可以为任意字符串, 也可以设为空字符串 (即不发送 referrer 标头).

### referrerPolicy

引用策略, 用于设定 referer 标头的规则. 可能的取值如下

- `origin`: referer 标头只包含域名, 不包含完整的路径.
- `unsafe-url`: 不管什么情况, 总是发送 referer 标头.
- `same-origin`: 跨域请求不发送 referer, 同源请求发送.
- `no-referrer`: 不发送 referer 标头.
- `strict-origin`: referer 标头只包含域名,HTTPS 页面请求 HTTP 资源时不发送 referer 标头.
- `origin-when-cross-origin`: 同源请求 referer 标头包含完整的路径, 跨域请求只包含域名.
- `no-referrer-when-downgrade`: 默认值.
  总是发送 referer 标头, 除非从 HTTPS 页面请求 HTTP 资源时不发送.
- `strict-origin-when-cross-origin`: 同源请求时 Referer 标头包含完整路径, 跨域请求时只包含域名,HTTPS 页面请求 HTTP 资源时不发送该标头.

### integrity

包含请求的 [subresource integrity](https://developer.mozilla.org/zh-CN/docs/Web/Security/Subresource_Integrity) 值 (例如: sha256-BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=)

指定一个哈希值, 用于检查 HTTP 回应传回的数据是否等于这个预先设定的哈希值.
比如, 下载文件时, 检查文件的 SHA-256 哈希值是否相符, 确保没有被篡改

### keepalive

默认:false.
用于允许或禁止在页面卸载时发送请求, 告诉浏览器是否在后台保持连接, 继续发送数据.
一个典型的场景就是, 用户离开网页时, 脚本向服务器提交一些用户行为的统计信息.
这时, 如果不用 `keepalive` 属性, 数据可能无法发送, 因为浏览器已经把页面卸载了

### signal

`默认值`:undefined

```js
// 指定一个 AbortSignal 对象实例, 用于取消 fetch() 请求
let controller = new AbortController()
let signal = controller.signal
```

<!-- const request = fetchData.get('https://example.com')
console.log(request.id) // 打印请求的 id
request.promise.then(response => console.log(response)).catch(error => console.error(error))
// 当你需要取消请求时
request.abort() -->

### 请求说明

```js
fetch(url, options)
  .then((response) => {
    /**
     * 使用fetch发起请求
     * 第一阶段,当服务器发送了响应头(response header),
     * fetch 返回的 promise 就使用内建的 Response class 对象来对响应头进行解析.
     * 在这个阶段,我们可以通过检查响应头,来检查 HTTP 状态以确定请求是否成功,当前还没有响应体(response body).
     * 如果 fetch 无法建立一个 HTTP 请求,例如网络问题,亦或是请求的网址不存在,
     * 那么 promise 就会 reject.异常的 HTTP 状态,例如 404 或 500,不会导致出现 error.
     * 这就是说,即使服务器返回的状态码是 4xx 或 5xx,fetch()也不会报错(即 Promise 不会变为 rejected状态).
     * 只有通过Response.status属性,得到 HTTP 回应的真实状态码,才能判断请求是否成功.
     * 这里不用考虑网址跳转(状态码为 3xx),因为fetch()会将跳转的状态码自动转为 200
     * 我们可以在 response 的属性中看到 HTTP 状态:
     * status —— HTTP 状态码,例如 200.
     * ok —— 布尔值,如果 HTTP 状态码为 200-299,则为 true
     */

    /**
     * response = {
     *  ok:返回一个布尔值,表示请求是否成功,true对应 HTTP 请求的状态码 200 到 299,false对应其他的状态码
     *  status:返回一个数字,表示 HTTP 回应的状态码(例如200,表示成功请求)
     *  statusText:返回一个字符串,表示 HTTP 回应的状态信息(例如请求成功以后,服务器返回"OK")
     *  url:返回请求的 URL
     *  type:返回请求的类型
     *  body:返回一个 ReadableStream 对象,可以用于读取响应体内容
     *  bodyUsed:返回一个布尔值,表示响应体是否已经被读取过了
     *  redirected:返回一个布尔值,表示请求是否发生过跳转
     *  headers:返回一个 Headers 对象,可以用于获取响应头信息
     *  arrayBuffer:返回一个 Promise,可以用于读取响应体内容
     *  blob:返回一个 Promise,可以用于读取响应体内容
     *  formData:返回一个 Promise,可以用于读取响应体内容
     *  json:返回一个 Promise,可以用于读取响应体内容
     *  text:返回一个 Promise,可以用于读取响应体内容
     *  type:返回一个字符串,表示请求的类型
     *  url:返回一个字符串,表示请求的 URL
     * }
     */
    let {ok, status, statusText} = response
    /**
     *  如果状态码是200-299,那么认为请求成功
     * 如果状态码不是200-299,那么认为请求失败
     * 先获取响应体的内容,然后reject Promise
     */
    if (!ok) {
      /**
       * 注意:
       * 我们只能选择一种读取 body 的方法.
       * 如果我们已经使用了 response.text() 方法来获取 response,
       * 那么如果再用 response.json(),则不会生效,因为 body 内容已经被处理过了.
       * let text = await response.text(); // response body 被处理了
       * let parsed = await response.json(); // 失败(已经被处理过了)
       * Response 对象提供Response.clone()方法,创建Response对象的副本,实现多次读取
       */
      const responseClone = response.clone()
      return responseClone.text().then((text) => {
        return {
          code: 'STATUS ERROR',
          status,
          statusText,
          body: text,
        }
      })
    }

    /**
     * 获取一个 header
     * 检查响应的Content-Type头部
     */
    const contentType = response.headers.get('Content-Type')
    let result
    /**
     * 第二阶段,为了获取 response body,我们需要使用一个其他的方法调用.
     * Response 提供了多种基于 promise 的方法,来以不同的格式访问 body:
     * response.text() —— 读取 response,并以文本形式返回 response
     * response.json() —— 将 response 解析为 JSON 格式
     * response.formData() —— 以 FormData 对象的形式返回 response
     * response.blob() —— 以 Blob(具有类型的二进制数据)形式返回 response
     * response.arrayBuffer() —— 以 ArrayBuffer(低级别的二进制数据)形式返回 response
     * 另外,response.body 是 ReadableStream 对象,它允许你逐块读取 body
     */
    switch (true) {
      // 如果Content-Type是application/json,检查响应体是否为空,如果不为空,解析响应体为JSON
      case contentType.includes('application/json'):
        result = response.text().then((text) => (text ? JSON.parse(text) : {}))
        break
      // 如果Content-Type是text/*,解析响应体为文本
      case contentType.includes('text/'):
        result = response.text()
        break
      // 如果Content-Type是application/octet-stream,解析响应体为ArrayBuffer
      case contentType.includes('application/octet-stream'):
        result = response.arrayBuffer()
        break
      // 如果Content-Type是image/*,解析响应体为Blob
      case contentType.includes('image/'):
        result = response.blob()
        break
      // 对于其他Content-Type,尝试解析响应体为文本
      default:
        result = response.text()
    }
    return result
  })
  .then((result) => {
    try {
      result = JSON.parse(result)
    } catch (_) {}
    return result
  })
  .catch((error) => {
    return error
  })
```

## 封装

```js
/**
 * @typedef {Object} RequestResult
 * @property {string} id - 请求的ID
 * @property {Function} abort - 取消请求的函数
 * @property {Promise} promise - 请求的Promise
 */

/**
 * @class HttpClient
 * @description HTTP客户端,用于发送HTTP请求
 * @example
 * const client = new HttpClient()
 * const request = client.get('https://api.example.com/data')
 * console.log(request.id) // 打印请求的id
 * request.promise.then(data => console.log(data)).catch(error => console.error(error))
 * // 当你需要取消请求时
 * request.abort()
 * client.cancel(request.id)
 */
class HttpClient {
  /**
   * @constructor
   * @description 构造函数,初始化选项和中止控制器
   */
  constructor() {
    // 默认配置
    this.options = {
      headers: {
        /**
         * 默认接受JSON响应
         * Accept头部字段通常用于指示客户端可以处理哪些媒体类型.
         * 这个头部字段的默认值通常取决于你的客户端库或浏览器.
         * 例如,许多浏览器会默认发送Accept:*\/*,表示它们可以处理任何类型的响应
         */
        Accept: 'application/json;charset=utf-8',
      },
      // 默认的超时时间是5000毫秒
      timeout: 5000,
    }
    // 初始化请求控制器映射
    this.abortControllers = new Map()
  }

  /**
   * @method generateId
   * @description 生成唯一的ID
   * @returns {string} 返回一个唯一的ID
   * @example
   * const id = client.generateId()
   * console.log(id) // 打印生成的ID
   */
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2)
  }
  /**
   * @method cancel
   * @description 取消特定的请求
   * @param {string} id - 需要取消的请求的ID
   * @returns {Object} 返回一个对象,包含取消请求的结果和消息
   * @example
   * const result = client.cancel('request1')
   * console.log(result.message) // 打印取消请求的消息
   */
  cancel(id) {
    const data = {
      message: `取消失败:未找到 ${id} 的请求`,
      isCancelled: false,
    }
    const controller = this.abortControllers.get(id)
    if (!controller) return data
    if (!controller.signal.aborted) controller.abort()
    this.abortControllers.delete(id)
    data.isCancelled = true
    data.message = `取消成功:已取消 ${id} 的请求`
    return data
  }
  /**
   * @method cancelAll
   * @description 取消所有的请求
   * @returns {Object} 返回一个对象,包含取消请求的结果和消息
   * @example
   * const result = client.cancelAll()
   * console.log(result.message) // 打印取消请求的消息
   */
  cancelAll() {
    const data = {
      message: '取消失败:未找到任何请求',
      isCancelled: false,
    }
    if (!this.abortControllers.size) return data
    for (const controller of this.abortControllers.values()) {
      if (!controller.signal.aborted) controller.abort()
    }
    this.abortControllers.clear()
    data.isCancelled = true
    data.message = '取消成功:已取消所有请求'
    return
  }

  /**
   * @method handleOptions
   * @description 处理选项,设置默认值和内容类型
   * @param {Object} options - 配置参数
   * @returns {Object} 返回处理后的选项
   * @example
   * const options = client.handleOptions({ method: 'GET', type: 'json' })
   * console.log(options) // 打印处理后的选项
   */
  handleOptions(options) {
    // 合并默认配置和用户提供的配置
    options = Object.assign(this.options, options)
    // 如果请求方法是POST,PUT,PATCH处理请求体
    if (/^(POST|PUT|PATCH)$/i.test(options.method)) {
      // 如果用户没有提供type,那么默认为urlencoded
      !options.type ? (options.type = 'urlencoded') : null
      if (options.type === 'urlencoded') {
        options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
        options.body = new URLSearchParams(options.body).toString()
      }
      // 如果body是Text对象,不需要进行任何转换,默认发送的就是纯文本
      if (options.type === 'text') {
        options.headers['Content-Type'] = 'text/plain;charset=utf-8'
      }
      // 将body是json对象,转换为JSON字符串
      if (options.type === 'json') {
        options.headers['Content-Type'] = 'application/json;charset=utf-8'
        options.body = JSON.stringify(options.body)
      }
      // 如果body是FormData对象,不需要进行任何转换
      if (options.type === 'formdata') {
        options.headers['Content-Type'] = 'multipart/form-data;charset=utf-8'
      }
      // 如果body是Blob对象,不需要进行任何转换
      if (options.type === 'blob') {
        options.headers['Content-Type'] = 'application/octet-stream;charset=utf-8'
      }
      // 如果body是Stream对象,不需要进行任何转换
      if (options.type === 'stream') {
        options.headers['Content-Type'] = 'application/octet-stream;charset=utf-8'
      }
      // 如果body是ArrayBuffer对象,不需要进行任何转换
      if (options.type === 'arraybuffer') {
        options.headers['Content-Type'] = 'application/octet-stream;charset=utf-8'
      }
    }
    return options
  }

  /**
   * @method request
   * @description 发送HTTP请求
   * @param {string} url - 请求的URL
   * @param {Object} [options={}] - 可选的配置参数
   * @returns {RequestResult} 返回一个包含id、abort方法和promise的对象
   * @example
   * const request = client.request('https://api.example.com/data', { method: 'GET' })
   * console.log(request.id) // 打印请求的id
   * request.promise.then(data => console.log(data)).catch(error => console.error(error))
   * // 当你需要取消请求时
   * request.abort()
   */
  request(url, options = {}) {
    if (!options || options instanceof Object !== true) {
      throw new TypeError('Options 必须是个对象')
    }
    options = this.handleOptions(options)
    const id = this.generateId()
    const controller = new AbortController()
    const {signal} = controller
    this.abortControllers.set(id, controller)
    const promise = new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject({
          code: 'TIMEOUT ERROR',
          message: '请求超时',
        })
      }, options.timeout)

      fetch(url, {...options, signal})
        .then((response) => {
          let {ok, status, statusText} = response
          if (!ok) {
            const responseClone = response.clone()
            return responseClone.text().then((text) => {
              reject({
                code: 'STATUS ERROR',
                status,
                statusText,
                body: text,
              })
            })
          }
          let result
          const contentType = response.headers.get('Content-Type')
          switch (true) {
            case contentType.includes('application/json'):
              result = response.text().then((text) => (text ? JSON.parse(text) : {}))
              break
            case contentType.includes('text/'):
              result = response.text()
              break
            case contentType.includes('application/octet-stream'):
              result = response.arrayBuffer()
              break
            case contentType.includes('image/'):
              result = response.blob()
              break

            default:
              result = response.text()
          }
          return result
        })
        .then((result) => {
          try {
            result = JSON.parse(result)
          } catch (_) {}
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
        .finally(() => {
          //无论成功还是失败，都要清除定时器和控制器
          clearTimeout(timeoutId)
          this.abortControllers.delete(id)
        })
    })
    return {
      id,
      abort: () => {
        if (!controller.signal.aborted) controller.abort()
        this.abortControllers.delete(id)
        return 'aborted'
      },
      promise,
    }
  }

  /**
   * @method send
   * @description 发送HTTP请求
   * @param {string} url - 请求的URL
   * @param {string} method - HTTP请求方法,如'GET','POST'等
   * @param {Object} [options={}] - 可选的配置参数
   * @returns {RequestResult} 返回一个包含id、abort方法和promise的对象
   */
  send(url, method, options) {
    return this.request(url, {...options, method})
  }
  /**
   * @method get
   * @description 发送GET请求
   * @param {string} url - 请求的URL
   * @param {Object} [options={}] - 可选的配置参数
   * @returns {RequestResult} 返回一个包含id、abort方法和promise的对象
   * @example
   * const request = client.get('https://api.example.com/data')
   * console.log(request.id) // 打印请求的id
   * request.promise.then(data => console.log(data)).catch(error => console.error(error))
   * // 当你需要取消请求时
   * request.abort()
   */
  get(url, options) {
    return this.send(url, 'GET', options)
  }

  /**
   * @method post
   * @description 发送POST请求
   * @param {string} url - 请求的URL
   * @param {Object} [options={}] - 可选的配置参数
   * @returns {RequestResult} 返回一个包含id、abort方法和promise的对象
   * @example
   * const request = client.post('https://api.example.com/data', { body: { key: 'value' } })
   * console.log(request.id) // 打印请求的id
   * request.promise.then(data => console.log(data)).catch(error => console.error(error))
   * // 当你需要取消请求时
   * request.abort()
   */
  post(url, options) {
    return this.send(url, 'POST', options)
  }

  /**
   * @method put
   * @description 发送PUT请求
   * @param {string} url - 请求的URL
   * @param {Object} [options={}] - 可选的配置参数
   * @returns {RequestResult} 返回一个包含id、abort方法和promise的对象
   * @example
   * const request = client.put('https://api.example.com/data', { body: { key: 'value' } })
   * console.log(request.id) // 打印请求的id
   * request.promise.then(data => console.log(data)).catch(error => console.error(error))
   * // 当你需要取消请求时
   * request.abort()
   */
  put(url, options) {
    return this.send(url, 'PUT', options)
  }

  /**
   * @method patch
   * @description 发送PATCH请求
   * @param {string} url - 请求的URL
   * @param {Object} [options={}] - 可选的配置参数
   * @returns {RequestResult} 返回一个包含id、abort方法和promise的对象
   * @example
   * const request = client.patch('https://api.example.com/data', { body: { key: 'value' } })
   * console.log(request.id) // 打印请求的id
   * request.promise.then(data => console.log(data)).catch(error => console.error(error))
   * // 当你需要取消请求时
   * request.abort()
   */
  patch(url, options) {
    return this.send(url, 'PATCH', options)
  }

  /**
   * @method delete
   * @description 发送DELETE请求
   * @param {string} url - 请求的URL
   * @param {Object} [options={}] - 可选的配置参数
   * @returns {RequestResult} 返回一个包含id、abort方法和promise的对象
   * @example
   * const request = client.delete('https://api.example.com/data')
   * console.log(request.id) // 打印请求的id
   * request.promise.then(data => console.log(data)).catch(error => console.error(error))
   * // 当你需要取消请求时
   * request.abort()
   */
  delete(url, options) {
    return this.send(url, 'DELETE', options)
  }
}
let fetchData = new HttpClient()
module.exports = fetchData
```

## 参考链接

[Fetch API 教程 | 阮一峰](https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html)
[Fetch API - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)
[Fetch | 现代 JavaScript 教程](https://zh.javascript.info/fetch)
