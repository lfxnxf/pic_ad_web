<!--  -->
<template>
  <Modal
    
    v-model="modalTelRef"
    footer-hide
    title="手机验证">
    <p class="tip margin-bottom-20"><span class="iconfont iconsey-zhuyi-b"></span><span>该手机只做验证使用，不作为绑定手机。</span></p>
    <Form :model="form_modal" :label-width="80" ref="formValidate_modal" :rules="ruleValidate_modal">
      <FormItem label='手机号' prop="tel">
        <Input placeholder="输入手机号码" v-model="form_modal.tel"/>
      </FormItem>
      <FormItem label='校验码'>
        <Button type="primary" ghost>点此免费获取</Button>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('ruleValidate_modal')">下一步</Button>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
export default {
  data () {
    return {
      form_modal:{
        tel:''
      },
      ruleValidate_modal:{}
    };
  },

  components: {},

  computed: {
    modalTelRef:{
      get(){
        return this.$store.state.user.modalTelRef;
      },
      set(val){
        this.$store.commit('setModalTelRef',val);
      }
      
    }
  },

  methods: {
    handleSubmit(){
      this.$store.commit('setModalEmailRef',{show: true, username: this.form_modal.tel});
      this.$store.commit('setModalTelRef',false);
    }
  }
}

</script>
<style lang='less' scoped>
@import '../style';
</style>