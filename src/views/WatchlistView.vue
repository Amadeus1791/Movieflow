<script setup>
import { storeToRefs } from 'pinia'
import MovieList from '@/components/MovieList.vue'
import { useMovieStore } from '@/stores/movies.js'

const store = useMovieStore()
const { watchlist } = storeToRefs(store)
const { toggleWatchlist, removeMovie } = store
</script>

<template>
  <section>
    <h2>Your watchlist</h2>
    <MovieList :movies="watchlist" @toggle-watchlist="toggleWatchlist" @remove="removeMovie" />
  </section>
</template>
