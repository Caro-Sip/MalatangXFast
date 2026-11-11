<script setup lang="ts">
defineProps<{ allergens: string[] }>()
</script>

<template>
  <p class="allergen-label" :class="{ 'has-allergens': allergens.length }">
    <template v-if="allergens.length">Contains {{ allergens.join(', ') }}</template>
    <template v-else>No listed allergens</template>
  </p>
</template>

<style scoped>
.allergen-label {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--color-border-strong, #767676);
}
.has-allergens {
  color: var(--color-primary, #C70039); /* high-intensity brand accent red */
}
</style>

