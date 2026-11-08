<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
    <header class="app-header">
        <router-link to="/" class="logo">MalatangXFast</router-link>
        <router-link to="/login">Login</router-link>
    </header>
</template>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}
.logo{
  font-size: 1.5rem;
  font-weight: bold;
  color: inherit;
  text-decoration: none;
}
</style>
