<script setup lang="ts">
import { useId } from 'vue'

defineOptions({ inheritAttrs: false })

defineProps<{ label: string; error?: string }>()
const model = defineModel<string>({ default: '' })
const id = useId()
</script>

<template>
  <div class="text-field">
    <label :for="id" class="text-field__label">{{ label }}</label>
    <input
      v-bind="$attrs"
      :id="id"
      v-model="model"
      class="text-field__input"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${id}-error` : undefined"
    />
    <p v-if="error" :id="`${id}-error`" class="text-field__error">{{ error }}</p>
  </div>
</template>

<style scoped>
.text-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.text-field__label {
  font-size: 0.9rem;
  font-weight: 600;
}

.text-field__input {
  padding: 0.65rem 0.85rem;
  border: 1px solid #c9c9c9;
  border-radius: 0.75rem;
  font: inherit;
}

.text-field__input:focus-visible {
  outline: 3px solid var(--color-brand, #f16244);
  outline-offset: 1px;
  border-color: var(--color-brand, #f16244);
}

.text-field__input[aria-invalid='true'] {
  border-color: var(--color-error, #c70039);
}

.text-field__error {
  margin: 0;
  font-size: 0.85rem;
  color: #8f0029;
}
</style>