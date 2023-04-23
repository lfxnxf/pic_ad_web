<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" size="large" placeholder="输入用户名">
        <!-- <span slot="prepend"> -->
        <Icon :size="20" color="#2b85e4" type="ios-contact-outline" slot="prefix"></Icon>
        <!-- </span> -->
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" size="large" placeholder="输入秘密">
        <!-- <span slot="prepend"> -->
          <Icon :size="20" color="#2b85e4" type="ios-lock-outline" slot="prefix"></Icon>
        <!-- </span> -->
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long :loading="isLoadingData" size="large" style="border-radius: 20px;border-color: transparent;background:linear-gradient(to right, #2b85e4, #5cadff);">
        <b style="font-size: 18px">登&nbsp;录</b>
      </Button>
    </FormItem>
  </Form>
</template>
<script>
import { getUserName } from '@/libs/util'
import { mapGetters } from 'vuex'

export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '用户名不能空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        userName: getUserName() || '',
        password: ''
      }
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    },
    ...mapGetters(['isLoadingData'])
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password
          })
        }
      })
    }
  }
}
</script>
