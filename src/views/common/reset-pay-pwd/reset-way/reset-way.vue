
<!--  -->
<template>
  <div>
    <p class="margin-bottom-15"><span class="iconfont iconsey-zhuyi-b blue-color padding-right-5"></span>请选择重置方式：</p>
    <Collapse v-model="value1" accordion>
      <Panel name="1">
          忘记密码或密码被锁定
          <ul slot="content">
            <li>
              <span class="iconfont iconshouji2 orange-color font-size22 padding-right-5"></span>
              <span>通过验证短信和回答安全保护问题</span>
              <Button type="primary" @click="toSecurityIssues">重置</Button>
            </li>
            <li>
              <span class="iconfont iconshuaqiaqiapianyinhangqia orange-color font-size22 padding-right-5"></span>
              <span>通过验证短信和验证银行卡信息</span>
              <Button type="primary">重置</Button>
            </li>
            <li>
              <span class="iconfont iconrengongfuwu orange-color font-size22 padding-right-5"></span>
              <span>通过人工服务</span>
              <Button type="primary">重置</Button>
            </li>
          </ul>
      </Panel>
      <Panel name="2">
          记得原支付密码
          <ul slot="content">
            <li>
              <span class="iconfont iconpassword orange-color font-size22 padding-right-5"></span>
              <span>通过验证支付密码</span>
              <Button type="primary">重置</Button>
            </li>
          </ul>
      </Panel>
    </Collapse>
  </div>
</template>

<script>
export default {
  name: 'ResetWay',
  data () {
    return {
      value1: '',
    };
  },

  components: {},

  computed: {},  

  methods: {
    toSecurityIssues(){
      this.$router.push({ name: 'SecurityIssues' })
    },
  },
  
  activated() {
    this.$store.commit('setShowResetPayPwdStep',false);
    this.$store.commit('setCurrentResetPayPwdStep',0);
  },
}

</script>
<style lang='less' scoped>
</style>