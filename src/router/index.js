import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const projectRoutes = [
  {
    name: "home",
    path: "/",
    meta: {
      code: "HOME"
    }
  },
  {
    name: "universities",
    path: "/universities/:country/:university",
    meta: {
      code: "UNIVERSITY_DETAILS"
    }
  }
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: projectRoutes
});

export default router;