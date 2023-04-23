import axios from '@/libs/api.platform.js'

// 添加用户信息
export const userAdd = (params) => {
  const apiMethod = 'ih.canteen.staff.add' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    // url: apiMethod.split('.').join('/'),
    data,
    method: 'post'
  })
}
// 获取用户信息列表
export const staffList = (params) => {
  const apiMethod = 'ih.canteen.staff.list' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    // url: apiMethod.split('.').join('/'),
    data,
    method: 'post'
  })
}
// 获取用户信息详情
export const userDetail = (params) => {
  const apiMethod = 'ih.canteen.staff.detail' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    // url: apiMethod.split('.').join('/'),
    data,
    method: 'post'
  })
}

//编辑用户信息
export const userEdit = (params) => {
  const apiMethod = 'ih.canteen.staff.edit' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    // url: apiMethod.split('.').join('/'),
    data,
    method: 'post'
  })
}

//商户用户登录
export const userLogin = (params) => {
  const apiMethod = 'ih.canteen.user.login' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    // url: apiMethod.split('.').join('/'),
    data,
    method: 'post'
  })
}

//添加部门用户信息
export const userAddByDepartment = (params) => {
  const apiMethod = 'ih.canteen.staff.addByDepartment' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    // url: apiMethod.split('.').join('/'),
    data,
    method: 'post'
  })
}

//获取食堂商户下所有就餐部门
export const userChildDepartment = (params) => {
  const apiMethod = 'ih.canteen.staff.department' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    // url: apiMethod.split('.').join('/'),
    data,
    method: 'post'
  })
}

//从用户中心，获取部门列表
export const departmentList = (params) => {
  const apiMethod = 'ih.user.company.departmentList' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    // url: apiMethod.split('.').join('/'),
    data,
    method: 'post'
  })
}
//从用户中心，根据组企业id查询企业员工列表
export const employeeList = (params) => {
  const apiMethod = 'ih.user.company.employeeList' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    // params: { method: apiMethod },
    method: 'post'
  })
}

// 用户充值
export const userDeposit = (params) => {
  // const apiMethod = 'ih.boss.deposit.cash' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const apiMethod = 'ih.canteen.staff.deposit';
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    // params: { method: apiMethod },
    method: 'post'
  })
}

// 批量用户充值
export const userBatchDeposit = (params) => {
  const apiMethod = 'ih.canteen.staff.deposit.batch';
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    // params: { method: apiMethod },
    method: 'post'
  })
}

// 查询用户钱包余额
export const userWalletBalance = (params) => {
  const apiMethod = 'ih.user.wallet.getInfo' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    // params: { method: apiMethod },
    method: 'post'
  })
}

// 查询用户钱包余额
export const userWalletTradeLogs = (params) => {
  const apiMethod = 'ih.user.wallet.getTradeLogs' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    // params: { method: apiMethod },
    method: 'post'
  })
}
// 用户充值撤销
export const depositCancel = (params) => {
  const apiMethod = 'ih.canteen.staff.depositCancel' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    // params: { method: apiMethod },
    method: 'post'
  })
}

// 用户提现
export const withdraw = (params) => {
  const apiMethod = 'ih.canteen.staff.withdraw' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    // params: { method: apiMethod },
    method: 'post'
  })
}

// 手动同步部门信息，从用户中心到食堂系统
export const syncDepartments = (params) => {
  const apiMethod = 'ih.canteen.department.sync' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    // params: { method: apiMethod },
    method: 'post'
  })
}

// 获取部门信息列表，从食堂系统
export const getMerchantDepartmentList = (params) => {
  const apiMethod = 'ih.canteen.department.list' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    // params: { method: apiMethod },
    method: 'post'
  })
}

// 获取部门级别信息列表
export const getMerchantDepartmentLevel = (params) => {
  const apiMethod = 'ih.canteen.department.level' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    // params: { method: apiMethod },
    method: 'post'
  })
}

// 导出就餐人员列表
export const exportUserList = (params) => {
  const apiMethod = 'ih.canteen.staff.export' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    // params: { method: apiMethod },
    method: 'post'
  })
}

// 批量充值
export const batchDepositUser = (params) => {
  const apiMethod = 'ih.canteen.staff.deposit.batch' // 如果是通过网关请求，需要配置网关api，否则不用配置此字段
  const data = { ...params, method: apiMethod }
  return axios.request({
    data,
    // params: { method: apiMethod },
    method: 'post'
  })
}
