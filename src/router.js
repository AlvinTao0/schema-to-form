import { createRouter, createWebHistory } from "vue-router";
import Service from './pages/Service.vue'
import Route from './pages/Route.vue'
import Plugin from './pages/Plugin.vue'

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
    path: "/plugin",
    component: Plugin,
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
