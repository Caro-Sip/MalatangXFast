<script setup lang="ts">

</script>

<template>
  <section class="hero">
    <h1>Your Bowl. Your Way.</h1>
    <p>Pick the soup base and the ingredients that you want</p>
    <RouterLink to="/Build" class="cta">Build your bowl</RouterLink>
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
