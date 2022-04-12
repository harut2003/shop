import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import CountryFlag from "vue-country-flag";
import "vuetify/dist/vuetify.min.css";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";
import Loader from "@/components/Loader.vue";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCW5CirLOanQudwK_Rm8MPNMVIk9Ifsu4I",
  authDomain: "shop-e7e4f.firebaseapp.com",
  projectId: "shop-e7e4f",
  storageBucket: "shop-e7e4f.appspot.com",
  messagingSenderId: "855362131717",
  appId: "1:855362131717:web:c5aef6758056b194b6c96c",
};

const fb = initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getDatabase();
export const storage = getStorage();

Vue.component("country-flag", CountryFlag);
Vue.component("Loader", Loader);
Vue.config.productionTip = false;

let app;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
