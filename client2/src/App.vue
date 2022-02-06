<template>
  <div id="app">

    <div id="nav">
      <button v-if="loginStatus"> <router-link to="/">Home</router-link></button>
      <button  v-if="!loginStatus"><router-link to="/login">Login</router-link></button>
      <button v-if="!loginStatus"><router-link to="/register">Register</router-link></button>
      <button v-if="loginStatus"><router-link to="/upload" >Upload</router-link></button>
      <button v-if="loginStatus"><router-link to="/admin"  >Admin</router-link></button>

    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>

export default {
  name: 'App',
  computed: {
    loginStatus() {
      return this.$store.state.isLogin;
    },
  },
};
</script>
<style>
body{
  background-color: #366b4d;
}
#nav {
  background-color: #000
}
button{
  width: 15vw;
  height: 5vh;
  font-size: 16px;
  background-color: #349b19;
  border: solid 2px #ef1515;
  border-radius: 10px;
  margin: 10px;
}

input {
  width: 15vw;
  height: 5vh;
  font-size: 16px;
  background-color: #9cd98d;
  border: solid 2px #ef1515;
  border-radius: 10px;
  margin: 10px;
}

label {
  font-size: 20px;
}

select{
  width: 15vw;
  height: 5vh;
  font-size: 16px;
  background-color: #9cd98d;
  border: solid 2px #ef1515;
  border-radius: 10px;
  margin: 10px;
}

</style>
