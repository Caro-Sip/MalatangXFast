<script setup lang="ts">
import { ref } from 'vue'
import SauceOption from './SauceOption.vue'
import type { Sauce } from '@/types'

const garlic: Sauce = {
  id: 'garlic',
  name: 'Garlic',
  price: 0,
  allergens: [],
  isAvailable: true,
}

const sesame: Sauce = {
  id: 'sesame',
  name: 'Sesame sauce',
  price: 0.5,
  allergens: ['sesame', 'soy'],
  isAvailable: true,
}

const vinegar: Sauce = {
  id: 'vinegar',
  name: 'Vinegar',
  price: 0,
  allergens: [],
  isAvailable: false,
}

const qtyGarlic = ref(0)
const qtySesame = ref(1)
const qtyVinegar = ref(0)
</script>

<template>
  <Story title="Cards / SauceOption">
    <Variant title="Free Sauce (Garlic, Qty 0)">
      <SauceOption
        :sauce="garlic"
        :quantity="qtyGarlic"
        @increment="qtyGarlic++"
        @decrement="qtyGarlic--"
      />
    </Variant>
    <Variant title="Paid Sauce (Sesame, Qty 1)">
      <SauceOption
        :sauce="sesame"
        :quantity="qtySesame"
        @increment="qtySesame++"
        @decrement="qtySesame--"
      />
    </Variant>
    <Variant title="Sold out Sauce">
      <SauceOption
        :sauce="vinegar"
        :quantity="qtyVinegar"
        @increment="qtyVinegar++"
        @decrement="qtyVinegar--"
      />
    </Variant>
  </Story>
</template>

