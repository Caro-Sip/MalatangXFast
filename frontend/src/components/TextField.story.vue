<script setup lang="ts">
import { ref } from 'vue'
import TextField from './TextField.vue'

const name = ref('')
const email = ref('not-an-email')
</script>

<template>
  <Story title="TextField">
    <Variant title="Default">
      <TextField v-model="name" label="Name" />
    </Variant>
    <Variant title="With error">
      <TextField v-model="email" label="Email" type="email" error="Enter a valid email address." />
    </Variant>
  </Story>
</template>