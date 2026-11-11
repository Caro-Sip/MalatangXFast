import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import AllergenNote from '../AllergenNote.vue'

describe('AllergenNote', () => {
  it('formats multiple allergens with conjunction and volume', () => {
    const w = mount(AllergenNote, {
      props: {
        label: 'Selected Mala broth',
        allergens: ['soy', 'wheat'],
        volumeLabel: '400 ml per bowl',
      },
    })
    expect(w.text()).toBe('Selected Mala broth: contains soy and wheat · 400 ml per bowl')
  })

  it('formats single allergen correctly', () => {
    const w = mount(AllergenNote, {
      props: {
        label: 'Selected Broth',
        allergens: ['soy'],
        volumeLabel: '400 ml per bowl',
      },
    })
    expect(w.text()).toBe('Selected Broth: contains soy · 400 ml per bowl')
  })

  it('shows "no listed allergens" when allergens array is empty', () => {
    const w = mount(AllergenNote, {
      props: {
        label: 'Selected Tomato broth',
        allergens: [],
        volumeLabel: '400 ml per bowl',
      },
    })
    expect(w.text()).toBe('Selected Tomato broth: no listed allergens · 400 ml per bowl')
  })
})

