<script setup>
import MovieCard from '@/components/MovieCard.vue'

defineProps({
  movies: { type: Array, required: true },
})
const emit = defineEmits(['toggleWatchlist', 'remove'])
</script>

<template>
  <TransitionGroup v-if="movies.length" name="list" tag="ul" class="movie-list">
    <li v-for="movie in movies" :key="movie.id">
      <MovieCard
        :movie="movie"
        @toggle-watchlist="(id) => emit('toggleWatchlist', id)"
        @remove="(id) => emit('remove', id)"
      />
    </li>
  </TransitionGroup>
  <p v-else>No movies found.</p>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-16px);
}
.list-leave-active {
  position: absolute;
  width: 100%;
}
.movie-list {
  position: relative;
}
</style>
