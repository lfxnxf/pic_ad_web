import axios from '@/libs/api.platform.js'


// 获取菜单信息列表
export const menuList = (params) => {
  const apiMethod = 'ih.canteen.menu.list' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}

// 编辑菜单信息
export const menuEdit = (params) => {
  const apiMethod = 'ih.canteen.menu.edit' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}

// 编辑菜单信息
export const menuEditV2 = (params) => {
  const apiMethod = 'ih.canteen.menu.editV2' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}
