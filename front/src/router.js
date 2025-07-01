import {  createRouter } from "vue-router";

import CourseView from "./views/course/list.vue";
import { createWebHistory } from "vue-router";

const routes = [{ path: "/course", component: CourseView }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
