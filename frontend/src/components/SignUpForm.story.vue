<script setup lang="ts">
import { reactive } from 'vue'
import { logEvent } from 'histoire/client'
import SignUpForm from './SignUpForm.vue'
import AuthCard from './AuthCard.vue'
import AuthSwitchPrompt from './AuthSwitchPrompt.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const interactiveState = reactive({
  loading: false,
  error: '',
  emailError: '',
})

function onSubmit(payload: { name: string; email: string; phone: string; password: string }) {
  logEvent('submit', payload)
}
</script>

<template>
  <Story title="Auth/SignUpForm">
    <Variant title="Default (In AuthCard)">
      <div class="story-container">
        <AuthCard title="Create Account">
          <SignUpForm
            :loading="interactiveState.loading"
            :error="interactiveState.error || undefined"
            :server-field-errors="interactiveState.emailError ? { email: interactiveState.emailError } : undefined"
            @submit="onSubmit"
          />
          <template #footer>
            <AuthSwitchPrompt
              text="Already have an account?"
              link-label="Log in"
              to="/login"
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
        <AuthCard title="Create Account">
          <SignUpForm
            :loading="true"
            @submit="onSubmit"
          />
          <template #footer>
            <AuthSwitchPrompt
              text="Already have an account?"
              link-label="Log in"
              to="/login"
            />
          </template>
        </AuthCard>
      </div>
    </Variant>

    <Variant title="With Alert Error">
      <div class="story-container">
        <AuthCard title="Create Account">
          <SignUpForm
            :loading="false"
            error="Something went wrong creating your account. Please try again."
            @submit="onSubmit"
          />
          <template #footer>
            <AuthSwitchPrompt
              text="Already have an account?"
              link-label="Log in"
              to="/login"
            />
          </template>
        </AuthCard>
      </div>
    </Variant>

    <Variant title="With Server Field Error">
      <div class="story-container">
        <AuthCard title="Create Account">
          <SignUpForm
            :loading="false"
            :server-field-errors="{ email: 'Email already registered' }"
            @submit="onSubmit"
          />
          <template #footer>
            <AuthSwitchPrompt
              text="Already have an account?"
              link-label="Log in"
              to="/login"
            />
          </template>
        </AuthCard>
      </div>
    </Variant>

    <Variant title="Full Page (DefaultLayout)">
      <DefaultLayout>
        <main class="auth-view">
          <AuthCard title="Create Account">
            <SignUpForm
              :loading="interactiveState.loading"
              :error="interactiveState.error || undefined"
              :server-field-errors="interactiveState.emailError ? { email: interactiveState.emailError } : undefined"
              @submit="onSubmit"
            />
            <template #footer>
              <AuthSwitchPrompt
                text="Already have an account?"
                link-label="Log in"
                to="/login"
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