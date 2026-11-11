<script setup lang="ts">
import type { Sauce } from '@/types'
import SauceOption from './SauceOption.vue'

const props = withDefaults(
  defineProps<{
    sauces: Sauce[]
    quantities: Record<string, number>
    portionMl?: number
  }>(),
  {
    portionMl: 15,
  },
)

const emit = defineEmits<{ 'change-quantity': [id: string, quantity: number] }>()

function quantityOf(id: string): number {
  return props.quantities[id] ?? 0
}

function change(id: string, delta: number) {
  emit('change-quantity', id, Math.max(0, quantityOf(id) + delta))
}
</script>

<template>
  <section class="panel" aria-labelledby="sauce-heading">
    <div class="label">
      <h2 id="sauce-heading" class="title">Custom sauce</h2>
      <p class="portion">{{ portionMl }} ml per portion</p>
    </div>

    <div class="options">
      <SauceOption
        v-for="sauce in sauces"
        :key="sauce.id"
        :sauce="sauce"
        :quantity="quantityOf(sauce.id)"
        @increment="change(sauce.id, 1)"
        @decrement="change(sauce.id, -1)"
      />
    </div>
  </section>
</template>

<style scoped>
.panel {
  display: grid;
  grid-template-columns: 10rem 1fr;
  gap: 1.5rem;
  padding: 1rem 1.25rem;
  background: var(--color-surface, #faf6f3);
  border: 1px solid #e2ddd8;
  border-radius: var(--radius, 0.75rem);
}

.title {
  margin: 0;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-primary, #c70039);
}

.portion {
  margin: 0.25rem 0 0;
  font-size: 0.8125rem;
  color: var(--color-border-strong, #767676);
}

.options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem 1rem;
}

@media (max-width: 48rem) {
  .panel {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}

@media (max-width: 28rem) {
  .options {
    grid-template-columns: 1fr;
  }
}
</style>

