

const useConcluiJogo = (withPhone = false) => {
    
    const WHATSAPP_MESSAGE = `https://api.whatsapp.com/send/?${withPhone ? `phone=${import.meta.env.VITE_PHONE}` : ''}&text=Esses são meus jogos:%0A%0A`
     const enviaJogo = (jogos) => {
         //alert(`${WHATSAPP_MESSAGE}${encodeURIComponent(jogos)}`)
         window.open(`${WHATSAPP_MESSAGE}${encodeURIComponent(jogos)}`, '_blank')
     }
     
     return {
         enviaJogo
     }
}

export default useConcluiJogo;