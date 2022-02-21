import { createStore } from "vuex";

const a = {
  state() {
    return {
      isCollapse: false,
    };
  },
  getters: {
    getCollapse(state) {
      return state.isCollapse;
    },
  },
  mutations: {
    setCollapse(state, value) {
      state.isCollapse = value;
    },
  },
  actions: {
    collapseAction(context, params) {
      context.commit("setCollapse", params);
    },
  },
}

const store = createStore({
  modules: {
    a
  },
});

export default store;
