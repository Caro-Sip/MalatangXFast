<script setup lang="ts">
import { reactive, computed } from 'vue'
import TextField from './TextField.vue'
import BaseButton from './BaseButton.vue'
import InlineAlert from './InlineAlert.vue'

const props = defineProps<{
  loading: boolean
  error?: string
  serverFieldErrors?: { email?: string; password?: string }
}>()

const emit = defineEmits<{
  submit: [creds: { email: string; password: string }]
}>()

const form = reactive({ email: '', password: '' })
const touched = reactive({ email: false, password: false })

type Field = keyof typeof form

function validate(field: Field): string | undefined {
  const value = form[field].trim()
  if (field === 'email') {
    if (!value) return 'Email is required'
    if (!/^\S+@\S+\.\S+$/.test(value)) return 'Enter a valid email'
  }
  if (field === 'password') {
    if (!form.password) return 'Password is required'
    if (form.password.length < 8) return 'Password must be at least 8 characters'
  }
}

const fieldErrors = computed(() => ({
  email: props.serverFieldErrors?.email ?? (touched.email ? validate('email') : undefined),
  password: props.serverFieldErrors?.password ?? (touched.password ? validate('password') : undefined),
}))

function handleSubmit() {
  ;(Object.keys(touched) as Field[]).forEach((f) => (touched[f] = true))
  if ((Object.keys(form) as Field[]).some((f) => validate(f))) return
  emit('submit', { email: form.email.trim(), password: form.password })
}
</script>

<template>
  <form @submit.prevent="handleSubmit" novalidate>
    <InlineAlert v-if="error" :message="error" />
    <TextField
      v-model="form.email"
      label="Email"
      type="email"
      autocomplete="email"
      :error="fieldErrors.email"
      @blur="touched.email = true"
    />
    <TextField
      v-model="form.password"
      label="Password"
      type="password"
      autocomplete="current-password"
      :error="fieldErrors.password"
      @blur="touched.password = true"
    />
    <BaseButton type="submit" :loading="loading" class="auth-submit-btn">Login</BaseButton>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.auth-submit-btn {
  align-self: center;
  margin-top: 0.5rem;
}
</style>
