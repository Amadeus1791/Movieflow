<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

const route = useRoute()
const router = useRouter()
const { login } = useAuthStore()

function loginAsDemo() {
  login('demo')
  // zurueck zur Seite, die der Guard abgefangen hat
  router.replace(route.query.redirect || { name: 'movies' })
}
</script>

<template>
  <section>
    <h2>Login</h2>
    <button @click="loginAsDemo">Log in as demo user</button>
  </section>
</template>
