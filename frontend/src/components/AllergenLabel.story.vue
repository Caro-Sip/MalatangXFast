<script setup lang="ts">
import AllergenLabel from './AllergenLabel.vue'
</script>

<template>
  <Story title="Leaves / AllergenLabel">
    <Variant title="No allergens">
      <AllergenLabel :allergens="[]" />
    </Variant>
    <Variant title="Single allergen">
      <AllergenLabel :allergens="['wheat']" />
    </Variant>
    <Variant title="Multiple allergens">
      <AllergenLabel :allergens="['soy', 'wheat', 'sesame']" />
    </Variant>
  </Story>
</template>

