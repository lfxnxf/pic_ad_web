<!--  -->
<template>
  <div class="reg_index">
    <div class="personal">
      <Form :model="formItem" :label-width="80" ref="formValidate" :rules="ruleValidate">
        <!-- <FormItem label='国籍地区' prop="area">
          <Select v-model="formItem.select">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem> -->
        <FormItem label='手机号码' prop="tel">
          <Input placeholder="手机号" v-model="formItem.tel" />
        </FormItem>
        <FormItem class="verify-code" label='验证码' prop="valid">
          <Input placeholder="验证码" v-model="formItem.valid" />
          <Button type="success" ghost @click="sendMsg">获取验证码</Button>
          <p v-if="sucSendMsgFlag" class="prompt"><span class="iconfont iconwancheng1 green-color margin-right-5"></span>校验码已发送，有效时间为5分钟，请及时查收。</p>
        </FormItem>
        <FormItem><Button type="success" class="width-full" @click="handleSubmit('ruleValidate')">下一步</Button></FormItem>
      </Form>
      <div class="base-color padding-left-80" style="cursor:pointer;">使用邮箱注册</div>
    </div>
    <!-- 若已被注册 -->
    <modal-registered></modal-registered>
  </div>
</template>
<script>
import modalRegistered from '../components/modal-registered.vue';
import { localSave, localRead } from '@/libs/util';
export default {
  name: 'RegIndex',
  data() {
    return {
      formItem: { //个人注册信息
        area: '',
        tel: '',
        valid: ''
      },
      sucSendMsgFlag: false,
      ruleValidate: {
        // area: [
        //   { required: true, message: '请选择国籍地区', trigger: 'change' }
        // ],
        tel: [
          { required: true, message: '请填写正确的手机号码', trigger: 'blur' }
        ],
        valid: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
      },

    };
  },

  components: { modalRegistered },

  computed: {},

  methods: {
    // 发送短信验证码
    sendMsg: async function() {
      if (!this.formItem.tel) {
        return this.$Message.warning('请填写正确的手机号码');
      }
      let apiRes = await this.$store.dispatch('getSmsAuthCode', { username: this.formItem.tel, phone: this.formItem.tel });
      if (apiRes.code === 0) {
        // todo ... 将按钮置灰，并显示倒计时，将倒计时写入localStorage缓存
        localSave('uuid', apiRes.data.uuid);
        this.sucSendMsgFlag = true;
      }
    },
    // 下一步操作
    handleSubmit: async function(name) {
      // 验证短信验证码
      if (!this.formItem.valid) {
        return this.$Message.warning('请输入验证码');
      } else {
        let uuid = localRead('uuid');
        // 验证
        let apiRes = await this.$store.dispatch('checkSmsAuthCode', { uuid: uuid, auth_code: this.formItem.valid });
        // console.log("checkSmsAuthCode apiRes ===> ", apiRes);
        if (apiRes.code === 0) {
          // 查看手机号是否已经注册
          let apiRes2 = await this.$store.dispatch('findRegByPhone', { phone: this.formItem.tel, user_type: 1, token: apiRes.data.token });
          let params2 = {};
          if (apiRes2.code === 0) {
            params2 = apiRes2.data;
          } else {
            params2.is_register = false;
          }
          // 判断手机号码是否已经注册
          if (params2.is_register === 1) {
            this.$store.commit('setModalRegistered', { val: true, data: params2 });
          } else {
            this.$router.push({ name: 'RegComplete', query: { phone: this.formItem.tel } });
          }

        } else {
          return this.$Message.error(`${apiRes.code}[${apiRes.msg}]`);
        }
      }
    },

  },
  activated() {
    this.$store.commit('setCurrentStep', 0);
    this.$store.commit('setRegTabsValue', 'personal')
  },

}
</script>
<style lang='less' scoped>
@import './style';
</style>