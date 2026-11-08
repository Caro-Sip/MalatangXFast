<script setup lang="ts">
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <nav class="footer-nav">
        <a href="#" class="footer-link">About Us</a>
        <a href="#" class="footer-link">Services</a>
        <a href="#" class="footer-link">Community</a>
        <a href="#" class="footer-link">Contact Us</a>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--color-brand);
  padding-block: var(--space-sm);
}

.site-footer .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text);
  text-decoration: none;
}

.footer-link:hover {
  text-decoration: underline;
}

.footer-link:focus-visible {
  outline: 3px solid var(--color-text);
  outline-offset: 2px;
  border-radius: 4px;
}

@media (max-width: 48rem) {
  .site-footer .container {
    flex-direction: column;
    text-align: center;
  }
}
</style>
