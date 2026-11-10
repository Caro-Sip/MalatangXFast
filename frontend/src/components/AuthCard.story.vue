<script setup lang="ts">
import { reactive } from 'vue'
import AuthCard from './AuthCard.vue'

const state = reactive({ title: 'Create Account' })
</script>

<template>
  <Story title="Auth/AuthCard">
    <Variant title="Sign Up">
      <AuthCard :title="state.title">
        <p>Form content goes here</p>
        <template #footer>
          <a href="#">Already have an account? Log in</a>
        </template>
      </AuthCard>

      <template #controls>
        <HstText v-model="state.title" title="Title" />
      </template>
    </Variant>

    <Variant title="Log In">
      <AuthCard title="Log In">
        <p>Form content goes here</p>
      </AuthCard>
    </Variant>
  </Story>
</template>
