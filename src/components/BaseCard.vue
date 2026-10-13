<template>
  <section>
    <header v-if="$slots.header"><slot name="header" /></header>
    <slot>Nothing to show.</slot>
    <footer v-if="$slots.footer"><slot name="footer" /></footer>
  </section>
</template>

<style scoped>
section {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0 1rem 0.75rem;
}
header {
  border-bottom: 1px solid #e2e8f0;
}
footer {
  border-top: 1px solid #e2e8f0;
  padding-top: 0.75rem;
}
</style>
