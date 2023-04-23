import axios from '@/libs/api.platform.js'

// 获取交易记录列表
export const tradeList = (params) => {
  const apiMethod = 'ih.canteen.trade.list' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    // params: { method: apiMethod },
    method: 'post'
  })
}


// 导出交易记录列表
export const exportTradeList = (params) => {
  const apiMethod = 'ih.canteen.trade.export' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    // params: { method: apiMethod },
    method: 'post'
  })
}
