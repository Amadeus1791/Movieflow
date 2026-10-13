<script setup>
import { useToastStore } from '@/stores/toast.js'

const toast = useToastStore()
</script>

<template>
  <Teleport to="body">
    <TransitionGroup name="toast" tag="div" class="toasts" role="status" aria-live="polite">
      <div v-for="t in toast.toasts" :key="t.id" class="toast" :class="t.type">
        {{ t.message }}
        <button @click="toast.dismiss(t.id)">x</button>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<style scoped>
.toasts {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  display: grid;
  gap: 0.5rem;
}
.toast {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  color: white;
}
.success {
  background: #0e9682;
}
.error {
  background: #dc2626;
}
.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
