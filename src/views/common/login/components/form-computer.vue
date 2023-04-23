<!--  -->
<template>
  <Form class="text-center" ref="loginForm">
    <p class="font-blod font-size18 text-center margin-bottom-20">壁纸管理系统</p>
    <Button class="icloudportal" type='success' style="margin-top:26%;" @click="handleLogin">登录</Button>
  </Form>
</template>
<script>
import config from '@/config';
import { setCookiesItem, getRandom } from '@/libs/util';
import moment from 'moment-timezone';
import sha1 from 'js-sha1';
import _ from 'underscore';

export default {
  data() {
    return {

    }
  },

  components: {},

  computed: {},

  methods: {

    // 账号登录
    handleLogin() {
      console.log(this.$router)
      this.$router.push({path: '/mgt'});
      
    },


  },

}
</script>
<style lang='less' scoped>
@import '../style';
</style>
