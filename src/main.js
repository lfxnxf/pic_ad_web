import Vue from 'vue';
import App from './App.vue';
import router from './router';
import config from '@/config';
import store from './store';
import ViewUI from 'view-design';
import _ from 'underscore';
import { getToken} from '@/libs/util'
import * as filters from './filters';

import 'view-design/dist/styles/iview.css';
import '@/assets/icons/iconfont.css';
import '@/assets/styles/common.css';

import '@/plugins/utils.js';
import '@/plugins/table.js';
// import Print from 'vue-print-nb'
import Print from './plugins/print/print'
// 图片预览组件
import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer';
Vue.use(Viewer);
Vue.use(Print);

// import 'xe-utils'
// import VXETable from 'vxe-table'
// import VXETablePluginIView from 'vxe-table-plugin-iview'
// import 'vxe-table/lib/style.css'

// VXETable.use(VXETablePluginIView);
// Vue.use(VXETable);
// 引入Echarts
// import Echarts from 'echarts';
// Vue.prototype.echarts = Echarts
// Vue.use(Echarts)

import ECharts from 'vue-echarts/components/ECharts.vue';
import * as echarts from 'echarts';
Vue.component('v-chart', ECharts)

Vue.use(ViewUI);
Vue.config.productionTip = true;

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard);

// 路由拦截
router.beforeEach(function(to, from, next) {
  // console.log("getToken ===> ", getToken())

  if (!getToken()) {
    to = '/login';
    next()
  } else {
    next()
  }
});


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
//   mounted: () => {
//     document.dispatchEvent(new Event('x-app-rendered'));
//   },
//   render: (h) => h(App),
// })
