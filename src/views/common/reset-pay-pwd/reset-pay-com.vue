<!--  -->
<template>
  <div class="reset-pay-pwd">
    <manage-nav></manage-nav> 
    <Breadcrumb separator="<b class='gray-color'> > </b>">
      <BreadcrumbItem to="/account">账户设置</BreadcrumbItem>
      <BreadcrumbItem>重置支付密码</BreadcrumbItem>
    </Breadcrumb>
    <Card dis-hover :bordered="false" shadow>    
      <Steps v-show="showResetPayPwdStep" :current="currentResetPayPwdStep">
        <Step title="1. 验证身份"></Step>
        <Step title="2. 重置支付密码"></Step>
        <Step title="3. 重置成功"></Step>
      </Steps>
      <keep-alive>
        <router-view :key="$route.path" />
      </keep-alive>   
    </Card>   
  </div>
</template>

<script>
import manageNav from '@/components/manage-nav';
export default {
  name: '',
  data () {
    return {
    };
  },

  components: { manageNav },

  computed: {  
    currentResetPayPwdStep(){
      return this.$store.state.user.currentResetPayPwdStep;
    },
    showResetPayPwdStep(){
      return this.$store.state.user.showResetPayPwdStep;
    },
   
  },

  methods: {
  
  },


  
}

</script>
<style lang='less' scoped>
@import './style';
</style>