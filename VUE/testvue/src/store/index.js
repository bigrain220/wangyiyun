import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    isCollapse: false
  },
  getters: {
    getCollapse(state) {
      return state.isCollapse
    }
  },
  mutations: {
    setCollapse(state, value) {
      state.isCollapse = value;
    }
  },
  actions: {
    collapseAction(context, params) {
      context.commit('setCollapse', params);
    }
  }
});

export default store;