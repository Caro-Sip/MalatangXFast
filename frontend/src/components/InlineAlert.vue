<script setup lang="ts">
defineProps<{ message: string }>()
</script>

<template>
  <div class="alert" role="alert">{{ message }}</div>
</template>

<style scoped>
.alert {
  padding: 0.75rem;
  border-radius: 0.375rem;
  background: #fff;
  color: var(--color-accent);
  font-weight: 600;
}
</style>