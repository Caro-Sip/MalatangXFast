<script setup lang="ts">
defineProps<{ message?: string }>()
</script>

<template>
  <div class="alert" role="alert">
    <slot>{{ message }}</slot>
  </div>
</template>

<style scoped>
.alert {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius, 0.375rem);
  background: var(--color-error-bg, #fdecea);
  color: var(--color-error, #b3261e);
  font-weight: 600;
  border: 1px solid var(--color-error, #b3261e);
}
</style>
