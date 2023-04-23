<!--  -->
<template>
  <Modal class="modalEmailRef" v-model="modalEmailRefShow" footer-hide title="账户名验证">
    <p class="margin-bottom-15">Hi，<span class="base-color">{{ getEmail() }}</span></p>
    <p class="margin-bottom-10">感谢您注册小付企业钱包。</p>
    <p class="margin-bottom-20">验证邮件已发送，请登录您的邮箱完成验证。</p>
    <Button class="margin-bottom-20" type="primary" @click="emailRef">立刻登录邮箱完成验证</Button>
    <div class="font-size12 margin-bottom-20">若您没有收到邮件您可以：检查是否在垃圾邮件中，如果还未收到，点击
      <button class="resend blue-color" type="button" @click="handleResend">{{resend_text}}</button>
    </div>
  </Modal>
</template>
<script>
import { getCookiesItem } from '@/libs/util';
export default {
  data() {
    return {
      resend_text: '重新发送邮件',
      form_modal: {
        email: ''
      },
      ruleValidate_modal: {},
    };
  },

  components: {},

  computed: {
    // regForEmail() {
    //   return getCookiesItem('regForEmail');
    // },
    modalEmailRefShow: {
      get() {
        return this.$store.state.user.modalEmailRef.show;
      },
      set(val) {
        this.$store.commit('setModalEmailRef', { show: val, username: this.getEmail() });
      }
    }
  },

  methods: {
    getEmail: function() {
      return getCookiesItem('regForEmail');
    },
    emailRef() {
      window.open('_blank');

    },
    handleResend() {
      this.$parent.sendValidateEmail(this.getEmail());
    },
  }
}
</script>
<style lang='less' scoped>
@import '../style';
</style>