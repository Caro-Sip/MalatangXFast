<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push('/')
}
</script>

<template>
  <header class="site-header">
    <div class="container">
      <RouterLink to="/" class="logo">MalatangXFast</RouterLink>
      <nav class="nav">
        <template v-if="auth.isAuthenticated">
          <span class="user-greeting">Hi, {{ auth.user?.name }}</span>
          <button type="button" class="nav-btn" @click="handleLogout">Logout</button>
        </template>
        <template v-else>
          <RouterLink to="/login" class="nav-link">Login</RouterLink>
        </template>
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
  gap: 1rem;
}

.user-greeting {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
}

.nav-link,
.nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text);
  text-decoration: none;
  font: inherit;
  font-size: 0.95rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.nav-link:hover,
.nav-btn:hover {
  text-decoration: underline;
}

.nav-link:focus-visible,
.nav-btn:focus-visible {
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
