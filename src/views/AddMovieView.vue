<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MovieForm from '@/components/MovieForm.vue'
import { useMovieStore } from '@/stores/movies.js'
import { useToastStore } from '@/stores/toast.js'

const router = useRouter()
const { addMovie } = useMovieStore()
const toast = useToastStore()
const saving = ref(false)
const saveError = ref(null)

async function handleSave(movie) {
  saving.value = true
  saveError.value = null
  try {
    addMovie(movie)
    toast.show('Movie saved')
    router.push({ name: 'movies' })
  } catch (err) {
    saveError.value = err.message
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <section>
    <h2>Add movie</h2>
    <p v-if="saveError" class="error" role="alert">{{ saveError }}</p>
    <MovieForm :saving="saving" @save="handleSave" />
  </section>
</template>
