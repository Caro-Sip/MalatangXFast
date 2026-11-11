import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import AllergenLabel from '../AllergenLabel.vue'

describe('AllergenLabel', () => {
  it('shows "No listed allergens" when allergens array is empty', () => {
    const w = mount(AllergenLabel, { props: { allergens: [] } })
    expect(w.text()).toBe('No listed allergens')
    expect(w.classes()).not.toContain('has-allergens')
  })

  it('shows "Contains <allergens>" with class has-allergens when allergens are provided', () => {
    const w = mount(AllergenLabel, { props: { allergens: ['soy', 'wheat'] } })
    expect(w.text()).toBe('Contains soy, wheat')
    expect(w.classes()).toContain('has-allergens')
  })
})

