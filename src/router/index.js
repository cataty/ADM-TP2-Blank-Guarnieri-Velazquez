/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'

// Importar componentes de las páginas
import Index from '@/pages/index.vue'
import Movie from '@/pages/movie.vue'
import Favourites from '@/pages/favourites.vue'
import MovieDetail from '@/components/MovieDetail.vue'

// Configuración de rutas
const routes = setupLayouts([
  {
    path: '/',
    name: 'home',
    component: Index
  },
  {
    path: '/movie/:id',
    name: 'movie',
    component: MovieDetail
  },
  {
    path: '/favourites',
    name: 'favourites',
    component: Favourites
  },
  // Otras rutas...
])

// Crear instancia del router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

