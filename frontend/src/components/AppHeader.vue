<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
    <header class="app-header">
        <span class="logo">MalatangXFast</span>
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
</style>