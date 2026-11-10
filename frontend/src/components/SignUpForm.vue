<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import TextField from './TextField.vue'
import BaseButton from './BaseButton.vue'
import InlineAlert from './InlineAlert.vue'

const props = defineProps<{
  loading: boolean
  error?: string
  serverFieldErrors?: { email?: string }
}>()

const emit = defineEmits<{
  submit: [payload: { name: string; email: string; phone: string; password: string }]
}>()

const form = reactive({ name: '', email: '', phone: '', password: '' })
const touched = reactive({ name: false, email: false, phone: false, password: false })

type Field = keyof typeof form

function validate(field: Field): string | undefined {
  const value = form[field].trim()
  if (field === 'name' && !value) return 'Name is required'
  if (field === 'email' && !/^\S+@\S+\.\S+$/.test(value)) return 'Enter a valid email'
  if (field === 'phone' && !value) return 'Phone is required'
  if (field === 'password' && form.password.length < 8) return 'Password must be at least 8 characters'
}

const fieldErrors = computed(() => ({
  name: touched.name ? validate('name') : undefined,
  // the server error ("Email already registered") wins over the client one
  email: props.serverFieldErrors?.email ?? (touched.email ? validate('email') : undefined),
  phone: touched.phone ? validate('phone') : undefined,
  password: touched.password ? validate('password') : undefined,
}))

function handleSubmit() {
  ;(Object.keys(touched) as Field[]).forEach((f) => (touched[f] = true))
  if ((Object.keys(form) as Field[]).some((f) => validate(f))) return
  emit('submit', {
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    password: form.password,
  })
}
</script>

<template>
  <form novalidate @submit.prevent="handleSubmit">
    <InlineAlert v-if="error" :message="error" />
    <TextField v-model="form.name" label="Name" autocomplete="name"
               :error="fieldErrors.name" @blur="touched.name = true" />
    <TextField v-model="form.email" label="Email" type="email" autocomplete="email"
               :error="fieldErrors.email" @blur="touched.email = true" />
    <TextField v-model="form.phone" label="Phone" type="tel" autocomplete="tel"
               :error="fieldErrors.phone" @blur="touched.phone = true" />
    <TextField v-model="form.password" label="Password" type="password"
               autocomplete="new-password"
               :error="fieldErrors.password" @blur="touched.password = true" />
    <BaseButton type="submit" :loading="loading" class="auth-submit-btn">Create Account</BaseButton>
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
