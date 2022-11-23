<script setup>
import TheHeader from "@/components/TheHeader.vue"
import useMegaVirada from "../composables/useMegaVirada"
const { historico, dezenas } = useMegaVirada()
const anos = historico.map((key) => {
    const ano = Object.keys(key)[0];
    const numeros = Object.values(key)[0]
    return {
        ano,
        numeros
    }
})
</script>


<template>
<TheHeader>
    <h1>Histórico</h1>
  </TheHeader>
    <main>
        <div class="wrapper">
            <div class="item" v-for="(dado, idx) in anos" :key="idx">
                <p class="ano">Ano: {{dado.ano}}</p>
                <p class="numeros">Números: {{dado.numeros.join(" - ")}}</p>
            </div>
        </div>
        <div class="container mx-auto my-12 px-8 md:px-0">
            <div class="title mb-8"><h1>Número já sorteados</h1></div>
            <div class="flex gap-6 flex-wrap">
                <div class="rounded-full border-2 border-green-200 hover:bg-green-200 p-2 text-center min-w-[48px] font-bold text-xl" v-for="(d, idx) in dezenas.sort((a,b) => a - b)" :key="idx">
                    {{ d.numero }}
                    <span class="bg-green-200 rounded-full text-xs font-normal h-[18px] w-[20px] flex justify-center absolute -right-[8px] -top-[8px]">x{{ d.many }}</span>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.wrapper {
 @apply grid sm:grid-cols-2 gap-2;   
}
.ano {
    @apply font-bold text-2xl;
}
</style>