import { ref } from "vue";
import useMegaSenaStore from "@/store/megasena"

const useMegaVirada = () => {
  const megaSena = useMegaSenaStore()
  const estatisticas = ref([]);

  const ADRIANO = {
  };

  ADRIANO["dezenas"] = megaSena.historico
    .reduce((a, c) => {
      const [k] = Object.keys(c);
      a.push(c[k]);
      return a;
    }, [])
    .flatMap((n) => n);

  ADRIANO.dezenasDistintas = Array.from(
    ADRIANO.dezenas
      .reduce((e, f, idx, ar) => {
        const hasItem = !!e.find((n) => n.numero === f);
        const howMuch = ar.filter(n => n === f)
        if (!hasItem) {
          e.push({
            numero: f,
            many: howMuch.length
          });
        }
        return e;
      }, [])
      .values()
  )
       
  megaSena.setDezenas(ADRIANO.dezenasDistintas)
  
  estatisticas.value = ADRIANO.dezenasDistintas
    .reduce((a, c) => {
      const keys = megaSena.historico.flatMap(Object.keys);

      const onYears = keys
        .map((k) => {
          const ano = megaSena.historico.find((a) => {
            const [key] = Object.keys(a);
            return k === key;
          });
          return {
            ano: k,
            numeros: Object.values(ano)[0]
          };
        })
        .reduce((e, f) => {
          if (f.numeros.includes(c.numero)) e.push(f.ano);
          return e;
        }, []);

      a.push({ ...c, anos: onYears.join(", "), years: onYears });
      return a;
    }, [])
    .sort((a, b) => a.numero - b.numero)
    .map((n) => ({ numero: n.numero, anos: n.anos }));
  
  const getSiblings = (numero) => {
    const numeros = megaSena.historico.reduce((a, c) => {
      const [key, values] = Object.entries(c)[0]
      const has = values.includes(numero)
      if(!!has) values.forEach(v => a.push(v))
      return a
    }, [])
    
    return [...new Set(numeros)].sort((a, b) => a - b)
  }
  
  return {
    estatisticas,
    dezenas: ADRIANO.dezenasDistintas,
    historico: megaSena.historico,
    getSiblings
  };
};

export default useMegaVirada;
