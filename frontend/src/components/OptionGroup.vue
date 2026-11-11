<script setup lang="ts">
import OptionChip from './OptionChip.vue'

export interface Option {
  value: string
  label: string
  disabled?: boolean
}

defineProps<{
  legend: string
  name: string
  options: Option[]
  modelValue: string | null
}>()

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <fieldset class="group">
    <legend class="legend">{{ legend }}</legend>
    <div class="chips">
      <OptionChip
        v-for="option in options"
        :key="option.value"
        :name="name"
        :value="option.value"
        :label="option.label"
        :checked="option.value === modelValue"
        :disabled="option.disabled"
        @select="$emit('update:modelValue', option.value)"
      />
    </div>
  </fieldset>
</template>

<style scoped>
.group {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
  border: 0;
}

.legend {
  width: 7rem;
  padding: 0;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--color-text, #1e1e1e);
  flex-shrink: 0;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

@media (max-width: 36rem) {
  .group {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>

