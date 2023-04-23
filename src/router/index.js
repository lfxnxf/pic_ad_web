import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers';
import config from '@/config';
import store from '@/store';
import ViewUI from 'view-design';
// import config from '@/config';


//修改原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location){
  return originalPush.call(this, location).catch(err=>err);
}


// const { homeName } = config;
Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
});

router.beforeEach(function(to, from, next) {
  // console.log("beforeEach username===> ", store.state.user.curUserName);
  ViewUI.LoadingBar.start();

  let userName = store.state.user.curUserName || '';
  // if (userName == '') {
  //   if (to.path !== '/login') {
  //     return next({path: '/login'});
  //   }
  // };

  next();
});

router.afterEach(route => {
  ViewUI.LoadingBar.finish();
});

export default router
