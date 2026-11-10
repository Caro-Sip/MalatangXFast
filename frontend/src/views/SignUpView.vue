<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore, defaultRouteFor } from '@/stores/auth'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthCard from '@/components/AuthCard.vue'
import SignUpForm from '@/components/SignUpForm.vue'
import AuthSwitchPrompt from '@/components/AuthSwitchPrompt.vue'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const isSubmitting = ref(false)
const submitError = ref('')
const serverFieldErrors = ref<{ email?: string }>({})

async function onSubmit(payload: {
  name: string
  email: string
  phone: string
  password: string
}) {
  isSubmitting.value = true
  submitError.value = ''
  serverFieldErrors.value = {}

  try {
    await auth.register(payload)
    const redirect = route.query.redirect as string | undefined
    router.replace(redirect ?? defaultRouteFor(auth.role))
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Registration failed'
    if (message.toLowerCase().includes('already registered')) {
      serverFieldErrors.value = { email: 'Email already registered' }
    } else {
      submitError.value = message
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <DefaultLayout>
    <main class="auth-view">
      <AuthCard title="Create Account">
        <SignUpForm
          :loading="isSubmitting"
          :error="submitError"
          :server-field-errors="serverFieldErrors"
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
