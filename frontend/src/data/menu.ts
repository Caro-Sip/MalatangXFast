import type { Broth, Ingredient, Sauce, SpiceLevel } from '@/types'

export const spiceLevels: { value: SpiceLevel; label: string }[] = [
  { value: 'mild', label: 'Mild' },
  { value: 'medium', label: 'Medium' },
  { value: 'hot', label: 'Hot' },
  { value: 'extra-hot', label: 'Extra hot' },
]

export const fixtureBroths: Broth[] = [
  {
    id: 'mala',
    name: 'Mala',
    price: 5.0,
    volumeMl: 400,
    allergens: ['soy', 'wheat'],
    isAvailable: true,
    category: 'broth',
  },
  {
    id: 'tomato',
    name: 'Tomato',
    price: 5.0,
    volumeMl: 400,
    allergens: [],
    isAvailable: true,
    category: 'broth',
  },
  {
    id: 'clear',
    name: 'Clear',
    price: 4.5,
    volumeMl: 400,
    allergens: [],
    isAvailable: true,
    category: 'broth',
  },
]

export const fixtureIngredients: Ingredient[] = [
  // Proteins
  {
    id: 'chicken',
    name: 'Chicken',
    price: 4.0,
    portionGrams: 80,
    portionLabel: '1 portion · 80 g',
    allergens: [],
    isAvailable: true,
    category: 'meat',
  },
  {
    id: 'beef',
    name: 'Beef',
    price: 4.5,
    portionGrams: 80,
    portionLabel: '1 portion · 80 g',
    allergens: [],
    isAvailable: false, // Sold out in wireframe
    category: 'meat',
  },
  {
    id: 'tofu',
    name: 'Tofu',
    price: 2.0,
    portionGrams: 80,
    portionLabel: '1 portion · 80 g',
    allergens: ['soy'],
    isAvailable: true,
    category: 'meat',
  },
  {
    id: 'fish-balls',
    name: 'Fish balls',
    price: 3.0,
    portionGrams: 75,
    portionLabel: '1 portion · 75 g',
    allergens: ['fish', 'wheat'],
    isAvailable: true,
    category: 'meat',
  },

  // Noodles
  {
    id: 'wheat-noodles',
    name: 'Wheat noodles',
    price: 2.0,
    portionGrams: 100,
    portionLabel: '1 portion · 100 g',
    allergens: ['wheat'],
    isAvailable: true,
    category: 'noodle',
  },
  {
    id: 'glass-noodles',
    name: 'Glass noodles',
    price: 2.0,
    portionGrams: 100,
    portionLabel: '1 portion · 100 g',
    allergens: [],
    isAvailable: true,
    category: 'noodle',
  },

  // Veggies & Greens
  {
    id: 'bok-choy',
    name: 'Bok choy',
    price: 1.5,
    portionGrams: 60,
    portionLabel: '1 portion · 60 g',
    allergens: [],
    isAvailable: true,
    category: 'veg',
  },
  {
    id: 'cabbage',
    name: 'Cabbage',
    price: 1.5,
    portionGrams: 60,
    portionLabel: '1 portion · 60 g',
    allergens: [],
    isAvailable: true,
    category: 'veg',
  },
  {
    id: 'corn',
    name: 'Sweet corn',
    price: 1.5,
    portionGrams: 80,
    portionLabel: '1 portion · 80 g',
    allergens: [],
    isAvailable: true,
    category: 'veg',
  },
  {
    id: 'potato',
    name: 'Potato slices',
    price: 1.5,
    portionGrams: 70,
    portionLabel: '1 portion · 70 g',
    allergens: [],
    isAvailable: true,
    category: 'veg',
  },
  {
    id: 'scallions',
    name: 'Scallions',
    price: 1.0,
    portionGrams: 30,
    portionLabel: '1 portion · 30 g',
    allergens: [],
    isAvailable: true,
    category: 'veg',
  },

  // Fungus & Mushrooms
  {
    id: 'mushrooms',
    name: 'Mushrooms',
    price: 1.5,
    portionGrams: 50,
    portionLabel: '1 portion · 50 g',
    allergens: [],
    isAvailable: true,
    category: 'veg',
  },
  {
    id: 'wood-ear',
    name: 'Wood ear fungus',
    price: 1.5,
    portionGrams: 50,
    portionLabel: '1 portion · 50 g',
    allergens: [],
    isAvailable: true,
    category: 'veg',
  },
]

export const fixtureSauces: Sauce[] = [
  {
    id: 'garlic',
    name: 'Garlic',
    price: 0.0,
    volumeMl: 15,
    portionLabel: '15 ml per portion',
    allergens: [],
    isAvailable: true,
    category: 'sauce',
  },
  {
    id: 'sesame',
    name: 'Sesame sauce',
    price: 0.5,
    volumeMl: 15,
    portionLabel: '15 ml per portion',
    allergens: ['sesame', 'soy'],
    isAvailable: true,
    category: 'sauce',
  },
  {
    id: 'vinegar',
    name: 'Vinegar',
    price: 0.0,
    volumeMl: 15,
    portionLabel: '15 ml per portion',
    allergens: [],
    isAvailable: true,
    category: 'sauce',
  },
]

// Convenient aliases matching user's snippets
export const ingredients = fixtureIngredients
export const broths = fixtureBroths
export const sauces = fixtureSauces
