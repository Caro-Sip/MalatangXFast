import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import OptionGroup from '../OptionGroup.vue'
import OptionChip from '../OptionChip.vue'

describe('OptionGroup', () => {
  const options = [
    { value: 'mild', label: 'Mild' },
    { value: 'medium', label: 'Medium' },
    { value: 'hot', label: 'Hot', disabled: true },
  ]

  it('renders legend and all chips', () => {
    const w = mount(OptionGroup, {
      props: {
        legend: 'Spice level',
        name: 'spice',
        options,
        modelValue: 'medium',
      },
    })
    expect(w.find('legend').text()).toBe('Spice level')
    expect(w.findAllComponents(OptionChip)).toHaveLength(3)
  })

  it('marks active option as checked', () => {
    const w = mount(OptionGroup, {
      props: {
        legend: 'Spice level',
        name: 'spice',
        options,
        modelValue: 'medium',
      },
    })
    const chips = w.findAllComponents(OptionChip)
    expect(chips[0]!.props('checked')).toBe(false)
    expect(chips[1]!.props('checked')).toBe(true)
    expect(chips[2]!.props('disabled')).toBe(true)
  })

  it('emits update:modelValue when a chip is selected', async () => {
    const w = mount(OptionGroup, {
      props: {
        legend: 'Spice level',
        name: 'spice',
        options,
        modelValue: 'mild',
      },
    })
    const inputs = w.findAll('input[type="radio"]')
    await inputs[1]!.setValue(true)
    expect(w.emitted('update:modelValue')![0]).toEqual(['medium'])
  })
})

