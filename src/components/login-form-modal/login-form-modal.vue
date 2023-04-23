<template>
  <Card icon="log-in" title="欢迎登录" :bordered="false" dis-hover>
    <div class="form-con">
      <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
        <FormItem prop="userName">
          <Input v-model="form.userName" placeholder="请输入用户名">
            <span slot="prepend">
              <Icon :size="16" type="ios-person"></Icon>
            </span>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="form.password" placeholder="请输入密码">
            <span slot="prepend">
              <Icon :size="14" type="md-lock"></Icon>
            </span>
          </Input>
        </FormItem>
        <FormItem>
          <Button @click="handleSubmit" type="primary" long :loading="loadingLogin"><b style="font-size: 14px">登&nbsp;录</b></Button>
        </FormItem>
      </Form>
    </div>
  </Card>
</template>
<script>
import iView from 'iview'
import store from '@/store'
import { setToken, getUserName, setTagNavListInLocalstorage } from '@/libs/util'

export default {
  name: 'LoginFormModal',
  props: {
    userName: String,
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        userName: getUserName() || 'super_admin',
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
    loadingLogin () {
      return store.state.user.loadingLogin
    }
  },
  methods: {
    handleSubmit () {
      const userName = this.form.userName.trim()
      if (userName !== getUserName()) {
        setTagNavListInLocalstorage([])
      }
      store.state.user.loadingLogin = true
      store.dispatch('handleLogin', { userName: userName, password: this.form.password }).then(resLog => {
        store.state.user.loadingLogin = false
        if (resLog.code === 200) {
          const data = resLog.data
          setToken(data.sessionid)
          this.$Modal.remove()
          window.location.reload(true)
        } else {
          this.$Message.error({ content: resLog.msg, closable: true })
        }
        setTimeout(() => {
          iView.LoadingBar.finish()
        }, 1000)
      })
    }
  }
}
</script>

