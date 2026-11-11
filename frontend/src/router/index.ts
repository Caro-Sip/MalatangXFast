import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import BuildBowlPage from '@/views/BuildBowlPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/signup', name: 'signup', component: SignUpView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/build', name: 'build', component: BuildBowlPage },
    { path: '/builder', redirect: '/build' },
  ],
})

export default router
