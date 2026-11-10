<script setup lang="ts">
import AuthSwitchPrompt from './AuthSwitchPrompt.vue'
</script>

<template>
  <Story title="AuthSwitchPrompt">
    <Variant title="Sign up page">
      <AuthSwitchPrompt text="Already have an account?" link-label="Log in" to="/login" />
    </Variant>
    <Variant title="Login page">
      <AuthSwitchPrompt text="New here?" link-label="Create an account" to="/signup" />
    </Variant>
  </Story>
</template>