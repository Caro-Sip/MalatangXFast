<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { SPICE_LEVELS } from '@/constants'
import { useAuthStore } from '@/stores/auth'
import { useMenuStore } from '@/stores/menuStore'
import { useOrderDraftStore } from '@/stores/orderDraftStore'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import PageIntro from '@/components/PageIntro.vue'
import PickupNotice from '@/components/PickupNotice.vue'
import BrothPanel from '@/components/BrothPanel.vue'
import IngredientGrid from '@/components/IngredientGrid.vue'
import SaucePanel from '@/components/SaucePanel.vue'
import AllergenDisclaimer from '@/components/AllergenDisclaimer.vue'
import BuildSummary from '@/components/BuildSummary.vue'
import InlineAlert from '@/components/InlineAlert.vue'
import BaseButton from '@/components/BaseButton.vue'

const router = useRouter()
const auth = useAuthStore()
const menu = useMenuStore()
const draft = useOrderDraftStore()

onMounted(() => {
  menu.load()
})

function review() {
  if (!draft.canReview) return
  router.push('/review')
}
</script>

<template>
  <DefaultLayout>
    <main class="page container">
      <header class="top">
        <PageIntro
          title="Build your bowl"
          tagline="Your mix. Your heat. Priced by the portion."
        />
        <PickupNotice title="Counter pickup only" text="Next available · Pay at pickup" />
      </header>

      <InlineAlert v-if="menu.loadError">
        <span>{{ menu.loadError }}</span>
        <BaseButton @click="menu.load()">Try again</BaseButton>
      </InlineAlert>

      <p v-else-if="menu.isLoading" class="loading">Loading menu…</p>

      <div v-else class="layout">
        <div class="main-content">
          <BrothPanel
            :broths="menu.broths"
            :selected-broth-id="draft.selectedBrothId"
            :spice-levels="SPICE_LEVELS"
            :selected-spice="draft.selectedSpice"
            @update:broth="draft.selectBroth"
            @update:spice="draft.setSpice"
          />

          <section class="ingredients">
            <div class="section-head">
              <h2 class="section-title">Make it yours</h2>
              <p class="hint">− / + adjusts portions · Prices per portion</p>
            </div>
            <IngredientGrid
              :ingredients="menu.ingredients"
              :quantities="draft.ingredientQuantities"
              @change-quantity="draft.setIngredientQuantity"
            />
          </section>

          <SaucePanel
            :sauces="menu.sauces"
            :quantities="draft.sauceQuantities"
            @change-quantity="draft.setSauceQuantity"
          />

          <AllergenDisclaimer />
        </div>

        <div class="side">
          <BuildSummary
            :groups="draft.groups"
            :total="draft.total"
            :allergens="draft.allergens"
            :customer-name="auth.user?.name ?? 'Guest'"
            :spice-level="draft.selectedSpice"
            :cutlery="draft.cutlery"
            :can-review="draft.canReview"
            @review="review"
          />
        </div>
      </div>
    </main>
  </DefaultLayout>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-block: 2rem;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
}
.loading {
  color: var(--color-border-strong, #767676);
  font-size: 1.1rem;
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 22rem;
  gap: 1.5rem;
  align-items: start;
}
.main-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.side {
  position: sticky;
  top: 1rem;
}

.ingredients {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.section-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.section-title {
  margin: 0;
  font-family: var(--font-heading);
  font-size: 1.75rem;
  text-transform: uppercase;
  color: var(--color-text, #1e1e1e);
}
.hint {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--color-border-strong, #767676);
}

@media (max-width: 64rem) {
  .layout {
    grid-template-columns: 1fr;
  }
  .side {
    position: static;
  }
}

@media (max-width: 40rem) {
  .top {
    flex-direction: column;
    align-items: flex-start;
  }
  .section-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}
</style>

