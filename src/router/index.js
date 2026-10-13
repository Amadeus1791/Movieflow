import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useAuthStore } from '@/stores/auth.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/movies',
      name: 'movies',
      component: () => import('@/views/MoviesView.vue'),
    },
    {
      path: '/movies/new',
      name: 'movie-new',
      component: () => import('@/views/AddMovieView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/movies/:id',
      component: () => import('@/views/MovieDetailView.vue'),
      props: true,
      children: [
        {
          path: '',
          name: 'movie-detail',
          component: () => import('@/views/MovieInfoView.vue'),
        },
        {
          path: 'similar',
          name: 'movie-similar',
          component: () => import('@/views/SimilarMoviesView.vue'),
        },
      ],
    },
    {
      path: '/watchlist',
      name: 'watchlist',
      component: () => import('@/views/WatchlistView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

// Geschuetzte Seiten nur mit Login, sonst Umweg ueber /login
router.beforeEach((to) => {
  // Store erst hier holen: beim Import der Datei ist Pinia noch nicht aktiv
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
