<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>

<template>
  <DefaultLayout>
    <main class="builder-view container">
      <div class="content-box">
        <h1>Build Your Bowl</h1>
        <p>Pick your soup base, noodles, proteins, and veggies.</p>
        <p class="status-note">Builder view is currently under construction.</p>
      </div>
    </main>
  </DefaultLayout>
</template>

<style scoped>
.builder-view {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1rem;
  text-align: center;
}

.content-box {
  max-width: 36rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: var(--color-surface);
  padding: 3rem 2rem;
  border-radius: var(--radius);
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.08);
}

h1 {
  font-family: var(--font-heading);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  color: var(--color-text);
  margin: 0;
}

p {
  color: var(--color-text-secondary);
  font-size: 1.1rem;
  margin: 0;
}

.status-note {
  font-size: 0.95rem;
  font-style: italic;
  color: var(--color-border-strong);
}
</style>
