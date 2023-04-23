<!--  -->
<template>
  <div class="home-nav">
    <top-nav></top-nav>
    <div class="nav clearfix">
      <div class='logo pointer' @click="toHome"></div>
      <Menu class="list" mode="horizontal" :active-name="$route.name">
        <MenuItem name='EnterpriseHome' to="/enterpriseHome">我的钱包</MenuItem>
        <MenuItem name='2' target='_blank' to="/overview-bills">我的账单</MenuItem>
        <MenuItem name='3'>交易记录</MenuItem>
        <MenuItem name='4'>财务</MenuItem>
      </Menu>
    </div>
    <div class="view">
      <keep-alive>
        <router-view :key="$route.path" />
      </keep-alive>
    </div>
  </div>
</template>
<script>
  import topNav from '@/components/top-nav';
export default {
  name: 'EnterpriseHomeNav',
  data() {
    return {
      refresh: true,
    };
  },

  components: { topNav },

  computed: {
    // userInfo: function() {
    //   return this.$store.state.user.userInfo;
    // }
  },

  methods: {
    toHome(){
      // this.$router.push({path: '/'});
    }
  },

}
</script>
<style lang='less' scoped>
@import './enterprise-home-nav';
</style>