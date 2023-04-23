<!--  -->
<template>
  <div class="company">
    <Form :model="formItemCompany" :label-width="80" ref="ruleValidateCompany" :rules="ruleValidateCompany">
      <FormItem label='账户名' prop="accountName">
        <Input placeholder="输入电子邮箱" v-model="formItemCompany.accountName" />
      </FormItem>
      <FormItem label='验证码' prop="valid">
        <Input class="input_check_code" placeholder="验证码" v-model="formItemCompany.valid" />
        <div class="check_code"> ydU9</div>
      </FormItem>
      <FormItem><Button type="primary" @click="handleSubmit('ruleValidateCompany')">下一步</Button></FormItem>
    </Form>
    <div class="code">
      <h5>打开xxx扫码注册</h5>
      <img src="@/assets/images/erweima.png" alt="">
    </div>
      <modal-phone-verification></modal-phone-verification>
      <modal-email-verification></modal-email-verification>
    </div>
</template>
<script>
import { setCookiesItem, getCookiesItem } from '@/libs/util';
import modalPhoneVerification from './components/modal-phone-verification';
import modalEmailVerification from './components/modal-email-verification';
export default {
  name: 'EnterpriseIndex',
  data() {
    return {
      formItemCompany: { //企业注册信息
        accountName: '',
        valid: ''
      },
      ruleValidateCompany: {

      },

    };
  },

  components: { modalPhoneVerification, modalEmailVerification },

  computed: {},

  methods: {
    handleSubmit() {
      setCookiesItem('regForEmail', this.formItemCompany.accountName);
      // this.$store.commit('setModalTelRef',true);
      this.sendValidateEmail(this.formItemCompany.accountName);
      this.$store.commit('setModalEmailRef', { show: true, email: this.formItemCompany.accountName });
    },
    // 发送验证邮件
    sendValidateEmail(email) {
      this.$store.dispatch('preCheckEmail', { code: 'VALIDATE_EMAIL', email: email });
    },
    // 获取信息
    getCheckEmail(email) {
      this.$store.dispatch('getCheckEmail', { email: email }).then(getCheck => {
        if (!getCheck) {
          return;
        }
        let check = getCheck.check;
        // 邮件未验证
        if (getCheck.check === '0') {
          this.$store.commit('setModalEmailRef', { show: true, email: email });
          // 邮件已验证，直接跳转至设置密码
        } else if (getCheck.check === '1') {
          this.$router.push({ name: 'EnterpriseComplete' });
        }
      });
    }

  },
  // mounted(){

  // },
  activated() {
    if (this.$route.name == 'EnterpriseIndex') {
      this.$store.commit('setCurrentStepCmp', 0);
      this.$store.commit('setRegTabsValue', 'company');
      this.formItemCompany.accountName = getCookiesItem('regForEmail') || '';
      // 当有邮件时根据用户操作跳转响应的页面
      if (this.formItemCompany.accountName) {
        this.getCheckEmail(this.formItemCompany.accountName)
      }
    }
  },

}
</script>
<style lang='less' scoped>
@import './style';
</style>