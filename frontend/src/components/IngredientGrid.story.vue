<script setup lang="ts">
import { reactive } from 'vue'
import IngredientGrid from './IngredientGrid.vue'
import { fixtureIngredients } from '@/data/menu'

const quantities = reactive<Record<string, number>>({
  chicken: 1,
  'wheat-noodles': 2,
})

function handleChange(id: string, qty: number) {
  quantities[id] = qty
}
</script>

<template>
  <Story title="Groups / IngredientGrid">
    <Variant title="Menu Grid">
      <div style="padding: 1rem;">
        <IngredientGrid
          :ingredients="fixtureIngredients"
          :quantities="quantities"
          @change-quantity="handleChange"
        />
      </div>
    </Variant>
  </Story>
</template>

