<template>
  <div>
    <li>邮箱验证......</li>
  </div>
</template>
<script>
export default {
  name: 'validate',
  data() {
    return {
      has: 0,
    };
  },

  components: {

  },

  computed: {

  },
  methods: {

  },

  mounted() {
    let params = this.$route.params;
    this.$store.dispatch('checkEmail', { token: params.token }).then(res => {
      if (res.check === '1') {
        this.$store.commit('setCurrentStepCmp', 1);
        this.$store.commit('setRegTabsValue', 'company');
        this.$router.push({ name: 'EnterpriseComplete' });
      }
    }, error => {
      console.log(error)
    });

  }
}
</script>