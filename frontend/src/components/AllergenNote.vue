<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string
  allergens: string[]
  volumeLabel: string
}>()

function formatAllergens(allergens: string[]): string {
  if (!allergens.length) return 'no listed allergens'
  if (typeof Intl !== 'undefined' && 'ListFormat' in Intl) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const listFormatter = new (Intl as any).ListFormat('en', { type: 'conjunction' })
    return `contains ${listFormatter.format(allergens)}`
  }
  if (allergens.length === 1) return `contains ${allergens[0]}`
  if (allergens.length === 2) return `contains ${allergens[0]} and ${allergens[1]}`
  return `contains ${allergens.slice(0, -1).join(', ')}, and ${allergens[allergens.length - 1]}`
}

const allergenText = computed(() => formatAllergens(props.allergens))
</script>

<template>
  <p class="note">{{ label }}: {{ allergenText }} · {{ volumeLabel }}</p>
</template>

<style scoped>
.note {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--color-border-strong, #767676);
}
</style>
