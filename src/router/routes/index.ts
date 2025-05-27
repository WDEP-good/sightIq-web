let routes = [
  {
    path: "/",
    name: "Root",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "",
        name: "map",
        component: () => import("@/views/City/country.vue"),
      },
    ],
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import("@/views/user/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/user/register.vue"),
  },
  {
    path: "/city",
    name: "city",
    component: () => import("@/views/City/city.vue"),
  },
];

export default [...routes];
