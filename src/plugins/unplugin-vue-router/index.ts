import {createRouter, createWebHistory} from "vue-router/auto";
import {setupLayouts} from "virtual:generated-layouts";
import {authenticationGuard} from "./NavigationGuard";

const router = createRouter({
  history: createWebHistory(),
  extendRoutes: (routes) => setupLayouts(routes),
});

router.beforeEach(authenticationGuard);

export default router;
