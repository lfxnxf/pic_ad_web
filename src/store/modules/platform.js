import axios from "@/libs/api.platform";

import { setSession, getSession } from "@/libs/util";

export default {
  state: {
    sessionid: getSession(),
    UCUser: {},
  },
  getters: {
    UCUser: (state) => {
      return state.UCUser;
    },
  },
  mutations: {
    SETUCUSER(state, payload) {
      state.UCUser = payload;
    },
    SETSESSION(state, sessionid) {
      state.sessionid = sessionid;
      setSession(sessionid);
    },
  },
  actions: {
    platformUserLogin({ commit }, { data, params, method }) {
      return new Promise((resolve, reject) => {
        axios
          .request({ data, params, method })
          .then((res) => {
            res.return_code === 0 &&
              commit("SETSESSION", res.data.sessionid || "");
            return resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    platformUserLogout({ commit }, { data, params, method }) {
      return new Promise((resolve, reject) => {
        axios
          .request({ data, params, method })
          .then((res) => {
            res.return_code === 0 && commit("SETSESSION", "");
            return resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    platformUserInfo({ commit }, { data, params, method }) {
      return new Promise((resolve, reject) => {
        axios
          .request({ data, params, method })
          .then((res) => {
            res.return_code === 0 && commit("SETUCUSER", res.data);
            return resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    platformCardLogin({ commit }, { data, params, method }) {
      console.log("===>platformCardLogin:data=" + JSON.stringify(data));
      console.log("===>platformCardLogin:params=" + JSON.stringify(params));
      return new Promise((resolve, reject) => {
        axios
          .request({ data, params, method })
          .then((res) => {
            return resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
