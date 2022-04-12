import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { child, get, ref, set } from "firebase/database";
import { auth, database } from "@/main";
import router from "@/router";

export default {
  state: {
    user: null,
    loading: false,
  },
  getters: {
    user: (state) => state.user,
    loading: (state) => state.loading,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    signout(state) {
      state.user = null;
    },
    loadingToggle(state, bool) {
      state.loading = bool === undefined ? !state.loading : bool;
    },
  },
  actions: {
    async register(
      { commit, dispatch },
      { email, password, firstname, lastname }
    ) {
      commit("loadingToggle");
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          set(ref(database, "users/" + user.uid), {
            firstname,
            lastname,
            email: email,
          });
          commit("loadingToggle");
          await dispatch("user");
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
          // ..
        });
    },
    async login({ commit, dispatch }, { email, password }) {
      commit("loadingToggle");
      signInWithEmailAndPassword(auth, email, password).then(
        async (userCredential) => {
          const user = userCredential.user;
          commit("loadingToggle");
          await dispatch("user");
          router.push("/");
        }
      );
    },
    async user({ commit }) {
      commit("loadingToggle");
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;

        const userRef = ref(database);
        const info = await get(child(userRef, `users/${uid}`));

        commit("setUser", info.val());
      }
      commit("loadingToggle");
    },
    async logout({ commit }) {
      commit("loadingToggle");
      signOut(auth).then(() => {
        router.push("/login");
        commit("loadingToggle");
        commit("signout");
      });
    },
  },
};
