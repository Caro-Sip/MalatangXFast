export type UserRole = 'customer' | 'staff' | 'admin'

export interface User {
  id: string | number
  name: string
  email: string
  phone: string
  role: UserRole
}

export type SpiceLevel = 'mild' | 'medium' | 'hot' | 'extra-hot'

export type IngredientCategory = 'broth' | 'noodle' | 'meat' | 'veg' | 'sauce'

export interface Ingredient {
  id: string
  name: string
  price: number // per portion
  portionGrams?: number
  portionLabel?: string
  category?: IngredientCategory
  allergens: string[] // empty = "No listed allergens"
  isAvailable: boolean
  imageUrl?: string
  stockQuantity?: number
}

export interface Broth extends Ingredient {
  category?: 'broth'
  volumeMl?: number
}

export interface Sauce extends Ingredient {
  category?: 'sauce'
  volumeMl?: number
}

export interface SummaryLine {
  id: string
  name: string // e.g. "Mala broth base"
  quantity: number
  price: number // line total (unit price x quantity)
}

export interface SummaryGroup {
  id: 'bowl' | 'sauce'
  title: string // "Malatang bowl" / "Custom sauce"
  subtotal: number
  lines: SummaryLine[]
}
