import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import IngredientCard from '../IngredientCard.vue'
import type { Ingredient } from '@/types'

const chicken: Ingredient = {
  id: 'chicken',
  name: 'Chicken',
  price: 4,
  portionGrams: 80,
  allergens: [],
  isAvailable: true,
}

const wheatNoodles: Ingredient = {
  id: 'wheat-noodles',
  name: 'Wheat noodles',
  price: 2,
  portionGrams: 100,
  allergens: ['wheat'],
  isAvailable: true,
  imageUrl: '/noodles.jpg',
}

describe('IngredientCard', () => {
  it('shows name, price and no-allergen text', () => {
    const w = mount(IngredientCard, { props: { ingredient: chicken, quantity: 0 } })
    expect(w.text()).toContain('Chicken')
    expect(w.text()).toContain('$4.00')
    expect(w.text()).toContain('1 portion · 80 g')
    expect(w.text()).toContain('No listed allergens')
  })

  it('shows allergen text and image when provided', () => {
    const w = mount(IngredientCard, { props: { ingredient: wheatNoodles, quantity: 0 } })
    expect(w.text()).toContain('Wheat noodles')
    expect(w.text()).toContain('$2.00')
    expect(w.text()).toContain('Contains wheat')
    const img = w.find('img.photo')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/noodles.jpg')
  })

  it('marks sold-out items and disables the stepper', () => {
    const w = mount(IngredientCard, {
      props: { ingredient: { ...chicken, isAvailable: false }, quantity: 0 },
    })
    expect(w.text()).toContain('Sold out')
    expect(w.classes()).toContain('sold-out')
    expect(w.find('button').attributes('disabled')).toBeDefined()
  })

  it('applies selected class when quantity > 0', () => {
    const unselected = mount(IngredientCard, { props: { ingredient: chicken, quantity: 0 } })
    expect(unselected.classes()).not.toContain('selected')

    const selected = mount(IngredientCard, { props: { ingredient: chicken, quantity: 1 } })
    expect(selected.classes()).toContain('selected')
  })

  it('re-emits increment from the stepper', async () => {
    const w = mount(IngredientCard, { props: { ingredient: chicken, quantity: 0 } })
    await w.find('button').trigger('click')
    expect(w.emitted('increment')).toHaveLength(1)
  })

  it('re-emits decrement from the stepper when quantity > 0', async () => {
    const w = mount(IngredientCard, { props: { ingredient: chicken, quantity: 2 } })
    const buttons = w.findAll('button.step')
    expect(buttons).toHaveLength(2)
    await buttons[0]!.trigger('click')
    expect(w.emitted('decrement')).toHaveLength(1)
  })
})
