<script setup lang="ts">
import { reactive } from 'vue'
import { logEvent } from 'histoire/client'
import LoginForm from './LoginForm.vue'
import AuthCard from './AuthCard.vue'
import AuthSwitchPrompt from './AuthSwitchPrompt.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const interactiveState = reactive({
  loading: false,
  error: '',
  emailError: '',
})

function onSubmit(creds: { email: string; password: string }) {
  logEvent('submit', creds)
}
</script>

<template>
  <Story title="Auth/LoginForm">
    <Variant title="Default (In AuthCard)">
      <div class="story-container">
        <AuthCard title="Log In">
          <LoginForm
            :loading="interactiveState.loading"
            :error="interactiveState.error || undefined"
            :server-field-errors="interactiveState.emailError ? { email: interactiveState.emailError } : undefined"
            @submit="onSubmit"
          />
          <template #footer>
            <AuthSwitchPrompt
              text="New user?"
              link-label="Create Account"
              to="/signup"
            />
          </template>
        </AuthCard>
      </div>

      <template #controls>
        <HstCheckbox v-model="interactiveState.loading" title="Loading" />
        <HstText v-model="interactiveState.error" title="General Error" />
        <HstText v-model="interactiveState.emailError" title="Email Error" />
      </template>
    </Variant>

    <Variant title="Loading State">
      <div class="story-container">
        <AuthCard title="Log In">
          <LoginForm
            :loading="true"
            @submit="onSubmit"
          />
          <template #footer>
            <AuthSwitchPrompt
              text="New user?"
              link-label="Create Account"
              to="/signup"
            />
          </template>
        </AuthCard>
      </div>
    </Variant>

    <Variant title="With Alert Error">
      <div class="story-container">
        <AuthCard title="Log In">
          <LoginForm
            :loading="false"
            error="Email or password is incorrect"
            @submit="onSubmit"
          />
          <template #footer>
            <AuthSwitchPrompt
              text="New user?"
              link-label="Create Account"
              to="/signup"
            />
          </template>
        </AuthCard>
      </div>
    </Variant>

    <Variant title="Full Page (DefaultLayout)">
      <DefaultLayout>
        <main class="auth-view">
          <AuthCard title="Log In">
            <LoginForm
              :loading="interactiveState.loading"
              :error="interactiveState.error || undefined"
              :server-field-errors="interactiveState.emailError ? { email: interactiveState.emailError } : undefined"
              @submit="onSubmit"
            />
            <template #footer>
              <AuthSwitchPrompt
                text="New user?"
                link-label="Create Account"
                to="/signup"
              />
            </template>
          </AuthCard>
        </main>
      </DefaultLayout>
    </Variant>
  </Story>
</template>

<style scoped>
.story-container {
  display: grid;
  place-items: center;
  padding: 2rem 1rem;
}

.auth-view {
  flex: 1;
  display: grid;
  place-items: center;
  padding: 2rem 1rem;
  background:
    linear-gradient(rgb(0 0 0 / 0.55), rgb(0 0 0 / 0.55)),
    url('@/assets/images/Background.jpg') center / cover no-repeat;
}
</style>

