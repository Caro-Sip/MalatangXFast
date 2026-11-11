import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SauceOption from '../SauceOption.vue'
import type { Sauce } from '@/types'

const sesame: Sauce = {
  id: 'sesame',
  name: 'Sesame sauce',
  price: 0.5,
  allergens: ['sesame', 'soy'],
  isAvailable: true,
}

describe('SauceOption', () => {
  it('shows name, price and allergens', () => {
    const w = mount(SauceOption, { props: { sauce: sesame, quantity: 0 } })
    expect(w.text()).toContain('Sesame sauce')
    expect(w.text()).toContain('$0.50')
    expect(w.text()).toContain('Contains sesame, soy')
  })

  it('emits increment from the stepper', async () => {
    const w = mount(SauceOption, { props: { sauce: sesame, quantity: 0 } })
    await w.find('button').trigger('click')
    expect(w.emitted('increment')).toHaveLength(1)
  })

  it('emits decrement from the stepper when quantity > 0', async () => {
    const w = mount(SauceOption, { props: { sauce: sesame, quantity: 2 } })
    const buttons = w.findAll('button.step')
    expect(buttons).toHaveLength(2)
    await buttons[0]!.trigger('click')
    expect(w.emitted('decrement')).toHaveLength(1)
  })

  it('marks sold-out items and disables the stepper', () => {
    const w = mount(SauceOption, {
      props: { sauce: { ...sesame, isAvailable: false }, quantity: 0 },
    })
    expect(w.text()).toContain('Sold out')
    expect(w.classes()).toContain('sold-out')
    expect(w.find('button').attributes('disabled')).toBeDefined()
  })
})

