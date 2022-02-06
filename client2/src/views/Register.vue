<template>
  <div class="loginPage">

    <SendUserData
      :urlPrefix="urlPrefix"
      :btnText="btnText"
    />
  </div>
</template>

<script>

import SendUserData from '@/components/SendUserData.vue';

export default {
  name: 'LoginPage',

  data() {
    return {
      urlPrefix: 'register',
      btnText: 'Register',
    };
  },
  components: {
    SendUserData,
  },
};
</script>
