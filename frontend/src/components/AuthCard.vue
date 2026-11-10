<script setup lang="ts">
defineProps<{
  title: string;
}>()
</script>

<template>
  <section class="auth-card">
    <h1>{{ title }}</h1>
    <slot />
    <footer v-if="$slots.footer"><slot name="footer" /></footer>
  </section>
</template>

<style scoped>
.auth-card {
  width: min(100%, 24rem);
  padding: 2rem;
  background: var(--color-brand);   /* #F16244 */
  border-radius: 0.75rem;           /* you prefer rounded */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.35);
}
h1 { text-align: center; margin: 0; }
footer { text-align: center; color: #fff; }
</style>
