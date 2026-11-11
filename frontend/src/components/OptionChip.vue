<script setup lang="ts">
defineProps<{
  name: string
  value: string
  label: string
  checked: boolean
  disabled?: boolean
}>()

defineEmits<{ select: [] }>()
</script>

<template>
  <label class="chip" :class="{ checked, disabled }">
    <input
      type="radio"
      class="input"
      :name="name"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      @change="$emit('select')"
    />
    <span v-if="checked" class="dot" aria-hidden="true"></span>
    <span>{{ label }}</span>
  </label>
</template>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--color-surface, #faf6f3);
  border: 1px solid #e2ddd8;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  color: var(--color-text, #1e1e1e);
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
}

.chip.checked {
  background: var(--color-primary-dark, #900c3f);
  border-color: var(--color-primary-dark, #900c3f);
  color: var(--color-accent, #ffc300);
  font-weight: 600;
}

.chip.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.chip:has(.input:focus-visible) {
  outline: 2px solid var(--color-primary, #c70039);
  outline-offset: 2px;
}

.input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: currentColor;
}
</style>

