<script setup>
defineProps({
  value: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 10,
  },
})
</script>

<template>
  <span class="rating" :class="{ top: value >= 8.5 }">{{ value }}</span>
</template>

<style scoped>
.rating {
  font-weight: bold;
}
.top {
  color: #0e9682;
}
</style>
