import * as user from '@/api/user';
import * as admin from '@/api/admin';
import { localRead, localSave } from '@/libs/util';
import axios from "@/libs/api.platform";

export default {
  state: {
    adminRole: localRead('adminRole'),
    userLoginData: {},
    userData: {},
    userDetailData: {},
    currentUserId: '',
    merchantDepartmentList: [],
    departmentList: [],
    empDepartmentList: [],
    userChildDepartmentList: [],
    token: localRead('sessionId'),
    curDepartment: localRead('curDepartment'),
    curDepartmentName: localRead('curDepartmentName'),
    curEmpId: localRead('curEmpId'),
    lastLoginTime: localRead('lastLoginTime'),
    curUserName: localRead('curUserName'),
    curOrgId: localRead('curOrgId'),
    curOrgName: localRead('curOrgName'),
    curUserCode: localRead('curUserCode'),
    curMerchantId: localRead('curMerchantId'),
    curMerchantName: localRead('curMerchantName'),
    curMerchantUserCode: localRead('curMerchantUserCode'),
    empUserCode: localRead('empUserCode'),
    curUserEditData: {},
    selectedUserList: [],   //多选选中的人员list

    userLoading: false,
    departmentModal: false,
    employeeModal: false,
    userEditModal: false,
    personalDepositModal: false,
    batchDepositModal: false,
    otherUserModal:false,
    userModal:false,
    withdrawSucModal: false   //提现成功modal

  },
  getters: {

  },
  mutations: {
    setAdminRole(state, val) {
      state.adminRole = val;
      localSave('adminRole', val);
    },
    setCurDepartment(state, val) {
      state.curDepartment = val;
      localSave('curDepartment', val);
    },
    setCurDepartmentName(state, val) {
      state.curDepartmentName = val;
      localSave('curDepartmentName', val);
    },
    setCurEmpId(state, val) {
      state.curEmpId = val;
      localSave('curEmpId', val);
    },
    setLastLoginTime(state, val) {
      state.lastLoginTime = val;
      localSave('lastLoginTime', val);
    },
    setCurUserName(state, val) {
      state.curUserName = val;
      localSave('curUserName', val);
    },
    setCurOrgId(state, val) {
      state.curOrgId = val;
      localSave('curOrgId', val);
    },
    setCurOrgName(state, val) {
      state.curOrgName = val;
      localSave('curOrgName', val);
    },
    setCurUserCode(state, val) {
      state.curUserCode = val;
      localSave('curUserCode', val);
    },
    setToken(state, token) {
      state.token = token;
      localSave('sessionId', token);
    },
    setEmpUserCode(state, val) {
      state.empUserCode = val;
      localSave('empUserCode', val);
    },
    setCurMerchantId(state, val) {
      state.curMerchantId = val;
      localSave('curMerchantId', val);
    },
    setCurMerchantName(state, val) {
      state.curMerchantName = val;
      localSave('curMerchantName', val);
    },
    setCurMerchantUserCode(state, val) {
      state.curMerchantUserCode = val;
      localSave('curMerchantUserCode', val);
    },
    UPDATEUSERLIST (state, val){
      state.userData = val;
    },
    GETUSERDETAIL (state, val){
      state.userDetailData = val;
    },
    CURRENT_USER_ID (state, val){
      state.currentUserId = val;
    },
    UpdateDepartmentList (state, val){
      state.departmentList = val;
    },
    UpdateMerchantDepartmentList (state, val){
      state.merchantDepartmentList = val;
    },
    UpdateEmpDepartmentList (state, val){
      state.empDepartmentList = val;
    },
    UpdateUserChildDepartmentList (state, val){
      state.userChildDepartmentList = val;
    },
    UpdateUserLoginData (state, val){
      state.userLoginData = val;
    },
    getUserEditData (state, val){
      state.curUserEditData = val;
    },
    setDepartmentModal (state, val){
      state.departmentModal = val;
    },
    setEmployeeModal (state, val){
      state.employeeModal = val;
    },
    setUserEditModal (state, val){
      state.userEditModal = val;
    },
    setPersonaLDepositModal(state, val){
      state.personalDepositModal = val;
    },
    setBatchDepositModal(state, val){
      state.batchDepositModal = val;
    },
    SELECTEDUSERLIST (state, val){
      state.selectedUserList = val;
    },
    setOtherUserModal(state, val){
      state.otherUserModal = val;
    },
    setUserModal(state, val){
      state.userModal = val;
    },
    setWithdrawSucModal(state, val){
      state.withdrawSucModal = val;
    },

  },
  actions: {
    adminLogin({ commit }, data) {
      return new Promise((resolve, reject) => {
        admin.adminLogin(data).then((res) => {
          console.log("adminLogin----->>>>>" + JSON.stringify(res))
          commit('UpdateUserLoginData', res.data);
          return resolve(res);
        })
          .catch((err) => {
            reject(err);
        });
      });
    },
    adminLogout({ commit }, data) {
      return new Promise((resolve, reject) => {
        admin.adminLogout(data).then((res) => {
          return resolve(res);
        })
          .catch((err) => {
            reject(err);
        });
      });
    },
    staffList({ commit }, data) {
      return new Promise((resolve, reject) => {
        user.staffList(data).then((res) => {
          commit('UPDATEUSERLIST', res.data);
          commit('TABLE_LOADING', false);
          return resolve(res);
        })
          .catch((err) => {
            commit('TABLE_LOADING', false);
            reject(err);
        });
      });
    },
    // 获取用户信息详情
    userDetail({ commit }, data) {
      return new Promise((resolve, reject) => {
        user.userDetail(data).then((res) => {
            commit('GETUSERDETAIL', res.data)
            return resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //编辑用户信息
    userEdit({ commit }, data) {
      return new Promise((resolve, reject) => {
        user.userEdit(data).then((res) => {
            return resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //添加用户信息
    userAdd({ commit }, data) {
      return new Promise((resolve, reject) => {
        user.userAdd(data).then((res) => {
          return resolve(res);
        })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //商户用户登录
    userLogin({ commit }, data) {
      return new Promise((resolve, reject) => {
        user.userLogin(data).then((res) => {
          return resolve(res);
        })
            .catch((err) => {
              reject(err);
            });
      });
    },
    //添加部门用户信息
    userAddByDepartment({ commit }, data) {
      return new Promise((resolve, reject) => {
        user.userAddByDepartment(data).then((res) => {
          return resolve(res);
        })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //获取食堂商户下所有就餐部门
    userChildDepartment({ commit }, data) {
      return new Promise((resolve, reject) => {
        user.userChildDepartment(data).then((res) => {
          // console.log("userChildDepartment res===>" + JSON.stringify(res.data));
          commit('UpdateUserChildDepartmentList', res.data);
          return resolve(res.data);
        })
          .catch((err) => {
            reject(err);
          });
      });
    },

    //用户中心部分接口
    //企业部门信息列表，数据来源于用户中心，非食堂系统
    departmentList({ commit }, data) {
      return new Promise((resolve, reject) => {
        user.departmentList(data).then((res) => {
          // console.log("empDepartmentList res===>" + JSON.stringify(res.data));
          commit('UpdateEmpDepartmentList', res.data);
          return resolve(res.data);
        })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //部门员工信息列表，数据来源于用户中心，非食堂系统
    employeeList({ commit }, data) {
      return new Promise((resolve, reject) => {
        user.employeeList(data).then((res) => {
          return resolve(res.data);
        })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 用户充值
    userDeposit({ commit }, data) {
      return new Promise((resolve, reject) => {
        user.userDeposit(data).then((res) => {
          return resolve(res);
        })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 批量用户充值
    userBatchDeposit({ commit }, data) {
      return new Promise((resolve, reject) => {
        user.userBatchDeposit(data).then((res) => {
          return resolve(res);
        })
            .catch((err) => {
              reject(err);
            });
      });
    },
    // 查询用户钱包余额
    userWalletBalance({ commit }, data) {
      return new Promise((resolve, reject) => {
        user.userWalletBalance(data).then((res) => {
          return resolve(res.data);
        })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // 查询用户钱包余额
    userWalletTradeLogs({ commit }, data) {
      return new Promise((resolve, reject) => {
        user.userWalletTradeLogs(data).then((res) => {
          return resolve(res);
        })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 用户充值撤销
    depositCancel({ commit }, data) {
      return new Promise((resolve, reject) => {
        user.depositCancel(data).then((res) => {
          return resolve(res);
        })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 用户提现
    withdraw({ commit }, data) {
      return new Promise((resolve, reject) => {
        user.withdraw(data).then((res) => {
          return resolve(res);
        })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 手动同步部门信息，从用户中心到食堂系统
    syncDepartments({ commit }, data) {
      return new Promise((resolve, reject) => {
        user.syncDepartments(data).then((res) => {
          return resolve(res);
        })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 获取部门信息列表，从食堂系统
    getMerchantDepartmentList({ commit }, data) {
      return new Promise((resolve, reject) => {
        user.getMerchantDepartmentList(data).then((res) => {
          commit('UpdateMerchantDepartmentList', res.data);
          return resolve(res);
        })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 获取部门级别信息列表
    getMerchantDepartmentLevel({ commit }, data) {
      return new Promise((resolve, reject) => {
        user.getMerchantDepartmentLevel(data).then((res) => {
          return resolve(res);
        })
            .catch((err) => {
              reject(err);
            });
      });
    },
    // 导出就餐人员列表
    exportUserList({ commit }, data) {
      return new Promise((resolve, reject) => {
        user.exportUserList(data).then((res) => {
          return resolve(res);
        })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 批量充值
    batchDepositUser({ commit }, data) {
      return new Promise((resolve, reject) => {
        user.batchDepositUser(data).then((res) => {
          return resolve(res);
        })
          .catch((err) => {
            reject(err);
          });
      });
    },
  }
};
