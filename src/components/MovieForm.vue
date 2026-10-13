<script setup>
import { ref, computed, nextTick, useTemplateRef } from 'vue'
import { validateMovie } from '@/utils/validateMovie.js'
import BaseInput from '@/components/BaseInput.vue'

defineProps({ saving: Boolean })
const emit = defineEmits(['save'])

const genres = ['Drama', 'Comedy', 'Sci-Fi', 'Thriller']
const form = ref({
  title: '',
  year: null,
  genre: '',
  rating: 7,
  inWatchlist: false,
  notes: '',
})

const submitted = ref(false)
const touched = ref({})
const formEl = useTemplateRef('form-el')

const errors = computed(() => validateMovie(form.value))
const isValid = computed(() => Object.keys(errors.value).length === 0)

// Fehler erst zeigen, wenn das Feld verlassen oder das Formular abgeschickt wurde
function showError(field) {
  if (submitted.value || touched.value[field]) {
    return errors.value[field] ?? ''
  }
  return ''
}

async function submitForm() {
  submitted.value = true
  if (!isValid.value) {
    // erst nach dem Rendern existieren die Fehlermarkierungen im DOM
    await nextTick()
    const firstInvalid = formEl.value.querySelector('[aria-invalid="true"]')
    firstInvalid?.focus()
    return
  }
  emit('save', { ...form.value })
}
</script>

<template>
  <form ref="form-el" novalidate @submit.prevent="submitForm">
    <BaseInput
      id="title"
      v-model.trim="form.title"
      label="Title"
      placeholder="e.g. Inception"
      :error="showError('title')"
      @blur="touched.title = true"
    />
    <BaseInput
      id="year"
      v-model="form.year"
      type="number"
      label="Year"
      :error="showError('year')"
      @blur="touched.year = true"
    />
    <div class="field">
      <label for="genre">Genre</label>
      <select
        id="genre"
        v-model="form.genre"
        :aria-invalid="Boolean(showError('genre'))"
        :aria-describedby="showError('genre') ? 'genre-error' : null"
        @blur="touched.genre = true"
      >
        <option v-for="g in genres" :key="g" :value="g">{{ g }}</option>
      </select>
      <p v-if="showError('genre')" id="genre-error" class="error">
        {{ showError('genre') }}
      </p>
    </div>
    <div class="field">
      <label for="rating">Rating: {{ form.rating }}</label>
      <input id="rating" v-model.number="form.rating" type="range" min="0" max="10" step="0.1" />
    </div>
    <label> <input v-model="form.inWatchlist" type="checkbox" /> Add to watchlist </label>
    <div class="field">
      <label for="notes">Notes</label>
      <textarea id="notes" v-model="form.notes" />
    </div>
    <button type="submit" :disabled="saving">
      {{ saving ? 'Saving ...' : 'Save movie' }}
    </button>
  </form>
</template>

<style scoped>
select[aria-invalid='true'] {
  border-color: #dc2626;
}
</style>
