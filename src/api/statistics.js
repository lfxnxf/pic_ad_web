import axios from '@/libs/api.platform.js'

// 获取就餐统计列表
export const statisticsHome = (params) => {
  const apiMethod = 'ih.canteen.statistics.home' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}

// 获取就餐预约统计列表
export const statisticsAppointment = (params) => {
  const apiMethod = 'ih.canteen.statistics.appointment' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}

// 导出部门就餐预约统计列表
export const statisticsAppointmentExport = (params) => {
  const apiMethod = 'ih.canteen.statistics.appointment.export' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}

// 获取就餐订单统计列表
export const statisticsOrder = (params) => {
  const apiMethod = 'ih.canteen.statistics.order' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}

// 导出就餐订单统计列表
export const statisticsOrderExport = (params) => {
  const apiMethod = 'ih.canteen.statistics.order.export' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}

// 获取部门就餐预约统计列表
export const statisticsDepAppointment = (params) => {
  const apiMethod = 'ih.canteen.statistics.a_department' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}

// 获取部门就餐统计列表
export const statisticsDepOrder = (params) => {
  const apiMethod = 'ih.canteen.statistics.o_department' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}

// 获取就餐统计列表
export const statisticsList = (params) => {
  const apiMethod = 'ih.p_canteen.statistics.dinner' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}
// PORTAL端交易统计
export const statisticsTradeList = (params) => {
  const apiMethod = 'ih.canteen.statistics.trade' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}
// PORTAL端交易统计导出
export const statisticsTradeExport = (params) => {
  const apiMethod = 'ih.canteen.statistics.trade.export' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}
// PORTAL端销售统计
export const statisticsSale = (params) => {
  const apiMethod = 'ih.p_canteen.statistics.sale' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}
// 就餐统计导出
export const statisticsDinnerExport = (params) => {
  const apiMethod = 'ih.p_canteen.statistics.dinner.export' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}

// 当日充值及提现统计
export const depositWithdrawToday = (params) => {
  const apiMethod = 'ih.p_canteen.statistics.depositWithdrawToday' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}
// 当日充值及提现统计导出
export const exportDepositWithdrawToday = (params) => {
  const apiMethod = 'ih.p_canteen.statistics.depositWithdrawToday.export' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}
// 历史充值及提现统计
export const depositWithdraw = (params) => {
  const apiMethod = 'ih.p_canteen.statistics.depositWithdraw' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}
// 历史充值及提现统计导出
export const exportDepositWithdraw = (params) => {
  const apiMethod = 'ih.p_canteen.statistics.depositWithdraw.export' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}

