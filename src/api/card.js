import axios from '@/libs/api.platform.js'

// 获取就餐统计数据
export const cardList = (params) => {
  const apiMethod = 'ih.p_canteen.card.list' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}

// 修改就餐卡
export const cardEdit = (params) => {
  const apiMethod = 'ih.p_canteen.card.edit' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}

// 添加就餐卡
export const cardAdd = (params) => {
  const apiMethod = 'ih.p_canteen.card.add' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}
