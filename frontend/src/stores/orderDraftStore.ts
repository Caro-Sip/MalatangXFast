import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { SpiceLevel, SummaryGroup, SummaryLine } from '@/types'
import { MAX_PORTIONS } from '@/constants'
import { useMenuStore } from './menuStore'

const toCents = (n: number) => Math.round(n * 100) / 100

export const useOrderDraftStore = defineStore('orderDraft', () => {
  const menu = useMenuStore()

  // --- chosen state (the only things stored) ---
  const selectedBrothId = ref<string | null>(null)
  const selectedSpice = ref<SpiceLevel>('medium')
  const ingredientQuantities = ref<Record<string, number>>({})
  const sauceQuantities = ref<Record<string, number>>({})
  const cutlery = ref(false)

  // --- actions ---
  function selectBroth(id: string) {
    selectedBrothId.value = id
  }

  function setSpice(level: SpiceLevel) {
    selectedSpice.value = level
  }

  function clamp(qty: number) {
    return Math.min(MAX_PORTIONS, Math.max(0, qty))
  }

  function applyQuantity(
    target: Record<string, number>,
    id: string,
    qty: number,
    isAvailable: boolean,
  ) {
    const next = clamp(qty)
    const current = target[id] ?? 0
    if (!isAvailable && next > current) return // can't add sold-out items
    if (next === 0) delete target[id]
    else target[id] = next
  }

  function setIngredientQuantity(id: string, qty: number) {
    const item = menu.ingredients.find((i) => i.id === id)
    if (!item) return
    applyQuantity(ingredientQuantities.value, id, qty, item.isAvailable)
  }

  function setSauceQuantity(id: string, qty: number) {
    const item = menu.sauces.find((s) => s.id === id)
    if (!item) return
    applyQuantity(sauceQuantities.value, id, qty, item.isAvailable)
  }

  function setCutlery(value: boolean) {
    cutlery.value = value
  }

  function reset() {
    selectedBrothId.value = null
    selectedSpice.value = 'medium'
    ingredientQuantities.value = {}
    sauceQuantities.value = {}
    cutlery.value = false
  }

  // --- derived (never stored) ---
  const selectedBroth = computed(
    () => menu.broths.find((b) => b.id === selectedBrothId.value) ?? null,
  )

  const selectedIngredients = computed(() =>
    menu.ingredients
      .filter((i) => (ingredientQuantities.value[i.id] ?? 0) > 0)
      .map((i) => ({ item: i, quantity: ingredientQuantities.value[i.id]! })),
  )

  const selectedSauces = computed(() =>
    menu.sauces
      .filter((s) => (sauceQuantities.value[s.id] ?? 0) > 0)
      .map((s) => ({ item: s, quantity: sauceQuantities.value[s.id]! })),
  )

  const groups = computed<SummaryGroup[]>(() => {
    const bowlLines: SummaryLine[] = []

    if (selectedBroth.value) {
      bowlLines.push({
        id: selectedBroth.value.id,
        name: `${selectedBroth.value.name} broth base`,
        quantity: 1,
        price: selectedBroth.value.price,
      })
    }
    for (const { item, quantity } of selectedIngredients.value) {
      bowlLines.push({
        id: item.id,
        name: item.name,
        quantity,
        price: toCents(item.price * quantity),
      })
    }

    const sauceLines: SummaryLine[] = selectedSauces.value.map(({ item, quantity }) => ({
      id: item.id,
      name: item.name,
      quantity,
      price: toCents(item.price * quantity),
    }))

    const result: SummaryGroup[] = []
    if (bowlLines.length) {
      result.push({
        id: 'bowl',
        title: 'Malatang bowl',
        subtotal: toCents(bowlLines.reduce((sum, l) => sum + l.price, 0)),
        lines: bowlLines,
      })
    }
    if (sauceLines.length) {
      result.push({
        id: 'sauce',
        title: 'Custom sauce',
        subtotal: toCents(sauceLines.reduce((sum, l) => sum + l.price, 0)),
        lines: sauceLines,
      })
    }
    return result
  })

  const total = computed(() =>
    toCents(groups.value.reduce((sum, g) => sum + g.subtotal, 0)),
  )

  const allergens = computed(() => {
    const found = new Set<string>()
    selectedBroth.value?.allergens.forEach((a) => found.add(a))
    selectedIngredients.value.forEach(({ item }) => item.allergens.forEach((a) => found.add(a)))
    selectedSauces.value.forEach(({ item }) => item.allergens.forEach((a) => found.add(a)))
    return [...found].sort()
  })

  const canReview = computed(
    () => selectedBroth.value !== null && selectedBroth.value.isAvailable,
  )

  return {
    selectedBrothId,
    selectedSpice,
    ingredientQuantities,
    sauceQuantities,
    cutlery,
    selectBroth,
    setSpice,
    setIngredientQuantity,
    setSauceQuantity,
    setCutlery,
    reset,
    selectedBroth,
    selectedIngredients,
    selectedSauces,
    groups,
    total,
    allergens,
    canReview,
  }
})

