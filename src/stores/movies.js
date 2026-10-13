import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'movieflow.movies'
const API_URL = import.meta.env.VITE_API_URL

export const useMovieStore = defineStore('movies', () => {
  const saved = localStorage.getItem(STORAGE_KEY)
  const movies = ref(JSON.parse(saved ?? '[]'))
  const loading = ref(false)
  const error = ref(null)

  const watchlist = computed(() => movies.value.filter((m) => m.inWatchlist))
  const watchlistCount = computed(() => watchlist.value.length)

  async function loadMovies() {
    // gespeicherter Stand hat Vorrang, auch eine leere Liste
    if (saved !== null) return
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_URL}/movies.json`)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      movies.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  function toggleWatchlist(id) {
    const movie = movies.value.find((item) => item.id === id)
    if (movie) movie.inWatchlist = !movie.inWatchlist
  }

  function removeMovie(id) {
    movies.value = movies.value.filter((movie) => movie.id !== id)
  }

  function addMovie(movie) {
    movies.value.push({ ...movie, id: Date.now() })
  }

  // jede Aenderung an der Liste im Browser sichern
  watch(
    movies,
    (value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    },
    { deep: true },
  )

  return {
    movies,
    loading,
    error,
    watchlist,
    watchlistCount,
    loadMovies,
    toggleWatchlist,
    removeMovie,
    addMovie,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMovieStore, import.meta.hot))
}
