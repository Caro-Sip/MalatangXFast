import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SaucePanel from '../SaucePanel.vue'
import SauceOption from '../SauceOption.vue'
import type { Sauce } from '@/types'

const make = (id: string, name: string): Sauce => ({
  id,
  name,
  price: 0.5,
  allergens: [],
  isAvailable: true,
})

const sauces = [make('garlic', 'Garlic'), make('vinegar', 'Vinegar'), make('chili', 'Chili oil')]

describe('SaucePanel', () => {
  it('renders one option per sauce, however many there are', () => {
    const w = mount(SaucePanel, { props: { sauces, quantities: {} } })
    expect(w.findAllComponents(SauceOption)).toHaveLength(3)
  })

  it('shows the portion size', () => {
    const w = mount(SaucePanel, { props: { sauces, quantities: {} } })
    expect(w.text()).toContain('15 ml per portion')
  })

  it('emits id and quantity + 1 on increment', async () => {
    const w = mount(SaucePanel, { props: { sauces, quantities: {} } })
    const addButtons = w.findAll('button.add')
    expect(addButtons.length).toBeGreaterThan(1)
    await addButtons[1]!.trigger('click')
    expect(w.emitted('change-quantity')![0]).toEqual(['vinegar', 1])
  })

  it('emits quantity - 1 on decrement', async () => {
    const w = mount(SaucePanel, { props: { sauces, quantities: { garlic: 2 } } })
    const removeBtn = w.find('button[aria-label="Remove one portion"]')
    expect(removeBtn.exists()).toBe(true)
    await removeBtn.trigger('click')
    expect(w.emitted('change-quantity')![0]).toEqual(['garlic', 1])
  })
})

