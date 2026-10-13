<script setup>
import RatingBadge from '@/components/RatingBadge.vue'
import WatchlistButton from '@/components/WatchlistButton.vue'

defineProps({
  movie: { type: Object, required: true },
  compact: { type: Boolean, default: false },
})
const emit = defineEmits(['toggleWatchlist', 'remove'])
</script>

<template>
  <article>
    <h3>
      <RouterLink :to="{ name: 'movie-detail', params: { id: movie.id } }">
        {{ movie.title }}
      </RouterLink>
    </h3>
    <p v-if="!compact">{{ movie.year }}, {{ movie.genre }}</p>
    <RatingBadge :value="movie.rating" />
    <WatchlistButton :active="movie.inWatchlist" @toggle="emit('toggleWatchlist', movie.id)" />
    <button @click="emit('remove', movie.id)">Remove</button>
  </article>
</template>

<style scoped>
article {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
}
h3 {
  margin: 0;
}
p {
  margin: 0;
  color: #64748b;
}
</style>
