<script setup>
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import ToastContainer from '@/components/ToastContainer.vue'
import { useMovieStore } from '@/stores/movies.js'
import { useAuthStore } from '@/stores/auth.js'

const router = useRouter()
const store = useMovieStore()
const auth = useAuthStore()

store.loadMovies()

function handleLogout() {
  auth.logout()
  router.push({ name: 'home' })
}
</script>

<template>
  <AppHeader />
  <nav>
    <RouterLink :to="{ name: 'home' }">Home</RouterLink>
    <RouterLink :to="{ name: 'movies' }">Movies</RouterLink>
    <RouterLink :to="{ name: 'watchlist' }">Watchlist</RouterLink>
    <RouterLink :to="{ name: 'movie-new' }">Add movie</RouterLink>
    <RouterLink v-if="!auth.isLoggedIn" :to="{ name: 'login' }">Login</RouterLink>
    <button v-else @click="handleLogout">Log out</button>
  </nav>
  <main>
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <ToastContainer />
</template>
