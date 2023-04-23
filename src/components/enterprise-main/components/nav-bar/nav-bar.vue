<!--  -->
<template>
  <div class='nav-bar clearfix'>
    <div class="l">
      <ul class="icons">
        <li class="menu" :class="collapsed?'rotate':''" @click='handleCollpasedChange'></li>
        <!-- <li class="home" @click='toEnterpriseHome'></li> -->
      </ul>
    </div>
    <div class="r">
      <ul class="icons">
        <!-- <li class="pic"></li> -->
        <li class="account">
          <Dropdown transfer>
              <a href="javascript:void(0)">
                  {{getCurMerchantName}} [{{getCurUserName}}]
              </a>
          </Dropdown>
        </li>
        <li class="logout">
          <Poptip
            confirm
            transfer
            title="是否退出登录"
            trigger="hover"
            placement="bottom"
            ok-text="是"
            cancel-text="否"
            @on-ok="confirmLogout">
            <div class="bg"></div>
          </Poptip>
        </li>

      </ul>
    </div>
    <Modal
        v-model="logoutModal"
        title="签退确认"
        @on-ok="confirmLogout"
        @on-cancel="cancelLogout">
        确认是否需要签退？
    </Modal>
  </div>
</template>
<script>
import _ from 'underscore';
import { localSave, localRead, setCookiesItem, removeCookies } from '@/libs/util';
export default {
  name: 'NavBar',
  props: {
    collapsed: Boolean,
  },
  data() {
    return {
      logoutModal: false
    };
  },

  components: {},

  computed: {
    getToken() {
      return localRead('sessionId');;
    },
    getCurUserName(){
      return localRead('curUserName');
    },
    getCurOrgName(){
      return localRead('curOrgName');
    },
    getCurMerchantName(){
      return localRead('curMerchantName');
    },
    adminOrgs() {
      let list = this.$store.state.user.adminRole;
      console.log("adminRole list ===> ", list)

      return list;
    },
    currentOrg() {
      let dct = this.$store.state.user.curOrgName;
      return JSON.parse(dct || '{}');
    }
  },

  methods: {
    async logout() {
      let _this = this;
      _this.$store.dispatch('adminLogout',{sessionid: _this.$store.state.user.token,}).then(res => {
        removeCookies();
        _this.$store.commit('setAdminRole', '');
        _this.$store.commit('setCurDepartment', '');
        _this.$store.commit('setCurDepartmentName', '');
        _this.$store.commit('setCurEmpId', '');
        _this.$store.commit('setLastLoginTime', '');
        _this.$store.commit('setCurUserName', '');
        _this.$store.commit('setCurOrgId', '');
        _this.$store.commit('setCurOrgName', '');
        _this.$store.commit('setCurUserCode', '');
        _this.$store.commit('setToken', '');
        _this.$store.commit('setCurMerchantId', '');
        _this.$store.commit('setCurMerchantName', '');    
        _this.$router.replace('/login');
        _this.$forceUpdate();
      }, error => {
        console.log(error);
      });
      
    },
    async handleClick() {
      this.logoutModal = true;
    },
    async confirmLogout() {
      let result = await this.logout();
      console.log("confirmLogout result ===> ", result)
      this.logoutModal = false;
    },
    cancelLogout() {
      this.logoutModal = false;
    },
    handleCollpasedChange() {
      let state = this.collapsed;
      this.$emit('on-coll-change', !state);
    },
    toEnterpriseHome() {
      console.log("nav-bar,toEnterpriseHome.........");
      this.$router.push({ name: 'EnterpriseHome' });
    },
  },
  watch: {
    adminOrgs(val) {
      console.log("adminOrgs val ====> ", val)
    }
  }
}
</script>
<style lang='less' scoped>
@import './nav-bar';
</style>
