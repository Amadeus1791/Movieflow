<script setup>
import RatingBadge from '@/components/RatingBadge.vue'

defineProps({
  movie: { type: Object, required: true },
  movies: { type: Array, required: true },
})
</script>

<template>
  <p>{{ movie.genre }}, rated <RatingBadge :value="movie.rating" /></p>
  <p v-if="movie.notes">{{ movie.notes }}</p>
</template>
