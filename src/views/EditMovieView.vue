<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import MovieForm from '@/components/MovieForm.vue'
import { useMovieStore } from '@/stores/movies.js'
import { useToastStore } from '@/stores/toast.js'

const props = defineProps({ id: { type: String, required: true } })
const router = useRouter()
const store = useMovieStore()
const { movies, loading } = storeToRefs(store)
const { updateMovie } = store
const toast = useToastStore()

const movie = computed(() => movies.value.find((m) => m.id === Number(props.id)))

function handleSave(changed) {
  updateMovie(changed)
  toast.show('Movie updated')
  router.push({ name: 'movie-detail', params: { id: props.id } })
}
</script>

<template>
  <section>
    <h2>Edit movie</h2>
    <p v-if="loading">Loading ...</p>
    <p v-else-if="!movie">Movie not found.</p>
    <MovieForm v-else :movie="movie" @save="handleSave" />
  </section>
</template>
