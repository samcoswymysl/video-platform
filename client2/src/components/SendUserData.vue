<template>
<div class="LoginWrapper">
  <p v-if="info">{{info}}</p>
  <label>Email
    <input type="text" v-model="login">
  </label>
  <label>Password
    <input type="text" v-model="password">
  </label>
  <button @click="loginToPlatform">{{btnText}}</button>

</div>
</template>

<script>

export default {
  name: 'SendUserData',

  props: {
    urlPrefix: String,
    btnText: String,
  },

  data() {
    return {
      login: '',
      password: '',
      info: '',
    };
  },

  methods: {
    async loginToPlatform() {
      const data = {
        email: this.login,
        password: this.password,
      };
      const resp = await fetch(`http://localhost:5000/${this.urlPrefix}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      this.info = await resp.json();
      if (resp.status === 200 && this.urlPrefix === 'login') {
        this.$emit('loginSuccessful');
      }
    },
  },

};
</script>

<style scoped>

</style>
