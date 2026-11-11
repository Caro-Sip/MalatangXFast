<script setup lang="ts">
defineProps<{ title: string; text: string }>()
</script>

<template>
  <div class="notice">
    <p class="title">{{ title }}</p>
    <p class="text">{{ text }}</p>
  </div>
</template>

<style scoped>
.notice {
  text-align: right;
}
.title {
  margin: 0;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-primary, #c70039);
}
.text {
  margin: 0.25rem 0 0;
  font-size: 0.875rem;
  color: var(--color-border-strong, #767676);
}
</style>

