<script setup lang="ts">
import type { Sauce } from '@/types'
import { formatPrice } from '@/utils/formatPrice'
import AllergenLabel from './AllergenLabel.vue'
import QuantityStepper from './QuantityStepper.vue'

defineProps<{ sauce: Sauce; quantity: number }>()
defineEmits<{ increment: []; decrement: [] }>()
</script>

<template>
  <div class="sauce" :class="{ 'sold-out': !sauce.isAvailable }">
    <p class="title">
      <span class="name">{{ sauce.name }}</span>
      <span class="price"> · {{ formatPrice(sauce.price) }}</span>
    </p>

    <AllergenLabel :allergens="sauce.allergens" />
    <p v-if="!sauce.isAvailable" class="sold-out-text">Sold out</p>

    <QuantityStepper
      :quantity="quantity"
      :disabled="!sauce.isAvailable"
      @increment="$emit('increment')"
      @decrement="$emit('decrement')"
    />
  </div>
</template>

<style scoped>
.sauce {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.sold-out {
  opacity: 0.6;
}

.title {
  margin: 0;
  font-size: 0.95rem;
  color: var(--color-text, #1e1e1e);
}

.name {
  font-weight: 600;
}

.price {
  color: var(--color-border-strong, #767676);
  font-weight: 500;
}

.sold-out-text {
  margin: 0;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-border-strong, #767676);
}
</style>

