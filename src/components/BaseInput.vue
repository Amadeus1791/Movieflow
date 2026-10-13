<script setup>
// class, type, placeholder usw. landen am input, nicht am umschliessenden div
defineOptions({ inheritAttrs: false })
const model = defineModel()
defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  error: { type: String, default: '' },
})
const emit = defineEmits(['blur'])
</script>

<template>
  <div class="field">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      v-model="model"
      v-bind="$attrs"
      :aria-invalid="Boolean(error)"
      :aria-describedby="error ? `${id}-error` : null"
      @blur="emit('blur')"
    />
    <p v-if="error" :id="`${id}-error`" class="error">{{ error }}</p>
  </div>
</template>

<style scoped>
input[aria-invalid='true'] {
  border-color: #dc2626;
}
</style>
