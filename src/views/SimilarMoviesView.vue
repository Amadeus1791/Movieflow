<script setup>
import { computed } from 'vue'

const props = defineProps({
  movie: { type: Object, required: true },
  movies: { type: Array, required: true },
})

// Filme desselben Genres, ohne den aktuellen Film
const similar = computed(() =>
  props.movies.filter((other) => other.genre === props.movie.genre && other.id !== props.movie.id),
)
</script>

<template>
  <ul v-if="similar.length">
    <li v-for="other in similar" :key="other.id">
      <RouterLink :to="{ name: 'movie-detail', params: { id: other.id } }">
        {{ other.title }}
      </RouterLink>
    </li>
  </ul>
  <p v-else>No similar movies.</p>
</template>
