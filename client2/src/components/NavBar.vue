<template>
<div class="navWrapper">
  <p
    v-for="course in courses"
    :key="course"
    @click="getSection(course)"
  >{{ course }}
  </p>
</div>
</template>

<script>

export default {
  name: 'NavBar',
  data() {
    return {
      courses: [],
      link: 'https://localhost:5000/home/section',
    };
  },

  async created() {
    const res = await fetch('http://localhost:5000/home');
    this.courses = await res.json();
    this.$store.commit('setSection', { section: this.courses });
  },
  methods: {
    getSection(courseName) {
      this.$emit('getSection', courseName);
    },
  },

};
</script>

<style scoped>
.navWrapper {
  width: 20vw;
  padding: 15px
}
p{
  background-color: #42b983;
  padding: 5px;
  margin: 2px;
  cursor: pointer;
}
p:hover {
  background-color: #52c993
}

</style>
