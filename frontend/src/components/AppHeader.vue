<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="site-header">
    <div class="container">
      <RouterLink to="/" class="logo">MalatangXFast</RouterLink>
      <nav class="nav">
        <RouterLink to="/login" class="nav-link">Login</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  padding-block: 0.75rem;
  background: var(--color-brand);
  box-shadow: 0 2px 6px rgb(0 0 0 / 0.12);
}

.site-header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.logo {
  font-family: var(--font-heading);
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  font-weight: normal;
  color: var(--color-text);
  text-decoration: none;
}

.logo:focus-visible {
  outline: 3px solid var(--color-text);
  outline-offset: 2px;
  border-radius: 4px;
}

.nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text);
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: underline;
}

.nav-link:focus-visible {
  outline: 3px solid var(--color-text);
  outline-offset: 2px;
  border-radius: 4px;
}

@media (max-width: 48rem) {
  .site-header {
    padding-block: 0.5rem;
  }
}
</style>
