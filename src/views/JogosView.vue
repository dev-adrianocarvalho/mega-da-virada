<script setup>
import { ref, computed } from "vue"
import useMegaSenaStore from "@/store/megasena"
import TheHeader from "@/components/TheHeader.vue"
import { useGeradorJogos } from "@/composables/useGeradorJogos"
import useConcluiJogo from "@/composables/useConcluiJogo"

const { megaSena, geraCartelas } = useGeradorJogos()
const megaSenaStore = useMegaSenaStore()

const jogosAleatorios = ref([])
const cartelas = ref(null);

const getJogos = () => {
    let jogos = ""
    if (jogosAleatorios.value.length) {
        jogos = jogosAleatorios.value.reduce((a, c) => {
            a.push(c.join(" - "))
            return a
        }, []).join("\n")
    }
    
    if (cartelas.value.length) {
        jogos = cartelas.value.reduce((a, c) => {
            a.push(c.escolhidos.join(" - "))
            return a
        }, []).join("\n")
    }    
    return jogos
}

const handleClickAleatorios = () => geraJogos()

const geraJogos = () => {
    cartelas.value = []
    jogosAleatorios.value = megaSena()
}

const handleClickEscolher = () => {
    jogosAleatorios.value = []
    cartelas.value = geraCartelas()
}

const addNumber = (number, limit, collection) => {
    if(collection.length < limit && !collection.includes(number)) collection.push(number)
}

const deleteNumber = (number, collection) => {
    collection = Array.from(collection).filter(n => n !== number)
    return collection
}

const { enviaJogo } = useConcluiJogo()
const temJogos = computed(() => {
    return !!cartelas.value?.filter(c => !!c.escolhidos.length).length || !!jogosAleatorios.value?.length
})

console.log(temJogos)
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
            <div v-if="jogosAleatorios && !!jogosAleatorios.length">                
                <div>
                    <p class="text-xs italic text-gray-400 text-center">* números marcados de amarelo foram sorteados nos últimos 10 anos</p>
                </div>
                <div v-for="(j, idx) in jogosAleatorios" :key="idx">
                    <p class="text-center my-2 bg-slate-100 rounded flex gap-4 items-center justify-center text-2xl py-2">
                        <span v-for="c in j" class="text-md" :class="{'bg-yellow-200/75': megaSenaStore.dezenas.find(n => c === n.numero)}">{{c}}</span>
                    </p>
                </div>
            </div>
            
            <div v-if="cartelas?.length" class="flex flex-wrap justify-center gap-4">                
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
        <footer v-if="temJogos">
            <div class="mb-16">&nbsp;</div>
            <div class="footer_wrapper bg-white fixed bottom-0 left-0 w-full p-4 text-center">  
                <button class="text-xl bg-green-700 text-white" @click="enviaJogo(getJogos())">
                    Enviar jogo
                </button>
            </div>
        </footer>
    </main>
</template>

<style lang="scss">
main {
    @apply mb-24
}
.footer_wrapper {
    box-shadow: 0 -3px 16px rgba(0,0,0,0.25)
}
.cartela__footer {
    @apply bg-slate-300 p-2 text-center rounded mt-1;
    
    &.success {
        @apply bg-green-300
    }
}
</style>