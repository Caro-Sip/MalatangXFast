<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
</script>

<template>
  <section class="hero container">
    <h1>Your Bowl. Your Way.</h1>
    <p>Pick the soup base and the ingredients that you want</p>
    <BaseButton to="/build">Build your bowl</BaseButton>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1rem;
  padding: 4rem 2rem;
}
</style>
