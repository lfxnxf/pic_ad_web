
import axios from '@/libs/api.platform.js'
// 管理员登录
export const adminLogin = (params) => {
  const apiMethod = 'ih.canteen.admin.login' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    // params: { method: apiMethod },
    method: 'post'
  })
}

// 管理员登出
export const adminLogout = (params) => {
  const apiMethod = 'ih.canteen.admin.logout' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    // params: { method: apiMethod },
    method: 'post'
  })
}
