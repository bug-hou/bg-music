import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import main from "@/views/main/main.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import("views/login/login.vue"),
    children: [
      {
        path: "",
        redirect: "/login/account",
      },
      {
        path: "account",
        component: () => import("views/login/children/account/account.vue"),
      },
      {
        path: "email",
        component: () => import("views/login/children/email/email.vue"),
      },
      {
        path: "phone",
        component: () => import("views/login/children/phone/phone.vue"),
      },
    ],
  },
  {
    path: "/main",
    component: main,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
