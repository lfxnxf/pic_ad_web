<!--  -->
<template>
  <div class="check-strategy"> 
    <Form :label-width="80" ref='checkForm' :rules="ruleValidate">
      <FormItem class="padding-top-10 clearfix verify-code margin-bottom-0" prop="tel" label="手机号码">
        <Input class="input_tel margin-right-10" v-model="form.tel"></Input>
        <div class="get_check_code">获取验证码</div>
        <p class="prompt"><span class="iconfont iconwancheng1 green-color margin-right-5"></span>校验码已发送，有效时间为5分钟，请及时查收。</p>
      </FormItem>
      <FormItem prop="check_code" label="验证码">
        <Input v-model="form.check_code"></Input>
      </FormItem>
      <FormItem class="margin-bottom-10">
        <Button type="success" @click='handleSubmit'>同意协议并确定</Button>
      </FormItem>
      <FormItem>
        <p class="font-size12">查看<span class="base-color">《小付支付服务相关协议》</span></p>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'CheckStrategy',
  data () {
    return {
      form: {
        tel: '',
        check_code: ''
      },
      ruleValidate: {}
    };
  },

  components: { },

  computed: {
    
  },

  methods: {
    handleSubmit(){
      this.$router.push({name:'ResetPwd'})
    }
  },
  activated() {
    this.$store.commit('setShowStep',true);
    this.$store.commit('setCurrentResetPwdStep',0);

  },
}

</script>
<style lang='less' scoped>
  @import '../style';
</style>