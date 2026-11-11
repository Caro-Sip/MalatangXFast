import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useMenuStore } from '../menuStore'
import { fetchMenu } from '@/api/menuApi'

vi.mock('@/api/menuApi')

const menu = {
  broths: [{ id: 'mala', name: 'Mala', price: 5, allergens: [], volumeMl: 400, isAvailable: true }],
  ingredients: [{ id: 'tofu', name: 'Tofu', price: 2, portionGrams: 80, allergens: ['soy'], isAvailable: true }],
  sauces: [{ id: 'garlic', name: 'Garlic', price: 0, allergens: [], isAvailable: true }],
}

describe('menuStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.mocked(fetchMenu).mockReset()
  })

  it('starts empty and not loading', () => {
    const store = useMenuStore()
    expect(store.ingredients).toEqual([])
    expect(store.isLoading).toBe(false)
    expect(store.loadError).toBeNull()
  })

  it('loads the menu', async () => {
    vi.mocked(fetchMenu).mockResolvedValue(menu)
    const store = useMenuStore()
    await store.load()
    expect(store.broths).toEqual(menu.broths)
    expect(store.ingredients).toEqual(menu.ingredients)
    expect(store.sauces).toEqual(menu.sauces)
    expect(store.isLoading).toBe(false)
  })

  it('sets loadError when the fetch fails, and clears it on retry', async () => {
    vi.mocked(fetchMenu).mockRejectedValueOnce(new Error('network'))
    const store = useMenuStore()
    await store.load()
    expect(store.loadError).toContain("couldn't load")
    expect(store.isLoading).toBe(false)

    vi.mocked(fetchMenu).mockResolvedValueOnce(menu)
    await store.load()
    expect(store.loadError).toBeNull()
    expect(store.ingredients).toHaveLength(1)
  })

  it('is loading while the request is in flight', async () => {
    let resolve!: (m: typeof menu) => void
    vi.mocked(fetchMenu).mockReturnValue(new Promise((r) => (resolve = r)))
    const store = useMenuStore()
    const pending = store.load()
    expect(store.isLoading).toBe(true)
    resolve(menu)
    await pending
    expect(store.isLoading).toBe(false)
  })
})
