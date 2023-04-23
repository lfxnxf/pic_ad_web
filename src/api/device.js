import axios from '@/libs/api.platform.js'

// 获取设备列表
export const deviceList = (params) => {
  const apiMethod = 'ih.p_canteen.device.list' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}

// 修改设备
export const deviceEdit = (params) => {
  const apiMethod = 'ih.p_canteen.device.edit' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}

// 添加设备
export const deviceAdd = (params) => {
  const apiMethod = 'ih.p_canteen.device.add' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}
