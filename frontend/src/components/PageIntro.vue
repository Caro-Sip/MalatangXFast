<script setup lang="ts">
defineProps<{ title: string; tagline: string }>()
</script>

<template>
  <div class="intro">
    <h1 class="title">{{ title }}</h1>
    <p class="tagline">{{ tagline }}</p>
  </div>
</template>

<style scoped>
.title {
  margin: 0;
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4vw, 2.75rem);
  text-transform: uppercase;
  color: var(--color-text, #1e1e1e);
  line-height: 1.1;
}
.tagline {
  margin: 0.25rem 0 0;
  font-size: 1rem;
  color: var(--color-border-strong, #767676);
}
</style>

