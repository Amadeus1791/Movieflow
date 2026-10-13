<script setup>
const term = defineModel('term')
</script>

<template>
  <input v-model="term" placeholder="Search by title" @keyup.esc="term = ''" />
</template>
