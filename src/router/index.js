import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
Vue.use(VueRouter);
import { getAuth } from "firebase/auth";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { layout: "main" },
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "main", auth: false },
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: { layout: "main", auth: false },
    component: () => import("@/views/RegisterView.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/AdminView.vue"),
  },
  {
    path: "/items/:id",
    name: "singleItem",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/SingleItemView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const { currentUser } = getAuth();
  //  const requireAuth = to.matched.some((record) => record.meta.auth);
  const { auth } = to.matched[0].meta;
  if (auth && !currentUser) {
    next("/login?message=login");
  } else if (auth === false && currentUser) {
    next("/");
  } else {
    next();
  }
});

export default router;
