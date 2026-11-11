import { describe, it, expect } from 'vitest'
import { fetchMenu } from '../menuApi'

describe('menuApi', () => {
  it('fetches menu data containing broths, ingredients, and sauces', async () => {
    const data = await fetchMenu()
    expect(data.ingredients.length).toBeGreaterThan(0)
    expect(data.broths.length).toBeGreaterThan(0)
    expect(data.sauces.length).toBeGreaterThan(0)

    expect(data.ingredients.some((i) => i.id === 'chicken')).toBe(true)
    expect(data.broths.some((b) => b.id === 'mala')).toBe(true)
  })
})
