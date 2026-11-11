<script setup lang="ts">
import { ref } from 'vue'
import BrothPanel from './BrothPanel.vue'
import { fixtureBroths } from '@/data/menu'
import type { SpiceLevel } from '@/types'

const selectedBrothId = ref<string | null>('mala')
const selectedSpice = ref<SpiceLevel>('medium')
const spiceLevels: SpiceLevel[] = ['mild', 'medium', 'hot', 'extra-hot']
</script>

<template>
  <Story title="Groups / BrothPanel">
    <Variant title="Default Broth Panel">
      <div style="padding: 1rem;">
        <BrothPanel
          :broths="fixtureBroths"
          :selected-broth-id="selectedBrothId"
          :spice-levels="spiceLevels"
          :selected-spice="selectedSpice"
          @update:broth="selectedBrothId = $event"
          @update:spice="selectedSpice = $event"
        />
      </div>
    </Variant>
    <Variant title="Unselected Broth">
      <div style="padding: 1rem;">
        <BrothPanel
          :broths="fixtureBroths"
          :selected-broth-id="null"
          :spice-levels="spiceLevels"
          :selected-spice="'mild'"
        />
      </div>
    </Variant>
  </Story>
</template>

