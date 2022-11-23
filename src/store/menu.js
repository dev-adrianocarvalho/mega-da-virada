import { defineStore } from 'pinia'


const useMenu = defineStore('menu', {
    state: () =>  ({
        isOpen: false
    }),
    actions: {
        toggle() {
            this.isOpen = !this.isOpen
        }
    }
})

export default useMenu