import { defineStore } from 'pinia'

export const useUserDetailsStore = defineStore('user', () => {
    const user = ref<Object | null>(null)
    return { user }
})
