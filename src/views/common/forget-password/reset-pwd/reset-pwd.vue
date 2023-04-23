<!--  -->
<template>
  <div class="check-strategy"> 
    <Form :label-width="90" ref='checkForm' :rules="ruleValidate">
      <FormItem class="padding-top-10 clearfix" prop="tel" label="新密码">
        <Input class="input_tel margin-right-10" v-model="form.pwd"></Input>
      </FormItem>
      <FormItem prop="check_code" label="确认新密码">
        <Input v-model="form.repwd"></Input>
      </FormItem>
      <FormItem class="margin-bottom-10">
        <Button type="success" @click='handleSubmit'>同意协议并确定</Button>
      </FormItem>
     
    </Form>
  </div>
</template>

<script>
export default {
  name: 'ResetPwd',
  data () {
    return {
      form: {
        pwd: '',
        repwd: ''
      },
      ruleValidate: { }
    };
  },

  components: {},

  computed: {},

  methods: {
    handleSubmit(){
      this.$router.push({name: 'ResetFinished'});
    }
  },
  activated() {
    this.$store.commit('setShowStep',true);
    this.$store.commit('setCurrentResetPwdStep',1);

  },
}

</script>
<style lang='less' scoped>

</style>