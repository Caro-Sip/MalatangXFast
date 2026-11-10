<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore, defaultRouteFor } from '@/stores/auth'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthCard from '@/components/AuthCard.vue'
import LoginForm from '@/components/LoginForm.vue'
import AuthSwitchPrompt from '@/components/AuthSwitchPrompt.vue'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const isSubmitting = ref(false)
const submitError = ref('')
const serverFieldErrors = ref<{ email?: string; password?: string }>({})

async function onSubmit(creds: { email: string; password: string }) {
  isSubmitting.value = true
  submitError.value = ''
  serverFieldErrors.value = {}

  try {
    await auth.login(creds.email, creds.password)
    const redirect = route.query.redirect as string | undefined
    router.replace(redirect ?? defaultRouteFor(auth.role))
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Login failed'
    submitError.value = message
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <DefaultLayout>
    <main class="auth-view">
      <AuthCard title="Log In">
        <LoginForm
          :loading="isSubmitting"
          :error="submitError"
          :server-field-errors="serverFieldErrors"
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
</template>

<style scoped>
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
