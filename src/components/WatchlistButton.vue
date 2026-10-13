<script setup>
defineProps({
  active: { type: Boolean, default: false },
})
const emit = defineEmits(['toggle'])
</script>

<template>
  <button :class="{ active }" @click="emit('toggle')">
    {{ active ? 'On watchlist' : 'Add to watchlist' }}
  </button>
</template>

<style scoped>
.active {
  background: #0e9682;
  color: white;
}
</style>
