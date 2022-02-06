<template>

  <div class="editUserWrapper">

    <p v-if="info">{{info}}</p>

  <label @dblclick="showOrHideInput('editEmail')">Email:
    <p v-if="!editEmail">{{email}}</p>
    <p v-if="editEmail"><input type="text"  v-model="email">
    </p>
  </label>

    <label @dblclick="showOrHideInput('editRole')">Role:
      <p v-if="!editRole">{{role}}</p>
      <p v-if="editRole">
      <select name="role" v-model="role">
        <option value="0">Unknown</option>
        <option value="1">User</option>
        <option value="2">Admin</option>
      </select>
      </p>
    </label>

    <label @dblclick="showOrHideInput('editPassword')">Edit Password
      <p v-if="!editPassword">Set new Password</p>
    <p v-if="editPassword"><input type="password" v-model="password"></p>
    </label>

    <button @click="saveData">Save</button>
    <button @click="closeWindow">Close</button>

  </div>
</template>

<script>

export default {
  name: 'EditUser',
  props: {
    user: Object,
  },
  data() {
    return {
      editEmail: false,
      editRole: false,
      editPassword: false,

      email: this.user.email,
      role: this.user.role,
      password: '',

      info: '',

    };
  },
  methods: {
    showOrHideInput(inputName) {
      this[inputName] = !this[inputName];
    },
    closeWindow() {
      this.$emit('closeWindow');
    },
    async saveData() {
      this.info = '';
      this.editEmail = false;
      this.editRole = false;
      this.editPassword = false;

      const userData = {
        id: this.user.id,
      };

      if (
        this.email === this.user.email
        && !this.password
        && this.role === this.user.role) {
        this.info = 'You dont change anything';
        return;
      }

      if (this.email) {
        userData.email = this.email;
      }
      if (this.password) {
        userData.password = this.password;
      }
      if (this.role) {
        userData.role = this.role;
      }

      const resp = await fetch('http://localhost:5000/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ userData }),
      });
      console.log(resp);
      this.info = await resp.json();
      this.$router.go();
    },

  },

};
</script>

<style scoped>
.editUserWrapper{
  background-color: #dac6c6;
  width: 90%;
  height: 50vh;
  position: fixed;
  left: 50%;
  margin-left: -45%;

}

</style>
