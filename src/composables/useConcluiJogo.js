
const WHATSAPP_MESSAGE = `https://wa.me/${import.meta.env.VITE_PHONE}?text=Esses são meus jogos:%0A%0A`

const useConcluiJogo = () => {
     const enviaJogo = (jogos) => {
         //alert(`${WHATSAPP_MESSAGE}${encodeURIComponent(jogos)}`)
         window.open(`${WHATSAPP_MESSAGE}${encodeURIComponent(jogos)}`, '_blank')
     }
     
     return {
         enviaJogo
     }
}

export default useConcluiJogo;