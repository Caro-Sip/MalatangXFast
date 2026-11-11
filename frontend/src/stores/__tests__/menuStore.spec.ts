import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMenuStore } from '../menuStore'
import type { MenuResponse } from '@/api/menuApi'
import type { Ingredient } from '@/types'

const mockMenuData: MenuResponse = {
  broths: [
    {
      id: 'test-broth',
      name: 'Test Broth',
      price: 5.0,
      volumeMl: 400,
      allergens: [],
      isAvailable: true,
      category: 'broth',
    },
  ],
  ingredients: [
    {
      id: 'test-ing',
      name: 'Test Ingredient',
      price: 3.0,
      portionGrams: 80,
      allergens: [],
      isAvailable: true,
      category: 'meat',
    },
  ],
  sauces: [
    {
      id: 'test-sauce',
      name: 'Test Sauce',
      price: 0.5,
      volumeMl: 15,
      allergens: [],
      isAvailable: true,
      category: 'sauce',
    },
  ],
  spiceLevels: [
    { value: 'mild', label: 'Mild' },
    { value: 'medium', label: 'Medium' },
  ],
}

describe('menuStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with empty state', () => {
    const store = useMenuStore()
    expect(store.ingredients).toHaveLength(0)
    expect(store.broths).toHaveLength(0)
    expect(store.sauces).toHaveLength(0)
    expect(store.isLoading).toBe(false)
    expect(store.loadError).toBeNull()
  })

  it('fetches menu data successfully', async () => {
    const store = useMenuStore()
    const mockFetcher = async () => mockMenuData

    await store.fetch(mockFetcher)

    expect(store.isLoading).toBe(false)
    expect(store.loadError).toBeNull()
    expect(store.ingredients).toHaveLength(1)
    expect(store.broths).toHaveLength(1)
    expect(store.sauces).toHaveLength(1)
    expect(store.isLoaded).toBe(true)
    expect(store.getIngredientById('test-ing')?.name).toBe('Test Ingredient')
  })

  it('captures errors and resets loading on failure', async () => {
    const store = useMenuStore()
    const failingFetcher = async () => {
      throw new Error('Network error')
    }

    await store.fetch(failingFetcher)

    expect(store.isLoading).toBe(false)
    expect(store.loadError).toBe('Network error')
    expect(store.ingredients).toHaveLength(0)
  })

  it('toggles item availability', async () => {
    const store = useMenuStore()
    await store.fetch(async () => mockMenuData)

    store.setAvailability('test-ing', false)
    expect(store.getIngredientById('test-ing')?.isAvailable).toBe(false)

    store.setAvailability('test-broth', false)
    expect(store.getBrothById('test-broth')?.isAvailable).toBe(false)

    store.setAvailability('test-sauce', false)
    expect(store.getSauceById('test-sauce')?.isAvailable).toBe(false)
  })

  it('updates and creates ingredients', async () => {
    const store = useMenuStore()
    await store.fetch(async () => mockMenuData)

    store.updateIngredient({
      id: 'test-ing',
      name: 'Updated Ingredient',
      price: 3.5,
      portionGrams: 90,
      allergens: ['wheat'],
      isAvailable: true,
      category: 'meat',
    })
    expect(store.getIngredientById('test-ing')?.name).toBe('Updated Ingredient')
    expect(store.getIngredientById('test-ing')?.price).toBe(3.5)

    const newIng: Ingredient = {
      id: 'new-ing',
      name: 'New Item',
      price: 2.0,
      portionGrams: 50,
      allergens: [],
      isAvailable: true,
      category: 'veg',
    }
    store.createIngredient(newIng)
    expect(store.ingredients).toHaveLength(2)
    expect(store.getIngredientById('new-ing')?.name).toBe('New Item')
  })
})
