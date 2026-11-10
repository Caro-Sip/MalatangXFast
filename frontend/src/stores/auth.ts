import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User, UserRole } from '@/types'

export function defaultRouteFor(role?: UserRole | null): string {
  switch (role) {
    case 'staff':
      return '/staff/orders'
    case 'admin':
      return '/admin/inventory'
    case 'customer':
      return '/'
    default:
      return '/'
  }
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isInitializing = ref(false)

  const role = computed<UserRole | null>(() => user.value?.role ?? null)
  const isAuthenticated = computed(() => !!user.value)

  function initialize() {
    isInitializing.value = true
    try {
      const stored = localStorage.getItem('auth_user')
      if (stored) {
        user.value = JSON.parse(stored)
      }
    } catch {
      user.value = null
    } finally {
      isInitializing.value = false
    }
  }

  async function login(email: string, password: string): Promise<User> {
    if (!email || !password) {
      throw new Error('Email and password are required')
    }

    const usersJson = localStorage.getItem('registered_users')
    let users: Array<User & { password?: string }> = []
    if (usersJson) {
      try {
        users = JSON.parse(usersJson)
      } catch {
        users = []
      }
    }

    const match = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (!match || match.password !== password) {
      throw new Error('Email or password is incorrect')
    }

    const { password: _, ...userData } = match
    user.value = userData
    localStorage.setItem('auth_user', JSON.stringify(userData))
    return userData
  }

  async function register(payload: {
    name: string
    email: string
    phone: string
    password: string
  }): Promise<User> {
    if (!payload.email || !payload.password) {
      throw new Error('Invalid signup data')
    }

    let users: Array<User & { password?: string }> = []
    try {
      const usersJson = localStorage.getItem('registered_users')
      if (usersJson) {
        users = JSON.parse(usersJson)
      }
    } catch {
      users = []
    }

    if (users.some((u) => u.email.toLowerCase() === payload.email.toLowerCase())) {
      throw new Error('Email already registered')
    }

    const newUser: User = {
      id: Date.now(),
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      role: 'customer',
    }

    users.push({ ...newUser, password: payload.password })
    localStorage.setItem('registered_users', JSON.stringify(users))

    user.value = newUser
    localStorage.setItem('auth_user', JSON.stringify(newUser))
    return newUser
  }

  function logout() {
    user.value = null
    localStorage.removeItem('auth_user')
  }

  return {
    user,
    isInitializing,
    role,
    isAuthenticated,
    initialize,
    login,
    register,
    logout,
  }
})
