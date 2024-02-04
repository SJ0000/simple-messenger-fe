/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 *
 * https://github.com/posva/unplugin-vue-router
 */

// Composables
import {createRouter, createWebHistory} from 'vue-router/auto'
import {setupLayouts} from 'virtual:generated-layouts'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  extendRoutes: setupLayouts,
})

export default router
