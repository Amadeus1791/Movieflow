<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMovieStore } from '@/stores/movies.js'
import { useDocumentTitle } from '@/composables/useDocumentTitle.js'

const props = defineProps({ id: { type: String, required: true } })
const store = useMovieStore()
const { movies, loading, error } = storeToRefs(store)

// Routen-Parameter sind immer Strings, die ids im JSON sind Zahlen
const movie = computed(() => movies.value.find((m) => m.id === Number(props.id)))

// Tab-Titel mit dem Filmtitel, solange kein Film da ist nur der App-Name
const pageTitle = computed(() => (movie.value ? `${movie.value.title} | MovieFlow` : 'MovieFlow'))
useDocumentTitle(pageTitle)
</script>

<template>
  <p v-if="loading">Loading ...</p>
  <p v-else-if="error">Could not load movie: {{ error }}</p>
  <p v-else-if="!movie">Movie not found.</p>
  <article v-else>
    <h2>{{ movie.title }} ({{ movie.year }})</h2>
    <nav class="tabs">
      <RouterLink :to="{ name: 'movie-detail', params: { id } }">Info</RouterLink>
      <RouterLink :to="{ name: 'movie-similar', params: { id } }"> Similar </RouterLink>
    </nav>
    <RouterView :movie="movie" :movies="movies" />
  </article>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
}
.router-link-exact-active {
  font-weight: bold;
}
</style>
