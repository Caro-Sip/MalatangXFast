import type { Broth, Ingredient, Sauce, SpiceLevel } from '@/types'

export const spiceLevels: { value: SpiceLevel; label: string }[] = [
  { value: 'mild', label: 'Mild' },
  { value: 'medium', label: 'Medium' },
  { value: 'hot', label: 'Hot' },
  { value: 'extra-hot', label: 'Extra hot' },
]

export const broths: Broth[] = [
  { id: 'mala', name: 'Mala', price: 5, allergens: ['soy', 'wheat'], volumeMl: 400, isAvailable: true },
  { id: 'tomato', name: 'Tomato', price: 5, allergens: [], volumeMl: 400, isAvailable: true },
  { id: 'clear', name: 'Clear', price: 4.5, allergens: [], volumeMl: 400, isAvailable: true },
]

export const ingredients: Ingredient[] = [
  { id: 'chicken', name: 'Chicken', price: 4, portionGrams: 80, allergens: [], isAvailable: true },
  { id: 'wheat-noodles', name: 'Wheat noodles', price: 2, portionGrams: 100, allergens: ['wheat'], isAvailable: true },
  { id: 'bok-choy', name: 'Bok choy', price: 1.5, portionGrams: 60, allergens: [], isAvailable: true },
  { id: 'mushrooms', name: 'Mushrooms', price: 1.5, portionGrams: 50, allergens: [], isAvailable: true },
  { id: 'tofu', name: 'Tofu', price: 2, portionGrams: 80, allergens: ['soy'], isAvailable: true },
  { id: 'beef', name: 'Beef', price: 4.5, portionGrams: 80, allergens: [], isAvailable: false },
  { id: 'scallions', name: 'Scallions', price: 1, portionGrams: 30, allergens: [], isAvailable: true },
  { id: 'cabbage', name: 'Cabbage', price: 1.5, portionGrams: 60, allergens: [], isAvailable: true },
  { id: 'glass-noodles', name: 'Glass noodles', price: 2, portionGrams: 80, allergens: [], isAvailable: true },
  { id: 'fish-balls', name: 'Fish balls', price: 2.5, portionGrams: 70, allergens: ['fish'], isAvailable: true },
  { id: 'corn', name: 'Corn', price: 1.5, portionGrams: 60, allergens: [], isAvailable: true },
  { id: 'wood-ear', name: 'Wood ear', price: 1.5, portionGrams: 40, allergens: [], isAvailable: true },
]

export const sauces: Sauce[] = [
  { id: 'garlic', name: 'Garlic', price: 0, allergens: [], isAvailable: true },
  { id: 'sesame', name: 'Sesame sauce', price: 0.5, allergens: ['sesame', 'soy'], isAvailable: true },
  { id: 'vinegar', name: 'Vinegar', price: 0, allergens: [], isAvailable: true },
  { id: 'soy-sauce', name: 'Soy sauce', price: 0, allergens: ['soy', 'wheat'], isAvailable: true },
  { id: 'chili-oil', name: 'Chili oil', price: 0.5, allergens: [], isAvailable: true },
  { id: 'peanut', name: 'Peanut sauce', price: 0.5, allergens: ['peanut'], isAvailable: true },
  { id: 'oyster', name: 'Oyster sauce', price: 0.5, allergens: ['shellfish', 'wheat'], isAvailable: true },
  { id: 'cilantro', name: 'Cilantro', price: 0, allergens: [], isAvailable: true },
]

export const fixtureBroths = broths
export const fixtureIngredients = ingredients
export const fixtureSauces = sauces
