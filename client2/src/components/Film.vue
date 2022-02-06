<template>
  <div class="filmWrapper">
    <p @click="showFilm">Title: {{filmName}}</p>
   <div v-if="show">
  <video controls class="film">
    <source :src="`http://localhost:5000/home/video/${section}/${filmName}`" type="video/mp4">
  </video>
     </div>
  </div>
</template>

<script>
export default {
  name: 'Film',
  props: {
    filmName: String,
    section: String,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showFilm() {
      this.show = !this.show;
    },
  },
};
</script>

<style scoped>
.film{
  width: 50vw;
  height: 50vh;
  border-radius: 30px;
}
p{
  width: 100%;
  background-color:green;
  text-align:center;
  padding: 20px;
  font-size: 16px;
}
</style>
