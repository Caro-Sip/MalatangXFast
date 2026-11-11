<script setup lang="ts">
const props = withDefaults(
  defineProps<{ quantity: number; max?: number; disabled?: boolean }>(),
  { max: 5, disabled: false },
)

defineEmits<{ increment: []; decrement: [] }>()
</script>

<template>
  <div class="stepper">
    <template v-if="quantity === 0">
      <button
        type="button"
        class="add"
        :disabled="disabled"
        @click="$emit('increment')"
      >
        Add <span class="plus" aria-hidden="true">+</span>
      </button>
    </template>

    <template v-else>
      <button
        type="button"
        class="step"
        aria-label="Remove one portion"
        :disabled="disabled"
        @click="$emit('decrement')"
      >
        −
      </button>
      <span class="count" aria-live="polite">{{ quantity }}</span>
      <button
        type="button"
        class="step"
        aria-label="Add one portion"
        :disabled="disabled || quantity >= props.max"
        @click="$emit('increment')"
      >
        +
      </button>
    </template>
  </div>
</template>

<style scoped>
.stepper {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.step,
.plus {
  background: var(--color-primary, #c70039);
  color: var(--color-on-primary, #ffffff);
  border: 0;
  border-radius: 0.375rem;
  width: 1.75rem;
  height: 1.75rem;
  font-size: 1.125rem;
  line-height: 1;
  font-weight: 700;
  cursor: pointer;
  display: inline-grid;
  place-items: center;
  transition: background-color 0.15s ease, opacity 0.15s ease;
}
.step:hover:not(:disabled),
.add:hover:not(:disabled) .plus {
  background: var(--color-primary-dark, #900c3f);
}
.add {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: 0;
  color: var(--color-primary, #c70039);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}
.count {
  font-size: 1rem;
  font-weight: 600;
  min-width: 1.25rem;
  text-align: center;
  color: var(--color-text, #1e1e1e);
}
button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>

