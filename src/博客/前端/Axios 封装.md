---
title: axios封装
category: 前端
tags:
  - axios
cover: https://images.unsplash.com/photo-1600168800133-f18c52171ea1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80
---

```JavaScript
import axios from 'axios'
import store from '../store/index'
import router from '../router/index'//引入路由
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到
import { Loading, Message } from 'element-ui'// 这里我是使用elementUI的组件来给提示
import 'element-ui/lib/theme-chalk/index.css';

// 加载全局的loading
// let loadingInstance = null
// 创建一个axios的自定义的实例service，并且可以自定义其配置
const service = axios.create({
  //接口请求地址
  // baseURL: "https://api.github.com",
  //`timeout`选项定义了请求发出的延迟毫秒数。如果请求花费的时间超过延迟的时间，那么请求会被终止
  timeout: 15000,
  // 设置post请求头
  // headers: {
  //   'Content-Type': 'application/json;charset=UTF-8',
  //   // "Authorization": "token 7f0d015cce46adcf728386abcf3603ecc23934bf"
  // }
})
/**
 * 一些常见的http状态码信息
 */
let httpCode = {
  400: '请求参数错误',
  401: '权限不足, 请重新登录',
  403: '服务器拒绝本次访问',
  404: '请求资源未找到',
  500: '内部服务器错误',
  501: '服务器不支持该请求中使用的方法',
  502: '网关错误',
  504: '网关超时'
}

/**
 * 给自定义的axios实例service添加一个请求拦截器
 */
service.interceptors.request.use(config => {
  //loading开始
  // loadingInstance = Loading.service({
  //   target: 'body',
  //   spinner: 'el-icon-loading',
  //   text: '拼命加载中...'
  // })
  // 在发送请求之前做些什么，比如传token
  let token = store.state.token.token
  // if (token) {
  //   let sp = "?"
  //   if (config.url.indexOf("?") >= 0) {
  //     sp = "&"
  //   }
  //   config.url = config.url + sp + "access_token=" + token
  // }
  if (!token) {
    config.url = config.url + "?client_id=6cc41e2646130e2f8a0a&client_secret=3bca6288d4d0b1d8c0f996d2933a66606c7eab0d"

  } else {
    config.url = config.url + "?client_id=6cc41e2646130e2f8a0a&client_secret=3bca6288d4d0b1d8c0f996d2933a66606c7eab0d&access_token=" + token
  }
  /*   config.headers = {
      'Content-Type': 'application/json;charset=UTF-8', // 设置很关键
      'tm': timestamp,
      's': cookie.session,
      't': getSign(config.method == 'post' ? {} : config.params, cookie.token, timestamp)
    } 
  */
  /** 
   * // 在这里：可以根据业务需求可以在发送请求之前做些什么:例如我这个是导出文件的接口，因为返回的是二进制流，所以需要设置请求响应类型为blob，就可以在此处设置。
   * if (config.url.includes('pur/contract/export')) {
   *  config.headers['responseType'] = 'blob'
   *   }
   * // 我这里是文件上传，发送的是二进制流，所以需要设置请求头的'Content-Type'
   * if (config.url.includes('pur/contract/upload')) {
   * config.headers['Content-Type'] = 'multipart/form-data'
   * }
   */
  /**
   * 传递token的另外一种方式，加在头部
   * // 登录流程控制中，根据本地是否存在token判断用户的登录情况
   * // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
   * // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
   * // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
   * const token = store.state.token;
   * token && (config.headers.Authorization = token);
   */

  return config
}, error => {
  //出错，也要loading结束
  // loadingInstance.close();
  // 对请求错误做些什么
  console.log(error) // for debug
  return Promise.reject(error);
})
/**
 * 给自定义的axios实例service添加一个响应拦截器
 */
service.interceptors.response.use(response => {
  /*  
  //在这里对返回的数据进行处理
   let responseJson = response.data
  */
  //loading结束
  // loadingInstance.close()
  // 响应结果里的status: ok是我与后台的约定，大家可以根据实际情况去做对应的判断
  console.log(response.status)
  if (response.status == '200') {
    // Message({
    //   message: "登陆成功",
    //   type: 'success'
    // })
    // router.replace({
    //   path: '/',
    //   query: { redirect: router.currentRoute.fullPath }//登录成功后跳入浏览的当前页面
    // })
    return Promise.resolve(response)
  } else if (response.status == '201') {
    Message({
      message: '发表成功',
      type: 'success'
    })
    return Promise.resolve(response)
  } else {
    Message({
      message: response.data.message,
      type: 'error'
    })
    return Promise.reject(response.data.message)
  }
}, error => {
  // loadingInstance.close()
  // 处理断网的情况
  // eg:请求超时或断网时，更新state的network状态
  // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
  // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
  console.log(window.navigator.onLine)
  if (!window.navigator.onLine) {
    store.commit('NOT_NETWORK', false);
    router.replace({
      path: '/notnetwork',
      // query: { redirect: router.currentRoute.fullPath }//登录成功后跳入浏览的当前页面
    })
  } else {
    return Promise.reject(error);
  }
  if (error.response) {
    // 根据请求失败的http状态码去给用户相应的提示
    let tips = error.response.status in httpCode ? httpCode[error.response.status] : error.response.data.message
    console.log('tips', tips)
    Message({
      message: tips,
      type: 'error'
    })
    // token或者登陆失效情况下跳转到登录页面，根据实际情况，在这里可以根据不同的响应错误结果，做对应的事。这里我以401判断为例
    if (error.response.status === 401) {
      // loadingInstance.close()
      router.replace({
        path: '/login',
        // query: { redirect: router.currentRoute.fullPath }//登录成功后跳入浏览的当前页面
      })
    }
    return Promise.reject(error)
  } else {
    Message({
      message: '请求超时, 请刷新重试',
      type: 'error'
    })
    return Promise.reject(new Error('请求超时, 请刷新重试'))
  }
})
/**
 * 统一封装get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} config [请求时配置]
 */
export const get = (url, params, config = {}) => {
  return new Promise((resolve, reject) => {
    service({
      method: 'get',
      url,
      params,
      ...config
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
/**
 * 统一封装post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} config [请求时配置]
 */
export const post = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    service({
      method: 'post',
      url,
      data,
      ...config
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
/**
 * 统一封装put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} config [请求时配置]
 */
export const put = (url, data, config) => {
  return new Promise((resolve, reject) => {
    service({
      method: 'put',
      url,
      data,
      ...config
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
/**
 * 统一封装PATCH请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} config [请求时配置]
 */
export const patch = (url, data, headers) => {
  return new Promise((resolve, reject) => {
    service({
      method: 'PATCH',
      url,
      data,
      headers
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
// export const patch = (url, data, headers) => {
//   return new Promise((resolve, reject) => {
//     service.patch(url, QS.stringify(data), headers)
//       .then(response => {
//         resolve(response.data);
//       })
//       .catch(err => {
//         reject(err.data)
//       })
//   })
// }

/* 或者写成下面这样： Promise.resolve() 和 Promise.reject()返回的是promise对象，二者都是语法糖  */
// export const post = (url, data, config = {}) => {
//   return service({
//     method: 'post',
//     url,
//     data,
//     ...config
//   }).then(response => {
//     return Promise.resolve(response)
//   }).catch(error => {
//     return Promise.reject(error)
//   })
// }

export default service

```
