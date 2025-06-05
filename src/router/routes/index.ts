let routes = [
  {
    path: "/",
    name: "Root",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "",
        name: "countryMap",
        component: () => import("@/views/country/index.vue"),
      },
    ],
  },
  {
    path: "/city/:cityId",
    name: "city",
    component: () => import("@/layouts/index.vue"),
    props: true,
    children: [
      {
        path: "",
        name: "cityMap",
        component: () => import("@/views/city/index.vue"),
      },
    ],
  },
  {
    path: "/analysis",
    name: "analysis",
    component: () => import("@/layouts/index.vue"),
    props: true,
  },
  {
    path: "/forecast",
    name: "forecast",
    component: () => import("@/layouts/index.vue"),
    props: true,
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
