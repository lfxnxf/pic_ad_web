import axios from '@/libs/api.platform.js'

// 添加菜单信息
export const goodsDateAdd = (params) => {
  const apiMethod = 'ih.canteen.goods_date.add' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}

// 删除菜单信息
export const goodsDateDel = (params) => {
  const apiMethod = 'ih.canteen.goods_date.del' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}

// 获取菜单信息列表
export const goodsDateList = (params) => {
  const apiMethod = 'ih.canteen.goods_date.list' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}

// 编辑菜单信息
export const goodsDateEdit = (params) => {
  const apiMethod = 'ih.canteen.goods_date.edit' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}

// 批量添加或修改菜单信息
export const goodsDateEditNew = (params) => {
  const apiMethod = 'ih.canteen.goods_date.editNew' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}
