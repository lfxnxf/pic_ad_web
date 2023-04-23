<!--  -->
<template>
  <div class="reg-finished text-center">
    <div class="blue-color"><span class="iconfont iconyiwancheng"></span></div>
    <div class="blue-color font-size22 margin-top-30 font-blod">注册成功</div>
  </div>
</template>

<script>
export default {
  name: 'EnterpriseFinished',
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  methods: {},

  activated(){
    this.$store.commit('setRegTabsValue','company')
    this.$store.commit('setCurrentStepCmp',2);
  }
}

</script>
<style lang='less' scoped>
  .reg-finished{
    margin: 50px auto 80px;
    .iconfont{
      font-size: 50px;
    }
  }
</style>