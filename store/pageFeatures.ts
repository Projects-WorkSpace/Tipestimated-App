import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePageFeatureStore = defineStore('features', () => {
    const openCreate = ref(false);
    const isTipster = ref(false);

    const updateOpenCreateModal = () => {
        openCreate.value = !openCreate.value;
    };

    const updateIsTipster = (payload: boolean) => {
        isTipster.value = payload;
    }

    return { openCreate, isTipster, updateOpenCreateModal, updateIsTipster };
});
