<!--  -->
<template>
  <div class="top-nav">
    <div class="login-info">你好，{{ getNickname() }}</div>
    <div class="border pointer_color" @click='logout'>退出</div>
    <div class="border" v-show="this.$route.name!='wallet'" @click="toWallet">我的钱包</div>
    <div class="border" @click="toSecurity">安全中心</div>
    <div>服务大厅</div>
    <span class="iconfont iconmenu"></span>
  </div>
</template>

<script>
import { getCookiesItem, removeCookies } from '@/libs/util';
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  methods: {
    logout: async function() {
      let _this = this;
      _this.$store.dispatch('userLogout').then(res => {
        removeCookies();
        _this.$router.replace('/login');
      }, error => {
        console.log(error);
      })
    },
    getNickname: function() {
      return getCookiesItem('nickname');
    },
    toWallet(){
      this.$router.push({name: 'wallet'});
    },
    toSecurity(){
      this.$router.push({name: 'Security'});
    }
  }
}

</script>
<style lang='less' scoped>
@import './top-nav';
</style>