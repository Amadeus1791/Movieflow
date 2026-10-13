<script setup>
defineProps({ title: String })
</script>

<template>
  <div class="empty-state">
    <h3>{{ title }}</h3>
    <slot />
    <slot name="actions" />
  </div>
</template>

<style scoped>
.empty-state {
  margin: 1rem 0;
  padding: 2rem 1rem;
  border: 1px dashed #cbd5e1;
  border-radius: 8px;
  text-align: center;
}
</style>
