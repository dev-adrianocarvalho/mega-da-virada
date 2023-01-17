import { ref, watch } from "vue"

const concursos = [
    {
        jogos: [
            [2, 10, 23, 38, 54, 56],
            [6, 28, 30, 47, 51, 59],
            [12, 23, 32, 44, 50, 51],
            [3, 5, 10, 42, 43, 44],
            [5, 6, 33, 36, 37, 40],
            [2, 7, 10, 44, 56, 58],
            [6, 13, 15, 23, 26, 35],
            [1, 2, 10, 14, 16, 37],
            [8, 19, 20, 30, 39, 40],
            [8, 29, 30, 39, 40, 58],
            [20, 29, 32, 44, 53, 55],
            [17, 27, 34, 40, 45, 47],
            [8, 11, 26, 36, 40, 48],
            [4, 10, 34, 39, 50, 58],
            [5, 10, 17, 23, 30, 50],
            [1, 5, 7, 17, 18, 23],
            [5, 12, 24, 42, 46, 53],
            [2, 10, 16, 24, 30, 50],
            [1, 5, 10, 17, 23, 53],
            [10, 25, 33, 34, 44, 46],
            [5, 10, 17, 23, 30, 34]
        ],
        resultado: [3, 20, 45, 52, 53, 58],
        numero: '2555',
        data: '14/01/2022'
    },
    {
        jogos: [],
        resultado: [19,25,43,44,48,49],
        numero: '2554',
        data: '12/01/202'
    }
]

export default function useConferencia () {
    
    const numeroConcurso = ref(null)
    const data = ref(concursos)
    
    const conferencia = ref([])
    const concurso = ref(null);
    
    watch(numeroConcurso, (n) => {
        
        if (Boolean(n)) {
            const filtered = data.value.find(c => c.numero === n)
            
            concurso.value = {
                resultado: filtered.resultado,
                numero: filtered.numero
            }
            
            conferencia.value = filtered.jogos
                .reduce((a, c) => {
                    const jogos = c.map((a) => {
                        return {
                            numero: a,
                            sorteado: filtered.resultado.includes(a),
                        };
                    });
                    a.push({
                        acertos: jogos.filter((a) => a.sorteado).length,
                        jogos,
                    });
                    return a;
                }, [])
                .sort((a, b) => b.acertos - a.acertos);
        } else {
            concurso.value = null
            conferencia.value = []
        }
    })
    
    const premioClass = (acertos) => {
        switch(acertos) {
            case 6:
                return 'sena';
            case 5:
                return 'quina'
            case 4: 
                return 'quadra';
            default:
                return ''
        }
    }
        
    const selecionaConcurso = event => {
        numeroConcurso.value = event.target.value
    }
    
    return {
        conferencia,
        concurso,
        concursos: data,
        selecionaConcurso,
        premioClass
    }
}