<!--  -->
<template>
  <div>
    <Form :label-width="120"> 
      <FormItem v-model="form" label="手机号码">
        <span>166******29</span>
      </FormItem>
      <FormItem class="verify-code" label='验证码' prop="valid">
        <Input placeholder="验证码"/>
        <Button type="success" ghost>获取验证码</Button>
        <p class="prompt"><span class="iconfont iconwancheng1 green-color margin-right-5"></span>校验码已发送，有效时间为5分钟，请及时查收。</p>
      </FormItem>
      <FormItem label="安全保护问题1">
        <span>我妻子的名字是</span>
      </FormItem>
      <FormItem label="答案">
        <Input/>
      </FormItem>
       <FormItem label="安全保护问题2">
        <span>我妻子的生日是</span>
      </FormItem>
      <FormItem label="答案">
        <Input/>
      </FormItem>
       <FormItem label="安全保护问题3">
        <span>我妈妈的名字是</span>
      </FormItem>
      <FormItem label="答案">
        <Input/>
      </FormItem>
      <FormItem class="margin-top-30">
        <Button class="margin-right-20" type="success" @click="handleSubmit">下一步</Button>
        <span class="font-size12 blue-color pointer_line" @click="toResetWay">重新选择验证方式</span>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'SecurityIssues',
  data () {
    return {
      form:{
       
      }
    };
  },

  components: {},

  computed: {
    userInfo(){
      return this.$store.state.user.userInfo;
    }
  },

  methods: {
    // 获取用户信息
    getUserInfo: async function() {
      let profile = await this.$store.dispatch('userInfo');
      return profile;    
    },
    toResetWay(){
      this.$router.push({ name: 'ResetWay' });
    },
    handleSubmit(){
      this.$router.push({ name: 'ResetPayPwd' });
    }
  },

  mounted() {
    this.getUserInfo();
  },

  activated() {
    this.$store.commit('setShowResetPayPwdStep',true);
    this.$store.commit('setCurrentResetPayPwdStep',0);

  },
}

</script>
<style lang='less' scoped>
  .ivu-form{
    width: 450px;
    padding: 30px 0 30px 100px;
    .ivu-form-item {
      margin-bottom: 10px;
    }
    .ivu-form-item-content>span{
      font-weight: 500;
    }
  }
</style>