<!--  -->
<template>
  <div>
    <Form ref="formValidate" :model="formItem" :label-width="130" :rules="ruleValidate">
      <FormItem :label="label2()" prop="newPwd1">
        <Input style="width: 340px;" type="password" v-model="formItem.newPwd1"></Input>
      </FormItem>
      <FormItem :label="label3()" prop="newPwd2">
        <Input style="width: 340px;" type="password" v-model="formItem.newPwd2"></Input>
      </FormItem>
      <FormItem class="authCodeInput" :label="label4()" prop="authCode">
        <Input style="width: 340px;" v-model="formItem.authCode">
        <span class="margin-right-20" slot="append">{{ phone() }}</span>
        <Button v-show="show" style="width: 30px;" slot="append" icon="ios-chatbubbles" @click="getAuthCode()"></Button>
        <span slot="append" v-show="!show" > {{count}} s </span>
        </Input>
        <Button v-if="isShowSave" class="margin-left-30" type="primary" @click='handleResetPasswd'>提交</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import sha1 from 'js-sha1';
import { localSave, localRead } from '@/libs/util';
export default {
  props: {
    isShowSave: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formItem: {
        newPwd1: '',
        newPwd2: '',
        authCode: ''
      },
      ruleValidate: {
        newPwd1: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        newPwd2: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
        ],
        authCode: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' },
        ],
      },
      show: true,
      count: '',
      timer: null,
    };
  },

  components: {},

  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    }
  },

  methods: {
    label2() {
      return this.userInfo.is_sys_pwd === 1 ? '输入密码' : '输入新密码';
    },
    label3() {
      return this.userInfo.is_sys_pwd === 1 ? '再次输入密码' : '再次输入新密码';
    },
    label4() {
      return '短信验证码';
    },
    phone() {
      let phone = this.userInfo.phone;
      // console.log("phone ===> ", phone)
      let start = phone ? phone.substring(0, 3) : '';
      let end = phone ? phone.substring(7, 11) : '';
      return `${start} **** ${end}`;
    },
    async getAuthCode() {
      if (! await this.getSmsAuthCode()) {
        return;
      }
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000)
      }
    },
    // 发送短信
    async getSmsAuthCode() {
      try {
        if (this.formItem.newPwd1 !== this.formItem.newPwd2) {
          this.$Message.error('两次密码输入的不一致！');
          return false;
        }
        let params = {
          phone: this.userInfo.phone,
          username: this.userInfo.login_name,
          user_type: 1,
          use_type: 3
        };
        let res = await this.$store.dispatch('getSmsAuthCode', params);
        console.log("getSmsAuthCode ==> ", res);
        localSave('authCodeToken', res.data.uuid);
        return true;
      } catch (e) {
        this.$Message.error('短信验证码获取异常')
        return false;
      }
    },
    //
    async handleResetPasswd() {
      try {
        let valid = await this.$refs['formValidate'].validate();
        if (!valid) {
          return;
        }
        if (this.formItem.newPwd1 !== this.formItem.newPwd2) {
          this.$Message.error('两次密码输入的不一致！');
          return;
        }
        if (!localRead('authCodeToken')) {
          this.$Message.error('请重新获取短信验证码！');
          return;
        }
        await this.resetPasswd();
        return;
      } catch (e) {
        console.log(e);
      }
    },
    async resetPasswd() {
      // console.log("sha1(this.formItem.newPwd1) ===> ", sha1(this.formItem.newPwd1));
      try {
        let params = {
          username: this.userInfo.login_name,
          password: sha1(this.formItem.newPwd1),
          uuid: localRead('authCodeToken'),
          auth_code: this.formItem.authCode,
          user_type: 1
        }
        let res = await this.$store.dispatch('setPassword', params);
        console.log("res ====> ", res);
        if (res.code !== 0) {
          this.$Message.error(res.msg);
        } else {
          await this.$store.dispatch('userInfo');
          this.$Message.success("密码设置成功，可以通过手机号码和密码登录");
        }
      } catch (e) {
        console.log(e);
        this.$Message.error("密码设置失败！")
      }
    }
  },
  async created() {
    await this.$store.dispatch('userInfo');
  }
}
</script>
<style lang='less' scoped>
.authCodeInput {
  /deep/.ivu-input-group {
    display: inline-table;
  }
}
</style>