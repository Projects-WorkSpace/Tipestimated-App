import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePageFeatureStore = defineStore('features', () => {
    const openCreate = ref(false);

    const updateOpenCreateModal = () => {
        openCreate.value = !openCreate.value;
    };

    return { openCreate, updateOpenCreateModal };
});
