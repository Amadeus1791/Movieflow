<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import BaseCard from '@/components/BaseCard.vue'
import MovieCard from '@/components/MovieCard.vue'
import { useMovieStore } from '@/stores/movies.js'

const store = useMovieStore()
const { movies, loading, error } = storeToRefs(store)
const { toggleWatchlist, removeMovie } = store
const likes = ref(0)
// Feature-Flag aus der .env-Datei: Like-Knopf nur, wenn der Wert 'true' ist
const showLikes = import.meta.env.VITE_SHOW_LIKES === 'true'

// Film des Tages mit Link zur IMDb-Suche
const featured = computed(() => movies.value[0])
const imdbUrl = computed(() => {
  const query = encodeURIComponent(featured.value?.title)
  return `https://www.imdb.com/find/?q=${query}`
})
</script>

<template>
  <p v-if="loading">Loading movies ...</p>
  <p v-else-if="error">Could not load movies: {{ error }}</p>
  <BaseCard v-else-if="featured">
    <template #header>
      <h2>Movie of the day</h2>
    </template>

    <MovieCard :movie="featured" @toggle-watchlist="toggleWatchlist" @remove="removeMovie" />

    <template #footer>
      <a :href="imdbUrl">Search on IMDb</a>
      <button v-if="showLikes" @click="likes++">Like ({{ likes }})</button>
    </template>
  </BaseCard>
  <p v-else>No movie of the day yet.</p>
</template>
