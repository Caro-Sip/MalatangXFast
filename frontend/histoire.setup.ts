import './src/assets/main.css'
import { defineSetupVue3 } from '@histoire/plugin-vue'
import { createRouter, createMemoryHistory } from 'vue-router'

export const setupVue3 = defineSetupVue3(({ app }) => {
  app.use(
    createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/:pathMatch(.*)*', component: { render: () => null } }],
    }),
  )
})