<script setup lang="ts">
import type { Ingredient } from '@/types'
import IngredientCard from './IngredientCard.vue'

const props = defineProps<{
  ingredients: Ingredient[]
  quantities: Record<string, number>
}>()

const emit = defineEmits<{ 'change-quantity': [id: string, quantity: number] }>()

function quantityOf(id: string): number {
  return props.quantities[id] ?? 0
}

function change(id: string, delta: number) {
  emit('change-quantity', id, Math.max(0, quantityOf(id) + delta))
}
</script>

<template>
  <div class="grid">
    <IngredientCard
      v-for="ingredient in ingredients"
      :key="ingredient.id"
      :ingredient="ingredient"
      :quantity="quantityOf(ingredient.id)"
      @increment="change(ingredient.id, 1)"
      @decrement="change(ingredient.id, -1)"
    />
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
  gap: 1rem;
}

@media (min-width: 56rem) {
  .grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>

