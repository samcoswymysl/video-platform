<template>
<div class="uploadWrapper">
  <p
    v-for="err in errArr"
  :key="err"
  >{{err}}</p>

  <form @submit.prevent="sendFile" enctype="multipart/form-data">
  <label> Film title
    <input type="text" v-model="filmName">
  </label>
  <label> Episode number
    <input type="number" v-model="numberFilm">
  </label>
  <label>Select Section
    <select name="section"  v-model="selectedSection">
      <option
        v-for="oneSection in section"
        :key="oneSection"
        :value="oneSection">{{oneSection}}
        </option>
    </select>
  </label>

    <label>Create a new section
      <input type="checkbox" id="checkbox" v-model="checked">
    </label>
    <label v-if="checked">Name new section
      <input type="text" v-model="newSection">
    </label>

  <label> Select file
    <input
      type="file"
      ref="film"
      @change="onChange"
      class="file"
    >
  </label>
  <button>SendFile</button>
  </form>
</div>

</template>

<script>

export default {
  name: 'Upload',
  data() {
    return {
      film: null,
      filmName: '',
      numberFilm: '',
      selectedSection: '',
      checked: false,
      newSection: '',
      errArr: [],
    };
  },
  methods: {
    onChange() {
      // eslint-disable-next-line prefer-destructuring
      this.film = this.$refs.film.files[0];
    },
    async sendFile() {
      this.errArr.length = 0;
      this.validateData();
      if (this.errArr.length) return;

      const formData = new FormData();
      const section = this.checked ? this.newSection : this.selectedSection;

      formData.append('film', this.film);
      const res = await fetch(`http://localhost:5000/home/${section}/${this.numberFilm}/${this.filmName}`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      await res.json();
      this.$router.go();
    },

    validateData() {
      if (!this.film) this.errArr.push('You must load film from your computer');
      if (!this.filmName) this.errArr.push('You must get film name');
      if (!this.numberFilm) this.errArr.push('You must get number film');
      if (!this.checked && !this.selectedSection) this.errArr.push('You must select section or create new');
      if (this.checked && !this.newSection) this.errArr.push('You mus write name new section');
    },

  },
  computed: {
    section() {
      return this.$store.state.section;
    },
  },
};
</script>

<style scoped>
.uploadWrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}
form{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

label{
  padding: 5px;
}

.file{
  width: 300px;
}

#checkbox{
  width: 3vw;
  background-color: #9cd98d;
  border: solid 2px #ef1515;
  border-radius: 10px;
  margin: 10px;
}

</style>
