<script setup lang="ts">
import { RouterLink } from 'vue-router'

withDefaults(
  defineProps<{
    to?: string
    type?: 'button' | 'submit'
    loading?: boolean
    disabled?: boolean
  }>(),
  { type: 'button', disabled: false, loading: false },
)
</script>

<template>
    <button class="base-button" :type="type" :disabled="disabled || loading" :aria-busy="loading">
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 6.5rem;
  padding: var(--space-sm) var(--space-md);
  font-family: var(--font-body);
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.5;
  background: var(--color-primary);
  color: var(--color-on-primary);
  border: 0;
  border-radius: var(--radius);
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 4px 6px rgb(0 0 0 / 0.2);
  transition: background-color 0.2s, transform 0.1s;
}

.base-button:hover:not(:disabled):not([aria-disabled='true']) {
  background: color-mix(in srgb, var(--color-primary), black 15%);
  transform: translateY(-2px);
}

.base-button:active:not(:disabled):not([aria-disabled='true']) {
  background: color-mix(in srgb, var(--color-primary), black 30%);
  transform: none;
}

.base-button:focus-visible {
  outline: 3px solid var(--color-text);
  outline-offset: 2px;
}

.base-button:disabled,
.base-button[aria-disabled='true'] {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.base-button[aria-disabled='true'] {
  pointer-events: none;
}

.label.hidden {
  visibility: hidden;
}

.spinner {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 1.25rem;
  height: 1.25rem;
  border: 3px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .base-button {
    transition: none;
  }
  .base-button:hover {
    transform: none;
  }
}
</style>
