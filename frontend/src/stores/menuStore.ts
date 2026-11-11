import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Broth, Ingredient, Sauce } from '@/types'
import { fetchMenu } from '@/api/menuApi'

export const useMenuStore = defineStore('menu', () => {
  const broths = ref<Broth[]>([])
  const ingredients = ref<Ingredient[]>([])
  const sauces = ref<Sauce[]>([])
  const isLoading = ref(false)
  const loadError = ref<string | null>(null)

  async function load() {
    if (isLoading.value) return // ignore double clicks on Retry

    isLoading.value = true
    loadError.value = null
    try {
      const menu = await fetchMenu()
      broths.value = menu.broths
      ingredients.value = menu.ingredients
      sauces.value = menu.sauces
    } catch {
      loadError.value = "We couldn't load the menu. Please try again."
    } finally {
      isLoading.value = false
    }
  }

  function getIngredientById(id: string): Ingredient | undefined {
    return ingredients.value.find((i) => i.id === id)
  }

  function getBrothById(id: string): Broth | undefined {
    return broths.value.find((b) => b.id === id)
  }

  function getSauceById(id: string): Sauce | undefined {
    return sauces.value.find((s) => s.id === id)
  }

  return {
    broths,
    ingredients,
    sauces,
    isLoading,
    loadError,
    load,
    fetch: load,
    getIngredientById,
    getBrothById,
    getSauceById,
  }
})
