<script setup lang="ts">
import { formatPrice } from '@/utils/formatPrice'

defineProps<{ label: string; amount: number }>()
</script>

<template>
  <div class="row">
    <span class="label">{{ label }}</span>
    <span class="amount">{{ formatPrice(amount) }}</span>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.label {
  font-weight: 600;
  color: var(--color-text, #1e1e1e);
}
.amount {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text, #1e1e1e);
}
</style>

