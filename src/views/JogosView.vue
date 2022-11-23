<script setup>
import { ref } from "vue"
import useMegaSenaStore from "@/store/megasena"
import TheHeader from "@/components/TheHeader.vue"
import {useGeradorJogos} from "@/composables/useGeradorJogos"
const { megaSena } = useGeradorJogos()
const megaSenaStore = useMegaSenaStore()

const jogosAleatorios = ref([])
const cartelas = ref(null);

const handleClickAleatorios = () => geraJogos()

const geraJogos = () => {
    cartelas.value = []
    jogosAleatorios.value = megaSena()
}

const handleClickEscolher = () => {
    jogosAleatorios.value = []
    const qtdeJogos = prompt("Quantos jogos quer fazer?")
    let qtdeNumeros = prompt("Quantos números por jogo?")
    if(qtdeNumeros < 6 || qtdeNumeros > 20) {
        qtdeNumeros = prompt("Quantos números por jogo? Mínimo 6 e máximo 20 números.")
    }
    cartelas.value = Array.from({ length: qtdeJogos }).map(c => ({ escolhidos: [], qtdeNumeros, fields: Array.from({ length: 60 }).map((_, idx) => idx+1) }))
}

const addNumber = (number, limit, collection) => {
    if(collection.length < limit && !collection.includes(number)) collection.push(number)
}

const deleteNumber = (number, collection) => {
    collection = Array.from(collection).filter(n => n !== number)
    return collection
}
</script>

<template>
<TheHeader>
    <h1>Gerador de Jogos</h1>
</TheHeader>
    <main>
        <div class="p-4 flex gap-x-4 justify-center">
            <button class="bg-black" @click="handleClickAleatorios">Números aleatórios</button>
            <button class="bg-black" @click="handleClickEscolher">Escolher números</button>
        </div>
        <div class="wrapper">
            <div v-if="!!jogosAleatorios.length">                
                <div>
                    <p class="text-xs italic text-gray-400 text-center">* números marcados de amarelo foram sorteados nos últimos 10 anos</p>
                </div>
                <div v-for="(j, idx) in jogosAleatorios" :key="idx">
                    <p class="text-center my-2 bg-slate-100 rounded flex gap-4 items-center justify-center text-2xl py-2">
                        <span v-for="c in j" class="text-md" :class="{'bg-yellow-200/75': megaSenaStore.dezenas.find(n => c === n.numero)}">{{c}}</span>
                    </p>
                </div>
            </div>
            
            <div v-if="cartelas" class="flex flex-wrap justify-center gap-4">                
                <div class="min-w-[325px] max-w-[325px] md:max-w-[366px] ring ring-slate-400/50  rounded p-1" v-for="(c, idx) in cartelas">
                    <h3 class="text-center my-2 font-bold uppercase">Jogo {{ idx+1 }}</h3>
                    <div class="flex flex-wrap gap-1">                            
                        <div class="flex justify-center items-center w-7 h-7 md:w-8 md:h-8 bg-slate-100 hover:bg-slate-300" :class="{'cursor-pointer': c.escolhidos.length < c.qtdeNumeros, 'cursor-not-allowed': c.escolhidos.length >= c.qtdeNumeros, 'text-slate-400 bg-white cursor-not-allowed': c.escolhidos.includes(f)}" v-for="(f, adx) in c.fields" @click="addNumber(f, c.qtdeNumeros, c.escolhidos)">
                            {{ f }}
                        </div>
                    </div>
                    <div v-if="c.escolhidos.length" class="cartela__footer" :class="{'success': c.escolhidos.length >= 6}">
                        <span v-for="(n, ndx) in c.escolhidos.sort((a, b) => a - b)" class="cursor-not-allowed hover:text-red-600" @click="c.escolhidos = deleteNumber(n, c.escolhidos)">{{ ndx >= 1 ? " - " : "" }} {{ n }}</span>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss">
.cartela__footer {
    @apply bg-slate-300 p-2 text-center rounded mt-1;
    
    &.success {
        @apply bg-green-300
    }
}
</style>