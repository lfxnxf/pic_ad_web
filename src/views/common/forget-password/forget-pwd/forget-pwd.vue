<!--  -->
<template>
  <div class="forgetPwd">
    <Form :label-width="80" ref="formValidate" :rules="ruleValidate">
      <FormItem label='用户名' prop="user_name">
        <Input placeholder="" v-model="user_name"/>
      </FormItem>
      <FormItem label='验证' prop="validation">
        <drag-verify
          v-if="hackReset"
          ref="Verify"
          :width="width"
          :height="height"
          :background="background"
          :progress-bar-bg="progressBarBg"
          :completed-bg="completedBg"
          :handler-bg="handlerBg"
          :text-size="textSize"
          @passCallback="passCallback"
        >
        </drag-verify>
      </FormItem>
      <FormItem>
        <Button ref="userLogin" @click="handleSubmit" type="success">下一步</Button>
      </FormItem>
    </Form>
  </div>
  
</template>

<script>
import DragVerify from '@/components/drag-verify';

export default {
  name: 'ForgetPwd',
  data () {
    return {
      user_name: '',
      ruleValidate: {},
      width: 265,
      height: 32,
      // background: '#CFCFCF',
      background: '#fff',
      progressBarBg: 'rgba(102, 204, 102,.6)',
      completedBg: '#66cc66',
      handlerBg: '#39c07e',
      textSize: '14px',
      hackReset: true,
      captcha: '',
    };
  },

  components: { DragVerify },

  computed: {
  },

  methods: {
    // 刷新子组件
    freshDragVerify() {
      this.hackReset = false;
      this.$nextTick(() => {
        this.hackReset = true;
      });
    },
    passCallback() {
      let captcha = arguments[0];
      this.captcha = captcha;
    },
    handleSubmit(){
      this.$router.push({name:'CheckStrategy'})
      if (this.captcha) {
        this.$Message.warning('请将滑块滑到右侧');
      } else {
        
        // this.$refs.loginForm.validate((valid) => {
        //   if (valid) {
            
        //   }
        // });

        // this.$router.push({})
      }
    }
  },

  activated() {
    this.$store.commit('setShowStep',false);
    this.$store.commit('setCurrentResetPwdStep',-1);
  },

  
}

</script>
<style lang='less' scoped>
@import '../style';
</style>