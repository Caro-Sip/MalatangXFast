<script setup lang="ts">
import { computed } from 'vue'
import type { Broth, SpiceLevel } from '@/types'
import { SPICE_LABELS } from '@/constants'
import { formatPrice } from '@/utils/formatPrice'
import OptionGroup from './OptionGroup.vue'
import AllergenNote from './AllergenNote.vue'

const props = defineProps<{
  broths: Broth[]
  selectedBrothId: string | null
  spiceLevels: SpiceLevel[]
  selectedSpice: SpiceLevel
}>()

defineEmits<{
  'update:broth': [id: string]
  'update:spice': [level: SpiceLevel]
}>()

const brothOptions = computed(() =>
  props.broths.map((b) => ({
    value: b.id,
    label: `${b.name} · ${formatPrice(b.price)}`,
    disabled: !b.isAvailable,
  })),
)

const spiceOptions = computed(() =>
  props.spiceLevels.map((level) => ({ value: level, label: SPICE_LABELS[level] })),
)

const selectedBroth = computed(
  () => props.broths.find((b) => b.id === props.selectedBrothId) ?? null,
)
</script>

<template>
  <section class="panel">
    <OptionGroup
      legend="Base / broth"
      name="broth"
      :options="brothOptions"
      :model-value="selectedBrothId"
      @update:model-value="$emit('update:broth', $event)"
    />

    <OptionGroup
      legend="Spice level"
      name="spice"
      :options="spiceOptions"
      :model-value="selectedSpice"
      @update:model-value="$emit('update:spice', $event as SpiceLevel)"
    />

    <AllergenNote
      v-if="selectedBroth"
      :label="`Selected ${selectedBroth.name} broth`"
      :allergens="selectedBroth.allergens"
      :volume-label="`${selectedBroth.volumeMl ?? 400} ml per bowl`"
    />
  </section>
</template>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--color-surface, #faf6f3);
  border: 1px solid #e2ddd8;
  border-radius: var(--radius, 0.75rem);
}
</style>

