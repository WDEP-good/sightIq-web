let routes = [
  {
    path: "/",
    name: "Root",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    components: {
      default: () => import("@/layout/index.vue"),
      // home: () => "@/views/Home/home.vue",
      right: () => import("@/views/Home/components/Right.vue"),
      left: () => import("@/views/Home/components/Left.vue"),
      footer: () => import("@/views/Home/components/Footer.vue"),
    },
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/register.vue"),
  },
  {
    path: "/city",
    name: "city",
    component: () => import("@/views/City/city.vue"),
  },
];

export default [...routes];
