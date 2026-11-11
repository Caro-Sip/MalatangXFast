import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import QuantityStepper from '../QuantityStepper.vue'

describe('QuantityStepper', () => {
  it('shows Add at 0 and emits increment', async () => {
    const w = mount(QuantityStepper, { props: { quantity: 0 } })
    await w.find('button.add').trigger('click')
    expect(w.emitted('increment')).toHaveLength(1)
  })

  it('shows minus, count, and plus when quantity is above 0', () => {
    const w = mount(QuantityStepper, { props: { quantity: 2 } })
    expect(w.find('.count').text()).toBe('2')
    expect(w.findAll('button.step')).toHaveLength(2)
  })

  it('emits decrement when minus button is clicked', async () => {
    const w = mount(QuantityStepper, { props: { quantity: 2 } })
    const buttons = w.findAll('button.step')
    expect(buttons).toHaveLength(2)
    await buttons[0]!.trigger('click')
    expect(w.emitted('decrement')).toHaveLength(1)
  })

  it('emits increment when plus button is clicked', async () => {
    const w = mount(QuantityStepper, { props: { quantity: 2 } })
    const buttons = w.findAll('button.step')
    expect(buttons).toHaveLength(2)
    await buttons[1]!.trigger('click')
    expect(w.emitted('increment')).toHaveLength(1)
  })

  it('disables + at max', () => {
    const w = mount(QuantityStepper, { props: { quantity: 5, max: 5 } })
    const buttons = w.findAll('button.step')
    expect(buttons).toHaveLength(2)
    expect(buttons[1]!.attributes('disabled')).toBeDefined()
  })

  it('disables add button when disabled prop is true', () => {
    const w = mount(QuantityStepper, { props: { quantity: 0, disabled: true } })
    expect(w.find('button.add').attributes('disabled')).toBeDefined()
  })

  it('disables step buttons when disabled prop is true', () => {
    const w = mount(QuantityStepper, { props: { quantity: 2, disabled: true } })
    const buttons = w.findAll('button.step')
    expect(buttons).toHaveLength(2)
    expect(buttons[0]!.attributes('disabled')).toBeDefined()
    expect(buttons[1]!.attributes('disabled')).toBeDefined()
  })
})
