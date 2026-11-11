import type { Menu } from '@/types'
import { broths, ingredients, sauces } from '@/data/menu'

export async function fetchMenu(): Promise<Menu> {
  await new Promise((resolve) => setTimeout(resolve, 300)) // simulate network
  return { broths, ingredients, sauces }
}
