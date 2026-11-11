<script setup lang="ts">
import type { SummaryGroup } from '@/types'
import { formatPrice } from '@/utils/formatPrice'

defineProps<{ groups: SummaryGroup[] }>()
</script>

<template>
  <div class="bowl">
    <section v-for="group in groups" :key="group.id" class="group">
      <div class="group-row">
        <h3 class="group-title">{{ group.title }}</h3>
        <span class="group-total">{{ formatPrice(group.subtotal) }}</span>
      </div>
      <ul class="lines">
        <li v-for="line in group.lines" :key="line.id" class="line">
          <span>{{ line.quantity }} × {{ line.name }}</span>
          <span>{{ formatPrice(line.price) }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.bowl {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.group-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-weight: 700;
}
.group-title {
  margin: 0;
  font-size: 1rem;
  color: var(--color-text, #1e1e1e);
}
.group-total {
  font-size: 1rem;
  color: var(--color-text, #1e1e1e);
}
.lines {
  margin: 0.25rem 0 0;
  padding: 0;
  list-style: none;
}
.line {
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 0;
  font-size: 0.95rem;
  color: var(--color-text-secondary, #363636);
}
</style>

