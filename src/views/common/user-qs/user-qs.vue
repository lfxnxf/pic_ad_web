<!--  -->
<template>
  <div>
    <manage-nav></manage-nav> 
    <Form class="form" ref="formDynamic" v-model="formDynamic" label-position="left" :label-width="70">
          <FormItem
            class="grey"
            label="问题1"
            prop="qs1"
            :rules="{required: true, type: 'string', message: '请选择问题1', trigger: 'change'}">
            <Select clearable v-model="formDynamic.qs1" :disabled="$route.query.from === 'forgetPassword'">
              <Option v-for="qs in dynamicQsList" :value="qs.id.toString()" :key="qs.id" :disabled="qs.is_valid">{{qs.name}}</Option>
            </Select>
          </FormItem>
          <FormItem
            class="grey"
            prop="as1"
            :rules="{required: true, message: '问题1答案不能为空', trigger: 'blur'}">
            <Input type="text" v-model="formDynamic.as1"></Input>
          </FormItem>
          <FormItem
                class="grey"
                label="问题2"
                prop="qs2"
                :rules="{required: true, message: '请选择问题2', trigger: 'change'}">
            <Select clearable v-model="formDynamic.qs2" :disabled="$route.query.from === 'forgetPassword'">
              <Option v-for="qs in dynamicQsList" :value="qs.id.toString()" :key="qs.id"  :disabled="qs.is_valid">{{qs.name}}</Option>
            </Select>
          </FormItem>
          <FormItem
            class="grey"
            prop="as2"
            :rules="{required: true, message: '问题2答案不能为空', trigger: 'blur'}">
            <Input type="text" v-model="formDynamic.as2"></Input>
          </FormItem>
          <FormItem
                class="grey"
                label="问题3"
                prop="qs3"
                :rules="{required: true, message: '请选择问题3', trigger: 'change'}">
            <Select clearable v-model="formDynamic.qs3" :disabled="$route.query.from === 'forgetPassword'">
              <Option v-for="qs in dynamicQsList" :value="qs.id.toString()" :key="qs.id" :disabled="qs.is_valid">{{qs.name}}</Option>
            </Select>
          </FormItem>
          <FormItem
            class="grey"
            prop="as3"
            :rules="{required: true, message: '问题3答案不能为空', trigger: 'blur'}">
            <Input type="text" v-model="formDynamic.as3"></Input>
          </FormItem>
          <FormItem>
            <Button type="success" @click="submit('formDynamic')">确定</Button>
          </FormItem>
        </Form>
  </div>
</template>

<script>
import manageNav from "@/components/manage-nav";
export default {
  name: 'UserQs',
  data () {
    return {
      qsList: [],
      formDynamic: {
        qs1: '',
        as1: '',
        qs2: '',
        as2: '',
        qs3: '',
        as3: '',
      }
    };
  },

  components: { manageNav },

  computed: {
    dynamicQsList () {
      return this.qsList.map(item => {
        return {
          ...item,
          is_valid: [this.formDynamic.qs1, this.formDynamic.qs2, this.formDynamic.qs3].includes(item.id.toString())
        }
      })
    }
  },

  methods: {
    submit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.$route.query.from === 'setPasswordQs') {
            setUserQs({...this.$refs[name].model}).then(res => {
              if (res.return_code === '0') {
                this.$Message.success('密保问题设置完成！')
                setToken('')
                this.$router.push({ name: 'login' });
              } else {
                this.$Message.error(res.return_message)
              }
            })
          } else if (this.$route.query.from === 'forgetPassword') {
            checkUserQs(this.$refs[name].model).then(res => {
              if (res.return_code === '0') {
                this.$router.push({ name: 'resetPassword', query: {username: res.data.data.login} })
              } else {
                this.$Message.error(res.return_message)
              }
            })
          }
        }
      })
    }
  },

  mounted () {
    dctList({dctName: 'DctQs'}).then(res => {
      this.qsList = res.data.data
    });
    if ( this.$route.query.from === 'forgetPassword') {
      getUserQs().then(res => {
        this.$set(this, 'formDynamic', {
          ...this.formDynamic,
          qs1: res.data.data.qs1.toString(),
          qs2: res.data.data.qs2.toString(),
          qs3: res.data.data.qs3.toString()
        })
      })
    }
  },
}

</script>
<style lang='less' scoped>
 .ivu-form{
   width: 420px;
   margin: 30px auto;
 }
</style>