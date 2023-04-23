import { Promise } from 'core-js';
import axios from '@/libs/api.request';

export default {
  state: {
    icpAccessToken: null,
    icpUserInfo: null,
  },
  mutations: {
    updateIcpAccessToken(state, payload) {
      state.icpAccessToken = payload;
    },
    updateIcpUserInfo(state, payload) {
      state.icpUserInfo = payload;
    }
  },
  actions: {
    fetchIcpAccessToken({ commit }, payload) {
      console.log('fetchIcpAccessToken--------payload:',payload)
      return new Promise((resolve, reject) => {
        axios.request({ url: '', method: 'post', data: payload }).then(res => {
          console.log('state--------res:',res)
          const tokenInfo = res.data
          console.log('state--------tokenInfo:',tokenInfo)
          commit('updateIcpAccessToken', tokenInfo.access_token);
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // fetchIcpUserinfo({ commit }, payload) {
    //   return new Promise((resolve, reject) => {
    //     axios.request({ url: 'api/v1/auth/icp/user', method: 'get', params: payload }).then(res => {
    //       const userInfo = res.data;
    //       commit('updateIcpUserInfo', userInfo);
    //       resolve(res.data)
    //     }).catch(err => {
    //       reject(err)
    //     })
    //   })
    // }
  }
};
