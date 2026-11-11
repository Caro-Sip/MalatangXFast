import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import OptionChip from '../OptionChip.vue'

describe('OptionChip', () => {
  it('renders label and unchecked state', () => {
    const w = mount(OptionChip, {
      props: {
        name: 'spice',
        value: 'mild',
        label: 'Mild',
        checked: false,
      },
    })
    expect(w.text()).toBe('Mild')
    expect(w.classes()).not.toContain('checked')
    expect(w.find('.dot').exists()).toBe(false)
  })

  it('renders checked state with dot indicator', () => {
    const w = mount(OptionChip, {
      props: {
        name: 'spice',
        value: 'medium',
        label: 'Medium',
        checked: true,
      },
    })
    expect(w.classes()).toContain('checked')
    expect(w.find('.dot').exists()).toBe(true)
  })

  it('emits select when changed', async () => {
    const w = mount(OptionChip, {
      props: {
        name: 'spice',
        value: 'hot',
        label: 'Hot',
        checked: false,
      },
    })
    await w.find('input').trigger('change')
    expect(w.emitted('select')).toHaveLength(1)
  })

  it('handles disabled state', () => {
    const w = mount(OptionChip, {
      props: {
        name: 'broth',
        value: 'sold-out',
        label: 'Sold Out Broth',
        checked: false,
        disabled: true,
      },
    })
    expect(w.classes()).toContain('disabled')
    expect(w.find('input').attributes('disabled')).toBeDefined()
  })
})

