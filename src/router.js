import { createRouter, createWebHistory } from "vue-router";
import Service from './pages/Service.vue'
import Route from './pages/Route.vue'

const routes = [
  {
    path: "/route",
    component: Route,
  },
  {
    path: "/service",
    component: Service,
  },
  {
    path: "/",
    redirect: "/service",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
