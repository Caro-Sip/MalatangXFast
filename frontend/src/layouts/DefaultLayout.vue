<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

withDefaults(
  defineProps<{
    showFooter?: boolean
  }>(),
  { showFooter: true },
)
</script>

<template>
  <div class="layout-wrapper">
    <AppHeader />
    <slot name="sub-nav" />
    <div class="layout-content">
      <slot />
    </div>
    <AppFooter v-if="showFooter" />
  </div>
</template>

<style scoped>
.layout-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>

