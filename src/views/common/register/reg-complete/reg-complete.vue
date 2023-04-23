<!--  -->
<template>
  <div class="reg-complete">
    <!-- <div class="user_info">小付钱包账户名<span class="padding-left-20 font-blod">{{smtUserInfo ? smtUserInfo.reg_username : '未注册'}}</span></div> -->
    <Form :model="formItem" :label-width="90" ref="formValidate" :rules="ruleValidate">
      <div class="orange-color font-blod margin-bottom-15 border-top padding-top-10">设置登录密码
        <span class="font-normal font-size12 padding-left-20 gray-color">登录时需验证，保护账户信息</span>
      </div>
      <FormItem label='登录密码' prop="login_password">
        <Input type="password" v-model="formItem.login_password" />
      </FormItem>
      <FormItem label='再输入一次' prop="login_password">
        <Input type="password" v-model="formItem.sure_login_password" />
      </FormItem>
      <!--       <div class="orange-color font-blod margin-bottom-15 border-top padding-top-10">设置身份信息<span class="font-normal font-size12 padding-left-20">请务必准确填写本人的身份信息，注册后不能更改</span></div>
      <FormItem label='真实姓名' prop="name">
        <Input v-model="formItem.name"/>
      </FormItem>
      <FormItem label='身份证号码' prop="id">
        <Input v-model="formItem.id"/>
      </FormItem> -->
      <!-- <FormItem label='有效期' prop="valid">
        <Input v-model="formItem.valid"/>
      </FormItem> -->
      <!-- <FormItem label='职业' prop="professional">
        <Select v-model="formItem.professional" placeholder="请选择">
          <Option value="beijing">工程师</Option>
          <Option value="shanghai">教师</Option>
          <Option value="shenzhen">农民</Option>
        </Select>
      </FormItem> -->
      <!-- <FormItem label='常用地址' prop="area">
        <Cascader :data="address_data" v-model="formItem.area"></Cascader>
      </FormItem>
      <FormItem>
        <textarea name="" cols="30" rows="3" v-model="formItem.address"></textarea>
      </FormItem> -->
      <!-- <div class="orange-color font-blod margin-bottom-15 border-top padding-top-10">设置支付密码
        <span class="font-normal font-size12 padding-left-20 gray-color">交易付款或账户信息更改时需输入</span>
      </div>
      <FormItem label='支付密码' prop="login_password">
        <Input type="password" v-model="formItem.pay"/>
      </FormItem>
      <FormItem label='再输入一次' prop="login_password">
        <Input type="password" v-model="formItem.sure_pay_password"/>
      </FormItem> -->
      <FormItem><Button type="success" style="width: 160px;" @click="handleSubmit('ruleValidate')">确 定</Button></FormItem>
    </Form>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { sha1 } from '@/libs/util';
export default {
  name: 'RegComplete',
  data() {
    return {
      phone: '',
      formItem: {
        phone: '',
        name: '',
        // gender:'',
        id: '',
        // valid: '',
        // professional: '',
        // area: [],
        // address: '',
        login_password: '',
        sure_login_password: '',
        pay_password: '',
        sure_pay_password: '',

      },
      ruleValidate: {},
    };
  },

  components: {},

  computed: {
    ...mapState({
      smtUserInfo: state => state.user.userInfo
    })
  },

  methods: {
    handleSubmit: async function() {
      if (!this.formItem.login_password || !this.formItem.sure_login_password) {
        this.$Message.error('密码不能为空!');
        return;
      }

      if (this.formItem.login_password !== this.formItem.sure_login_password) {
        this.$Message.error('两次输入的密码不一致!');
        return;
      }
      let apiRes = await this.$store.dispatch('userRegister', { type: 2, phone: this.formItem.phone, username: this.formItem.phone, password: this.formItem.login_password });
      if (apiRes.code === 0) {
        this.$router.push({ name: 'RegFinished' });
      } else {
        return this.$Message.error(`${apiRes.code}[${apiRes.msg}]`);
      }
    }
  },

  mounted() {
    console.log("this.$route.query.phone ====> ", this.$route.query.phone);
    this.phone = this.$route.query.phone;
    this.formItem.phone = this.phone;


  },

  activated() {
    this.$store.commit('setCurrentStep', 1);
  }

}
</script>
<style lang='less' scoped>
@import './style';
</style>