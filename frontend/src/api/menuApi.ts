import { broths, ingredients, sauces, spiceLevels } from '@/data/menu'
import type { Broth, Ingredient, Sauce, SpiceLevel } from '@/types'

export interface MenuResponse {
  ingredients: Ingredient[]
  broths: Broth[]
  sauces: Sauce[]
  spiceLevels: { value: SpiceLevel; label: string }[]
}

export async function fetchMenu(): Promise<MenuResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return {
    ingredients: JSON.parse(JSON.stringify(ingredients)),
    broths: JSON.parse(JSON.stringify(broths)),
    sauces: JSON.parse(JSON.stringify(sauces)),
    spiceLevels: [...spiceLevels],
  }
}
