import HomePage from "./components/pages/HomePage.vue";
import LoginPage from "./components/pages/LoginPage.vue";
import SignupPage from "./components/pages/SignupPage.vue";
import DetailPage from "./components/pages/DetailPage.vue";
import UserPage from "./components/pages/UserPage.vue";
import NewRecipePage from "./components/pages/NewRecipePage.vue";
import EditRecipePage from "./components/pages/EditRecipePage.vue";
import Cookies from "js-cookie";
import { store } from "./store/index.js";

// Cek apakah user sudah login
const isLoggedIn = async () => {
  const token = Cookies.get("jwt");
  const expiry = Cookies.get("tokenExpirationDate");
  const userId = Cookies.get("UID");

  if (!token || Date.now() >= +expiry) {
    if (token) store.commit("auth/setUserLogout");
    return false;
  }

  store.commit("auth/setToken", {
    idToken: token,
    expiresIn: expiry,
  });

  try {
    await store.dispatch("auth/getUser", userId);
    return true;
  } catch (error) {
    console.error("Gagal mengambil data user:", error);
    store.commit("auth/setUserLogout");
    return false;
  }
};

// Guard untuk route yang memerlukan login
const requireAuth = async (to, from, next) => {
  const authenticated = await isLoggedIn();

  if (authenticated) {
    next();
  } else {
    next({
      name: "loginPage",
      query: { redirect: to.fullPath },
    });
  }
};

export const routes = [
  // Halaman Publik
  {
    path: "/login",
    name: "loginPage",
    component: LoginPage,
  },
  {
    path: "/signup",
    name: "signupPage",
    component: SignupPage,
  },
  {
    path: "/recipe/:id",
    name: "detailPage",
    component: DetailPage,
  },

  // Halaman yang Perlu Login
  {
    path: "/",
    name: "homePage",
    component: HomePage,
    beforeEnter: requireAuth,
  },
  {
    path: "/user/:component?/:id?",
    name: "userPage",
    component: UserPage,
    beforeEnter: requireAuth,
  },
  {
    path: "/new-recipe",
    name: "newRecipePage",
    component: NewRecipePage,
    beforeEnter: requireAuth,
  },
  {
    path: "/recipe/edit/:id",
    name: "editRecipePage",
    component: EditRecipePage,
    beforeEnter: requireAuth,
  },
];