<script setup>
import { useMovieStore } from '@/stores/movies.js'

const tagline = 'Your personal movie catalog'
const store = useMovieStore()
</script>

<template>
  <header class="app-header">
    <div>
      <h1>MovieFlow</h1>
      <p>{{ tagline }}</p>
    </div>
    <span>{{ store.watchlistCount }} on your watchlist</span>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 0.75rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #0e9682;
}
.app-header div {
  margin-right: auto;
}
h1 {
  margin: 0;
  color: #0e9682;
}
p {
  margin: 0.25rem 0 0;
  color: #64748b;
}
</style>
