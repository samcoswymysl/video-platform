<template>
  <div class="loginPage">

    <SendUserData
    :urlPrefix="urlPrefix"
    :btnText="btnText"
    @loginSuccessful="setLoginState"
    />
  </div>
</template>

<script>

import SendUserData from '@/components/SendUserData.vue';

export default {
  name: 'LoginPage',

  data() {
    return {
      urlPrefix: 'login',
      btnText: 'Login',
    };
  },
  components: {
    SendUserData,
  },
  methods: {
    setLoginState() {
      this.$store.commit('login');
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>
