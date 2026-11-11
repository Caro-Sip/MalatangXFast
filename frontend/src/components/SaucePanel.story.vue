<script setup lang="ts">
import { reactive } from 'vue'
import SaucePanel from './SaucePanel.vue'
import { fixtureSauces } from '@/data/menu'

const quantities = reactive<Record<string, number>>({
  garlic: 1,
  sesame: 2,
})

function handleChange(id: string, qty: number) {
  quantities[id] = qty
}
</script>

<template>
  <Story title="Groups / SaucePanel">
    <Variant title="Default Panel">
      <div style="padding: 1rem;">
        <SaucePanel
          :sauces="fixtureSauces"
          :quantities="quantities"
          @change-quantity="handleChange"
        />
      </div>
    </Variant>
  </Story>
</template>

