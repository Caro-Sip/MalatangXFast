<script setup lang="ts">
import type { SpiceLevel, SummaryGroup } from '@/types'
import { SPICE_LABELS } from '@/constants'
import { formatPrice } from '@/utils/formatPrice'
import BaseButton from './BaseButton.vue'
import BowlSummary from './BowlSummary.vue'
import AllergySummary from './AllergySummary.vue'
import TotalRow from './TotalRow.vue'

defineProps<{
  groups: SummaryGroup[]
  total: number
  allergens: string[]
  customerName: string
  spiceLevel: SpiceLevel
  cutlery: boolean
  canReview: boolean
}>()

defineEmits<{ review: [] }>()
</script>

<template>
  <aside class="summary" aria-label="Your bowl">
    <h2 class="title">Your bowl</h2>
    <p class="meta">
      {{ customerName }} · 1 bowl · {{ SPICE_LABELS[spiceLevel] }} heat ·
      {{ cutlery ? 'With cutlery' : 'No cutlery' }}
    </p>

    <BowlSummary v-if="groups.length" :groups="groups" />
    <p v-else class="empty">Choose a broth to start your bowl.</p>

    <hr class="divider" />

    <AllergySummary :allergens="allergens" />
    <TotalRow label="Due at pickup" :amount="total" />
    <p class="fine-print">Taxes included · No additional fees · No payment taken</p>

    <BaseButton :disabled="!canReview" @click="$emit('review')">
      Review pickup order · {{ formatPrice(total) }}
    </BaseButton>
  </aside>
</template>

<style scoped>
.summary {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--color-surface, #faf6f3);
  border: 1px solid #e2ddd8;
  border-radius: var(--radius, 0.75rem);
}

.title {
  margin: 0;
  font-family: var(--font-heading);
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-text, #1e1e1e);
}

.meta,
.empty {
  margin: 0;
  font-size: 0.95rem;
  color: var(--color-border-strong, #767676);
}

.divider {
  width: 100%;
  border: 0;
  border-top: 1px solid #e2ddd8;
  margin: 0.25rem 0;
}

.fine-print {
  margin: 0;
  font-size: 0.75rem;
  color: var(--color-border-strong, #767676);
}
</style>

