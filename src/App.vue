<script setup>
import { RouterView } from 'vue-router';
import useMenu from '@/store/menu'

const menu = useMenu()
</script>

<template>
  <nav class="fixed top-0 left-0 z-[100] h-screen">
    <div class="absolute left-0 top-0 bg-white/50 w-screen h-screen z-9" v-if="menu.isOpen" @click="menu.toggle()"></div>
    <div class="menu-wrapper" :class="{'w-0': !menu.isOpen, 'min-w-[240px] px-2': menu.isOpen}">      
      <div class="menu flex flex-col w-full">      
        <RouterLink to="/">Início</RouterLink>
        <RouterLink to="/megasena">Mega Sena</RouterLink>
        <RouterLink to="/resultados">Histórico</RouterLink>
        <RouterLink to="/jogos">Jogos</RouterLink>
      </div>
      <a @click="menu.toggle()" class="flex items-center justify-center gap-1"><span class="text-xl">&times</span> fechar</a>
    </div>
  </nav>
  <RouterView />
</template>

<style scoped>
  .menu-wrapper {
    box-shadow: 4px 0 16px theme(colors.gray.400);
    @apply flex flex-col bg-slate-200 justify-center overflow-hidden absolute top-0 left-0 h-screen z-10;
  }
  .menu a {
    @apply font-bold text-slate-800 p-4
  }
  
  .router-link-active {
    @apply text-slate-800 bg-slate-400 rounded
  }
</style>
