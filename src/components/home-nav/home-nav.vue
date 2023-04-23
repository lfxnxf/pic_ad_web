<!--  -->
<template>
  <div class="home-nav">
    <top-nav></top-nav>
    <div class="nav clearfix">
      <div class='logo pointer' @click="toHome"></div>
      <Menu class="list" mode="horizontal" :active-name="$route.name">
        <MenuItem name='wallet' to="/wallet">我的钱包</MenuItem>
        <MenuItem name='receivableBills' target='_blank' to="/receivableBills">我的账单</MenuItem>
        <MenuItem name='transaction-records' to="/transaction-records">交易记录</MenuItem>
        <MenuItem name='4'>应用中心</MenuItem>
        <MenuItem name='5'>会员卡</MenuItem>
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
  name: 'HomeNav',
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
      this.$router.push({path: '/'});
    }
  },

}
</script>
<style lang='less' scoped>
@import './home-nav';
</style>