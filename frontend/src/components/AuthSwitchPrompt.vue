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
    {{ text }}
    <RouterLink :to="to" class="auth-switch-prompt__link">{{ linkLabel }}</RouterLink>
  </p>
</template>

<style scoped>
.auth-switch-prompt {
  margin: 0;
  font-size: 0.95rem;
  text-align: center;
}

.auth-switch-prompt__link {
  color: var(--color-brand, #f16244);
  font-weight: 700;
  text-decoration: underline;
}

.auth-switch-prompt__link:hover {
  filter: brightness(0.85);
}

.auth-switch-prompt__link:focus-visible {
  outline: 3px solid var(--color-brand, #f16244);
  outline-offset: 2px;
  border-radius: 2px;
}
</style>