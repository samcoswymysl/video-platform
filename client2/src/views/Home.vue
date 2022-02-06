<template>
<div class="homeWrapper">
  <NavBar
  @getSection="section"
  />
  <div v-if="films.length">
    <div
      class="film"
      v-for="film in films"
    :key="film"
    >
      <Film
      :filmName="film"
      :section="sectionName"
      />
    </div>

  </div>

</div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Film from '@/components/Film.vue';

export default {
  name: 'Home',
  components: {
    NavBar,
    Film,
  },
  data() {
    return {
      films: [],
      sectionName: '',
    };
  },
  computed: {
    loginStatus() {
      return this.$store.state.isLogin;
    },
  },
  methods: {
    async section(name) {
      this.sectionName = name;
      const res = await fetch(`http://localhost:5000/home/section/${name}`);
      this.films = await res.json();
      console.log(this.films);
    },
  },

};
</script>

<style scoped>
.homeWrapper{
  display: flex;
  flex-direction: row;
}
.film {
  width: 60vw;
}
</style>
