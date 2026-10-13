<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import SearchBar from '@/components/SearchBar.vue'
import MovieList from '@/components/MovieList.vue'
import MovieListSkeleton from '@/components/MovieListSkeleton.vue'
import EmptyState from '@/components/EmptyState.vue'
import { useMovieStore } from '@/stores/movies.js'
import { useDocumentTitle } from '@/composables/useDocumentTitle.js'

const route = useRoute()
const router = useRouter()
const store = useMovieStore()
const { movies, loading, error, watchlistCount } = storeToRefs(store)
const { toggleWatchlist, removeMovie } = store

// Suchbegriff lebt in der URL (?q=...), damit Links und Zurueck-Taste funktionieren
const searchTerm = ref(route.query.q ?? '')

const genres = ['Drama', 'Comedy', 'Sci-Fi', 'Thriller']
const selectedGenres = ref([])
const sortBy = ref('title')
const showFilters = ref(false)

const filteredMovies = computed(() => {
  const term = searchTerm.value.trim().toLowerCase()
  return movies.value.filter((movie) => {
    const matchesTitle = movie.title.toLowerCase().includes(term)
    // kein Genre angehakt: alle Genres zaehlen
    const allGenres = selectedGenres.value.length === 0
    const matchesGenre = allGenres || selectedGenres.value.includes(movie.genre)
    return matchesTitle && matchesGenre
  })
})

// baut auf filteredMovies auf: erst filtern, dann sortieren
const sortedMovies = computed(() => {
  const list = filteredMovies.value
  // toSorted liefert eine neue Liste, das Original bleibt unveraendert
  if (sortBy.value === 'rating') {
    return list.toSorted((a, b) => b.rating - a.rating)
  }
  return list.toSorted((a, b) => a.title.localeCompare(b.title))
})

// Tab-Titel zeigt die Anzahl der Filme auf der Watchlist
const pageTitle = computed(() => {
  const count = watchlistCount.value
  return count > 0 ? `MovieFlow (${count})` : 'MovieFlow'
})

// Suche und Genre-Auswahl auf den Anfang zuruecksetzen
function resetFilters() {
  searchTerm.value = ''
  selectedGenres.value = []
}

watch(searchTerm, (q) => {
  router.replace({ query: { q: q || undefined } })
})

// Gegenrichtung: aendert sich die Query von aussen (Menue, Zurueck-Taste), zieht das Feld nach
watch(
  () => route.query.q,
  (q) => {
    searchTerm.value = q ?? ''
  },
)

useDocumentTitle(pageTitle)
</script>

<template>
  <section>
    <h2>All movies</h2>
    <SearchBar v-model:term="searchTerm" />
    <button @click="showFilters = !showFilters">Filters</button>

    <Transition name="fade">
      <section v-if="showFilters">
        <fieldset>
          <legend>Genre</legend>
          <label v-for="g in genres" :key="g">
            <input v-model="selectedGenres" type="checkbox" :value="g" /> {{ g }}
          </label>
        </fieldset>
        <fieldset>
          <legend>Sort by</legend>
          <label><input v-model="sortBy" type="radio" value="title" /> Title</label>
          <label><input v-model="sortBy" type="radio" value="rating" /> Rating</label>
        </fieldset>
      </section>
    </Transition>

    <p v-if="movies.length">{{ watchlistCount }} of {{ movies.length }} on your watchlist</p>

    <Transition name="fade" mode="out-in">
      <MovieListSkeleton v-if="loading" />
      <EmptyState v-else-if="error" title="Movies could not be loaded">
        <p>Please check your connection.</p>
        <template #actions>
          <button @click="store.loadMovies()">Try again</button>
        </template>
      </EmptyState>
      <EmptyState v-else-if="!movies.length" title="No movies yet">
        <template #actions>
          <RouterLink :to="{ name: 'movie-new' }">Add movie</RouterLink>
        </template>
      </EmptyState>
      <EmptyState v-else-if="!sortedMovies.length" title="No matching movies">
        <template #actions>
          <button @click="resetFilters">Reset filters</button>
        </template>
      </EmptyState>
      <MovieList
        v-else
        :movies="sortedMovies"
        @toggle-watchlist="toggleWatchlist"
        @remove="removeMovie"
      />
    </Transition>
  </section>
</template>

<style scoped>
fieldset {
  margin: 0.5rem 0;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}
</style>
