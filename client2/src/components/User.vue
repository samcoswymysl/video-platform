<template>
  <div class="userWroapper">
    <p v-if="info">{{info}}</p>

    <EditUser
      v-if="edit"
      :user="user"
      @closeWindow="editUser"
    />
    <span>{{userRole}}</span>
    <span>{{user.email}}</span>
    <button @click="editUser">Edit</button>
    <button @click="deleteUser">Delete</button>

  </div>

</template>

<script>
import EditUser from '@/components/EditUser.vue';

export default {
  name: 'User',
  components: {
    EditUser,
  },
  props: {
    user: Object,
  },

  data() {
    return {
      info: '',
      edit: false,
    };
  },

  computed: {
    userRole() {
      let role;
      if (this.user.role === 0) {
        role = 'Unknown';
      } else if (this.user.role === 1) {
        role = 'User';
      } else if (this.user.role === 2) {
        role = 'Admin';
      } else {
        role = 'Somthing is wrong';
      }
      return role;
    },
  },

  methods: {
    async deleteUser() {
      const resp = await fetch('http://localhost:5000/admin', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ userId: this.user.id }),
      });
      console.log(resp);
      this.info = await resp.json();
      this.$router.go();
    },

    editUser() {
      this.edit = !this.edit;
    },

  },
};
</script>

<style scoped>

.userWroapper{
display: flex;
  flex-direction: column;
  /*align-content: center;*/
/*margin: auto*/
}
button{
  width: 100px;
  margin: 5px auto
}
</style>
