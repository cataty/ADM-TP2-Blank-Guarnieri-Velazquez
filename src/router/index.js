/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import index from '@/pages/index.vue'
import movie from '@/pages/movie.vue'
import favourites from '@/pages/favourites.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: setupLayouts,
  routes:[
    {
      path: '/',
      name: 'home',
      component: index
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: movie
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: favourites
    },
    ]
})

export default router
