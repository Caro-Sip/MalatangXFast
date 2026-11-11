import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import BrothPanel from '../BrothPanel.vue'
import type { Broth, SpiceLevel } from '@/types'

const broths: Broth[] = [
  { id: 'mala', name: 'Mala', price: 5, allergens: ['soy', 'wheat'], volumeMl: 400, isAvailable: true },
  { id: 'tomato', name: 'Tomato', price: 5, allergens: [], volumeMl: 400, isAvailable: true },
]
const spiceLevels: SpiceLevel[] = ['mild', 'medium', 'hot', 'extra-hot']

const mountPanel = (selectedBrothId: string | null = null) =>
  mount(BrothPanel, {
    props: { broths, selectedBrothId, spiceLevels, selectedSpice: 'medium' },
  })

describe('BrothPanel', () => {
  it('shows each broth with its price and 4 spice levels', () => {
    const w = mountPanel()
    expect(w.text()).toContain('Mala · $5.00')
    expect(w.text()).toContain('Extra hot')
    expect(w.findAll('input[name="spice"]')).toHaveLength(4)
  })

  it('shows no allergen note until a broth is chosen', () => {
    expect(mountPanel().text()).not.toContain('Selected')
  })

  it('shows the selected broth allergens and volume', () => {
    const text = mountPanel('mala').text()
    expect(text).toContain('Selected Mala broth: contains soy and wheat · 400 ml per bowl')
  })

  it('emits update:broth with the id', async () => {
    const w = mountPanel()
    await w.find('input[name="broth"][value="tomato"]').setValue(true)
    expect(w.emitted('update:broth')![0]).toEqual(['tomato'])
  })

  it('emits update:spice with the level', async () => {
    const w = mountPanel()
    await w.find('input[name="spice"][value="hot"]').setValue(true)
    expect(w.emitted('update:spice')![0]).toEqual(['hot'])
  })
})

