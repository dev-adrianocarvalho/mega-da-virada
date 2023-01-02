<script setup>
import { ref, reactive } from "vue"
import TheHeader from "@/components/TheHeader.vue"
import useMegaVirada from "@/composables/useMegaVirada"

const { estatisticas, getSiblings } = useMegaVirada()

const getHighs = anos => {
  let howHigh = {
    0: "",
    1: "",
    2: "warm",
    3: "hot"
  };
  const length = anos.split(',').length
  const many = Number(length > 3 ? 3 : length)
  
  return howHigh[many]
}

const pairs = ref([])
const handleClick = (numero) => {
  pairs.value = getSiblings(numero)
  closingPairs()
}
const closingPairs = () => estatisticas.value.forEach(e => {
  e.pair = pairs.value.includes(e.numero)
})

const resetView = () => {
  estatisticas.value.forEach(e => {
    e.pair = false
  })
  pairs.value = []
}

const dados = reactive(estatisticas)

</script>

<template>
  <TheHeader>
    <h1>Mega da Virada</h1>
  </TheHeader>
  <main>
    <div class="title">
      <h2>Dezenas sorteadas nos últimos 10 anos</h2>
      <p>Clique e veja com quais números cada número já se combinou.</p>
    </div>
          
    <div class="wrapper">
      
    <div class="item" v-for="(dado, idx) in dados" :key="idx" :class="[getHighs(dado.anos), {'pair': !!dado.pair}]" @click="handleClick(dado.numero)">
      <p class="numero">{{ dado.numero }}</p>
      <p class="anos">Anos: {{ dado.anos }}</p>
    </div>
    </div>
    
    <button v-if="pairs.length" class="reset" @click="resetView">RESET</button>
  </main>
</template>

<style scoped>
  body {
    font-family: "Inter"
  }
  main {
    @apply container mx-auto;
  }
  
  .wrapper {
    @apply grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4;
  }

    .numero {
      @apply text-3xl font-bold m-0;
    }
    .anos {
     @apply text-xs m-0;
    }
  
  .item.pair {
    @apply bg-green-300 ring-2 ring-green-400 !important;
  }
  .item.hot {
    @apply bg-red-200 hover:bg-red-300 ring-red-400
  }
  .item.warm {
    @apply bg-yellow-200 hover:bg-yellow-300 ring-yellow-400
  }
  
  .reset {
    @apply fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full transition;
  }
</style>
