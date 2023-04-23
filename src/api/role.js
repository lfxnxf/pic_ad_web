import axios from '@/libs/api.platform.js'

// 获取人员类型列表
export const roleList = (params) => {
  const apiMethod = 'ih.canteen.role.list' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}

// 修改人员类型
export const roleEdit = (params) => {
  const apiMethod = 'ih.canteen.role.edit' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}

// 添加人员类型
export const roleAdd = (params) => {
  const apiMethod = 'ih.canteen.role.add' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}


// 获取人员类型餐种列表
export const getRoleGoodsList = (params) => {
  const apiMethod = 'ih.canteen.price.list' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}

// 配置人员类型餐种
export const setRoleGoods = (params) => {
  const apiMethod = 'ih.canteen.price.edit' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  // const price_detail = params;
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}
