import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ResultadosView from '../views/ResultadosView.vue'
import JogosView from '../views/JogosView.vue'
import useMenu from "@/store/menu"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/resultados',
      name: 'resultados',
      component: ResultadosView
    },
    {
      path: '/jogos',
      name: 'jogos',
      component: JogosView
    },
  ],
})

export default router
