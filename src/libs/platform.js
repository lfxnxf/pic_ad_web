import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import sign from '@/libs/sign'
import device from '@/libs/device'
import { Message } from 'view-design'
import { hasOneOf } from './tools'
import config from '@/config'

/**
    * 组装公共参数
    * @param {String} params 接口单独请求参数
    */
function buildParams (params = {}) {
  // 公共参数
  const commonParams = {
    // appkey: config.VUE_APP_PLATFORM_APP_KEY,
    // channel_id: config.VUE_APP_PLATFORM_APP_CHANNEL_ID,
    appkey: process.env.VUE_APP_PLATFORM_APP_KEY,
    channel_id: process.env.VUE_APP_PLATFORM_APP_CHANNEL_ID,
    api_version: '1',
    timestamp: parseInt(new Date().getTime() / 1000),
    ua: 'pc',
    deviceid: 'pc',
    client: 'pc',
    product_code: '3119',
    nonce: Math.random().toString(36).substr(2, 15)
  }
  // 合并参数
  const buildParams = Object.assign(commonParams, params)
  Object.keys(buildParams).forEach((key) => {
    if (buildParams[key] === null || buildParams[key] === undefined || buildParams[key]==='') {
      delete buildParams[key]
    }
  })
  // 签名
  // buildParams.sign = sign(buildParams, config.apiUrl, config.VUE_APP_PLATFORM_APP_SECRET)
  buildParams.sign = sign(buildParams, process.env.VUE_APP_PLATFORM_API, process.env.VUE_APP_PLATFORM_APP_SECRET);
  return buildParams;
}

// const addErrorLog = errorInfo => {
//   const { statusText, status, request: { responseURL } } = errorInfo
//   const info = {
//     type: 'ajax',
//     code: status,
//     mes: statusText,
//     url: responseURL
//   }
//   if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
// }

class PlatformApis {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {}
    }
    return config
  }

  destroy (url) {
    delete this.queue[url]
    // if (!Object.keys(this.queue).length) {
    //   Spin.hide()
    // }
  }

  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      // if (!Object.keys(this.queue).length) {
      //   Spin.show() // 不建议开启，因为界面不友好
      // }
      this.queue[url] = true
      // const token = store.state.platform.sessionid
      // if (!hasOneOf(config.data.method.split('.'), ['login','register'])) {
      //   if (!config.params) {
      //     config.params = {}
      //   }
      //   if (token) {
      //     config.params.sessionid = token
      //   }
      // }
      // // token && (config.headers.sessionid = token)
      const data = config.data

      // removed the hardcore code when deploy to prod
      // if (data.method.includes('.merchant.') && !hasKey(data, 'store_id')) data.store_id = process.env.VUE_APP_STORE_ID

      data && (config.data = qs.stringify(buildParams(data)))
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      // res.data数据部分格式为：{ data: ..., return_code: ..., return_message: ...}
      const { data, return_code, return_message } = res.data
      if (return_code === 0) {
        return { data, return_code, return_message }
      } else {
        // const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
        // const errorInfo = {
        //   statusText: return_message,
        //   status: return_code,
        //   request: { responseURL: `[api•platform]${url}` }
        // }
        // addErrorLog(errorInfo)
        Message.error({ content: return_message, closable: true, duration: 5 })
        return Promise.reject(res.data)
      }
    }, error => {
      // console.log(error)
      // console.log(error.response)
      this.destroy(url)
      // let errorInfo = error.response
      // if (!errorInfo) {
      //   const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
      //   errorInfo = {
      //     statusText,
      //     status,
      //     request: { responseURL: config.url }
      //   }
      // }
      // addErrorLog(errorInfo)
      return Promise.reject(error)
    })
  }

  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default PlatformApis
