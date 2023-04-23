<!--  -->
<template>
  <div class="register">
    <login-nav></login-nav>
    <Card dis-hover :bordered="false" shadow>
      <Tabs v-model="tabsValue" @on-click='handleChangeTabs'>
        <TabPane label="个人注册" name="personal">
          <Steps :current="currentStep">
            <Step title="1. 创建账户"></Step>
            <Step title="2. 设置身份信息"></Step>
            <Step title="3. 完成"></Step>
          </Steps>
          <keep-alive v-show="tabsValue=='personal'?true:false">
            <router-view :key="$route.path" />
          </keep-alive>
        </TabPane>
        <TabPane label="企业注册" name="company">
          <Steps class="com_steps" :current="currentStepCmp">
            <Step title="1. 创建账户"></Step>
            <Step title="2. 填写账户信息"></Step>
            <Step title="3. 完成"></Step>
          </Steps>
          <keep-alive v-show="tabsValue=='personal'?false:true">
            <router-view :key="$route.path" />
          </keep-alive>
        </TabPane>
      </Tabs>
    </Card>   
  </div>
</template>

<script>
import loginNav from '@/components/login-nav';
export default {
  name: 'Register',
  data () {
    return {
      // tabsValue: 'personal',
      showView: true,
    };
  },

  components: { loginNav },

  computed: {  
    currentStep(){
      return this.$store.state.user.currentStep;
    },
    currentStepCmp(){
      return this.$store.state.user.currentStepCmp;
    },
    tabsValue:{
      get(){
        return this.$store.state.user.regTabsValue;
      },
      set(val){
        this.$store.commit('setRegTabsValue', val)
      }
    }
  
  },

  watch:{
    tabsValue(val){
      this.initStepsStyle(val);
    }
  },

  methods: {
    initStepsStyle(val){
      let border = document.getElementsByClassName('ivu-tabs-ink-bar')[0];           
      if(val == 'company'){
        border.style.backgroundColor = '#228eca';
        this.showView = false;
      }else{
        border.style.backgroundColor = '#39c07e';
        this.showView = true;
      }
    },
    handleChangeTabs(name){
      if(name == 'personal'){
        this.$router.push({name: 'RegIndex'});
      }else{
        this.$router.push({name: 'EnterpriseIndex'});
      }
      this.$store.commit('setRegTabsValue', name);
    },
  },

  
}

</script>
<style lang='less' scoped>
@import './style';
</style>