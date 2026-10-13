<template>
  <ul class="movie-list">
    <li v-for="n in 4" :key="n" class="skeleton-card" />
  </ul>
</template>

<style scoped>
.movie-list {
  display: grid;
  gap: 0.75rem;
}
.skeleton-card {
  height: 5rem;
  border-radius: 8px;
  background: #e2e8f0;
}
</style>
