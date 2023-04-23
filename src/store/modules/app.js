import _ from 'underscore';
import {
  getMenuByRouter,
  getMenuByRouter2,
  getHomeRoute,
  getNextRoute,
  routeHasExist,
  routeEqual,
  getRouteTitleHandled,
  localSave,
  localRead,
} from '@/libs/util';
import router from '@/router';
import routers from '@/router/routers';
import config from '@/config';
const { homeName } = config;
export default {
  state:{
    homeRoute: getHomeRoute(routers, homeName),
    local: localRead('local'),
    errorList: [],
    tableLoading: false,
  },
  getters: {
    menuList: (state, getters, rootState) =>
      getMenuByRouter(
        _.filter(routers, function(current){ return current.component && current.component.name == "Main"; }),
        rootState.user.access,
      ),

    
    errorCount: (state) => state.errorList.length,
  },
  mutations:{
    setLocal(state, lang) {
      localSave('local', lang);
      state.local = lang;
    },
    TABLE_LOADING(state, val) {
      state.tableLoading = val;
    },
  },
  actions:{},

}
