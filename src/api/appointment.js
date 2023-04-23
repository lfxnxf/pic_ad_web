import axios from '@/libs/api.platform.js'

// PORTAL端预约记录查询
export const appointmentList = (params) => {
  const apiMethod = 'ih.canteen.appointment.listForPortal' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    method: 'post'
  })
}

// 导出就餐记录列表
export const exportAppointmentList = (params) => {
  const apiMethod = 'ih.canteen.appointment.export' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    // params: { method: apiMethod },
    method: 'post'
  })
}

