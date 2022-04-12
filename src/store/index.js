import Vue from "vue";
import Vuex from "vuex";
import authentication from "./modules/authentication";
import collection from "./modules/collection";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    authentication,
    collection,
  },
});
