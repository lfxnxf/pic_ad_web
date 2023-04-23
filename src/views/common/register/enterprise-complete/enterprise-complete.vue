<!--  -->
<template>
  <div class="enterprise-complete">
    <div class="user_info">
      小付钱包账户名:
      <span class="padding-left-20 font-blod">{{ getRegForEmail() }}</span>
      <button class="blue-color" type="button" @click="handleResetEmail"> 更换邮箱 </button>
    </div>
    <Form :model="formItem" :label-width="90" ref="formValidate" :rules="ruleValidate">
      <div class="blue-color font-blod margin-bottom-15 border-top padding-top-10">设置登录密码
        <span class="font-normal font-size12 padding-left-20 gray-color">登录时需验证，保护账户信息</span>
      </div>
      <FormItem label='登录密码' prop="login_password">
        <Input type="password" v-model="formItem.login_password" />
      </FormItem>
      <FormItem label='再输入一次' prop="login_password">
        <Input type="password" v-model="formItem.sure_login_password" />
      </FormItem>
      <!-- <div class="blue-color font-blod margin-bottom-15 border-top padding-top-10">设置支付密码
        <span class="font-normal font-size12 padding-left-20 gray-color">交易付款或账户信息更改时需输入</span>
      </div>
      <FormItem label='支付密码' prop="login_password">
        <Input type="password" v-model="formItem.pay"/>
      </FormItem>
      <FormItem label='再输入一次' prop="login_password">
        <Input type="password" v-model="formItem.sure_pay_password"/>
      </FormItem> -->
      <FormItem><Button type="primary" style="width: 160px;" @click="handleSubmit('ruleValidate')">确 定</Button></FormItem>
    </Form>
    <modal-email-verification></modal-email-verification>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { getCookiesItem, setCookiesItem, sha1 } from '@/libs/util';
import modalEmailVerification from '../enterprise-index/components/modal-email-verification';
export default {
  name: 'EnterpriseComplete',
  data() {
    return {
      formItem: {
        login_password: '',
        sure_login_password: '',
        pay_password: '',
        sure_pay_password: '',

      },
      ruleValidate: {},

    };
  },

  components: {
    modalEmailVerification
  },

  computed: {

  },

  methods: {
    handleSubmit: async function() {
      let regRes = await this.submitRegForEmail();
      console.log("regRes ===> ", regRes)
      if (regRes.code === 0) {
        setCookiesItem('regForEmail', '');
        this.$router.push({ name: 'EnterpriseFinished' });
      } else {
        this.$Message.error(regRes.msg);
      }
      
    },
    submitRegForEmail: async function() {
      return await this.$store.dispatch('userRegister', {
        password: sha1(this.formItem.login_password),
        type: 3,
        user_type: 2,
        username: this.getRegForEmail()
      })
    },
    getRegForEmail() {
      return getCookiesItem('regForEmail');
    },
    // 更换邮箱
    handleResetEmail() {
      setCookiesItem('regForEmail', '');
      this.$router.push({ name: 'EnterpriseIndex' });
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
          this.$store.commit('setRegTabsValue', 'company')
          this.$store.commit('setCurrentStepCmp', 1);
          this.$router.push({ name: 'enterpriseIndex' });
          this.$store.commit('setModalEmailRef', { show: true, email: email });
          // 邮件已验证，直接跳转至设置密码
        } else if (getCheck.check === '1') {
          this.$router.push({ name: 'EnterpriseComplete' });
        }
      });
    }
  },

  activated() {
    let email = this.getRegForEmail();
    if (email) {
      this.getCheckEmail(email);
    }
  }

}
</script>
<style lang='less' scoped>
@import './style';
</style>