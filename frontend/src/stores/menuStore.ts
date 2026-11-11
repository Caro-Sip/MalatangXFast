import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Broth, Ingredient, Sauce, SpiceLevel } from '@/types'
import { fetchMenu as apiFetchMenu } from '@/api/menuApi'

export const useMenuStore = defineStore('menu', () => {
  const ingredients = ref<Ingredient[]>([])
  const broths = ref<Broth[]>([])
  const sauces = ref<Sauce[]>([])
  const spiceLevels = ref<{ value: SpiceLevel; label: string }[]>([])

  const isLoading = ref(false)
  const loadError = ref<string | null>(null)

  const isLoaded = computed(() => ingredients.value.length > 0)

  async function fetch(fetcher = apiFetchMenu) {
    isLoading.value = true
    loadError.value = null
    try {
      const data = await fetcher()
      ingredients.value = data.ingredients
      broths.value = data.broths
      sauces.value = data.sauces
      spiceLevels.value = data.spiceLevels
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load menu'
      loadError.value = message
    } finally {
      isLoading.value = false
    }
  }

  function setAvailability(id: string, isAvailable: boolean) {
    const ing = ingredients.value.find((i) => i.id === id)
    if (ing) {
      ing.isAvailable = isAvailable
      return
    }
    const broth = broths.value.find((b) => b.id === id)
    if (broth) {
      broth.isAvailable = isAvailable
      return
    }
    const sauce = sauces.value.find((s) => s.id === id)
    if (sauce) {
      sauce.isAvailable = isAvailable
    }
  }

  function updateIngredient(updated: Ingredient) {
    const index = ingredients.value.findIndex((i) => i.id === updated.id)
    if (index !== -1) {
      ingredients.value[index] = { ...updated }
    }
  }

  function createIngredient(newIngredient: Ingredient) {
    ingredients.value.push({ ...newIngredient })
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
    ingredients,
    broths,
    sauces,
    spiceLevels,
    isLoading,
    loadError,
    isLoaded,
    fetch,
    setAvailability,
    updateIngredient,
    createIngredient,
    getIngredientById,
    getBrothById,
    getSauceById,
  }
})
