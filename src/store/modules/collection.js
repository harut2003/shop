import { database } from "@/main";
import { child, get, push, ref, remove, set } from "firebase/database";

export default {
  state: {
    collections: [],
    singleItem: {},
  },
  getters: {
    collections: ({ collections }) => collections,
    singleItem: ({ singleItem }) => singleItem,
  },
  mutations: {
    addItem(state, formData) {
      state.collections = [...state.collections, formData];
    },
    getCollections(state, collections) {
      state.collections = [...collections];
    },
    addSingleItem(state, singleItem) {
      state.singleItem = { ...singleItem };
    },
    clearSingleItem(state) {
      state.singleItem = {};
    },
    deleteItem(state, id) {
      state.collections = state.collections.filter((item) => item.id !== id);
    },
  },
  actions: {
    async addItem({ commit }, formData) {
      const collectionRef = ref(database, "collections");
      const newCollectionRef = push(collectionRef);
      await set(newCollectionRef, { ...formData });
      commit("addItem", formData);
    },
    async getCollections({ commit }) {
      commit("loadingToggle", true);
      const collectionRef = ref(database);
      const info = (await get(child(collectionRef, `collections`))).val();
      let arr = [];
      for (const id in info) {
        arr.push({ id, ...info[id] });
      }
      commit("getCollections", arr);
      commit("loadingToggle", false);
    },
    async getSingleItem({ commit }, id) {
      commit("loadingToggle", true);
      const collectionRef = ref(database);
      const info = await get(child(collectionRef, `collections/${id}`));
      commit("addSingleItem", info.val());
      commit("loadingToggle", false);
    },
    async deleteItem({ commit }, id) {
      commit("loadingToggle", true);
      const collectionRef = ref(database, `collections/${id}`);
      await remove(collectionRef);
      commit("deleteItem", id);
      commit("loadingToggle", false);
    },
  },
};
