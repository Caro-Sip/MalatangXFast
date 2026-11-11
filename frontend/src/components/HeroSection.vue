<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
</script>

<template>
  <section class="hero-banner">
    <div class="hero-inner">
      <div class="hero-card">
        <div class="hero-text">
          <h1 class="hero-title">Malatang</h1>
          <p class="hero-subtitle">Packed with Flavour!</p>
          <p class="hero-desc">Fresh ingredients, bold flavors.</p>
        </div>
        <BaseButton to="/build" class="hero-btn">make your own now!</BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-banner {
  background-color: var(--color-brand);
  background-image: 
    linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)),
    url('@/assets/images/Background.jpg');
  background-repeat: no-repeat;
  background-position: left center;
  background-size: cover;
  min-height: 380px;
  display: flex;
  align-items: center;
  padding-block: 2.5rem;
}

/* Matches the exact width and horizontal padding of .feature-row */
.hero-inner {
  max-width: 72rem; /* Increase to e.g. 64rem if you want it aligned with a wider navbar instead */
  margin-inline: auto;
  padding-inline: 2rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.hero-card {
  background-color: var(--color-primary-dark);
  color: #fff;
  border-radius: var(--radius);
  padding: 2.5rem 3rem;
  display: flex;
  align-items: center;
  gap: 3rem;
  max-width: 48rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.hero-title {
  font-family: var(--font-heading);
  color: var(--color-accent);
  font-size: 3.5rem;
  margin: 0 0 0.25rem;
  line-height: 1.1;
}

.hero-subtitle {
  color: var(--color-accent);
  font-weight: bold;
  font-size: 1.25rem;
  margin: 0 0 0.5rem;
}

.hero-desc {
  margin: 0;
  color: #f5f5f5;
  font-size: 0.95rem;
}

.hero-btn {
  white-space: nowrap;
}

@media (max-width: 850px) {
  .hero-banner {
    background-position: center;
    padding: 2rem 1rem;
  }

  .hero-inner {
    justify-content: center;
    padding-inline: 0;
  }

  .hero-card {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
    padding: 2rem 1.5rem;
  }
}
</style>