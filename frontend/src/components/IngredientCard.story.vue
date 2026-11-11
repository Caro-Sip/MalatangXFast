<script setup lang="ts">
import { ref } from 'vue'
import IngredientCard from './IngredientCard.vue'
import type { Ingredient } from '@/types'

const chicken: Ingredient = {
  id: 'chicken',
  name: 'Chicken',
  price: 4,
  portionGrams: 80,
  allergens: [],
  isAvailable: true,
}

const wheatNoodles: Ingredient = {
  id: 'wheat-noodles',
  name: 'Wheat noodles',
  price: 2,
  portionGrams: 100,
  allergens: ['wheat'],
  isAvailable: true,
}

const beef: Ingredient = {
  id: 'beef',
  name: 'Beef',
  price: 4.5,
  portionGrams: 80,
  allergens: [],
  isAvailable: false,
}

const qtyChicken = ref(0)
const qtyNoodles = ref(1)
const qtyBeef = ref(0)
</script>

<template>
  <Story title="Cards / IngredientCard">
    <Variant title="Unselected (Qty 0)">
      <div style="max-width: 320px;">
        <IngredientCard
          :ingredient="chicken"
          :quantity="qtyChicken"
          @increment="qtyChicken++"
          @decrement="qtyChicken--"
        />
      </div>
    </Variant>
    <Variant title="Selected (Qty 1, with allergens)">
      <div style="max-width: 320px;">
        <IngredientCard
          :ingredient="wheatNoodles"
          :quantity="qtyNoodles"
          @increment="qtyNoodles++"
          @decrement="qtyNoodles--"
        />
      </div>
    </Variant>
    <Variant title="Sold out">
      <div style="max-width: 320px;">
        <IngredientCard
          :ingredient="beef"
          :quantity="qtyBeef"
          @increment="qtyBeef++"
          @decrement="qtyBeef--"
        />
      </div>
    </Variant>
  </Story>
</template>
