<script setup>
import useMenu from '@/store/menu'

const menu = useMenu()
</script>

<template>
<header class="bg-slate-200 shadow-md sticky top-0 z-10">
    <div class="flex items-center gap-12 container p-4 md:mx-auto">  
        <a class="text-3xl" @click="menu.toggle()">☰</a>
        <div class="flex-auto text-center">
            <slot></slot>
        </div>
    </div>
</header>
</template>