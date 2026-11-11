<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ allergens: string[] }>()

const text = computed(() =>
  props.allergens.length ? props.allergens.join(', ') : 'none listed',
)
</script>

<template>
  <p class="allergies">Selected allergens: {{ text }}</p>
</template>

<style scoped>
.allergies {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--color-border-strong, #767676);
}
</style>

