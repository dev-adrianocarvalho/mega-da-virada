import { reactive } from "vue"

export const useGeradorJogos = () => {
    const regras = reactive({
        qtdeJogos: 1,
        qtdeNumeros: 6 
    });
    
    const getQtdeNumeros = () => {
        let numero = prompt("Quantos números por jogo? Mínimo 6 e máximo 20.")
        if (!!numero && (numero < 6 || numero > 20)) numero = getQtdeNumeros()
        return numero
    }
    
    const megaSena = () => {
        regras.qtdeJogos = prompt("Quantos jogos quer fazer?")
        
        if(!regras.qtdeJogos) return;
        
        regras.qtdeNumeros = getQtdeNumeros()
        
        return Array.from({length: regras.qtdeJogos})
            .map(n => Array.from({length: regras.qtdeNumeros}).reduce((a, c) => {
                const rnd = (max) => {
                    let n = Math.ceil(Math.random() * (max+1))
                    if (a.includes(n)) n = rnd(max)
                    return n
                }
                c = rnd(60)
                a.push(c)
                return a
            }, []).sort((a, b) => a - b))
    }
    
    const geraCartelas = () => {
        regras.qtdeJogos = prompt("Quantos jogos quer fazer?")
        
        if(!regras.qtdeJogos) return;
        
        regras.qtdeNumeros = getQtdeNumeros()
        
        return Array.from({ length: regras.qtdeJogos }).map(c => ({ escolhidos: [], qtdeNumeros: regras.qtdeNumeros, fields: Array.from({ length: 60 }).map((_, idx) => idx+1) }))
    }
    
    return {
        megaSena,
        getQtdeNumeros,
        geraCartelas
    }
}