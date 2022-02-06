<template>
<div class="adminWrapper">
  <h2>Admin Panel</h2>
  <p v-if="info">{{info}}</p>
  <div v-if="!info">
  <User
  v-for="user in allUsers"
  :key="user.id"
  :user="user"
  />
  </div>
</div>
</template>

<script>
import User from '@/components/User.vue';

export default {
  name: 'Admin',
  components: {
    User,
  },
  data() {
    return {
      allUsers: [],
      info: '',
    };
  },

  async created() {
    const res = await fetch('http://localhost:5000/admin/1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (res.status === 200) {
      this.allUsers = await res.json();
    } else {
      this.info = 'You are not admin';
    }
    console.log(this.allUsers);
  },

};
</script>

<style scoped>

</style>
