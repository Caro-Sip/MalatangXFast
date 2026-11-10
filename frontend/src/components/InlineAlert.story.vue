<script setup lang="ts">
import InlineAlert from './InlineAlert.vue'
</script>
 
<template>
  <Story title="InlineAlert">
    <Variant title="Server error">
      <InlineAlert message="Something went wrong creating your account. Please try again." />
    </Variant>
  </Story>
</template>