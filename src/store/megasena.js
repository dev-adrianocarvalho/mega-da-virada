import { defineStore } from "pinia";

const historico = [
          { "2021": [12, 15, 23, 32, 33, 46] },
          { "2020": [17, 20, 22, 35, 41, 42] },
          { "2019": [3, 35, 38, 40, 57, 58] },
          { "2018": [5, 10, 12, 18, 25, 33] },
          { "2017": [3, 6, 10, 17, 34, 37] },
          { "2016": [5, 11, 22, 24, 51, 53] },
          { "2015": [2, 18, 31, 42, 51, 56] },
          { "2014": [1, 5, 11, 16, 20, 56] },
          { "2013": [20, 30, 36, 38, 47, 53] },
          { "2012": [14, 32, 33, 36, 41, 52] }
        ]
const dezenas = Array.from(
  historico
    .reduce((a, c) => {
      const [k] = Object.keys(c);
      a.push(c[k]);
      return a;
    }, [])
    .flatMap((n) => n)
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


const useMegaSenaStore = defineStore('megasena',  {
    state: () => ({
        historico,
        dezenas
    }),
    actions: {
      setDezenas(dezenas) {
        this.dezenas = dezenas
      }
    }
})

export default useMegaSenaStore