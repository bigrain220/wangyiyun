import { createStore } from "vuex";

const store = createStore({
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
});

export default store;