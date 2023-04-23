<template>
   <div>
     <li>等待邮箱验证......</li>
   </div>
  
</template>
<script>

export default {
  name: 'ValidateMail',
  props: ['token'],
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
  mounted: async function() {
    let params = this.$router.params;

    try {
      let res = await this.$store.dispatch('checkEmail', {token: ''});
    } catch(e) {
    }

  }
}
</script>