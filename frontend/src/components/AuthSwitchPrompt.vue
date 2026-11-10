<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  text: string
  linkLabel: string
  to: string
}>()
</script>

<template>
  <p class="auth-switch-prompt">
    <span>{{ text }}</span>
    <RouterLink :to="to" class="auth-switch-prompt__link">{{ linkLabel }}</RouterLink>
  </p>
</template>

<style scoped>
.auth-switch-prompt {
  margin: 0;
  font-size: 0.95rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.auth-switch-prompt__link {
  color: var(--color-text, #1e1e1e);
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.15s ease, text-decoration-color 0.15s ease;
}

.auth-switch-prompt__link:hover {
  color: #000;
  text-decoration-thickness: 2px;
}

.auth-switch-prompt__link:focus-visible {
  outline: 3px solid var(--color-text, #1e1e1e);
  outline-offset: 2px;
  border-radius: 2px;
}
</style>