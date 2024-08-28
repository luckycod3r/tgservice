// store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    isDark: false, 
  },
  mutations: {
    toggleTheme(state) {
      state.isDark = !state.isDark;
      const theme = state.isDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    },
    setTheme(state, theme) {
      state.isDark = theme === 'dark';
      document.documentElement.setAttribute('data-theme', theme);
    },
  },
  actions: {
    initTheme({ commit }) {
      const savedTheme = localStorage.getItem('theme') || 'light';
      commit('setTheme', savedTheme);
    },
  },
});

export default store;
