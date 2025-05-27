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
        component: () => import("@/views/city/country.vue"),
      },
      {
        path: "city/:cityId",
        name: "city",
        component: () => import("@/views/city/city.vue"),
        props: true,
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
];

export default [...routes];
