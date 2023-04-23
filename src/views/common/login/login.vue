<!--  -->
<template>
  <div class="login loginV2">
    <Spin class="login_spin" size="large" fix v-if="spinShow">
      <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
      <div class="margin-top-10 font-size16">登录中</div>
    </Spin>
    <login-nav></login-nav>
    <div class="content">
      <div class="mask"></div>
      <div class="form_wrapper">
        <img src="@/assets/images/login_bg.jpg" alt="">
        <form-computer class="form-computer"></form-computer>
      </div>
    </div>
  </div>
</template>
<script>
import loginNav from '@/components/login-nav';
import FormComputer from './components/form-computer';
import _ from 'underscore';
import { localSave, localRead, setCookiesItem } from '@/libs/util';
export default {
  name: 'Login',
  data() {
    return {
      spinShow: false
    };
  },

  components: {
    loginNav,
    FormComputer,
  },

  computed: {},

  methods: {
    // 使用icloud的token换取用户中心sessionid，这个逻辑有问题，不能用token在web端登录，具体原因为：获取icloud token，web无法直接从云门户通过code换取token，云门户不允许跨域，需要服务端用code换取token
    fetchIcpAccessToken: async function(code) {
      let params = {
        code: code,
      };
      let userInfo = await this.$store.dispatch('adminLogin', params);
      console.log("fetchIcpAccessToken----->>>>>" + JSON.stringify(userInfo))
      return userInfo;
    },

    // 判断是否为第三方认证回调
    thirdAuth: async function(args) {
      let result = {
        pos: 0, // 0-非三方认证，1 - 三方认证成功，-1 - 三方认证失败，
        msg: '',
        data: {}
      };
      try {
        if (!_.isEmpty(args) && _.has(args, 'code')) {
          // 校验参数是否为第三方认证，且参数是否合法
          result.pos = 1;
          let state = _.has(args, 'state') && Object.prototype.toString.call(args.state) === '[object String]' ? JSON.parse(args.state) : {};
          switch (state.type) {
            case 'icloud':
              let icloudRes = await this.fetchIcpAccessToken(args.code);
              result.data = icloudRes;
              break;
            default:
              break;
          }
        }
        return result;
      } catch (e) {
        result.pos = -1;
        console.log(e);
        return result;
      }
    },

    // 保存本地数据
    saveLocal: async function(ucRes) {
      // console.log("saveLocal ===> ", JSON.stringify(ucRes));
      this.$store.commit('setAdminRole', ucRes.admin_role);
      this.$store.commit('setCurDepartment', ucRes.department);
      this.$store.commit('setCurDepartmentName', ucRes.department_name);
      this.$store.commit('setCurEmpId', ucRes.emp_id);
      this.$store.commit('setLastLoginTime', ucRes.last_login_time);
      this.$store.commit('setCurUserName', ucRes.name);
      this.$store.commit('setCurOrgId', ucRes.org_id);
      console.log("ucRes.org_id ===> ", ucRes.org_id);
      this.$store.commit('setCurOrgName', ucRes.org_name);
      console.log("ucRes.org_name ===> ", ucRes.org_name);
      this.$store.commit('setCurUserCode', ucRes.usercode);
      console.log("ucRes.usercode ===> ", ucRes.usercode);
      this.$store.commit('setToken', ucRes.sessionid);
      console.log("ucRes.sessionid ===> ", ucRes.sessionid);
      this.$store.commit('setEmpUserCode', ucRes.c_usercode);
      console.log("ucRes.c_usercode ===> ", ucRes.c_usercode);
      this.$store.commit('setCurMerchantId', ucRes.merchant_id);
      console.log("ucRes.merchant_id ===> ", ucRes.merchant_id);
      ucRes.merchant_name = ucRes.merchant_id?ucRes.merchant_name:'管理员';
      this.$store.commit('setCurMerchantName', ucRes.merchant_name);
      console.log("ucRes.merchant_name ===> ", ucRes.merchant_name);
      this.$store.commit('setCurMerchantUserCode', ucRes.merchant_code);
      console.log("ucRes.merchant_usercode ===> ", ucRes.merchant_code);
    },

  },

  async mounted() {
    // console.log('this.$route.query ====> ', this.$route.query)
    let args = this.$route.query;

    if (_.isEmpty(args))
      return;

    try {
      let thirdAuthRes = await this.thirdAuth(args);
      let ucRes = {};

      switch (thirdAuthRes.pos) {
        case 1:
          this.spinShow = true;
          if (thirdAuthRes.data.data === "{}"){
            let msg = '认证异常';
            this.$Message.error({
              content: msg,
              duration: 10,
              closable: true
            });
            this.$router.replace({path:'/login'});
          }

          ucRes = thirdAuthRes.data.data;
          this.saveLocal(ucRes);

          let isAdmin = false;
          this.spinShow = false;
          if (ucRes.admin_role === "supervisor_admin") {
            isAdmin = true;
            this.$Message.success('登录成功');
            this.spinShow = false;
            this.$router.push({path: '/business-information/basic-information'});
          }
          if (ucRes.admin_role === "merchant_admin") {
            isAdmin = true;
            this.$Message.success('登录成功');
            this.spinShow = false;
            this.$router.push({path: '/businessinfo/businessinfo'});
          }

          if (!isAdmin){
            this.spinShow = false;
            this.$Message.success('登录失败');
            this.$router.replace({path: '/login'});
          }
          break;
        case -1:
          this.$Message.error('登录失败!!');
          this.$router.replace({path: '/login'});
          break;
        default:
          this.$Message.error('登录失败!');
          this.$router.replace({path: '/login'});
          break;
      }

    } catch (e) {
      console.log(e);
    }
  }
}
</script>
<style lang='less' scoped>
@import './style';
</style>
