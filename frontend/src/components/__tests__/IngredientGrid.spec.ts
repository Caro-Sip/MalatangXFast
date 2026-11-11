import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import IngredientGrid from '../IngredientGrid.vue'
import IngredientCard from '../IngredientCard.vue'
import type { Ingredient } from '@/types'

const make = (id: string, name: string): Ingredient => ({
  id,
  name,
  price: 1,
  portionGrams: 50,
  allergens: [],
  isAvailable: true,
})

const ingredients = [make('chicken', 'Chicken'), make('tofu', 'Tofu')]

describe('IngredientGrid', () => {
  it('renders one card per ingredient', () => {
    const w = mount(IngredientGrid, { props: { ingredients, quantities: {} } })
    expect(w.findAllComponents(IngredientCard)).toHaveLength(2)
  })

  it('treats a missing quantity as 0 and emits id with quantity + 1', async () => {
    const w = mount(IngredientGrid, { props: { ingredients, quantities: {} } })
    const addButtons = w.findAll('button.add')
    expect(addButtons).toHaveLength(2)
    await addButtons[0]!.trigger('click')
    expect(w.emitted('change-quantity')![0]).toEqual(['chicken', 1])
  })

  it('emits quantity - 1 on decrement and never goes below 0', async () => {
    const w = mount(IngredientGrid, {
      props: { ingredients, quantities: { chicken: 1 } },
    })
    const removeBtn = w.find('button[aria-label="Remove one portion"]')
    expect(removeBtn.exists()).toBe(true)
    await removeBtn.trigger('click')
    expect(w.emitted('change-quantity')![0]).toEqual(['chicken', 0])
  })
})

