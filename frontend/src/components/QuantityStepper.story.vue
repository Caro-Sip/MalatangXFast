<script setup lang="ts">
import { ref } from 'vue'
import QuantityStepper from './QuantityStepper.vue'

const qtyZero = ref(0)
const qtyNormal = ref(1)
const qtyMax = ref(5)
const qtyDisabled = ref(0)
</script>

<template>
  <Story title="Leaves / QuantityStepper">
    <Variant title="Zero (Add button)">
      <QuantityStepper
        :quantity="qtyZero"
        @increment="qtyZero++"
        @decrement="qtyZero--"
      />
    </Variant>
    <Variant title="Active stepper">
      <QuantityStepper
        :quantity="qtyNormal"
        :max="5"
        @increment="qtyNormal++"
        @decrement="qtyNormal--"
      />
    </Variant>
    <Variant title="At max (5)">
      <QuantityStepper
        :quantity="qtyMax"
        :max="5"
        @increment="qtyMax++"
        @decrement="qtyMax--"
      />
    </Variant>
    <Variant title="Disabled (sold out)">
      <QuantityStepper
        :quantity="qtyDisabled"
        :disabled="true"
      />
    </Variant>
  </Story>
</template>

