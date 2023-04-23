<!--  -->
<template>
  <div class="reg-finished text-center">
    <div class="base-color"><span class="iconfont iconyiwancheng"></span></div>
    <div class="base-color font-size22 margin-top-30 font-blod">注册成功</div>
  </div>
</template>

<script>
export default {
  name: 'RegFinished',
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  methods: {},

  activated(){
    this.$store.commit('setCurrentStep',2);
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