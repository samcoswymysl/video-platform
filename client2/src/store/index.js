import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    section: [],
  },
  mutations: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
    setSection(state, payload) {
      this.state.section = payload.section;
    },
  },
  actions: {
  },
  modules: {
  },
});
