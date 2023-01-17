<script setup>
import TheHeader from '@/components/TheHeader.vue'
import useConferencia from '@/composables/conferencia'

const { conferencia, concurso, concursos, selecionaConcurso, premioClass } = useConferencia()
</script>

<template>
<TheHeader>
    <h1>Conferência de jogos</h1>
</TheHeader>
<main>
    <header class="mb-8 bg-gray-100 p-4">
        <div class="flex flex-wrap items-center justify-between container mx-auto">
            <h2>Mega Sena</h2>
            
            <select @change="selecionaConcurso" class="rounded-full border-gray-200 w-full sm:w-auto">
                <option value="">Selecione o concurso</option>
                <option v-for="(c, idx) in concursos" :key="`c_${idx}_${c.numero}`">{{ c.numero }}</option>
            </select>
        </div>
    </header>
    <section class="container mx-auto">
        <header>
            <div v-if="concurso">
                <h3 class="font-bold text-lg">Concurso Nº: {{ concurso.numero }}: <span class="sm:mx-8  whitespace-nowrap">{{ concurso.resultado.join(' - ') }}</span></h3>
            </div>
        </header>
        <div v-if="concurso">
            <div class="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-8">
                <div v-for="(jogo, idx) in conferencia" class="jogo" :data-msg="premioClass(jogo.acertos)?.toUpperCase()" :class="premioClass(jogo.acertos)" :key="idx">
                    <h3 class="font-semibold text-center mb-2">Acertos: {{jogo.acertos}}</h3>
                    <ul class="lista">
                        <li v-for="(dezena, ddx) in jogo.jogos" :key="ddx" :class="{'ok': dezena.sorteado}">{{dezena.numero}}</li>
                    </ul>
                </div>
            </div>
            <div v-if="!conferencia.length">
                <div class="bg-amber-100/50 text-amber-600 p-4 rounded-md text-center my-8">Não há jogos realizados</div>
            </div>
        </div>
        <div v-else>
            <div class="bg-blue-100/50 text-blue-600 p-4 rounded-md text-center">Escolha acima um concurso</div>
        </div>
    </section>
</main>
</template>

<style lang="scss">
main {
    @apply mb-24
}
.lista {
    @apply flex gap-4 justify-center 
}
.lista li {
    @apply h-12 w-12 flex items-center justify-center rounded-full;
}
.ok {
    @apply bg-green-200
}
.jogo {
    @apply my-8 w-full max-w-[480px] mx-auto bg-gray-100 p-4 rounded-md
}

@mixin ganhou {
    &:after {
        content: attr(data-msg);
        @apply absolute -top-[10px] right-0 bg-yellow-400 outline outline-amber-500 z-auto text-sm text-amber-600 px-2 py-1 rounded-md rotate-[15deg];
    }
}

.jogo.sena   {
    @apply bg-green-600 text-white;
    
    .ok {
        @apply bg-green-700
    }
    
    @include ganhou
}

.jogo.quina {
    @apply bg-cyan-600 text-white;
    
    .ok {
        @apply bg-cyan-700
    }
    
    @include ganhou
}

.jogo.quadra {
    @apply bg-purple-600 text-white relative;
    
    .ok {
        @apply bg-purple-700
    }
    
    @include ganhou
}
</style>