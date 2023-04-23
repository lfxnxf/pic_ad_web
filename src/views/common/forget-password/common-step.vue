<!--  -->
<template>
  <div class="common-step">
    <login-nav></login-nav>
    <Card dis-hover :bordered="false" shadow>
      <h4 class="title">{{titleText}}</h4>
      <div class="content">
        <Steps :current="currentResetPwdStep" v-if="showStep">
        <Step title="1. 验证身份"></Step>
          <Step title="2. 重置登录密码"></Step>
          <Step title="3. 重置成功"></Step>
        </Steps>
        <keep-alive>
          <router-view :key="$route.path"></router-view>
        </keep-alive>
      </div>
      
    </Card>
    
  </div>
</template>

<script>
import loginNav from '@/components/login-nav';

export default {
  name: 'CommonStep',
  data () {
    return {
      titleText: '请输入您需要重置登录密码的账户名',
    };
  },

  components: { loginNav },

  computed: {
    currentResetPwdStep(){
      return this.$store.state.user.currentResetPwdStep;
    },
    showStep:{
      get(){
        return this.$store.state.user.showStep;
      },
      set(val){
        this.$store.commit(setShowStep,val)
      }
    }
  },

  methods: {
    // 刷新子组件
    freshDragVerify() {
      this.hackReset = false;
      this.$nextTick(() => {
        this.hackReset = true;
      });
    },
    passCallback() {
      let captcha = arguments[0];
      this.captcha = captcha;
    },
    handleSubmit(){
      this.$router.push({name:'CheckStrategy'})
      if (this.captcha) {
        this.$Message.warning('请将滑块滑到右侧');
      } else {
        
        // this.$refs.loginForm.validate((valid) => {
        //   if (valid) {
            
        //   }
        // });

        // this.$router.push({})
      }
    }
  },

  watch:{
    currentResetPwdStep(val){
      switch(val){
        case -1:
        this.titleText = '请输入您需要重置登录密码的账户名';
        break;
        case 0:
        this.titleText = '您正在进行身份验证';
        break;
        case 1:
        this.titleText = '重置密码';
        break;
        case 2:
        this.titleText = '重置完成';
        break;
      }  
    }
  }

  
}

</script>
<style lang='less' scoped>
@import './style';
</style>