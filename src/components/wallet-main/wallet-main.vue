<!--  -->
<template>
  <div class="wallet-main">
    <div class="user_info clearfix">
      <div class="pic" @click="toAccountSettings"></div>
      <div class="info">
        <div class="margin-bottom-10 font-size16">上午好，
          <Dropdown @on-click='toAccountSettings'>
            <a href="javascript:void(0)">
                {{ getNickname() }}
                <Icon type="md-arrow-dropdown" />
            </a>
            <DropdownMenu slot="list">
              <DropdownItem>账户设置</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Tooltip placement="top">
            <div class='iconfont iconzhengjian margin-left-10 font-size20 pointer' @click="userInfo.real_status?toRealDetail():toCertify()">
              <span class="iconfont pointer" :class="userInfo.real_status?'iconwancheng base-color':'iconzhuyi1 red-color'" slot="count"></span>  
            </div>
            <div slot="content">
             {{userInfo.real_status? "您已通过实名认证": "您还未通过实名认证"}}   
            </div>
          </Tooltip>
          <Tooltip placement="top">      
            <div class='iconfont iconemail1 margin-left-10 font-size20 pointer' @click="toAccountSettings">
              <span class="iconfont pointer" :class="userInfo.is_bind_email?'iconwancheng base-color':'iconzhuyi1 red-color'" slot="count"></span>  
            </div>
            <div slot="content">
              {{userInfo.is_bind_email? `您已绑定邮箱${userInfo.email}`: "您还未绑定邮箱"}}   
            </div>
          </Tooltip>
          <Tooltip placement="top">
            <div class='iconfont iconshouji1 margin-left-10 font-size20 pointer' @click="toAccountSettings">
              <span class="iconfont pointer" :class="userInfo.is_bind_phone?'iconwancheng base-color':'iconzhuyi1 red-color'" slot="count"></span>  
            </div>
            <div slot="content">
              {{userInfo.is_bind_phone? `您已绑定手机号${userInfo.phone}`: "您还未绑定手机"}}   
            </div>
          </Tooltip>
        
        </div>
        <p class="font-size13">账户名：
          <span class="pointer_line" @click="toAccountSettings">{{ userInfo.username }}</span> 
          <span class="padding-left-10">|</span> <span class='padding-left-10'>上次登录时间：{{ getLastLoginTime() }}</span>  
        </p>    
      </div>
    </div>
  </div>
</template>
<script>
import { getCookiesItem } from '@/libs/util';
export default {
  name: 'WalletMain',
  data() {
    return {
      wallet: {},
      balanceTmp: 0,
      availableBalanceTmp: 0,
      // usernameTmp: '',
      badgeOffset: [22,3],
      
    };
  },

  components: {},

  computed: {
    // username() {
    //   return this.usernameTmp;
    // },
    userInfo(){
      return this.$store.state.user.userInfo;
    }
  },

  methods: {
    //点击账户设置
    toAccountSettings() {
      this.$router.push({ name: 'AccountIndex' });
    },
    toCertify(){
      this.$router.push({ name: 'Certify' });
    },
    toRealDetail(){
      this.$router.push({ name: 'RealDetail' });
    },
    // 获取昵称
    getNickname() {
      return getCookiesItem('nickname');
    },
    // 获取最后一次登录时间
    getLastLoginTime() {
      return getCookiesItem('last_login_time');
    },
    // 获取用户信息
    getUserInfo: async function() {
      // let profile = await this.$store.dispatch('userInfo');
      this.$store.dispatch('userInfo');
      // console.log("profile ====> ", profile);
      // this.usernameTmp = profile.username;
    }
  },
  async mounted() {
    await this.getUserInfo()
  }
}
</script>
<style lang='less' scoped>
@import './wallet-main';
</style>