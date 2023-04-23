<!--  -->
<template>
  <Modal v-model='modalRegistered' title=" ">
    <div v-if='has===1' class="hasAccount">
      <p><span class="orange-color">{{ phone }}</span>已被以下账户使用，请确认是否归你所有。</p>
      <div class="container">
        <img src="@/assets/images/user_pic.png" alt="">
        <div v-if="is_real" class="margin-left-10">姓名：{{ Cusername }} <br>{{ id_type }}：{{ id_no }}</div>
        <div v-if="!is_real" class="margin-left-10">登录名：{{ Cusername }} <br> 数字账号：{{ Cusercode }}</div>
      </div>
    </div>
    <div v-if='has===2' class="hasCloud">
      <p><span class="orange-color">{{ phone }}</span>已被注册，并绑定了以下账户，请确认是否归你所有。<p>
          <div v-for="item in extAccountList" class="container">
            <img src="@/assets/images/icplogo32.png" alt="">
            <div class="margin-left-10">{{ item.source_name }}账号：<br>{{ item.source_username }}</div>
          </div>
    </div>
    <div slot="footer" class="text-center">
      <Button class="margin-bottom-20" type="success">是我的，立即登录</Button>
      <p v-if='has' class="text-right">不是我的，<span class="blue-color pointer_line">使用邮箱注册</span></p>
    </div>
  </Modal>
</template>
<script>
import _ from 'underscore';
import { ID_TYPE_DCT } from '@/libs/util';
export default {
  data() {
    return {
      has: 0,
      is_real: false,
      phone: '',
      name: '',
      username: '',
      id_type: '',
      id_no: '',
      usercode: '',
      extAccountList: []
    };
  },

  components: {},

  computed: {
    modalRegistered: {
      get() {
        let res = this.$store.state.user.modalRegistered;
        this.checkBindAccount(res.data);
        return res.val;
      },
      set(val) {
        this.$store.commit('setModalRegistered', val);
      }
    },
    Cusername() {
      return this.username;
    },
    Cid_type() {
      return this.id_type;
    },
    Cid_no() {
      return this.id_no;
    },
    Cusercode() {
      return this.usercode;
    },

  },
  methods: {
    // 判断是否绑定了其他账号
    checkBindAccount: function() {
      let args = arguments[0];
      this.phone = args.phone;
      this.name = args.name;
      this.usercode = args.usercode;
      this.username = args.username;
      this.id_type = args.id_type_id ? ID_TYPE_DCT[args.id_type_id.toString()] : '证件号';
      this.id_no = args.id_no;
      this.is_real = args.real_status === 1 ? true : false;
      if (!_.has(args, 'ext') || args.ext.length === 0) {
        // 只存在本地账户
        this.has = 1;
      } else {
        // 有其他平台绑定的账户
        this.extAccountList = args.ext;
        this.has = 2;
      }
    }

  }
}
</script>
<style lang='less' scoped>
.container {
  margin: 20px auto;
  width: 290px;
  // min-width: 290px;
  display: flex;
  justify-content: center;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
  text-align: left;

  img {
    width: 42px;
    height: 42px;
  }


}

/deep/.ivu-modal-footer {
  border-top: 0;
}
</style>