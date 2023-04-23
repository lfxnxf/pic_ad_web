import axios from 'axios';
// import store from '@/store';
import Vue from 'vue';
import { Message } from 'view-design';
import * as util from './util';
import Cookies from 'js-cookie';
import path from 'path';
import config from '@/config';
import { getToken, removeCookies } from './util';
import _ from 'underscore';

// const { homeName } = config;
// import { Spin } from 'iview'
// const addErrorLog = (errorInfo) => {
//   console.log('axios...');
//   const {
//     statusText,
//     status,
//     request: { responseURL },
//   } = errorInfo;
//   let info = {
//     type: 'ajax',
//     code: status,
//     mes: statusText,
//     url: responseURL,
//   };
//   if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info);
// };


class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.queue = {};
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    };
    return config;
  }
  destroy(url) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      (config) => {
        config.headers['x-access-token'] = util.getToken();
        // 添加全局的loading...
        if (!Object.keys(this.queue).length) {
          // Spin.show() // 不建议开启，因为界面不友好
        }
        this.queue[url] = true;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // 添加响应拦截器
    instance.interceptors.response.use(
      (res) => {
        const is = this.destroy(url);
        const { data } = res;
        if (!is) {
          setTimeout(() => {
            // Spin.hide()
          }, 500);
        }
        if (data.code === -112004 || data.code === -301003) {
          Message.error('未登录，或登录失效，请登录');
          removeCookies();
          window.location.href = path.join(process.env.BASE_URL, 'login');
        }
        return data;
      },
      (error) => {
        // console.log(JSON.stringify(error));
        if (error['code'] === 'ECONNABORTED' || !error.hasOwnProperty('response')) {
          Message.error('服务器连接错误，请检查网络是否可用');
        } else {
          let res = error['response'];
          if (res && res.hasOwnProperty('status') && res.status === 401) {
            let TOKEN_KEY = util.getToken();
            Cookies.remove(TOKEN_KEY);
            if (res.data.msg) {
              Message.error(res.data.msg);
            } else {
              window.location.href = path.join(process.env.BASE_URL, 'login');
              Message.error('未登录，或登录失效，请登录');
            }
          } else {
            Message.error(
              res && res.hasOwnProperty('data') && res.data['msg'] ?
              res.data['msg'] :
              '服务内部错误',
            );
          }
          // 对响应错误做点什么
          return Promise.reject(error);
        }
      },
    );
    // 响应拦截
    // instance.interceptors.response.use(res => {
    //   this.destroy(url)
    //   const { data, status } = res
    //   return { data, status }
    // }, error => {
    //   this.destroy(url)
    //   console.log('resInterceptors....')
    //   addErrorLog(error.response)
    //   return Promise.reject(error)
    // })
  }
  request(options) {
    axios.defaults.withCredentials=true;
    axios.defaults.crossDomain=true;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    const instance = axios.create({
      timeout: 600000,
    });
    let sessionid = getToken();
    switch (options.method.toUpperCase()) {
      case 'POST':
        if (sessionid) {
          if (!_.has(options, 'data') || _.isEmpty(options.data) || !options.data) {
            options.data = {
              sessionid: sessionid
            }
          } else {
            options.data.sessionid = sessionid;
          }
        }
        break;
      case 'GET':
        if (sessionid) {
          if (!_.has(options, 'params') || _.isEmpty(options.params) || !options.params) {
            options.params = {
              sessionid: sessionid
            }
          } else {
            // options.params = {};
            options.params.sessionid = sessionid;
          }
        }
        break;
      default:
        // statements_def
        break;
    }
    options.sessionid = sessionid;
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
}
export default HttpRequest;
