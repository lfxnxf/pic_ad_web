<!--  -->
<template>
  <div class="manage-nav">
    <top-nav></top-nav>
    <div class="header">
      <div class='logo' @click='toWallet'><img src="@/assets/images/logo.png" alt=""></div>
      <h3 v-text="$route.meta.m_title"></h3>
    </div>  
  </div>
</template>

<script>
import topNav from '@/components/top-nav';
export default {
  name: 'ManageNav',
  data () {
    return {
    };
  },

  components: { topNav },

  computed: {},

  methods: {
    toWallet(){
      this.$router.push({name: 'wallet'});
    }
  }
}

</script>
<style lang='less' scoped>
@import './style';
</style>