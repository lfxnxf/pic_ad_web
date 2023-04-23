
import axios from '@/libs/api.platform.js'

// // 根据组企业id查询企业员工列表
// export const employeeList = (params) => {
//   const apiMethod = 'ih.user.company.employeeList' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
//   const data = { ...params, method: apiMethod }
//   return axios.request({
//     data,
//     // params: { method: apiMethod },
//     method: 'post'
//   })
// }
// // 根据组企业id查询企业部门列表
// export const departmentList = (params) => {
//   const apiMethod = 'ih.user.company.departmentList' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
//   const data = { ...params, method: apiMethod }
//   return axios.request({
//     data,
//     // params: { method: apiMethod },
//     method: 'post'
//   })
// }
