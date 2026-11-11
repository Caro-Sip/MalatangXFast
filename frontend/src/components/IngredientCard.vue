<script setup lang="ts">
import type { Ingredient } from '@/types'
import { formatPrice } from '@/utils/formatPrice'
import AllergenLabel from './AllergenLabel.vue'
import QuantityStepper from './QuantityStepper.vue'

defineProps<{ ingredient: Ingredient; quantity: number }>()
defineEmits<{ increment: []; decrement: [] }>()
</script>

<template>
  <article
    class="card"
    :class="{ selected: quantity > 0, 'sold-out': !ingredient.isAvailable }"
  >
    <img
      v-if="ingredient.imageUrl"
      class="photo"
      :src="ingredient.imageUrl"
      alt=""
    />

    <div class="body">
      <div class="heading">
        <h3 class="name">{{ ingredient.name }}</h3>
        <p class="price">{{ formatPrice(ingredient.price) }}</p>
      </div>

      <p v-if="ingredient.portionLabel || ingredient.portionGrams" class="portion">
        {{ ingredient.portionLabel || `1 portion · ${ingredient.portionGrams} g` }}
      </p>

      <AllergenLabel :allergens="ingredient.allergens" />

      <p v-if="!ingredient.isAvailable" class="sold-out-text">Sold out</p>

      <QuantityStepper
        :quantity="quantity"
        :disabled="!ingredient.isAvailable"
        @increment="$emit('increment')"
        @decrement="$emit('decrement')"
      />
    </div>
  </article>
</template>

<style scoped>
.card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--color-surface, #faf6f3);
  border: 1px solid #e2ddd8;
  border-radius: var(--radius, 0.75rem);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.card.selected {
  border-color: var(--color-primary, #c70039);
  box-shadow: 0 0 0 1px var(--color-primary, #c70039);
}

.card.sold-out {
  opacity: 0.6;
}

.photo {
  width: 3.5rem;
  height: 3.5rem;
  object-fit: contain;
  border-radius: 0.375rem;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.heading {
  display: flex;
  flex-direction: column;
}

.name {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text, #1e1e1e);
}

.price {
  margin: 0;
  color: var(--color-primary, #c70039);
  font-weight: 700;
  font-size: 0.95rem;
}

.portion {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--color-border-strong, #767676);
}

.sold-out-text {
  margin: 0;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-border-strong, #767676);
}
</style>
